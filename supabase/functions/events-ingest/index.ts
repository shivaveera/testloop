import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const body = await request.json();
    const events = Array.isArray(body.events) ? body.events : [body];
    const payload = events.map((event) => ({
      submission_id: event.submission_id,
      event_name: event.event_name,
      event_origin: event.event_origin,
      payload: event.payload ?? {},
    }));

    const { error } = await supabase.from("events").insert(payload);
    if (error) {
      throw error;
    }

    return Response.json({ ok: true, inserted: payload.length }, { headers: corsHeaders });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not ingest events." },
      { status: 400, headers: corsHeaders },
    );
  }
});

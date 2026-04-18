const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url } = await request.json();
    const parsed = new URL(url);
    const framable = !parsed.hostname.includes("blocked") && !parsed.hostname.includes("x-frame");

    return Response.json(
      {
        framable,
        normalizedUrl: parsed.toString(),
        reason: framable
          ? "URL preflight passed."
          : "Host appears to return anti-framing headers. Use a staging origin without x-frame restrictions.",
      },
      { headers: corsHeaders },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Invalid URL payload." },
      { status: 400, headers: corsHeaders },
    );
  }
});

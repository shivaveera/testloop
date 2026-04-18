import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function badgeForStats(approvedRate: number, fraudAverage: number, completedTests: number): "probation" | "verified" | "top-rated" {
  if (completedTests >= 15 && approvedRate >= 92 && fraudAverage < 20) {
    return "top-rated";
  }

  if (completedTests >= 3 && approvedRate >= 80) {
    return "verified";
  }

  return "probation";
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data: testers, error: testersError } = await supabase
      .from("profiles")
      .select("id,role")
      .eq("role", "tester");

    if (testersError) {
      throw testersError;
    }

    let updated = 0;
    for (const tester of testers ?? []) {
      const { data: submissions } = await supabase
        .from("submissions")
        .select("status,fraud_score")
        .eq("tester_id", tester.id);

      const approved = submissions?.filter((entry) => entry.status === "approved").length ?? 0;
      const completed = submissions?.filter((entry) => entry.status !== "pending").length ?? 0;
      const approvedRate = completed === 0 ? 0 : (approved / completed) * 100;
      const fraudAverage =
        submissions && submissions.length > 0
          ? submissions.reduce((sum, entry) => sum + Number(entry.fraud_score ?? 0), 0) / submissions.length
          : 100;

      const badge = badgeForStats(approvedRate, fraudAverage, completed);
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ badge })
        .eq("id", tester.id);

      if (updateError) {
        throw updateError;
      }
      updated += 1;
    }

    return Response.json({ ok: true, updated }, { headers: corsHeaders });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not recompute badges." },
      { status: 400, headers: corsHeaders },
    );
  }
});

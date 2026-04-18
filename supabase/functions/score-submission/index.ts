import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function buildSummary(input: string): Promise<string> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    return "OpenAI summary unavailable in this environment. Submission scored with deterministic fallback logic.";
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: Deno.env.get("OPENAI_SCORING_MODEL") ?? "gpt-4.1",
      instructions:
        "Summarize a TestLoop usability submission in 2 short sentences. Mention whether the result should feel approved, review-worthy, or rejected. Plain text only.",
      input,
    }),
  });

  const payload = await response.json();
  return payload.output_text ?? "OpenAI did not return summary text.";
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

    const { submission_id } = await request.json();
    const { data: metrics, error: metricsError } = await supabase
      .from("submission_metrics")
      .select("label,value,passed")
      .eq("submission_id", submission_id);
    const { data: flags, error: flagsError } = await supabase
      .from("submission_flags")
      .select("label,severity,status")
      .eq("submission_id", submission_id);

    if (metricsError || flagsError) {
      throw metricsError ?? flagsError;
    }

    const fraudScore = Math.min(
      100,
      (flags ?? [])
        .filter((flag) => flag.status === "open")
        .reduce((total, flag) => total + Number(flag.severity) * 8, 0),
    );
    const qualityScore =
      (metrics ?? []).length === 0
        ? 0
        : Math.round(
            ((metrics ?? []).filter((metric) => metric.passed).length / Math.max((metrics ?? []).length, 1)) * 100,
          );

    const status =
      fraudScore >= 70
        ? "flagged"
        : fraudScore >= 40
          ? "pending"
          : qualityScore >= 60
            ? "approved"
            : "rejected";

    const summary = await buildSummary(
      JSON.stringify({
        submission_id,
        fraudScore,
        qualityScore,
        metrics,
        flags,
      }),
    );

    const { error: updateError } = await supabase
      .from("submissions")
      .update({
        status,
        fraud_score: fraudScore,
        quality_score: qualityScore,
        summary,
      })
      .eq("id", submission_id);

    if (updateError) {
      throw updateError;
    }

    return Response.json({ ok: true, status, fraudScore, qualityScore }, { headers: corsHeaders });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not score submission." },
      { status: 400, headers: corsHeaders },
    );
  }
});

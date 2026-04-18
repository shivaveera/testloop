import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function metricRow(submissionId: string, metricKey: string, label: string, value: number, unit: string, passed: boolean, thresholdDisplay: string) {
  return {
    submission_id: submissionId,
    metric_key: metricKey,
    label,
    value,
    unit,
    passed,
    threshold_display: thresholdDisplay,
  };
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
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .select("id,test_id,duration_seconds")
      .eq("id", submission_id)
      .single();

    if (submissionError || !submission) {
      throw submissionError ?? new Error("Submission not found.");
    }

    const { data: events, error: eventError } = await supabase
      .from("events")
      .select("event_name,payload")
      .eq("submission_id", submission_id);

    if (eventError) {
      throw eventError;
    }

    const pasteCount = events?.filter((entry) => entry.event_name === "paste_detected").length ?? 0;
    const tabSwitches = events?.filter((entry) => entry.event_name === "tab_switch").length ?? 0;
    const checkpoints = events?.filter((entry) => entry.event_name === "checkpoint").length ?? 0;
    const successRate = Math.min(100, 55 + checkpoints * 15);
    const timeOnTask = submission.duration_seconds;
    const errorRate = Math.max(0.1, 0.9 - checkpoints * 0.2);
    const sus = Math.min(95, 62 + checkpoints * 4);
    const seq = Math.min(7, 4.2 + checkpoints * 0.5);
    const lostness = Math.max(0.18, 0.62 - checkpoints * 0.1);
    const clickEfficiency = Math.min(100, 48 + checkpoints * 10);
    const confidence = Math.min(5, 3.8 + checkpoints * 0.3);
    const firstClick = pasteCount === 0 ? 100 : 50;
    const umux = Math.min(100, 60 + checkpoints * 6);

    const rows = [
      metricRow(submission_id, "task_success_rate", "Task Success Rate", successRate, "%", successRate >= 78, ">= 78%"),
      metricRow(submission_id, "time_on_task", "Time on Task", timeOnTask, "sec", timeOnTask <= 125, "<= 125 expert%"),
      metricRow(submission_id, "error_rate", "Error Rate", errorRate, "per task", errorRate <= 0.5, "<= 0.5 per task"),
      metricRow(submission_id, "sus", "SUS", sus, "", sus >= 68, ">= 68"),
      metricRow(submission_id, "seq", "SEQ", seq, "/7", seq >= 5.5, ">= 5.5"),
      metricRow(submission_id, "lostness", "Lostness", lostness, "", lostness < 0.5, "< 0.5"),
      metricRow(submission_id, "click_path_efficiency", "Click-Path Efficiency", clickEfficiency, "%", clickEfficiency >= 60, ">= 60%"),
      metricRow(submission_id, "confidence", "Confidence", confidence, "/5", confidence >= 4, ">= 4.0"),
      metricRow(submission_id, "first_click_success", "First-Click Success", firstClick, "%", firstClick >= 65, ">= 65%"),
      metricRow(submission_id, "umux_lite", "UMUX-Lite", umux, "", umux >= 70, ">= 70"),
    ];

    await supabase.from("submission_metrics").delete().eq("submission_id", submission_id);
    const { error: insertError } = await supabase.from("submission_metrics").insert(rows);
    if (insertError) {
      throw insertError;
    }

    return Response.json({ ok: true, metrics: rows.length, tabSwitches }, { headers: corsHeaders });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not compute metrics." },
      { status: 400, headers: corsHeaders },
    );
  }
});

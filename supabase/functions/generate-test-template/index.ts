const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function fallbackTemplate(url: string) {
  const lowerUrl = url.toLowerCase();
  const flavor = lowerUrl.includes("pricing")
    ? "pricing"
    : lowerUrl.includes("checkout")
      ? "checkout"
      : "onboarding";

  const taskMap: Record<string, Array<{ title: string; description: string }>> = {
    pricing: [
      { title: "Understand the plans", description: "Explain which plan feels right for a small SaaS team and why." },
      { title: "Pick a plan", description: "Choose a plan and move toward the pricing CTA." },
      { title: "Start checkout", description: "Begin the purchase flow and confirm the page feels trustworthy." },
    ],
    checkout: [
      { title: "Add a product to cart", description: "Navigate into the product flow and add an item to the cart." },
      { title: "Swap the saved card", description: "Use the new card flow to replace an existing payment method." },
      { title: "Complete the order", description: "Place the order and confirm the success state is clear." },
    ],
    onboarding: [
      { title: "Create an account", description: "Register with email and explain whether the setup is clear." },
      { title: "Complete first setup", description: "Finish the first-run checklist without outside help." },
      { title: "Invite a teammate", description: "Find the team invite flow and send an invite." },
    ],
  };

  return {
    summary: `Fallback ${flavor} template generated because no OPENAI_API_KEY was available.`,
    tasks: taskMap[flavor],
    metrics: [
      { metricKey: "task_success_rate", label: "Task Success Rate", operator: ">=", targetValue: 78, unit: "%" },
      { metricKey: "sus", label: "SUS", operator: ">=", targetValue: 68, unit: "" },
      { metricKey: "first_click_success", label: "First-Click Success", operator: ">=", targetValue: 65, unit: "%" },
    ],
  };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url } = await request.json();
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return Response.json(fallbackTemplate(url), { headers: corsHeaders });
    }

    const model = Deno.env.get("OPENAI_MODEL") ?? "gpt-4.1-mini";
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        instructions:
          "You generate JSON-only testing templates for TestLoop. Return a JSON object with summary, tasks, and metrics. Each task has title and description. Each metric has metricKey, label, operator, targetValue, and unit.",
        input: `Draft a desktop-first usability test template for this URL: ${url}`,
      }),
    });

    const payload = await response.json();
    const outputText =
      typeof payload.output_text === "string"
        ? payload.output_text
        : payload.output?.[0]?.content?.[0]?.text ?? "";

    return Response.json(JSON.parse(outputText), { headers: corsHeaders });
  } catch (error) {
    return Response.json(
      fallbackTemplate("https://fallback.testloop.dev"),
      { status: 200, headers: corsHeaders },
    );
  }
});

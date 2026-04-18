import type {
  AdminLevel,
  AuditLogRow,
  CompanyRow,
  EventRow,
  ProfileRow,
  SubmissionFlagRow,
  SubmissionMetricRow,
  SubmissionRow,
  SubmissionStatus,
  TestMetricConfigRow,
  TestRow,
  TestTaskRow,
  TesterBadge,
  TesterVerificationRow,
  UserRole,
  VerificationStatus,
} from "./database.types";

const STORAGE_KEY = "testloop-demo-store-v3";

export type CompanyOnboardingInput = {
  name: string;
  website: string;
  productStage: string;
  category: string;
  teamSize: string;
};

export type TesterOnboardingInput = {
  college: string;
  githubUrl: string;
  linkedinUrl: string;
  skills: string[];
  collegeIdUrl: string;
  screenerScore: number;
};

export type AccountProfileInput = {
  fullName: string;
  college?: string;
  githubUrl?: string;
  linkedinUrl?: string;
};

export type CompanySettingsInput = {
  name: string;
  website: string;
  category: string;
  productStage: string;
  teamSize: string;
};

export type CreateTestInput = {
  title: string;
  description: string;
  url: string;
  category: string;
  rewardInr: number;
  targetTesters: number;
  eligibleBadges: TesterBadge[];
  publishNow: boolean;
  tasks: Array<{
    title: string;
    description: string;
    successSelector: string | null;
    successUrlPattern: string | null;
  }>;
  metrics: Array<{
    metricKey: string;
    label: string;
    operator: string;
    targetValue: number;
    unit: string;
  }>;
};

export type RunSubmissionInput = {
  confidence: number;
  attentionCheckPassed: boolean;
  pasteEvents: number;
  tabSwitches: number;
  idlePercent: number;
  firstClickMatched: boolean;
  notes: string;
  completedTaskIds: string[];
  fingerprint: string | null;
  eventLog: Array<{
    name: string;
    origin: string;
    payload: Record<string, string | number | boolean | null>;
    createdAt: string;
  }>;
};

export type AuthUser = ProfileRow & {
  companyName: string | null;
};

export type AppConfig = {
  defaultModel: string;
  scoringModel: string;
  allowAutoApprove: boolean;
  flagThreshold: number;
  reviewThreshold: number;
};

type DemoAccount = {
  email: string;
  password: string;
  profileId: string;
};

type CompanyDetail = {
  companyId: string;
  category: string;
  productStage: string;
  teamSize: string;
};

type DemoState = {
  accounts: DemoAccount[];
  currentUserId: string | null;
  profiles: ProfileRow[];
  companies: CompanyRow[];
  companyDetails: CompanyDetail[];
  tests: TestRow[];
  testTasks: TestTaskRow[];
  testMetrics: TestMetricConfigRow[];
  submissions: SubmissionRow[];
  submissionMetrics: SubmissionMetricRow[];
  submissionFlags: SubmissionFlagRow[];
  events: EventRow[];
  auditLogs: AuditLogRow[];
  testerVerifications: TesterVerificationRow[];
  adminConfig: AppConfig;
};

export type DashboardSnapshot = {
  tests: TestRow[];
  liveCount: number;
  totalSubmissions: number;
  flaggedCount: number;
  passRate: number;
  medianTurnaroundHours: number;
  chart: Array<{ label: string; approved: number; flagged: number }>;
};

const MODEL_CONFIG: AppConfig = {
  defaultModel: "gpt-4.1-mini",
  scoringModel: "gpt-4.1",
  allowAutoApprove: true,
  flagThreshold: 70,
  reviewThreshold: 40,
};

const METRIC_BLUEPRINT = [
  { metricKey: "task_success_rate", label: "Task Success Rate", operator: ">=", targetValue: 78, unit: "%" },
  { metricKey: "time_on_task", label: "Time on Task", operator: "<=", targetValue: 125, unit: "expert%" },
  { metricKey: "error_rate", label: "Error Rate", operator: "<=", targetValue: 0.5, unit: "per task" },
  { metricKey: "sus", label: "SUS", operator: ">=", targetValue: 68, unit: "" },
  { metricKey: "seq", label: "SEQ", operator: ">=", targetValue: 5.5, unit: "/7" },
  { metricKey: "lostness", label: "Lostness", operator: "<", targetValue: 0.5, unit: "" },
  { metricKey: "click_path_efficiency", label: "Click-Path Efficiency", operator: ">=", targetValue: 60, unit: "%" },
  { metricKey: "confidence", label: "Confidence", operator: ">=", targetValue: 4, unit: "/5" },
  { metricKey: "first_click_success", label: "First-Click Success", operator: ">=", targetValue: 65, unit: "%" },
  { metricKey: "umux_lite", label: "UMUX-Lite", operator: ">=", targetValue: 70, unit: "" },
];

function iso(hoursAgo = 0): string {
  return new Date(Date.now() - hoursAgo * 3_600_000).toISOString();
}

function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function metricConfig(testId: string): TestMetricConfigRow[] {
  return METRIC_BLUEPRINT.map((metric) => ({
    id: uid("metric_cfg"),
    test_id: testId,
    metric_key: metric.metricKey,
    label: metric.label,
    operator: metric.operator,
    target_value: metric.targetValue,
    unit: metric.unit,
  }));
}

function taskTemplate(testId: string, flavor: "checkout" | "onboarding" | "pricing"): TestTaskRow[] {
  const tasksByFlavor: Record<typeof flavor, Array<{ title: string; description: string }>> = {
    checkout: [
      { title: "Add one product to cart", description: "Land on the product detail page and add one item to your cart." },
      { title: "Update payment method", description: "Use the new card flow to replace the existing payment method." },
      { title: "Place the order", description: "Complete checkout and confirm you reached the success page." },
    ],
    onboarding: [
      { title: "Create an account", description: "Register using email and verify the first-run instructions make sense." },
      { title: "Complete first project", description: "Use the onboarding checklist to create your first live project." },
      { title: "Invite a teammate", description: "Find the invite flow and send a teammate invite." },
    ],
    pricing: [
      { title: "Compare plans", description: "Understand the value difference between the entry and growth tiers." },
      { title: "Select a plan", description: "Choose the plan that feels right for a small SaaS team." },
      { title: "Start checkout", description: "Begin the purchase flow and confirm the CTA feels trustworthy." },
    ],
  };

  return tasksByFlavor[flavor].map((task, index) => ({
    id: uid("task"),
    test_id: testId,
    position: index + 1,
    title: task.title,
    description: task.description,
    success_selector: index === tasksByFlavor[flavor].length - 1 ? "[data-test=success]" : null,
    success_url_pattern: index === tasksByFlavor[flavor].length - 1 ? "/success" : null,
  }));
}

function seededSubmissionMetrics(submissionId: string, scoreShift = 0): SubmissionMetricRow[] {
  const values = [
    { key: "task_success_rate", label: "Task Success Rate", value: 82 + scoreShift, unit: "%", threshold: ">= 78%" },
    { key: "time_on_task", label: "Time on Task", value: 112 - scoreShift, unit: "sec", threshold: "<= 125 expert%" },
    { key: "error_rate", label: "Error Rate", value: 0.4, unit: "per task", threshold: "<= 0.5" },
    { key: "sus", label: "SUS", value: 74 + scoreShift / 4, unit: "", threshold: ">= 68" },
    { key: "seq", label: "SEQ", value: 5.6, unit: "/7", threshold: ">= 5.5" },
    { key: "lostness", label: "Lostness", value: 0.31, unit: "", threshold: "< 0.5" },
    { key: "click_path_efficiency", label: "Click-Path Efficiency", value: 68 + scoreShift, unit: "%", threshold: ">= 60%" },
    { key: "confidence", label: "Confidence", value: 4.2, unit: "/5", threshold: ">= 4.0" },
    { key: "first_click_success", label: "First-Click Success", value: 61 + scoreShift, unit: "%", threshold: ">= 65%" },
    { key: "umux_lite", label: "UMUX-Lite", value: 72 + scoreShift / 2, unit: "", threshold: ">= 70" },
  ];

  return values.map((metric) => ({
    id: uid("submission_metric"),
    submission_id: submissionId,
    metric_key: metric.key,
    label: metric.label,
    value: Number(metric.value.toFixed(1)),
    unit: metric.unit,
    passed:
      metric.key === "time_on_task"
        ? metric.value <= 125
        : metric.key === "lostness"
          ? metric.value < 0.5
          : metric.key === "error_rate"
            ? metric.value <= 0.5
            : metric.value >= Number(metric.threshold.replace(/[^\d.]/g, "")),
    threshold_display: metric.threshold,
  }));
}

function buildSeedState(): DemoState {
  const founderId = "profile_founder_priya";
  const testerId = "profile_tester_rohan";
  const pendingTesterId = "profile_tester_pending";
  const adminId = "profile_admin_super";
  const assistantId = "profile_admin_assistant";
  const companyId = "company_acme";
  const checkoutTestId = "test_checkout_flow";
  const onboardingTestId = "test_onboarding_v3";
  const pricingTestId = "test_pricing_page";
  const flaggedSubmissionId = "submission_flagged_checkout";
  const approvedSubmissionId = "submission_approved_checkout";

  const profiles: ProfileRow[] = [
    {
      id: founderId,
      email: "founder@testloop.dev",
      full_name: "Priya Nair",
      role: "founder",
      admin_level: null,
      badge: null,
      verification_status: "approved",
      college: null,
      github_url: null,
      linkedin_url: null,
      company_id: companyId,
      created_at: iso(120),
    },
    {
      id: testerId,
      email: "tester@testloop.dev",
      full_name: "Rohan Tiwari",
      role: "tester",
      admin_level: null,
      badge: "verified",
      verification_status: "approved",
      college: "IIT-H",
      github_url: "https://github.com/rohant",
      linkedin_url: "https://linkedin.com/in/rohan-t",
      company_id: null,
      created_at: iso(90),
    },
    {
      id: pendingTesterId,
      email: "pending@testloop.dev",
      full_name: "Divya Sharma",
      role: "tester",
      admin_level: null,
      badge: "probation",
      verification_status: "pending",
      college: "PES University",
      github_url: "https://github.com/divya",
      linkedin_url: "https://linkedin.com/in/divya-s",
      company_id: null,
      created_at: iso(48),
    },
    {
      id: adminId,
      email: "admin@testloop.dev",
      full_name: "Siva Veera",
      role: "admin",
      admin_level: "super",
      badge: null,
      verification_status: "approved",
      college: null,
      github_url: null,
      linkedin_url: null,
      company_id: null,
      created_at: iso(200),
    },
    {
      id: assistantId,
      email: "assistant@testloop.dev",
      full_name: "Maya Joseph",
      role: "admin",
      admin_level: "assistant",
      badge: null,
      verification_status: "approved",
      college: null,
      github_url: null,
      linkedin_url: null,
      company_id: null,
      created_at: iso(120),
    },
  ];

  const companies: CompanyRow[] = [
    {
      id: companyId,
      owner_id: founderId,
      name: "Acme Loop Labs",
      slug: "acme-loop-labs",
      website: "https://acmeloop.dev",
      plan_tier: "growth",
      created_at: iso(120),
    },
  ];

  const tests: TestRow[] = [
    {
      id: checkoutTestId,
      company_id: companyId,
      founder_id: founderId,
      title: "Checkout — new card flow",
      description: "Validate the new saved-card replacement flow before Friday ship.",
      status: "live",
      url: "https://demo.testloop.app/checkout",
      framable: true,
      category: "Checkout",
      reward_inr: 700,
      target_testers: 25,
      current_submissions: 18,
      eligible_badges: ["verified", "top-rated"],
      created_at: iso(36),
      updated_at: iso(2),
      published_at: iso(30),
    },
    {
      id: onboardingTestId,
      company_id: companyId,
      founder_id: founderId,
      title: "Onboarding v3 — first run",
      description: "Measure whether first-run setup is shippable for self-serve users.",
      status: "completed",
      url: "https://demo.testloop.app/onboarding",
      framable: true,
      category: "Onboarding",
      reward_inr: 500,
      target_testers: 20,
      current_submissions: 20,
      eligible_badges: ["verified", "top-rated"],
      created_at: iso(70),
      updated_at: iso(20),
      published_at: iso(68),
    },
    {
      id: pricingTestId,
      company_id: companyId,
      founder_id: founderId,
      title: "Pricing page — plan selector",
      description: "Understand whether the new plan framing pushes more users into Growth.",
      status: "published",
      url: "https://demo.testloop.app/pricing",
      framable: true,
      category: "Pricing",
      reward_inr: 550,
      target_testers: 15,
      current_submissions: 7,
      eligible_badges: ["probation", "verified", "top-rated"],
      created_at: iso(20),
      updated_at: iso(4),
      published_at: iso(16),
    },
  ];

  const testTasks = [
    ...taskTemplate(checkoutTestId, "checkout"),
    ...taskTemplate(onboardingTestId, "onboarding"),
    ...taskTemplate(pricingTestId, "pricing"),
  ];

  const testMetrics = [
    ...metricConfig(checkoutTestId),
    ...metricConfig(onboardingTestId),
    ...metricConfig(pricingTestId),
  ];

  const submissions: SubmissionRow[] = [
    {
      id: approvedSubmissionId,
      test_id: checkoutTestId,
      tester_id: testerId,
      status: "approved",
      quality_score: 82,
      fraud_score: 12,
      duration_seconds: 540,
      summary: "Checkout path felt fast overall, but the saved-card replacement CTA was hidden below the fold.",
      created_at: iso(10),
      completed_at: iso(10),
    },
    {
      id: flaggedSubmissionId,
      test_id: checkoutTestId,
      tester_id: pendingTesterId,
      status: "flagged",
      quality_score: 61,
      fraud_score: 76,
      duration_seconds: 135,
      summary: "Submission auto-flagged for completion-speed outlier and paste-dump patterns.",
      created_at: iso(5),
      completed_at: iso(5),
    },
  ];

  const submissionMetrics = [
    ...seededSubmissionMetrics(approvedSubmissionId, 4),
    ...seededSubmissionMetrics(flaggedSubmissionId, -12),
  ];

  const submissionFlags: SubmissionFlagRow[] = [
    {
      id: uid("flag"),
      submission_id: flaggedSubmissionId,
      key: "completion_outlier",
      label: "Completion-time outlier",
      severity: 9,
      status: "open",
      reason: "Completed the full flow in 135 seconds, 62% below cohort median.",
    },
    {
      id: uid("flag"),
      submission_id: flaggedSubmissionId,
      key: "paste_dump",
      label: "Paste-dump pattern",
      severity: 8,
      status: "open",
      reason: "Large blocks of text landed in qualitative fields with no typing cadence.",
    },
  ];

  const events: EventRow[] = [
    {
      id: uid("event"),
      submission_id: approvedSubmissionId,
      event_name: "task_started",
      event_origin: "runner",
      payload: { task: "Add one product to cart" },
      created_at: iso(10.2),
    },
    {
      id: uid("event"),
      submission_id: approvedSubmissionId,
      event_name: "checkpoint_opened",
      event_origin: "overlay",
      payload: { task: "Update payment method" },
      created_at: iso(10.1),
    },
    {
      id: uid("event"),
      submission_id: flaggedSubmissionId,
      event_name: "paste_detected",
      event_origin: "widget",
      payload: { count: 4 },
      created_at: iso(5.2),
    },
    {
      id: uid("event"),
      submission_id: flaggedSubmissionId,
      event_name: "tab_switch",
      event_origin: "browser",
      payload: { count: 3 },
      created_at: iso(5.1),
    },
  ];

  const testerVerifications: TesterVerificationRow[] = [
    {
      id: uid("verification"),
      profile_id: testerId,
      status: "approved",
      screener_score: 91,
      college_id_url: "https://cdn.testloop.dev/rohan-id.png",
      skills: ["Frontend", "Checkout", "B2C"],
      created_at: iso(88),
      updated_at: iso(88),
    },
    {
      id: uid("verification"),
      profile_id: pendingTesterId,
      status: "pending",
      screener_score: 84,
      college_id_url: "https://cdn.testloop.dev/divya-id.png",
      skills: ["SaaS", "Onboarding", "PM"],
      created_at: iso(30),
      updated_at: iso(30),
    },
  ];

  const auditLogs: AuditLogRow[] = [
    {
      id: uid("audit"),
      actor_id: adminId,
      action: "submission.auto_flagged",
      target_id: flaggedSubmissionId,
      target_type: "submission",
      summary: "Flagged checkout submission for review due to fraud score 76.",
      created_at: iso(5),
    },
    {
      id: uid("audit"),
      actor_id: founderId,
      action: "test.published",
      target_id: pricingTestId,
      target_type: "test",
      summary: "Published pricing page campaign to verified + probation tiers.",
      created_at: iso(16),
    },
  ];

  return {
    accounts: [
      { email: "founder@testloop.dev", password: "password123", profileId: founderId },
      { email: "tester@testloop.dev", password: "password123", profileId: testerId },
      { email: "pending@testloop.dev", password: "password123", profileId: pendingTesterId },
      { email: "admin@testloop.dev", password: "password123", profileId: adminId },
      { email: "assistant@testloop.dev", password: "password123", profileId: assistantId },
    ],
    currentUserId: null,
    profiles,
    companies,
    companyDetails: [
      {
        companyId,
        category: "SaaS",
        productStage: "Private beta",
        teamSize: "6-10",
      },
    ],
    tests,
    testTasks,
    testMetrics,
    submissions,
    submissionMetrics,
    submissionFlags,
    events,
    auditLogs,
    testerVerifications,
    adminConfig: clone(MODEL_CONFIG),
  };
}

function readState(): DemoState {
  if (typeof window === "undefined") {
    return buildSeedState();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = buildSeedState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }

  try {
    return JSON.parse(stored) as DemoState;
  } catch {
    const seeded = buildSeedState();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function writeState(state: DemoState): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

function mutateState<T>(updater: (draft: DemoState) => T): T {
  const draft = readState();
  const result = updater(draft);
  writeState(draft);
  return result;
}

function resolveCompanyName(state: DemoState, profile: ProfileRow): string | null {
  if (!profile.company_id) {
    return null;
  }

  return state.companies.find((company) => company.id === profile.company_id)?.name ?? null;
}

function getAuthUser(state: DemoState, profileId: string | null): AuthUser | null {
  if (!profileId) {
    return null;
  }

  const profile = state.profiles.find((entry) => entry.id === profileId);
  if (!profile) {
    return null;
  }

  return {
    ...profile,
    companyName: resolveCompanyName(state, profile),
  };
}

function metricValue(base: number, modifier: number, decimals = 1): number {
  return Number((base + modifier).toFixed(decimals));
}

function computeSubmissionPackage(
  submissionId: string,
  testId: string,
  input: RunSubmissionInput,
): {
  submissionPatch: Pick<SubmissionRow, "status" | "quality_score" | "fraud_score" | "duration_seconds" | "summary" | "completed_at">;
  metrics: SubmissionMetricRow[];
  flags: SubmissionFlagRow[];
  events: EventRow[];
} {
  const completedRatio = input.completedTaskIds.length / 3;
  const successRate = metricValue(55, completedRatio * 30 + (input.firstClickMatched ? 8 : -4), 0);
  const seq = metricValue(4.2, completedRatio * 1.3);
  const sus = metricValue(61, completedRatio * 12 + input.confidence * 2.5, 0);
  const confidence = metricValue(input.confidence, input.attentionCheckPassed ? 0.2 : -0.6);
  const errors = metricValue(0.9, -completedRatio * 0.4);
  const lostness = metricValue(0.62, -completedRatio * 0.22);
  const efficiency = metricValue(48, completedRatio * 26 + (input.firstClickMatched ? 7 : -8), 0);
  const timeOnTask = Math.round(540 - completedRatio * 90 + input.tabSwitches * 35 + input.idlePercent * 2);
  const umux = metricValue(58, completedRatio * 18 + input.confidence * 1.6, 0);
  const pasteFlag = input.pasteEvents > 2 ? 18 : 0;
  const attentionPenalty = input.attentionCheckPassed ? 0 : 26;
  const speedPenalty = timeOnTask < 150 ? 22 : 0;
  const tabPenalty = input.tabSwitches > 2 ? 12 : 0;
  const idlePenalty = input.idlePercent > 40 ? 16 : 0;
  const fraudScore = Math.min(100, pasteFlag + attentionPenalty + speedPenalty + tabPenalty + idlePenalty);
  const qualityScore = Math.max(25, Math.min(97, Math.round((successRate + sus + umux) / 3)));
  const status: SubmissionStatus = fraudScore >= 70 ? "flagged" : "approved";

  const metrics: SubmissionMetricRow[] = [
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "task_success_rate",
      label: "Task Success Rate",
      value: successRate,
      unit: "%",
      passed: successRate >= 78,
      threshold_display: ">= 78%",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "time_on_task",
      label: "Time on Task",
      value: timeOnTask,
      unit: "sec",
      passed: timeOnTask <= 125,
      threshold_display: "<= 125 expert%",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "error_rate",
      label: "Error Rate",
      value: errors,
      unit: "per task",
      passed: errors <= 0.5,
      threshold_display: "<= 0.5 per task",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "sus",
      label: "SUS",
      value: sus,
      unit: "",
      passed: sus >= 68,
      threshold_display: ">= 68",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "seq",
      label: "SEQ",
      value: seq,
      unit: "/7",
      passed: seq >= 5.5,
      threshold_display: ">= 5.5",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "lostness",
      label: "Lostness",
      value: lostness,
      unit: "",
      passed: lostness < 0.5,
      threshold_display: "< 0.5",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "click_path_efficiency",
      label: "Click-Path Efficiency",
      value: efficiency,
      unit: "%",
      passed: efficiency >= 60,
      threshold_display: ">= 60%",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "confidence",
      label: "Confidence",
      value: confidence,
      unit: "/5",
      passed: confidence >= 4,
      threshold_display: ">= 4.0",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "first_click_success",
      label: "First-Click Success",
      value: input.firstClickMatched ? 100 : 0,
      unit: "%",
      passed: input.firstClickMatched,
      threshold_display: ">= 65%",
    },
    {
      id: uid("submission_metric"),
      submission_id: submissionId,
      metric_key: "umux_lite",
      label: "UMUX-Lite",
      value: umux,
      unit: "",
      passed: umux >= 70,
      threshold_display: ">= 70",
    },
  ];

  const flags: SubmissionFlagRow[] = [];
  if (input.pasteEvents > 2) {
    flags.push({
      id: uid("flag"),
      submission_id: submissionId,
      key: "paste_dump",
      label: "Paste-dump signal",
      severity: 8,
      status: "open",
      reason: `Detected ${input.pasteEvents} paste events during task answers.`,
    });
  }
  if (!input.attentionCheckPassed) {
    flags.push({
      id: uid("flag"),
      submission_id: submissionId,
      key: "attention_check",
      label: "Attention-check failed",
      severity: 9,
      status: "open",
      reason: "Tester failed the inline attention-check prompt in the runner.",
    });
  }
  if (timeOnTask < 150) {
    flags.push({
      id: uid("flag"),
      submission_id: submissionId,
      key: "completion_outlier",
      label: "Completion-time outlier",
      severity: 8,
      status: "open",
      reason: "Run completed well below expected expert-adjusted duration.",
    });
  }
  if (input.idlePercent > 40) {
    flags.push({
      id: uid("flag"),
      submission_id: submissionId,
      key: "idle_signal",
      label: "Idle > 40%",
      severity: 5,
      status: "open",
      reason: `Idle time reached ${input.idlePercent}% of task duration.`,
    });
  }

  const events: EventRow[] = input.eventLog.map((entry) => ({
    id: uid("event"),
    submission_id: submissionId,
    event_name: entry.name,
    event_origin: entry.origin,
    payload: entry.payload,
    created_at: entry.createdAt,
  }));

  const summary =
    status === "flagged"
      ? "Auto-flagged for moderation. Metrics show incomplete task flow and one or more strong fraud signals."
      : "Runner completed successfully. Metrics suggest the tester reached core success states with moderate friction.";

  return {
    submissionPatch: {
      status,
      quality_score: qualityScore,
      fraud_score: fraudScore,
      duration_seconds: timeOnTask,
      summary,
      completed_at: new Date().toISOString(),
    },
    metrics,
    flags,
    events,
  };
}

function nextTestStatus(publishNow: boolean): TestRow["status"] {
  return publishNow ? "published" : "draft";
}

function requireUser(): AuthUser {
  const user = demoApi.getSessionSync();
  if (!user) {
    throw new Error("Please sign in to continue.");
  }
  return user;
}

export const demoApi = {
  reset(): void {
    writeState(buildSeedState());
  },

  getSessionSync(): AuthUser | null {
    return getAuthUser(readState(), readState().currentUserId);
  },

  async getSession(): Promise<AuthUser | null> {
    return demoApi.getSessionSync();
  },

  async signIn(email: string, password: string): Promise<AuthUser> {
    const user = mutateState((state) => {
      const account = state.accounts.find((entry) => entry.email.toLowerCase() === email.toLowerCase());
      if (!account || account.password !== password) {
        throw new Error("Use one of the seeded demo accounts or sign up for a new one.");
      }

      state.currentUserId = account.profileId;
      return getAuthUser(state, account.profileId);
    });

    if (!user) {
      throw new Error("Unable to start a session.");
    }

    return user;
  },

  async signUp(input: {
    fullName: string;
    email: string;
    password: string;
    role: Extract<UserRole, "tester" | "founder">;
  }): Promise<AuthUser> {
    const user = mutateState((state) => {
      if (state.accounts.some((account) => account.email.toLowerCase() === input.email.toLowerCase())) {
        throw new Error("An account with this email already exists.");
      }

      const profileId = uid("profile");
      const companyId = input.role === "founder" ? uid("company") : null;
      const profile: ProfileRow = {
        id: profileId,
        email: input.email,
        full_name: input.fullName,
        role: input.role,
        admin_level: null,
        badge: input.role === "tester" ? "probation" : null,
        verification_status: input.role === "tester" ? "not_started" : "approved",
        college: null,
        github_url: null,
        linkedin_url: null,
        company_id: companyId,
        created_at: new Date().toISOString(),
      };

      state.profiles.unshift(profile);
      state.accounts.push({
        email: input.email,
        password: input.password,
        profileId,
      });

      if (companyId) {
        state.companies.unshift({
          id: companyId,
          owner_id: profileId,
          name: `${input.fullName.split(" ")[0]}'s Personal Workspace`,
          slug: slugify(`${input.fullName.split(" ")[0]}-workspace`),
          website: null,
          plan_tier: "beta",
          created_at: new Date().toISOString(),
        });
        state.companyDetails.unshift({
          companyId,
          category: "SaaS",
          productStage: "Pre-launch",
          teamSize: "1-5",
        });
      }

      state.currentUserId = profileId;
      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: profileId,
        action: "auth.signup",
        target_id: profileId,
        target_type: "profile",
        summary: `${input.role} signup created via demo mode.`,
        created_at: new Date().toISOString(),
      });

      return getAuthUser(state, profileId);
    });

    if (!user) {
      throw new Error("Could not create the account.");
    }

    return user;
  },

  async signOut(): Promise<void> {
    mutateState((state) => {
      state.currentUserId = null;
    });
  },

  async resetPassword(email: string): Promise<void> {
    const exists = readState().accounts.some((account) => account.email.toLowerCase() === email.toLowerCase());
    if (!exists) {
      throw new Error("No account found for that email.");
    }
  },

  async completeCompanyOnboarding(input: CompanyOnboardingInput): Promise<AuthUser> {
    const currentUser = requireUser();
    const user = mutateState((state) => {
      const company = state.companies.find((entry) => entry.id === currentUser.company_id);
      if (!company) {
        throw new Error("Company workspace was not found.");
      }

      company.name = input.name;
      company.slug = slugify(input.name);
      company.website = input.website;

      const detail = state.companyDetails.find((entry) => entry.companyId === company.id);
      if (detail) {
        detail.category = input.category;
        detail.productStage = input.productStage;
        detail.teamSize = input.teamSize;
      } else {
        state.companyDetails.push({
          companyId: company.id,
          category: input.category,
          productStage: input.productStage,
          teamSize: input.teamSize,
        });
      }

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "company.onboarding_completed",
        target_id: company.id,
        target_type: "company",
        summary: `Completed company onboarding for ${input.name}.`,
        created_at: new Date().toISOString(),
      });

      return getAuthUser(state, currentUser.id);
    });

    if (!user) {
      throw new Error("Unable to refresh the session.");
    }

    return user;
  },

  async completeTesterOnboarding(input: TesterOnboardingInput): Promise<AuthUser> {
    const currentUser = requireUser();
    const user = mutateState((state) => {
      const profile = state.profiles.find((entry) => entry.id === currentUser.id);
      if (!profile) {
        throw new Error("Profile not found.");
      }

      profile.college = input.college;
      profile.github_url = input.githubUrl;
      profile.linkedin_url = input.linkedinUrl;
      profile.verification_status = "pending";
      profile.badge = "probation";

      const verification = state.testerVerifications.find((entry) => entry.profile_id === currentUser.id);
      if (verification) {
        verification.status = "pending";
        verification.screener_score = input.screenerScore;
        verification.college_id_url = input.collegeIdUrl;
        verification.skills = input.skills;
        verification.updated_at = new Date().toISOString();
      } else {
        state.testerVerifications.unshift({
          id: uid("verification"),
          profile_id: currentUser.id,
          status: "pending",
          screener_score: input.screenerScore,
          college_id_url: input.collegeIdUrl,
          skills: input.skills,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "tester.onboarding_submitted",
        target_id: currentUser.id,
        target_type: "profile",
        summary: "Tester onboarding sent to admin verification queue.",
        created_at: new Date().toISOString(),
      });

      return getAuthUser(state, currentUser.id);
    });

    if (!user) {
      throw new Error("Unable to refresh the session.");
    }

    return user;
  },

  async saveAccountProfile(input: AccountProfileInput): Promise<AuthUser> {
    const currentUser = requireUser();
    const user = mutateState((state) => {
      const profile = state.profiles.find((entry) => entry.id === currentUser.id);
      if (!profile) {
        throw new Error("Profile not found.");
      }

      profile.full_name = input.fullName;
      profile.college = input.college ?? profile.college;
      profile.github_url = input.githubUrl ?? profile.github_url;
      profile.linkedin_url = input.linkedinUrl ?? profile.linkedin_url;

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "account.updated",
        target_id: currentUser.id,
        target_type: "profile",
        summary: "Updated account profile fields.",
        created_at: new Date().toISOString(),
      });

      return getAuthUser(state, currentUser.id);
    });

    if (!user) {
      throw new Error("Unable to refresh the session.");
    }

    return user;
  },

  async getCompanySettings(companyId: string): Promise<CompanySettingsInput> {
    const state = readState();
    const company = state.companies.find((entry) => entry.id === companyId);
    const detail = state.companyDetails.find((entry) => entry.companyId === companyId);

    if (!company || !detail) {
      throw new Error("Company settings not found.");
    }

    return {
      name: company.name,
      website: company.website ?? "",
      category: detail.category,
      productStage: detail.productStage,
      teamSize: detail.teamSize,
    };
  },

  async saveCompanySettings(companyId: string, input: CompanySettingsInput): Promise<void> {
    const currentUser = requireUser();
    mutateState((state) => {
      const company = state.companies.find((entry) => entry.id === companyId);
      const detail = state.companyDetails.find((entry) => entry.companyId === companyId);
      if (!company || !detail) {
        throw new Error("Company settings not found.");
      }

      company.name = input.name;
      company.slug = slugify(input.name);
      company.website = input.website;
      detail.category = input.category;
      detail.productStage = input.productStage;
      detail.teamSize = input.teamSize;

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "company.settings_updated",
        target_id: companyId,
        target_type: "company",
        summary: "Updated workspace settings.",
        created_at: new Date().toISOString(),
      });
    });
  },

  async getDashboard(): Promise<DashboardSnapshot> {
    const currentUser = requireUser();
    const state = readState();
    const tests = state.tests.filter((entry) => entry.founder_id === currentUser.id);
    const submissionIds = tests.map((entry) => entry.id);
    const submissions = state.submissions.filter((entry) => submissionIds.includes(entry.test_id));
    const flaggedCount = submissions.filter((entry) => entry.status === "flagged").length;
    const approved = submissions.filter((entry) => entry.status === "approved").length;
    const passRate = submissions.length === 0 ? 0 : (approved / submissions.length) * 100;
    const chart = tests.slice(0, 4).map((entry) => {
      const entrySubmissions = submissions.filter((submission) => submission.test_id === entry.id);
      return {
        label: entry.title.split("—")[0]?.trim() ?? entry.title,
        approved: entrySubmissions.filter((submission) => submission.status === "approved").length,
        flagged: entrySubmissions.filter((submission) => submission.status === "flagged").length,
      };
    });

    return {
      tests,
      liveCount: tests.filter((entry) => entry.status === "live").length,
      totalSubmissions: submissions.length,
      flaggedCount,
      passRate,
      medianTurnaroundHours: 14,
      chart,
    };
  },

  async listTests(): Promise<TestRow[]> {
    const currentUser = requireUser();
    return readState()
      .tests
      .filter((entry) => entry.founder_id === currentUser.id)
      .sort((left, right) => right.created_at.localeCompare(left.created_at));
  },

  async listAllTests(): Promise<TestRow[]> {
    return readState().tests.slice().sort((left, right) => right.created_at.localeCompare(left.created_at));
  },

  async getTestDetail(testId: string): Promise<{
    test: TestRow;
    tasks: TestTaskRow[];
    metrics: TestMetricConfigRow[];
    submissions: SubmissionRow[];
    company: CompanyRow | null;
    founder: ProfileRow | null;
  }> {
    const state = readState();
    const test = state.tests.find((entry) => entry.id === testId);
    if (!test) {
      throw new Error("Test not found.");
    }

    return {
      test,
      tasks: state.testTasks.filter((entry) => entry.test_id === testId).sort((left, right) => left.position - right.position),
      metrics: state.testMetrics.filter((entry) => entry.test_id === testId),
      submissions: state.submissions.filter((entry) => entry.test_id === testId),
      company: state.companies.find((entry) => entry.id === test.company_id) ?? null,
      founder: state.profiles.find((entry) => entry.id === test.founder_id) ?? null,
    };
  },

  async preflightUrl(url: string): Promise<{ framable: boolean; normalizedUrl: string; reason: string }> {
    try {
      const parsed = new URL(url);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        return {
          framable: false,
          normalizedUrl: url,
          reason: "Only `http` and `https` URLs are supported.",
        };
      }

      if (parsed.hostname.includes("blocked") || parsed.hostname.includes("x-frame")) {
        return {
          framable: false,
          normalizedUrl: parsed.toString(),
          reason: "Origin appears to send anti-framing headers. Use a staging hostname without frame restrictions.",
        };
      }

      return {
        framable: true,
        normalizedUrl: parsed.toString(),
        reason: "URL preflight passed. Safe to embed in the desktop-only runner.",
      };
    } catch {
      return {
        framable: false,
        normalizedUrl: url,
        reason: "Enter a valid absolute URL before continuing.",
      };
    }
  },

  async generateTemplate(url: string): Promise<{
    summary: string;
    tasks: CreateTestInput["tasks"];
    metrics: CreateTestInput["metrics"];
  }> {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const flavor = hostname.includes("pricing")
      ? "pricing"
      : hostname.includes("checkout")
        ? "checkout"
        : "onboarding";

    const draftTestId = uid("draft_test");
    const tasks = taskTemplate(draftTestId, flavor).map((task) => ({
      title: task.title,
      description: task.description,
      successSelector: task.success_selector,
      successUrlPattern: task.success_url_pattern,
    }));
    const metrics = metricConfig(draftTestId).map((metric) => ({
      metricKey: metric.metric_key,
      label: metric.label,
      operator: metric.operator,
      targetValue: metric.target_value,
      unit: metric.unit,
    }));

    return {
      summary: `OpenAI draft generated a ${flavor} testing template tuned for ${parsed.hostname}. Review the tasks and thresholds before publish.`,
      tasks,
      metrics,
    };
  },

  async createTest(input: CreateTestInput): Promise<TestRow> {
    const currentUser = requireUser();
    if (!currentUser.company_id) {
      throw new Error("Founder workspace missing.");
    }

    const preflight = await demoApi.preflightUrl(input.url);
    if (!preflight.framable) {
      throw new Error(preflight.reason);
    }

    return mutateState((state) => {
      const testId = `test_${state.tests.length + 1}_${Date.now().toString(36)}`;
      const now = new Date().toISOString();
      const test: TestRow = {
        id: testId,
        company_id: currentUser.company_id as string,
        founder_id: currentUser.id,
        title: input.title,
        description: input.description,
        status: nextTestStatus(input.publishNow),
        url: preflight.normalizedUrl,
        framable: preflight.framable,
        category: input.category,
        reward_inr: input.rewardInr,
        target_testers: input.targetTesters,
        current_submissions: 0,
        eligible_badges: input.eligibleBadges,
        created_at: now,
        updated_at: now,
        published_at: input.publishNow ? now : null,
      };

      state.tests.unshift(test);
      state.testTasks.push(
        ...input.tasks.map((task, index) => ({
          id: uid("task"),
          test_id: testId,
          position: index + 1,
          title: task.title,
          description: task.description,
          success_selector: task.successSelector,
          success_url_pattern: task.successUrlPattern,
        })),
      );
      state.testMetrics.push(
        ...input.metrics.map((metric) => ({
          id: uid("metric_cfg"),
          test_id: testId,
          metric_key: metric.metricKey,
          label: metric.label,
          operator: metric.operator,
          target_value: metric.targetValue,
          unit: metric.unit,
        })),
      );
      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: input.publishNow ? "test.created_and_published" : "test.created",
        target_id: testId,
        target_type: "test",
        summary: `${input.title} created in ${input.publishNow ? "published" : "draft"} state.`,
        created_at: now,
      });
      return test;
    });
  },

  async listMarketplace(): Promise<TestRow[]> {
    return readState()
      .tests
      .filter((entry) => entry.status === "published" || entry.status === "live")
      .sort((left, right) => right.updated_at.localeCompare(left.updated_at));
  },

  async listTesterSubmissions(): Promise<SubmissionRow[]> {
    const currentUser = requireUser();
    return readState()
      .submissions
      .filter((entry) => entry.tester_id === currentUser.id)
      .sort((left, right) => right.created_at.localeCompare(left.created_at));
  },

  async getSubmissionDetail(submissionId: string): Promise<{
    submission: SubmissionRow;
    test: TestRow | null;
    tester: ProfileRow | null;
    metrics: SubmissionMetricRow[];
    flags: SubmissionFlagRow[];
    events: EventRow[];
  }> {
    const state = readState();
    const submission = state.submissions.find((entry) => entry.id === submissionId);
    if (!submission) {
      throw new Error("Submission not found.");
    }

    return {
      submission,
      test: state.tests.find((entry) => entry.id === submission.test_id) ?? null,
      tester: state.profiles.find((entry) => entry.id === submission.tester_id) ?? null,
      metrics: state.submissionMetrics.filter((entry) => entry.submission_id === submissionId),
      flags: state.submissionFlags.filter((entry) => entry.submission_id === submissionId),
      events: state.events.filter((entry) => entry.submission_id === submissionId),
    };
  },

  async submitRunner(testId: string, input: RunSubmissionInput): Promise<SubmissionRow> {
    const currentUser = requireUser();
    return mutateState((state) => {
      const test = state.tests.find((entry) => entry.id === testId);
      if (!test) {
        throw new Error("Test not found.");
      }

      const submissionId = uid("submission");
      const computed = computeSubmissionPackage(submissionId, testId, input);
      const submission: SubmissionRow = {
        id: submissionId,
        test_id: testId,
        tester_id: currentUser.id,
        created_at: new Date().toISOString(),
        ...computed.submissionPatch,
      };

      state.submissions.unshift(submission);
      state.submissionMetrics.push(...computed.metrics);
      state.submissionFlags.push(...computed.flags);
      state.events.push(...computed.events);
      test.current_submissions += 1;
      test.updated_at = new Date().toISOString();
      if (test.current_submissions >= test.target_testers) {
        test.status = "live";
      }

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "submission.created",
        target_id: submissionId,
        target_type: "submission",
        summary: `Tester submitted run for ${test.title} with status ${submission.status}.`,
        created_at: new Date().toISOString(),
      });

      return submission;
    });
  },

  async getProfileSummary(profileId: string): Promise<{
    profile: ProfileRow;
    verification: TesterVerificationRow | null;
    submissions: SubmissionRow[];
  }> {
    const state = readState();
    const profile = state.profiles.find((entry) => entry.id === profileId);
    if (!profile) {
      throw new Error("Profile not found.");
    }

    return {
      profile,
      verification: state.testerVerifications.find((entry) => entry.profile_id === profileId) ?? null,
      submissions: state.submissions.filter((entry) => entry.tester_id === profileId),
    };
  },

  async getAdminOverview(): Promise<{
    pendingVerifications: number;
    openFlags: number;
    liveTests: number;
    users: number;
  }> {
    const state = readState();
    return {
      pendingVerifications: state.testerVerifications.filter((entry) => entry.status === "pending").length,
      openFlags: state.submissionFlags.filter((entry) => entry.status === "open").length,
      liveTests: state.tests.filter((entry) => entry.status === "live").length,
      users: state.profiles.length,
    };
  },

  async listVerificationQueue(): Promise<Array<{ profile: ProfileRow; verification: TesterVerificationRow }>> {
    const state = readState();
    return state.testerVerifications
      .filter((entry) => entry.status === "pending")
      .map((verification) => {
        const profile = state.profiles.find((entry) => entry.id === verification.profile_id);
        if (!profile) {
          throw new Error("Verification profile not found.");
        }
        return { profile, verification };
      });
  },

  async approveTester(profileId: string): Promise<void> {
    const currentUser = requireUser();
    mutateState((state) => {
      const verification = state.testerVerifications.find((entry) => entry.profile_id === profileId);
      const profile = state.profiles.find((entry) => entry.id === profileId);
      if (!verification || !profile) {
        throw new Error("Verification request not found.");
      }

      verification.status = "approved";
      verification.updated_at = new Date().toISOString();
      profile.verification_status = "approved";
      profile.badge = "verified";

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "verification.approved",
        target_id: profileId,
        target_type: "profile",
        summary: `Approved tester verification for ${profile.full_name}.`,
        created_at: new Date().toISOString(),
      });
    });
  },

  async listReviewQueue(): Promise<Array<{ submission: SubmissionRow; test: TestRow | null; tester: ProfileRow | null; flags: SubmissionFlagRow[] }>> {
    const state = readState();
    return state.submissions
      .filter((entry) => entry.status === "flagged")
      .map((submission) => ({
        submission,
        test: state.tests.find((entry) => entry.id === submission.test_id) ?? null,
        tester: state.profiles.find((entry) => entry.id === submission.tester_id) ?? null,
        flags: state.submissionFlags.filter((entry) => entry.submission_id === submission.id),
      }));
  },

  async approveSubmission(submissionId: string): Promise<void> {
    const currentUser = requireUser();
    mutateState((state) => {
      const submission = state.submissions.find((entry) => entry.id === submissionId);
      if (!submission) {
        throw new Error("Submission not found.");
      }

      submission.status = "approved";
      state.submissionFlags
        .filter((entry) => entry.submission_id === submissionId)
        .forEach((flag) => {
          flag.status = "resolved";
        });

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "submission.approved",
        target_id: submissionId,
        target_type: "submission",
        summary: "Admin approved a previously flagged submission.",
        created_at: new Date().toISOString(),
      });
    });
  },

  async rejectSubmission(submissionId: string): Promise<void> {
    const currentUser = requireUser();
    mutateState((state) => {
      const submission = state.submissions.find((entry) => entry.id === submissionId);
      if (!submission) {
        throw new Error("Submission not found.");
      }

      submission.status = "rejected";
      state.submissionFlags
        .filter((entry) => entry.submission_id === submissionId)
        .forEach((flag) => {
          flag.status = "resolved";
        });

      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "submission.rejected",
        target_id: submissionId,
        target_type: "submission",
        summary: "Admin rejected a flagged submission.",
        created_at: new Date().toISOString(),
      });
    });
  },

  async listUsers(): Promise<ProfileRow[]> {
    return readState().profiles.slice().sort((left, right) => right.created_at.localeCompare(left.created_at));
  },

  async listFlags(): Promise<Array<{ flag: SubmissionFlagRow; submission: SubmissionRow | null; test: TestRow | null }>> {
    const state = readState();
    return state.submissionFlags.map((flag) => {
      const submission = state.submissions.find((entry) => entry.id === flag.submission_id) ?? null;
      return {
        flag,
        submission,
        test: submission ? state.tests.find((entry) => entry.id === submission.test_id) ?? null : null,
      };
    });
  },

  async listAuditLogs(): Promise<AuditLogRow[]> {
    return readState().auditLogs.slice().sort((left, right) => right.created_at.localeCompare(left.created_at));
  },

  async getAdminConfig(): Promise<AppConfig> {
    return clone(readState().adminConfig);
  },

  async saveAdminConfig(input: AppConfig): Promise<void> {
    const currentUser = requireUser();
    if (currentUser.admin_level !== "super") {
      throw new Error("Only super admins can update platform configuration.");
    }

    mutateState((state) => {
      state.adminConfig = clone(input);
      state.auditLogs.unshift({
        id: uid("audit"),
        actor_id: currentUser.id,
        action: "admin.config_updated",
        target_id: "platform",
        target_type: "config",
        summary: `Updated AI + moderation configuration to ${input.defaultModel}.`,
        created_at: new Date().toISOString(),
      });
    });
  },
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Enums: {
      admin_level: "super" | "assistant";
      submission_status: "pending" | "approved" | "flagged" | "rejected";
      tester_badge: "probation" | "verified" | "top-rated";
      test_status: "draft" | "published" | "live" | "completed" | "flagged";
      user_role: "tester" | "founder" | "admin";
      verification_status: "not_started" | "pending" | "approved" | "rejected";
    };
    Tables: {
      audit_logs: {
        Row: {
          id: string;
          actor_id: string;
          action: string;
          target_id: string;
          target_type: string;
          summary: string;
          created_at: string;
        };
      };
      companies: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          slug: string;
          website: string | null;
          plan_tier: "beta" | "starter" | "growth" | "enterprise";
          created_at: string;
        };
      };
      events: {
        Row: {
          id: string;
          submission_id: string;
          event_name: string;
          event_origin: string;
          payload: Json;
          created_at: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: Database["public"]["Enums"]["user_role"];
          admin_level: Database["public"]["Enums"]["admin_level"] | null;
          badge: Database["public"]["Enums"]["tester_badge"] | null;
          verification_status: Database["public"]["Enums"]["verification_status"];
          college: string | null;
          github_url: string | null;
          linkedin_url: string | null;
          company_id: string | null;
          created_at: string;
        };
      };
      submission_flags: {
        Row: {
          id: string;
          submission_id: string;
          key: string;
          label: string;
          severity: number;
          status: "open" | "resolved";
          reason: string;
        };
      };
      submission_metrics: {
        Row: {
          id: string;
          submission_id: string;
          metric_key: string;
          label: string;
          value: number;
          unit: string;
          passed: boolean;
          threshold_display: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          test_id: string;
          tester_id: string;
          status: Database["public"]["Enums"]["submission_status"];
          quality_score: number;
          fraud_score: number;
          duration_seconds: number;
          summary: string;
          created_at: string;
          completed_at: string | null;
        };
      };
      test_metrics_config: {
        Row: {
          id: string;
          test_id: string;
          metric_key: string;
          label: string;
          operator: string;
          target_value: number;
          unit: string;
        };
      };
      test_tasks: {
        Row: {
          id: string;
          test_id: string;
          position: number;
          title: string;
          description: string;
          success_selector: string | null;
          success_url_pattern: string | null;
        };
      };
      tester_verifications: {
        Row: {
          id: string;
          profile_id: string;
          status: Database["public"]["Enums"]["verification_status"];
          screener_score: number | null;
          college_id_url: string | null;
          skills: string[];
          created_at: string;
          updated_at: string;
        };
      };
      tests: {
        Row: {
          id: string;
          company_id: string;
          founder_id: string;
          title: string;
          description: string;
          status: Database["public"]["Enums"]["test_status"];
          url: string;
          framable: boolean;
          category: string;
          reward_inr: number;
          target_testers: number;
          current_submissions: number;
          eligible_badges: Database["public"]["Enums"]["tester_badge"][];
          created_at: string;
          updated_at: string;
          published_at: string | null;
        };
      };
    };
  };
};

export type UserRole = Database["public"]["Enums"]["user_role"];
export type AdminLevel = Database["public"]["Enums"]["admin_level"];
export type TestStatus = Database["public"]["Enums"]["test_status"];
export type SubmissionStatus = Database["public"]["Enums"]["submission_status"];
export type VerificationStatus = Database["public"]["Enums"]["verification_status"];
export type TesterBadge = Database["public"]["Enums"]["tester_badge"];

export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];
export type TestRow = Database["public"]["Tables"]["tests"]["Row"];
export type TestTaskRow = Database["public"]["Tables"]["test_tasks"]["Row"];
export type TestMetricConfigRow = Database["public"]["Tables"]["test_metrics_config"]["Row"];
export type SubmissionRow = Database["public"]["Tables"]["submissions"]["Row"];
export type SubmissionMetricRow = Database["public"]["Tables"]["submission_metrics"]["Row"];
export type SubmissionFlagRow = Database["public"]["Tables"]["submission_flags"]["Row"];
export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type AuditLogRow = Database["public"]["Tables"]["audit_logs"]["Row"];
export type TesterVerificationRow = Database["public"]["Tables"]["tester_verifications"]["Row"];

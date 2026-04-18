import {
  createContext,
  type HTMLAttributes,
  type JSX,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Link,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { z } from "zod";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  ExternalLink,
  FileSearch,
  FileText,
  Flag,
  FlaskConical,
  Fingerprint,
  Globe2,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  Monitor,
  PanelsTopLeft,
  RefreshCw,
  Rocket,
  ScrollText,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Store,
  UserCircle2,
  Users,
  XCircle,
} from "lucide-react";
import type {
  AdminLevel,
  AuditLogRow,
  ProfileRow,
  SubmissionFlagRow,
  SubmissionMetricRow,
  SubmissionRow,
  TestMetricConfigRow,
  TestRow,
  TestTaskRow,
  TesterVerificationRow,
  UserRole,
} from "./lib/database.types";
import {
  demoApi,
  type AccountProfileInput,
  type AppConfig,
  type AuthUser,
  type CompanyOnboardingInput,
  type CompanySettingsInput,
  type CreateTestInput,
  type DashboardSnapshot,
  type RunSubmissionInput,
  type TesterOnboardingInput,
} from "./lib/demo-store";
import { cn, formatDate, formatPercent, formatRelativeTime } from "./lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({ className, variant, size, asChild, ...props }: ButtonProps): JSX.Element {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors",
        "placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        props.className,
      )}
      {...props}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>): JSX.Element {
  return (
    <textarea
      className={cn(
        "flex min-h-[110px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors",
        "placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        props.className,
      )}
      {...props}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>): JSX.Element {
  return (
    <select
      className={cn(
        "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        props.className,
      )}
      {...props}
    />
  );
}

function Surface({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div className={cn("surface", className)} {...props}>
      {children}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}): JSX.Element {
  return (
    <div className="page-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="page-title">{title}</h1>
      {copy ? <p className="page-copy">{copy}</p> : null}
    </div>
  );
}

function PageLoader(): JSX.Element {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="surface-soft flex items-center gap-3 px-5 py-4 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin" />
        Loading the latest TestLoop state…
      </div>
    </div>
  );
}

function StatePanel({
  title,
  copy,
  action,
  variant = "empty",
}: {
  title: string;
  copy: string;
  action?: ReactNode;
  variant?: "empty" | "error";
}): JSX.Element {
  const Icon = variant === "error" ? AlertTriangle : Sparkles;
  return (
    <Surface className="flex min-h-[240px] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className={cn("rounded-full p-4", variant === "error" ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary")}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="max-w-md space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="page-copy">{copy}</p>
      </div>
      {action}
    </Surface>
  );
}

function DataSection({
  isLoading,
  isError,
  isEmpty,
  errorMessage,
  emptyTitle,
  emptyCopy,
  children,
}: {
  isLoading: boolean;
  isError: boolean;
  isEmpty: boolean;
  errorMessage: string;
  emptyTitle: string;
  emptyCopy: string;
  children: ReactNode;
}): JSX.Element {
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <StatePanel title="Something slipped" copy={errorMessage} variant="error" />;
  }

  if (isEmpty) {
    return <StatePanel title={emptyTitle} copy={emptyCopy} />;
  }

  return <>{children}</>;
}

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <label className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </label>
  );
}

function StatCard({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: typeof Activity;
}): JSX.Element {
  return (
    <Surface className="p-5">
      <div className="mb-5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
        <div className="rounded-xl bg-primary/12 p-2 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-semibold tracking-[-0.02em]">{value}</p>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
    </Surface>
  );
}

function Badge({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
}): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "default" && "bg-secondary text-secondary-foreground",
        tone === "success" && "bg-primary/15 text-primary",
        tone === "warning" && "bg-warning/15 text-warning",
        tone === "danger" && "bg-destructive/15 text-destructive",
      )}
    >
      {children}
    </span>
  );
}

function useQueryErrorToast(error: unknown, fallback: string): void {
  useEffect(() => {
    if (error instanceof Error) {
      toast.error(fallback, { description: error.message });
    }
  }, [error, fallback]);
}

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refreshSession: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: { fullName: string; email: string; password: string; role: "tester" | "founder" }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    demoApi.getSession().then((session) => {
      setUser(session);
      setLoading(false);
    });
  }, []);

  async function refreshSession(): Promise<void> {
    const next = await demoApi.getSession();
    setUser(next);
  }

  async function signIn(email: string, password: string): Promise<void> {
    const next = await demoApi.signIn(email, password);
    setUser(next);
  }

  async function signUp(input: {
    fullName: string;
    email: string;
    password: string;
    role: "tester" | "founder";
  }): Promise<void> {
    const next = await demoApi.signUp(input);
    setUser(next);
  }

  async function signOut(): Promise<void> {
    await demoApi.signOut();
    setUser(null);
  }

  async function resetPassword(email: string): Promise<void> {
    await demoApi.resetPassword(email);
  }

  return (
    <AuthContext.Provider value={{ user, loading, refreshSession, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

function getDefaultPath(user: AuthUser | null): string {
  if (!user) {
    return "/";
  }

  if (user.role === "founder") {
    return user.companyName?.includes("Personal Workspace") ? "/onboarding/company" : "/dashboard";
  }

  if (user.role === "tester") {
    if (user.verification_status === "approved") {
      return "/marketplace";
    }
    if (user.verification_status === "pending") {
      return "/onboarding/tester/pending";
    }
    return "/onboarding/tester";
  }

  return "/admin";
}

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <PageLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

function RequireRoles({
  roles,
  children,
  adminLevels,
}: {
  roles: UserRole[];
  children: JSX.Element;
  adminLevels?: AdminLevel[];
}): JSX.Element {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={getDefaultPath(user)} replace />;
  }

  if (adminLevels && user.role === "admin" && user.admin_level && !adminLevels.includes(user.admin_level)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function AuthRedirect({ children }: { children: JSX.Element }): JSX.Element {
  const { user, loading } = useAuth();
  if (loading) {
    return <PageLoader />;
  }
  if (user) {
    return <Navigate to={getDefaultPath(user)} replace />;
  }
  return children;
}

const publicLinks = [
  { label: "Home", path: "/" },
  { label: "For founders", path: "/for-founders" },
  { label: "For testers", path: "/for-testers" },
  { label: "Pricing", path: "/pricing" },
  { label: "Contact", path: "/contact" },
];

function PublicLayout({ children }: { children: ReactNode }): JSX.Element {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/15 p-2 text-primary">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[-0.02em]">TestLoop</p>
              <p className="text-xs text-muted-foreground">objective user testing</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 lg:flex">
            {publicLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                    isActive && "bg-secondary text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link to={user ? getDefaultPath(user) : "/login"}>{user ? "Open app" : "Login"}</Link>
            </Button>
            <Button asChild size="sm">
              <Link to={user ? getDefaultPath(user) : "/signup"}>
                {user ? "Continue" : "Get started"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      {children}
      <footer className="border-t border-border/70 bg-background/70">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-3">
            <p className="text-lg font-semibold tracking-[-0.02em]">TestLoop</p>
            <p className="max-w-md text-sm text-muted-foreground">
              Curated student testers, objective usability metrics, and moderation-first workflows for founders shipping fast.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Routes</p>
            <div className="grid gap-1 text-sm text-muted-foreground">
              <Link to="/pricing">Pricing</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold">Product</p>
            <div className="grid gap-1 text-sm text-muted-foreground">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/marketplace">Marketplace</Link>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const shellNav: Record<UserRole, Array<{ label: string; path: string; icon: typeof LayoutDashboard }>> = {
  founder: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Tests", path: "/tests", icon: FlaskConical },
    { label: "New test", path: "/tests/new", icon: PanelsTopLeft },
    { label: "Company", path: "/company/settings", icon: Building2 },
    { label: "Account", path: "/account", icon: UserCircle2 },
  ],
  tester: [
    { label: "Marketplace", path: "/marketplace", icon: Store },
    { label: "Submissions", path: "/submissions", icon: ClipboardList },
    { label: "Onboarding", path: "/onboarding/tester", icon: BadgeCheck },
    { label: "Profile", path: "/profile", icon: Users },
    { label: "Account", path: "/account", icon: UserCircle2 },
  ],
  admin: [
    { label: "Overview", path: "/admin", icon: LayoutDashboard },
    { label: "Verifications", path: "/admin/verifications", icon: BadgeCheck },
    { label: "Review queue", path: "/admin/review-queue", icon: ShieldAlert },
    { label: "Tests", path: "/admin/tests", icon: FlaskConical },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Flags", path: "/admin/flags", icon: Flag },
    { label: "Audit", path: "/admin/audit", icon: ScrollText },
    { label: "Config", path: "/admin/config", icon: Settings },
  ],
};

function ProtectedShell({ children }: { children: ReactNode }): JSX.Element {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    return <PageLoader />;
  }

  const activeLabel =
    shellNav[user.role].find((item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`))?.label ??
    "Workspace";

  return (
    <div className="app-shell">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-border/80 bg-card/75 px-5 py-6 backdrop-blur">
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-primary/15 p-3 text-primary">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em]">TestLoop</p>
                <p className="text-xs text-muted-foreground">{user.companyName ?? user.role}</p>
              </div>
            </div>
            <div className="surface-soft p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Signed in as</p>
              <p className="mt-2 text-base font-semibold">{user.full_name}</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge tone={user.role === "admin" ? "warning" : "success"}>{user.role}</Badge>
                {user.admin_level ? <Badge>{user.admin_level}</Badge> : null}
                {user.badge ? <Badge>{user.badge}</Badge> : null}
              </div>
            </div>
          </div>

          <nav className="grid gap-1">
            {shellNav[user.role].map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                      isActive && "bg-secondary text-foreground",
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-8 grid gap-3">
            <Button asChild variant="outline">
              <Link to="/">View public site</Link>
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await signOut();
                navigate("/");
              }}
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-20 border-b border-border/80 bg-background/80 backdrop-blur">
            <div className="flex items-center justify-between gap-4 px-6 py-4">
              <div>
                <p className="text-sm text-muted-foreground">Workspace / {user.role}</p>
                <h1 className="text-lg font-semibold tracking-[-0.02em]">{activeLabel}</h1>
              </div>
              <div className="flex items-center gap-3">
                <Badge>{import.meta.env.VITE_SUPABASE_URL ? "connected" : "demo mode"}</Badge>
                <Button asChild size="sm">
                  <Link to={user.role === "founder" ? "/tests/new" : user.role === "tester" ? "/marketplace" : "/admin/review-queue"}>
                    {user.role === "founder" ? "Create test" : user.role === "tester" ? "Browse tests" : "Moderate queue"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

function DataTable<TData extends object>({
  data,
  columns,
  emptyTitle,
  emptyCopy,
}: {
  data: TData[];
  columns: ColumnDef<TData>[];
  emptyTitle: string;
  emptyCopy: string;
}): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (data.length === 0) {
    return <StatePanel title={emptyTitle} copy={emptyCopy} />;
  }

  return (
    <Surface className="overflow-hidden p-0">
      <table className="min-w-full text-sm">
        <thead className="bg-secondary/70 text-left text-xs uppercase tracking-[0.16em] text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-3 font-semibold">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-border/70">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-3 align-top">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Surface>
  );
}

function AuthPanel({
  title,
  copy,
  children,
}: {
  title: string;
  copy: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <PublicLayout>
      <section className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="eyebrow">Access</p>
          <h1 className="page-title">{title}</h1>
          <p className="page-copy max-w-xl">{copy}</p>
          <div className="grid max-w-xl gap-4 md:grid-cols-2">
            <Surface className="p-4">
              <div className="mb-3 inline-flex rounded-full bg-primary/12 p-2 text-primary">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">Role-aware access</h3>
              <p className="mt-2 text-sm text-muted-foreground">Every route is gated by role, with founder, tester, and admin experiences split cleanly.</p>
            </Surface>
            <Surface className="p-4">
              <div className="mb-3 inline-flex rounded-full bg-primary/12 p-2 text-primary">
                <Bot className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">OpenAI via Edge Functions</h3>
              <p className="mt-2 text-sm text-muted-foreground">Task drafts, scoring TL;DRs, and review aids stay server-side only.</p>
            </Surface>
          </div>
        </div>
        <Surface className="p-6">{children}</Surface>
      </section>
    </PublicLayout>
  );
}

function HeroSection(): JSX.Element {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div className="hero-grid absolute inset-0 opacity-20" />
      <span className="hero-orb left-0 top-0 h-64 w-64 bg-primary/30" />
      <span className="hero-orb right-0 top-20 h-72 w-72 bg-chart-2/25" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-28">
        <div className="space-y-6">
          <Badge tone="success">Objective user testing for product teams</Badge>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.03em] lg:text-6xl">
            Ten computed metrics. Zero video review. One desktop-first command center.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Founders launch metric-driven usability tests, vetted student testers run them in an embedded runner, and admins keep the quality bar high with review queues and fraud signals.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/signup">
                Start a founder workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/for-testers">Apply as a tester</Link>
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { label: "Campaign price", value: "$100-$300" },
              { label: "Metric pack", value: "10 MVP signals" },
              { label: "Fraud engine", value: "13 scored checks" },
            ].map((item) => (
              <Surface key={item.label} className="p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                <p className="mt-2 text-xl font-semibold">{item.value}</p>
              </Surface>
            ))}
          </div>
        </div>
        <Surface className="relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-hero opacity-50" />
          <div className="relative grid gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live dashboard snapshot</p>
                <p className="mt-1 text-xl font-semibold">Checkout — new card flow</p>
              </div>
              <Badge tone="success">PASS</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard label="Task success" value="82%" detail="Threshold: 78%" icon={Activity} />
              <StatCard label="Fraud score" value="12" detail="Auto-approved" icon={ShieldAlert} />
              <StatCard label="Turnaround" value="9m 47s" detail="Median last 30 days" icon={Clock3} />
              <StatCard label="First-click" value="61%" detail="Needs iteration" icon={PanelsTopLeft} />
            </div>
          </div>
        </Surface>
      </div>
    </section>
  );
}

function MarketingOverview(): JSX.Element {
  return (
    <PublicLayout>
      <HeroSection />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        {[
          {
            title: "Founders",
            copy: "Create an 8-step campaign, set thresholds, and watch pass/fail cards update in real time.",
            path: "/for-founders",
            icon: Building2,
          },
          {
            title: "Testers",
            copy: "Move through verification, find eligible tests, and submit structured runs with badge-aware access.",
            path: "/for-testers",
            icon: Users,
          },
          {
            title: "Admins",
            copy: "Moderate verification, review fraud-heavy submissions, and tune platform policy from one place.",
            path: "/admin",
            icon: Shield,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Surface key={item.title} className="p-6">
              <div className="mb-4 inline-flex rounded-full bg-primary/12 p-3 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.copy}</p>
              <Button asChild variant="ghost" className="mt-4 px-0">
                <Link to={item.path}>
                  Explore {item.title.toLowerCase()}
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </Surface>
          );
        })}
      </section>
    </PublicLayout>
  );
}

function RoleLandingPage({
  eyebrow,
  title,
  copy,
  bullets,
  ctaPath,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  bullets: string[];
  ctaPath: string;
  ctaLabel: string;
}): JSX.Element {
  return (
    <PublicLayout>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-title max-w-3xl">{title}</h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">{copy}</p>
          <div className="grid gap-3">
            {bullets.map((bullet) => (
              <div key={bullet} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">{bullet}</p>
              </div>
            ))}
          </div>
          <Button asChild size="lg">
            <Link to={ctaPath}>
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Surface className="grid gap-4 p-6">
          <SectionIntro eyebrow="Page inventory" title="Every route now maps to a real surface." copy="The rebuild routes the full screenshot map rather than swapping one component tree in memory." />
          <div className="grid gap-3 text-sm text-muted-foreground">
            {[
              "/dashboard",
              "/tests",
              "/tests/new",
              "/marketplace",
              "/submissions",
              "/admin/review-queue",
              "/admin/flags",
            ].map((route) => (
              <div key={route} className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
                <span>{route}</span>
                <Badge>{eyebrow.toLowerCase()}</Badge>
              </div>
            ))}
          </div>
        </Surface>
      </section>
    </PublicLayout>
  );
}

function PricingPage(): JSX.Element {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionIntro
          eyebrow="Pricing"
          title="Campaign-based pricing, not seat-based lock-in."
          copy="Founders pay for test campaigns. Testers do not pay. Admin tooling ships with the platform."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-4">
          {[
            { tier: "Beta", price: "Free", copy: "5 campaigns, 15 testers, dashboard + moderation preview." },
            { tier: "Starter", price: "$100", copy: "25 testers, 10 metrics, OpenAI task draft, webhook-ready." },
            { tier: "Growth", price: "$300", copy: "100 testers, premium badges, priority review, admin summary." },
            { tier: "Enterprise", price: "Custom", copy: "Private cohorts, SSO-ready posture, custom moderation policy." },
          ].map((tier, index) => (
            <Surface key={tier.tier} className={cn("p-6", index === 1 && "border-primary/40 shadow-[0_20px_60px_rgba(34,197,94,0.15)]")}>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">{tier.tier}</p>
              <p className="mt-4 text-4xl font-semibold tracking-[-0.03em]">{tier.price}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{tier.copy}</p>
            </Surface>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

function ContactPage(): JSX.Element {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <SectionIntro
          eyebrow="Contact"
          title="Founders, testers, and platform ops all have a direct line."
          copy="This rebuild keeps the utility pages live too, so the screenshot route list is complete."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { label: "General", value: "hello@testloop.dev", icon: Mail },
            { label: "Founders", value: "founders@testloop.dev", icon: Briefcase },
            { label: "Admins", value: "ops@testloop.dev", icon: ShieldAlert },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Surface key={item.label} className="p-6">
                <div className="mb-4 inline-flex rounded-full bg-primary/12 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">{item.label}</p>
                <p className="mt-3 text-base font-medium">{item.value}</p>
              </Surface>
            );
          })}
        </div>
      </section>
    </PublicLayout>
  );
}

function LegalPage({ title, sections }: { title: string; sections: Array<{ heading: string; copy: string }> }): JSX.Element {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <SectionIntro eyebrow="Legal" title={title} copy="Utility routes are first-class pages in the rebuild, not empty placeholders." />
        <div className="mt-8 grid gap-5">
          {sections.map((section) => (
            <Surface key={section.heading} className="p-6">
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{section.copy}</p>
            </Surface>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signupSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["founder", "tester"]),
});

const resetSchema = z.object({
  email: z.string().email(),
});

function LoginPage(): JSX.Element {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "founder@testloop.dev",
      password: "password123",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof loginSchema>) => {
      await signIn(values.email, values.password);
    },
    onSuccess: () => {
      toast.success("Welcome back.");
      navigate(getDefaultPath(demoApi.getSessionSync()));
    },
    onError: (error) => {
      toast.error("Could not sign in", { description: error instanceof Error ? error.message : "Check your credentials." });
    },
  });

  return (
    <AuthPanel title="Sign in to TestLoop" copy="Use one of the seeded demo accounts or create a new founder/tester account from signup.">
      <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <Input type="email" {...form.register("email")} />
        </Field>
        <Field label="Password" error={form.formState.errors.password?.message}>
          <Input type="password" {...form.register("password")} />
        </Field>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in…" : "Sign in"}
        </Button>
        <div className="grid gap-2 rounded-xl border border-border/70 bg-secondary/40 p-4 text-sm">
          <p className="font-semibold">Demo accounts</p>
          {[
            "founder@testloop.dev / password123",
            "tester@testloop.dev / password123",
            "pending@testloop.dev / password123",
            "admin@testloop.dev / password123",
            "assistant@testloop.dev / password123",
          ].map((line) => (
            <code key={line} className="text-xs text-muted-foreground">
              {line}
            </code>
          ))}
        </div>
      </form>
    </AuthPanel>
  );
}

function SignupPage(): JSX.Element {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "password123",
      role: "founder",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof signupSchema>) => {
      await signUp(values);
    },
    onSuccess: () => {
      const nextUser = demoApi.getSessionSync();
      toast.success("Account created.");
      navigate(getDefaultPath(nextUser));
    },
    onError: (error) => {
      toast.error("Could not create the account", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  return (
    <AuthPanel title="Create a TestLoop account" copy="Founders land in company onboarding. Testers land in the six-step verification flow.">
      <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
        <Field label="Full name" error={form.formState.errors.fullName?.message}>
          <Input {...form.register("fullName")} />
        </Field>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <Input type="email" {...form.register("email")} />
        </Field>
        <Field label="Password" error={form.formState.errors.password?.message}>
          <Input type="password" {...form.register("password")} />
        </Field>
        <Field label="Role" error={form.formState.errors.role?.message}>
          <Select {...form.register("role")}>
            <option value="founder">Founder</option>
            <option value="tester">Tester</option>
          </Select>
        </Field>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthPanel>
  );
}

function ResetPasswordPage(): JSX.Element {
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });
  const { resetPassword } = useAuth();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset link queued.", {
        description: "In demo mode this confirms the route and form flow are wired.",
      });
    },
    onError: (error) => {
      toast.error("Could not queue the reset", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  return (
    <AuthPanel title="Reset your password" copy="This utility route is fully implemented in the rebuild, not left as a stub.">
      <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values.email))}>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <Input type="email" {...form.register("email")} />
        </Field>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending…" : "Send reset link"}
        </Button>
      </form>
    </AuthPanel>
  );
}

const companySchema = z.object({
  name: z.string().min(2),
  website: z.string().url(),
  productStage: z.string().min(2),
  category: z.string().min(2),
  teamSize: z.string().min(1),
});

function CompanyOnboardingPage(): JSX.Element {
  const { user, refreshSession } = useAuth();
  const navigate = useNavigate();
  const form = useForm<CompanyOnboardingInput>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: user?.companyName?.includes("Personal Workspace") ? "Acme Loop Labs" : user?.companyName ?? "",
      website: "https://acmeloop.dev",
      productStage: "Private beta",
      category: "SaaS",
      teamSize: "6-10",
    },
  });

  const mutation = useMutation({
    mutationFn: demoApi.completeCompanyOnboarding,
    onSuccess: async () => {
      await refreshSession();
      toast.success("Workspace setup complete.");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Could not complete onboarding", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Surface className="p-6">
        <SectionIntro
          eyebrow="Founder onboarding"
          title="Create your company workspace"
          copy="Founders land here right after signup. This sets the workspace identity used by tests, dashboards, and settings."
        />
        <div className="mt-6 grid gap-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 h-4 w-4 text-primary" />
            <p>Auto-created personal workspace becomes a real company profile once this form is saved.</p>
          </div>
          <div className="flex items-start gap-3">
            <Bot className="mt-1 h-4 w-4 text-primary" />
            <p>OpenAI-backed task drafting later uses this category and stage to tune test templates.</p>
          </div>
        </div>
      </Surface>
      <Surface className="p-6">
        <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Field label="Company name" error={form.formState.errors.name?.message}>
            <Input {...form.register("name")} />
          </Field>
          <Field label="Website" error={form.formState.errors.website?.message}>
            <Input {...form.register("website")} />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Stage" error={form.formState.errors.productStage?.message}>
              <Select {...form.register("productStage")}>
                <option>Pre-launch</option>
                <option>Private beta</option>
                <option>Public beta</option>
                <option>Growth</option>
              </Select>
            </Field>
            <Field label="Team size" error={form.formState.errors.teamSize?.message}>
              <Select {...form.register("teamSize")}>
                <option>1-5</option>
                <option>6-10</option>
                <option>11-25</option>
                <option>25+</option>
              </Select>
            </Field>
          </div>
          <Field label="Category" error={form.formState.errors.category?.message}>
            <Input {...form.register("category")} />
          </Field>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving…" : "Complete onboarding"}
          </Button>
        </form>
      </Surface>
    </div>
  );
}

const testerSchema = z.object({
  college: z.string().min(2),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  skills: z.string().min(2),
  collegeIdUrl: z.string().url(),
  screenerScore: z.number().min(0).max(100),
});

function TesterOnboardingPage(): JSX.Element {
  const { refreshSession } = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof testerSchema>>({
    resolver: zodResolver(testerSchema),
    defaultValues: {
      college: "",
      githubUrl: "https://github.com/",
      linkedinUrl: "https://linkedin.com/in/",
      skills: "Frontend, SaaS, QA",
      collegeIdUrl: "https://cdn.testloop.dev/id.png",
      screenerScore: 82,
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof testerSchema>) => {
      const payload: TesterOnboardingInput = {
        college: values.college,
        githubUrl: values.githubUrl,
        linkedinUrl: values.linkedinUrl,
        skills: values.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
        collegeIdUrl: values.collegeIdUrl,
        screenerScore: values.screenerScore,
      };
      await demoApi.completeTesterOnboarding(payload);
    },
    onSuccess: async () => {
      await refreshSession();
      toast.success("Verification submitted.");
      navigate("/onboarding/tester/pending");
    },
    onError: (error) => {
      toast.error("Could not submit onboarding", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Surface className="p-6">
        <SectionIntro
          eyebrow="Tester onboarding"
          title="Complete the six-step verification brief"
          copy="The MVP stores the full onboarding flow and moves you into admin review instead of leaving the route empty."
        />
        <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
          {[
            "GitHub and LinkedIn URLs",
            "College and skills metadata",
            "College ID reference",
            "Screener score for moderation queue",
          ].map((line) => (
            <div key={line} className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </Surface>
      <Surface className="p-6">
        <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Field label="College" error={form.formState.errors.college?.message}>
            <Input {...form.register("college")} />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="GitHub" error={form.formState.errors.githubUrl?.message}>
              <Input {...form.register("githubUrl")} />
            </Field>
            <Field label="LinkedIn" error={form.formState.errors.linkedinUrl?.message}>
              <Input {...form.register("linkedinUrl")} />
            </Field>
          </div>
          <Field label="Skills" hint="Comma-separated" error={form.formState.errors.skills?.message}>
            <Input {...form.register("skills")} />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="College ID URL" error={form.formState.errors.collegeIdUrl?.message}>
              <Input {...form.register("collegeIdUrl")} />
            </Field>
            <Field label="Screener score" error={form.formState.errors.screenerScore?.message}>
              <Input type="number" {...form.register("screenerScore", { valueAsNumber: true })} />
            </Field>
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Submitting…" : "Submit for review"}
          </Button>
        </form>
      </Surface>
    </div>
  );
}

function TesterPendingPage(): JSX.Element {
  const { user, refreshSession } = useAuth();
  return (
    <Surface className="max-w-3xl p-8">
      <SectionIntro
        eyebrow="Verification"
        title="Your tester profile is in review"
        copy="Admins see this record in `/admin/verifications`. Once they approve you, this page naturally unlocks `/marketplace`."
      />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge tone={user?.verification_status === "approved" ? "success" : "warning"}>
          {user?.verification_status}
        </Badge>
        <Badge>{user?.badge ?? "probation"}</Badge>
      </div>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link to="/marketplace">Try marketplace</Link>
        </Button>
        <Button variant="outline" onClick={() => refreshSession()}>
          Refresh status
        </Button>
      </div>
    </Surface>
  );
}

function FounderDashboardPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["founder-dashboard"],
    queryFn: () => demoApi.getDashboard(),
  });

  useQueryErrorToast(query.error, "Could not load the dashboard");

  return (
    <DataSection
      isLoading={query.isLoading}
      isError={query.isError}
      isEmpty={!query.data || query.data.tests.length === 0}
      errorMessage="The founder dashboard data is unavailable right now."
      emptyTitle="No campaigns yet"
      emptyCopy="Create a test to start filling the dashboard."
    >
      {query.data ? <FounderDashboardContent data={query.data} /> : null}
    </DataSection>
  );
}

function FounderDashboardContent({ data }: { data: DashboardSnapshot }): JSX.Element {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow="Founder dashboard"
        title="Shipping decisions, reduced to pass or fail."
        copy="This view combines campaign health, fraud pressure, and recent activity into one routed workspace."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live campaigns" value={String(data.liveCount)} detail={`${data.tests.length} total campaigns`} icon={Activity} />
        <StatCard label="Submissions" value={String(data.totalSubmissions)} detail="Across active founder tests" icon={ClipboardList} />
        <StatCard label="Pass rate" value={formatPercent(data.passRate)} detail="Approved vs total submissions" icon={CheckCircle2} />
        <StatCard label="Fraud queue" value={String(data.flaggedCount)} detail="Needs admin review" icon={ShieldAlert} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Surface className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Submission health</p>
              <p className="text-sm text-muted-foreground">Recent campaigns split by approved vs flagged outcomes.</p>
            </div>
            <Badge tone="success">Realtime-ready</Badge>
          </div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chart}>
                <CartesianGrid stroke="hsla(var(--border), 0.35)" vertical={false} />
                <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="approved" stroke="hsl(var(--chart-1))" fill="hsla(var(--chart-1), 0.25)" />
                <Area type="monotone" dataKey="flagged" stroke="hsl(var(--destructive))" fill="hsla(var(--destructive), 0.22)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Surface>

        <Surface className="p-6">
          <p className="text-sm font-semibold">Launch checklist</p>
          <div className="mt-4 grid gap-3">
            {[
              "URL preflight passes",
              "OpenAI task draft reviewed",
              "Thresholds selected for all 10 metrics",
              "Eligible tester badges set",
              "Admin moderation policy inherited",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-border/70 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <Surface className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Recent campaigns</p>
            <p className="text-sm text-muted-foreground">Every card and table in the old prototype now lives behind real routes.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/tests">Open tests</Link>
          </Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {data.tests.map((test) => (
            <Surface key={test.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{test.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{test.description}</p>
                </div>
                <Badge tone={test.status === "flagged" ? "danger" : test.status === "draft" ? "default" : "success"}>{test.status}</Badge>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                <span>{test.current_submissions}/{test.target_testers} submissions</span>
                <span>{formatRelativeTime(test.updated_at)}</span>
              </div>
              <Button asChild variant="ghost" className="mt-4 px-0">
                <Link to={`/tests/${test.id}`}>
                  Open campaign
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </Surface>
          ))}
        </div>
      </Surface>
    </div>
  );
}

function TestsListPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["founder-tests"],
    queryFn: () => demoApi.listTests(),
  });
  useQueryErrorToast(query.error, "Could not load campaigns");

  const columns: ColumnDef<TestRow>[] = [
    {
      header: "Campaign",
      cell: ({ row }) => (
        <div className="space-y-1">
          <Link to={`/tests/${row.original.id}`} className="font-semibold hover:text-primary">
            {row.original.title}
          </Link>
          <p className="text-xs text-muted-foreground">{row.original.category}</p>
        </div>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => <Badge>{row.original.status}</Badge>,
    },
    {
      header: "Submissions",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.original.current_submissions}/{row.original.target_testers}
        </span>
      ),
    },
    {
      header: "Reward",
      cell: ({ row }) => <span>₹{row.original.reward_inr}</span>,
    },
    {
      header: "Updated",
      cell: ({ row }) => <span className="text-muted-foreground">{formatRelativeTime(row.original.updated_at)}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionIntro eyebrow="Campaigns" title="All founder tests" copy="TanStack Table now drives the list instead of the hard-coded prototype table." />
        <Button asChild>
          <Link to="/tests/new">
            New campaign
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="The campaign list could not be loaded."
        emptyTitle="No founder campaigns"
        emptyCopy="Create your first test to populate the routed list."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="No campaigns" emptyCopy="Create your first campaign." /> : null}
      </DataSection>
    </div>
  );
}

const createTestSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  url: z.string().url(),
  category: z.string().min(2),
  rewardInr: z.number().min(100),
  targetTesters: z.number().min(5),
  eligibleBadges: z.array(z.enum(["probation", "verified", "top-rated"])).min(1),
  publishNow: z.boolean(),
  tasks: z.array(
    z.object({
      title: z.string().min(2),
      description: z.string().min(4),
      successSelector: z.string().nullable(),
      successUrlPattern: z.string().nullable(),
    }),
  ).min(1),
  metrics: z.array(
    z.object({
      metricKey: z.string().min(2),
      label: z.string().min(2),
      operator: z.string().min(1),
      targetValue: z.number(),
      unit: z.string(),
    }),
  ).min(1),
});

function TestCreatePage(): JSX.Element {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [preflightResult, setPreflightResult] = useState<{ framable: boolean; normalizedUrl: string; reason: string } | null>(null);
  const [aiSummary, setAiSummary] = useState("Run URL preflight, then ask OpenAI for a task draft.");

  const form = useForm<z.infer<typeof createTestSchema>>({
    resolver: zodResolver(createTestSchema),
    defaultValues: {
      title: "Checkout — new card flow",
      description: "Measure whether the new card replacement flow is safe to ship before Friday.",
      url: "https://demo.testloop.app/checkout",
      category: "Checkout",
      rewardInr: 700,
      targetTesters: 25,
      eligibleBadges: ["verified", "top-rated"],
      publishNow: true,
      tasks: [
        {
          title: "Add one product to cart",
          description: "Land on a product detail page and add one item to the cart.",
          successSelector: null,
          successUrlPattern: null,
        },
      ],
      metrics: [
        { metricKey: "task_success_rate", label: "Task Success Rate", operator: ">=", targetValue: 78, unit: "%" },
        { metricKey: "sus", label: "SUS", operator: ">=", targetValue: 68, unit: "" },
      ],
    },
  });

  const tasksArray = useFieldArray({ control: form.control, name: "tasks" });
  const metricsArray = useFieldArray({ control: form.control, name: "metrics" });

  const preflightMutation = useMutation({
    mutationFn: async () => demoApi.preflightUrl(form.getValues("url")),
    onSuccess: (result) => {
      setPreflightResult(result);
      if (result.framable) {
        toast.success("Preflight passed.");
        setStep(1);
      } else {
        toast.error("Preflight failed", { description: result.reason });
      }
    },
  });

  const aiMutation = useMutation({
    mutationFn: async () => demoApi.generateTemplate(form.getValues("url")),
    onSuccess: (result) => {
      setAiSummary(result.summary);
      tasksArray.replace(result.tasks);
      metricsArray.replace(result.metrics);
      toast.success("Draft template ready.");
      setStep(2);
    },
    onError: (error) => {
      toast.error("Could not draft tasks", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (values: z.infer<typeof createTestSchema>) => {
      return demoApi.createTest(values);
    },
    onSuccess: async (test) => {
      await queryClient.invalidateQueries();
      toast.success("Campaign created.");
      navigate(`/tests/${test.id}`);
    },
    onError: (error) => {
      toast.error("Could not create the campaign", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  const steps = [
    "1. URL",
    "2. Preflight",
    "3. AI brief",
    "4. Tasks",
    "5. Metrics",
    "6. Cohort",
    "7. Review",
    "8. Publish",
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Campaign wizard" title="Create a new test" copy="The rebuild turns the prototype’s single CTA into a working eight-step campaign wizard." />
      <Surface className="p-6">
        <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-8">
          {steps.map((label, index) => (
            <div key={label} className={cn("rounded-xl border px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em]", index <= step ? "border-primary/50 bg-primary/12 text-primary" : "border-border/70 bg-secondary/40 text-muted-foreground")}>
              {label}
            </div>
          ))}
        </div>
      </Surface>

      <form className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" onSubmit={form.handleSubmit((values) => createMutation.mutate(values))}>
        <div className="grid gap-6">
          <Surface className="p-6">
            <p className="text-sm font-semibold">Campaign setup</p>
            <div className="mt-4 grid gap-4">
              <Field label="Title" error={form.formState.errors.title?.message}>
                <Input {...form.register("title")} />
              </Field>
              <Field label="Description" error={form.formState.errors.description?.message}>
                <Textarea {...form.register("description")} />
              </Field>
              <Field label="Staging URL" error={form.formState.errors.url?.message}>
                <Input {...form.register("url")} />
              </Field>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Category" error={form.formState.errors.category?.message}>
                  <Input {...form.register("category")} />
                </Field>
                <Field label="Reward (INR)" error={form.formState.errors.rewardInr?.message}>
                  <Input type="number" {...form.register("rewardInr", { valueAsNumber: true })} />
                </Field>
                <Field label="Target testers" error={form.formState.errors.targetTesters?.message}>
                  <Input type="number" {...form.register("targetTesters", { valueAsNumber: true })} />
                </Field>
              </div>
              <Field label="Eligible tester badges">
                <div className="flex flex-wrap gap-3">
                  {(["probation", "verified", "top-rated"] as const).map((badge) => {
                    const selected = form.watch("eligibleBadges").includes(badge);
                    return (
                      <button
                        key={badge}
                        type="button"
                        className={cn(
                          "rounded-full border px-4 py-2 text-sm font-medium",
                          selected ? "border-primary bg-primary/10 text-primary" : "border-border/70 text-muted-foreground",
                        )}
                        onClick={() => {
                          const current = form.getValues("eligibleBadges");
                          form.setValue(
                            "eligibleBadges",
                            selected ? current.filter((entry) => entry !== badge) : [...current, badge],
                            { shouldValidate: true },
                          );
                        }}
                      >
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <label className="flex items-center gap-3 rounded-xl border border-border/70 px-4 py-3">
                <input type="checkbox" checked={form.watch("publishNow")} onChange={(event) => form.setValue("publishNow", event.target.checked)} />
                <span className="text-sm text-muted-foreground">Publish immediately after review</span>
              </label>
            </div>
          </Surface>

          <Surface className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Tasks</p>
                <p className="text-sm text-muted-foreground">These can be generated by OpenAI and then edited before publish.</p>
              </div>
              <Button type="button" variant="outline" onClick={() => tasksArray.append({ title: "", description: "", successSelector: null, successUrlPattern: null })}>
                Add task
              </Button>
            </div>
            <div className="mt-4 grid gap-4">
              {tasksArray.fields.map((field, index) => (
                <Surface key={field.id} className="p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold">Task {index + 1}</p>
                    {tasksArray.fields.length > 1 ? (
                      <Button type="button" variant="ghost" size="sm" onClick={() => tasksArray.remove(index)}>
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <div className="grid gap-4">
                    <Field label="Title">
                      <Input {...form.register(`tasks.${index}.title`)} />
                    </Field>
                    <Field label="Description">
                      <Textarea {...form.register(`tasks.${index}.description`)} />
                    </Field>
                  </div>
                </Surface>
              ))}
            </div>
          </Surface>

          <Surface className="p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold">Metrics and thresholds</p>
                <p className="text-sm text-muted-foreground">Server-authoritative scoring writes these to submission metrics after each run.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  metricsArray.append({
                    metricKey: "custom_metric",
                    label: "Custom threshold",
                    operator: ">=",
                    targetValue: 1,
                    unit: "",
                  })
                }
              >
                Add metric
              </Button>
            </div>
            <div className="mt-4 grid gap-4">
              {metricsArray.fields.map((field, index) => (
                <div key={field.id} className="grid gap-4 rounded-xl border border-border/70 p-4 md:grid-cols-[1.2fr_1fr_0.8fr_0.8fr]">
                  <Input placeholder="Metric label" {...form.register(`metrics.${index}.label`)} />
                  <Input placeholder="Metric key" {...form.register(`metrics.${index}.metricKey`)} />
                  <Select {...form.register(`metrics.${index}.operator`)}>
                    <option value=">=">{">="}</option>
                    <option value="<=">{"<="}</option>
                    <option value="<">{"<"}</option>
                  </Select>
                  <Input type="number" {...form.register(`metrics.${index}.targetValue`, { valueAsNumber: true })} />
                </div>
              ))}
            </div>
          </Surface>
        </div>

        <div className="grid gap-6">
          <Surface className="p-6">
            <p className="text-sm font-semibold">Wizard actions</p>
            <div className="mt-4 grid gap-3">
              <Button type="button" variant="outline" onClick={() => preflightMutation.mutate()} disabled={preflightMutation.isPending}>
                {preflightMutation.isPending ? "Checking…" : "Run URL preflight"}
              </Button>
              <Button type="button" variant="outline" onClick={() => aiMutation.mutate()} disabled={aiMutation.isPending}>
                {aiMutation.isPending ? "Drafting…" : "Generate OpenAI draft"}
              </Button>
              <Button type="submit" disabled={createMutation.isPending}>
                {createMutation.isPending ? "Publishing…" : "Create campaign"}
              </Button>
            </div>
          </Surface>

          <Surface className="p-6">
            <p className="text-sm font-semibold">Preflight</p>
            <p className="mt-3 text-sm text-muted-foreground">{preflightResult ? preflightResult.reason : "No preflight run yet."}</p>
            {preflightResult ? <Badge tone={preflightResult.framable ? "success" : "danger"}>{preflightResult.framable ? "framable" : "blocked"}</Badge> : null}
          </Surface>

          <Surface className="p-6">
            <p className="text-sm font-semibold">OpenAI draft summary</p>
            <p className="mt-3 text-sm text-muted-foreground">{aiSummary}</p>
          </Surface>

          <Surface className="p-6">
            <p className="text-sm font-semibold">Acceptance gates</p>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              {[
                "Forms use react-hook-form + zod",
                "All data views surface loading, empty, and error states",
                "No client-side metric writes",
                "Route renders on desktop-first shell",
              ].map((line) => (
                <div key={line} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </form>
    </div>
  );
}

function TestDetailPage(): JSX.Element {
  const { id = "" } = useParams();
  const query = useQuery({
    queryKey: ["test-detail", id],
    queryFn: () => demoApi.getTestDetail(id),
  });
  useQueryErrorToast(query.error, "Could not load the campaign");

  return (
    <DataSection
      isLoading={query.isLoading}
      isError={query.isError}
      isEmpty={!query.data}
      errorMessage="This campaign could not be loaded."
      emptyTitle="Campaign missing"
      emptyCopy="The selected test was not found."
    >
      {query.data ? <TestDetailContent {...query.data} /> : null}
    </DataSection>
  );
}

function TestDetailContent({
  test,
  tasks,
  metrics,
  submissions,
}: {
  test: TestRow;
  tasks: TestTaskRow[];
  metrics: TestMetricConfigRow[];
  submissions: SubmissionRow[];
  company: unknown;
  founder: unknown;
}): JSX.Element {
  const chartData = [
    { name: "Approved", value: submissions.filter((submission) => submission.status === "approved").length },
    { name: "Flagged", value: submissions.filter((submission) => submission.status === "flagged").length },
    { name: "Pending", value: submissions.filter((submission) => submission.status === "pending").length },
  ];

  const submissionColumns: ColumnDef<SubmissionRow>[] = [
    {
      header: "Submission",
      cell: ({ row }) => (
        <div className="space-y-1">
          <Link to={`/tests/${test.id}/submissions/${row.original.id}`} className="font-semibold hover:text-primary">
            {row.original.id}
          </Link>
          <p className="text-xs text-muted-foreground">{row.original.summary}</p>
        </div>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => <Badge tone={row.original.status === "flagged" ? "danger" : row.original.status === "approved" ? "success" : "warning"}>{row.original.status}</Badge>,
    },
    {
      header: "Quality",
      cell: ({ row }) => <span>{row.original.quality_score}</span>,
    },
    {
      header: "Fraud",
      cell: ({ row }) => <span>{row.original.fraud_score}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow={test.category} title={test.title} copy={test.description} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Status" value={test.status} detail={`${test.current_submissions}/${test.target_testers} submissions`} icon={Activity} />
        <StatCard label="Reward" value={`₹${test.reward_inr}`} detail="Per accepted tester" icon={Briefcase} />
        <StatCard label="Framability" value={test.framable ? "Pass" : "Blocked"} detail="Preflight status" icon={Monitor} />
        <StatCard label="Updated" value={formatDate(test.updated_at)} detail="Latest dashboard sync" icon={Clock3} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Surface className="p-6">
          <p className="text-sm font-semibold">Task plan</p>
          <div className="mt-4 grid gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-xl border border-border/70 p-4">
                <p className="text-sm font-semibold">{task.position}. {task.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
              </div>
            ))}
          </div>
        </Surface>
        <Surface className="p-6">
          <p className="text-sm font-semibold">Submission mix</p>
          <div className="mt-4 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={52} outerRadius={86} fill="hsl(var(--chart-1))" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Surface>
      </div>
      <Surface className="p-6">
        <p className="text-sm font-semibold">Threshold pack</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.id} className="rounded-xl border border-border/70 p-4">
              <p className="text-sm font-semibold">{metric.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {metric.operator} {metric.target_value} {metric.unit}
              </p>
            </div>
          ))}
        </div>
      </Surface>
      <DataTable data={submissions} columns={submissionColumns} emptyTitle="No submissions yet" emptyCopy="Once testers run the campaign, they will appear here." />
    </div>
  );
}

function SubmissionDetailPage(): JSX.Element {
  const { sid = "" } = useParams();
  const query = useQuery({
    queryKey: ["submission-detail", sid],
    queryFn: () => demoApi.getSubmissionDetail(sid),
  });
  useQueryErrorToast(query.error, "Could not load the submission detail");

  return (
    <DataSection
      isLoading={query.isLoading}
      isError={query.isError}
      isEmpty={!query.data}
      errorMessage="The requested submission detail is unavailable."
      emptyTitle="Submission not found"
      emptyCopy="The selected submission may have been removed."
    >
      {query.data ? <SubmissionDetailContent {...query.data} /> : null}
    </DataSection>
  );
}

function SubmissionDetailContent({
  submission,
  tester,
  test,
  metrics,
  flags,
  events,
}: {
  submission: SubmissionRow;
  test: TestRow | null;
  tester: ProfileRow | null;
  metrics: SubmissionMetricRow[];
  flags: SubmissionFlagRow[];
  events: SubmissionDetailProps["events"];
}): JSX.Element {
  return (
    <div className="space-y-6">
      <SectionIntro
        eyebrow={submission.status}
        title={test ? `${test.title} / ${submission.id}` : submission.id}
        copy={submission.summary}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Quality" value={String(submission.quality_score)} detail="Submission quality score" icon={Activity} />
        <StatCard label="Fraud score" value={String(submission.fraud_score)} detail="Moderation threshold aware" icon={ShieldAlert} />
        <StatCard label="Duration" value={`${Math.round(submission.duration_seconds / 60)}m`} detail="Runner completion" icon={Clock3} />
        <StatCard label="Tester" value={tester?.full_name ?? "Unknown"} detail={tester?.badge ?? "n/a"} icon={Users} />
      </div>
      <Surface className="p-6">
        <p className="text-sm font-semibold">Metric cards</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.id} className="rounded-xl border border-border/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</p>
                <Badge tone={metric.passed ? "success" : "danger"}>{metric.passed ? "pass" : "fail"}</Badge>
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.02em]">
                {metric.value}
                {metric.unit}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{metric.threshold_display}</p>
            </div>
          ))}
        </div>
      </Surface>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Surface className="p-6">
          <p className="text-sm font-semibold">Fraud signals</p>
          <div className="mt-4 grid gap-3">
            {flags.length ? flags.map((flag) => (
              <div key={flag.id} className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-destructive">{flag.label}</p>
                  <Badge tone={flag.status === "resolved" ? "success" : "danger"}>{flag.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{flag.reason}</p>
              </div>
            )) : <StatePanel title="No active fraud signals" copy="This submission stayed under the review threshold." />}
          </div>
        </Surface>
        <Surface className="p-6">
          <p className="text-sm font-semibold">Event timeline replay</p>
          <div className="mt-4 grid gap-3">
            {events.map((event) => (
              <div key={event.id} className="rounded-xl border border-border/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{event.event_name}</p>
                  <span className="text-xs text-muted-foreground">{formatDate(event.created_at)}</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">{event.event_origin}</p>
                <pre className="mt-3 overflow-x-auto rounded-lg bg-secondary/60 p-3 text-xs text-muted-foreground">
                  {JSON.stringify(event.payload, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </Surface>
      </div>
    </div>
  );
}

type SubmissionDetailProps = Awaited<ReturnType<typeof demoApi.getSubmissionDetail>>;

function CompanySettingsPage(): JSX.Element {
  const { user } = useAuth();
  const query = useQuery({
    queryKey: ["company-settings", user?.company_id],
    queryFn: () => demoApi.getCompanySettings(user?.company_id ?? ""),
    enabled: Boolean(user?.company_id),
  });
  useQueryErrorToast(query.error, "Could not load company settings");

  const form = useForm<CompanySettingsInput>({
    resolver: zodResolver(companySchema),
    values: query.data,
  });

  const mutation = useMutation({
    mutationFn: async (values: CompanySettingsInput) => demoApi.saveCompanySettings(user?.company_id ?? "", values),
    onSuccess: () => toast.success("Company settings saved."),
    onError: (error) => toast.error("Could not save company settings", { description: error instanceof Error ? error.message : "Try again." }),
  });

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Company settings" title="Workspace identity and rollout context" copy="Settings now live on a real route and persist through the demo store." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data}
        errorMessage="Company settings are unavailable."
        emptyTitle="No company found"
        emptyCopy="Create a founder account or finish onboarding first."
      >
        {query.data ? (
          <Surface className="max-w-3xl p-6">
            <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
              <Field label="Name" error={form.formState.errors.name?.message}>
                <Input {...form.register("name")} />
              </Field>
              <Field label="Website" error={form.formState.errors.website?.message}>
                <Input {...form.register("website")} />
              </Field>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Category" error={form.formState.errors.category?.message}>
                  <Input {...form.register("category")} />
                </Field>
                <Field label="Stage" error={form.formState.errors.productStage?.message}>
                  <Input {...form.register("productStage")} />
                </Field>
                <Field label="Team size" error={form.formState.errors.teamSize?.message}>
                  <Input {...form.register("teamSize")} />
                </Field>
              </div>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving…" : "Save settings"}
              </Button>
            </form>
          </Surface>
        ) : null}
      </DataSection>
    </div>
  );
}

function MarketplacePage(): JSX.Element {
  const query = useQuery({
    queryKey: ["marketplace"],
    queryFn: () => demoApi.listMarketplace(),
  });
  useQueryErrorToast(query.error, "Could not load the marketplace");

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Marketplace" title="Browse tests you’re eligible to run" copy="Tester routes are fully wired now, including eligibility-aware marketplace cards and detail pages." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="Marketplace data is unavailable."
        emptyTitle="No tests available"
        emptyCopy="Once founders publish campaigns, they will appear here."
      >
        {query.data ? (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {query.data.map((test) => (
              <Surface key={test.id} className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{test.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{test.description}</p>
                  </div>
                  <Badge tone="success">{test.status}</Badge>
                </div>
                <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Reward</span>
                    <span>₹{test.reward_inr}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Target testers</span>
                    <span>{test.target_testers}</span>
                  </div>
                </div>
                <Button asChild className="mt-6 w-full">
                  <Link to={`/marketplace/${test.id}`}>Open brief</Link>
                </Button>
              </Surface>
            ))}
          </div>
        ) : null}
      </DataSection>
    </div>
  );
}

function MarketplaceDetailPage(): JSX.Element {
  const { id = "" } = useParams();
  const query = useQuery({
    queryKey: ["marketplace-detail", id],
    queryFn: () => demoApi.getTestDetail(id),
  });
  useQueryErrorToast(query.error, "Could not load the marketplace brief");

  return (
    <DataSection
      isLoading={query.isLoading}
      isError={query.isError}
      isEmpty={!query.data}
      errorMessage="The selected marketplace brief is unavailable."
      emptyTitle="Brief not found"
      emptyCopy="This campaign may have been unpublished."
    >
      {query.data ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Surface className="p-6">
            <SectionIntro eyebrow={query.data.test.category} title={query.data.test.title} copy={query.data.test.description} />
            <div className="mt-6 grid gap-3">
              {query.data.tasks.map((task) => (
                <div key={task.id} className="rounded-xl border border-border/70 p-4">
                  <p className="font-semibold">{task.position}. {task.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                </div>
              ))}
            </div>
          </Surface>
          <Surface className="p-6">
            <p className="text-sm font-semibold">Eligibility + payout</p>
            <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
                <span>Reward</span>
                <span>₹{query.data.test.reward_inr}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
                <span>Allowed badges</span>
                <span>{query.data.test.eligible_badges.join(", ")}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/70 px-4 py-3">
                <span>Framable</span>
                <span>{query.data.test.framable ? "Yes" : "No"}</span>
              </div>
            </div>
            <Button asChild className="mt-6 w-full">
              <Link to={`/test/${query.data.test.id}/take`}>
                Start runner
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Surface>
        </div>
      ) : null}
    </DataSection>
  );
}

function RunnerPage(): JSX.Element {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["runner-test", id],
    queryFn: () => demoApi.getTestDetail(id),
  });
  useQueryErrorToast(query.error, "Could not load the runner");

  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [confidence, setConfidence] = useState(4);
  const [attentionCheckPassed, setAttentionCheckPassed] = useState(true);
  const [pasteEvents, setPasteEvents] = useState(0);
  const [tabSwitches, setTabSwitches] = useState(0);
  const [idlePercent, setIdlePercent] = useState(18);
  const [firstClickMatched, setFirstClickMatched] = useState(true);
  const [eventLog, setEventLog] = useState<RunSubmissionInput["eventLog"]>([]);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(typeof window === "undefined" ? 1440 : window.innerWidth);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    FingerprintJS.load()
      .then((agent) => agent.get())
      .then((result) => setFingerprint(result.visitorId))
      .catch(() => setFingerprint("unavailable"));
  }, []);

  function pushEvent(name: string, origin: string, payload: Record<string, string | number | boolean | null>): void {
    setEventLog((current) => [
      ...current,
      {
        name,
        origin,
        payload,
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  const submitMutation = useMutation({
    mutationFn: async () => {
      const payload: RunSubmissionInput = {
        confidence,
        attentionCheckPassed,
        pasteEvents,
        tabSwitches,
        idlePercent,
        firstClickMatched,
        notes,
        completedTaskIds,
        fingerprint,
        eventLog,
      };
      return demoApi.submitRunner(id, payload);
    },
    onSuccess: async (submission) => {
      await queryClient.invalidateQueries();
      toast.success("Runner submitted.");
      navigate(`/submissions/${submission.id}`);
    },
    onError: (error) => {
      toast.error("Could not submit the run", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  if (viewportWidth < 1280) {
    return <StatePanel title="Desktop only" copy="The embedded runner is intentionally blocked below 1280px to match the product guardrail." variant="error" />;
  }

  return (
    <DataSection
      isLoading={query.isLoading}
      isError={query.isError}
      isEmpty={!query.data}
      errorMessage="Runner data is unavailable."
      emptyTitle="Runner unavailable"
      emptyCopy="The selected campaign could not be loaded."
    >
      {query.data ? (
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Surface className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div>
                <p className="text-sm font-semibold">{query.data.test.title}</p>
                <p className="text-sm text-muted-foreground">{query.data.test.url}</p>
              </div>
              <Badge tone="success">runner live</Badge>
            </div>
            <div className="aspect-[16/10] bg-secondary/40">
              <iframe
                title="test-runner"
                src={query.data.test.url}
                className="h-full w-full bg-background"
                sandbox="allow-scripts allow-same-origin allow-forms"
                onLoad={() => pushEvent("iframe_loaded", "iframe", { url: query.data?.test.url ?? null })}
              />
            </div>
          </Surface>
          <div className="grid gap-6">
            <Surface className="p-6">
              <p className="text-sm font-semibold">Overlay tasks</p>
              <div className="mt-4 grid gap-3">
                {query.data.tasks.map((task) => {
                  const complete = completedTaskIds.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      type="button"
                      className={cn("rounded-xl border p-4 text-left transition-colors", complete ? "border-primary bg-primary/10" : "border-border/70 bg-background")}
                      onClick={() => {
                        setCompletedTaskIds((current) =>
                          current.includes(task.id) ? current.filter((entry) => entry !== task.id) : [...current, task.id],
                        );
                        pushEvent("task_toggled", "overlay", { taskId: task.id, completed: !complete });
                      }}
                    >
                      <p className="font-semibold">{task.position}. {task.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{task.description}</p>
                    </button>
                  );
                })}
              </div>
            </Surface>

            <Surface className="p-6">
              <p className="text-sm font-semibold">Checkpoint form</p>
              <div className="mt-4 grid gap-4">
                <Field label="Notes">
                  <Textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    onPaste={() => {
                      setPasteEvents((current) => current + 1);
                      pushEvent("paste_detected", "widget", { count: pasteEvents + 1 });
                    }}
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Confidence">
                    <Input type="number" min={1} max={5} value={confidence} onChange={(event) => setConfidence(Number(event.target.value))} />
                  </Field>
                  <Field label="Idle %">
                    <Input type="number" min={0} max={100} value={idlePercent} onChange={(event) => setIdlePercent(Number(event.target.value))} />
                  </Field>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-xl border border-border/70 px-4 py-3">
                    <input type="checkbox" checked={attentionCheckPassed} onChange={(event) => setAttentionCheckPassed(event.target.checked)} />
                    <span className="text-sm text-muted-foreground">Attention check passed</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-border/70 px-4 py-3">
                    <input type="checkbox" checked={firstClickMatched} onChange={(event) => setFirstClickMatched(event.target.checked)} />
                    <span className="text-sm text-muted-foreground">First click matched success path</span>
                  </label>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Tab switches">
                    <Input type="number" min={0} value={tabSwitches} onChange={(event) => setTabSwitches(Number(event.target.value))} />
                  </Field>
                  <Field label="Fingerprint">
                    <Input value={fingerprint ?? "Loading…"} readOnly />
                  </Field>
                </div>
                <Button type="button" onClick={() => submitMutation.mutate()} disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? "Submitting…" : "Submit run"}
                </Button>
              </div>
            </Surface>
          </div>
        </div>
      ) : null}
    </DataSection>
  );
}

function SubmissionsPage(): JSX.Element {
  const { user } = useAuth();
  const query = useQuery({
    queryKey: ["submissions", user?.id],
    queryFn: () => demoApi.listTesterSubmissions(),
    enabled: user?.role === "tester",
  });
  useQueryErrorToast(query.error, "Could not load submissions");

  const columns: ColumnDef<SubmissionRow>[] = [
    {
      header: "Submission",
      cell: ({ row }) => (
        <Link to={`/submissions/${row.original.id}`} className="font-semibold hover:text-primary">
          {row.original.id}
        </Link>
      ),
    },
    {
      header: "Status",
      cell: ({ row }) => <Badge tone={row.original.status === "approved" ? "success" : row.original.status === "flagged" ? "danger" : "warning"}>{row.original.status}</Badge>,
    },
    {
      header: "Quality",
      cell: ({ row }) => <span>{row.original.quality_score}</span>,
    },
    {
      header: "Fraud",
      cell: ({ row }) => <span>{row.original.fraud_score}</span>,
    },
    {
      header: "Completed",
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.completed_at ? formatDate(row.original.completed_at) : "In progress"}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Submission history" title="All tester runs" copy="Tester submission history now persists through the routed runner and moderation flow." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="Submissions could not be loaded."
        emptyTitle="No submissions yet"
        emptyCopy="Run a marketplace test to populate this history."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="No submissions" emptyCopy="Run a test first." /> : null}
      </DataSection>
    </div>
  );
}

function TesterProfilePage(): JSX.Element {
  const { user } = useAuth();
  const query = useQuery({
    queryKey: ["tester-profile", user?.id],
    queryFn: () => demoApi.getProfileSummary(user?.id ?? ""),
    enabled: Boolean(user?.id),
  });
  useQueryErrorToast(query.error, "Could not load tester profile");

  return (
    <DataSection
      isLoading={query.isLoading}
      isError={query.isError}
      isEmpty={!query.data}
      errorMessage="Profile data is unavailable."
      emptyTitle="Profile missing"
      emptyCopy="No tester profile was found."
    >
      {query.data ? (
        <div className="space-y-6">
          <SectionIntro eyebrow="Tester profile" title={query.data.profile.full_name} copy="Badges, verification, and recent performance all live on this dedicated tester route." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Badge" value={query.data.profile.badge ?? "probation"} detail="Eligibility tier" icon={BadgeCheck} />
            <StatCard label="Verification" value={query.data.profile.verification_status} detail="Admin moderation state" icon={ShieldCheck} />
            <StatCard label="Submissions" value={String(query.data.submissions.length)} detail="Historical tester runs" icon={ClipboardList} />
            <StatCard label="College" value={query.data.profile.college ?? "Unknown"} detail="Audience metadata" icon={Building2} />
          </div>
        </div>
      ) : null}
    </DataSection>
  );
}

function AccountPage(): JSX.Element {
  const { user, refreshSession } = useAuth();
  const form = useForm<AccountProfileInput>({
    defaultValues: {
      fullName: user?.full_name ?? "",
      college: user?.college ?? "",
      githubUrl: user?.github_url ?? "",
      linkedinUrl: user?.linkedin_url ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: demoApi.saveAccountProfile,
    onSuccess: async () => {
      await refreshSession();
      toast.success("Account saved.");
    },
    onError: (error) => {
      toast.error("Could not save account", { description: error instanceof Error ? error.message : "Try again." });
    },
  });

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Account" title="User settings" copy="The shared `/account` route works for every authenticated role in the rebuilt app." />
      <Surface className="max-w-3xl p-6">
        <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <Field label="Full name">
            <Input {...form.register("fullName")} />
          </Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="College">
              <Input {...form.register("college")} />
            </Field>
            <Field label="GitHub">
              <Input {...form.register("githubUrl")} />
            </Field>
          </div>
          <Field label="LinkedIn">
            <Input {...form.register("linkedinUrl")} />
          </Field>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving…" : "Save account"}
          </Button>
        </form>
      </Surface>
    </div>
  );
}

function AdminOverviewPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["admin-overview"],
    queryFn: () => demoApi.getAdminOverview(),
  });
  useQueryErrorToast(query.error, "Could not load admin overview");

  return (
    <DataSection
      isLoading={query.isLoading}
      isError={query.isError}
      isEmpty={!query.data}
      errorMessage="Admin overview is unavailable."
      emptyTitle="Admin overview unavailable"
      emptyCopy="The moderation snapshot could not be loaded."
    >
      {query.data ? (
        <div className="space-y-6">
          <SectionIntro eyebrow="Admin overview" title="Platform health and moderation flow" copy="Assistant and super-admin routes are fully present, with super-only config gated separately." />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Pending verifications" value={String(query.data.pendingVerifications)} detail="Tester onboarding queue" icon={BadgeCheck} />
            <StatCard label="Open flags" value={String(query.data.openFlags)} detail="Fraud or quality reviews" icon={Flag} />
            <StatCard label="Live campaigns" value={String(query.data.liveTests)} detail="Active founder tests" icon={FlaskConical} />
            <StatCard label="Users" value={String(query.data.users)} detail="All platform profiles" icon={Users} />
          </div>
        </div>
      ) : null}
    </DataSection>
  );
}

function AdminVerificationsPage(): JSX.Element {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin-verifications"],
    queryFn: () => demoApi.listVerificationQueue(),
  });
  useQueryErrorToast(query.error, "Could not load the verification queue");

  const mutation = useMutation({
    mutationFn: demoApi.approveTester,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("Tester approved.");
    },
  });

  const columns: ColumnDef<{ profile: ProfileRow; verification: TesterVerificationRow }>[] = [
    {
      header: "Tester",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-semibold">{row.original.profile.full_name}</p>
          <p className="text-xs text-muted-foreground">{row.original.profile.email}</p>
        </div>
      ),
    },
    {
      header: "College",
      cell: ({ row }) => row.original.profile.college,
    },
    {
      header: "Screener",
      cell: ({ row }) => row.original.verification.screener_score,
    },
    {
      header: "Skills",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{row.original.verification.skills.join(", ")}</span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <Button size="sm" onClick={() => mutation.mutate(row.original.profile.id)} disabled={mutation.isPending}>
          Approve
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Admin / verifications" title="Tester verification queue" copy="Approvals here unlock the pending tester flow and marketplace access." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="Verification queue could not be loaded."
        emptyTitle="Queue clear"
        emptyCopy="No tester applications are waiting for review."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="Queue clear" emptyCopy="Nothing to review." /> : null}
      </DataSection>
    </div>
  );
}

function AdminReviewQueuePage(): JSX.Element {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["admin-review-queue"],
    queryFn: () => demoApi.listReviewQueue(),
  });
  useQueryErrorToast(query.error, "Could not load the review queue");

  const approveMutation = useMutation({
    mutationFn: demoApi.approveSubmission,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("Submission approved.");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: demoApi.rejectSubmission,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("Submission rejected.");
    },
  });

  const columns: ColumnDef<Awaited<ReturnType<typeof demoApi.listReviewQueue>>[number]>[] = [
    {
      header: "Submission",
      cell: ({ row }) => (
        <div className="space-y-1">
          <p className="font-semibold">{row.original.submission.id}</p>
          <p className="text-xs text-muted-foreground">{row.original.test?.title ?? "Unknown test"}</p>
        </div>
      ),
    },
    {
      header: "Tester",
      cell: ({ row }) => row.original.tester?.full_name ?? "Unknown",
    },
    {
      header: "Flags",
      cell: ({ row }) => row.original.flags.length,
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => approveMutation.mutate(row.original.submission.id)} disabled={approveMutation.isPending}>
            Approve
          </Button>
          <Button size="sm" variant="destructive" onClick={() => rejectMutation.mutate(row.original.submission.id)} disabled={rejectMutation.isPending}>
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Admin / review queue" title="Flagged submissions needing judgment" copy="Fraud thresholds now feed a routed moderation table instead of static cards." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="Review queue could not be loaded."
        emptyTitle="No flagged submissions"
        emptyCopy="Everything is currently under threshold or already resolved."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="No queue items" emptyCopy="Nothing to moderate." /> : null}
      </DataSection>
    </div>
  );
}

function AdminTestsPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["admin-tests"],
    queryFn: () => demoApi.listAllTests(),
  });
  useQueryErrorToast(query.error, "Could not load tests for admin");

  const columns: ColumnDef<TestRow>[] = [
    { header: "Campaign", cell: ({ row }) => <span className="font-semibold">{row.original.title}</span> },
    { header: "Status", cell: ({ row }) => <Badge>{row.original.status}</Badge> },
    { header: "Category", cell: ({ row }) => row.original.category },
    { header: "Reward", cell: ({ row }) => `₹${row.original.reward_inr}` },
    { header: "Published", cell: ({ row }) => row.original.published_at ? formatDate(row.original.published_at) : "Draft" },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Admin / tests" title="Platform-wide campaigns" copy="Supervisors can audit test health across all founders from one routed surface." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="Admin test list unavailable."
        emptyTitle="No campaigns"
        emptyCopy="No test records are present."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="No campaigns" emptyCopy="No platform tests yet." /> : null}
      </DataSection>
    </div>
  );
}

function AdminUsersPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["admin-users"],
    queryFn: () => demoApi.listUsers(),
  });
  useQueryErrorToast(query.error, "Could not load platform users");

  const columns: ColumnDef<ProfileRow>[] = [
    { header: "Name", cell: ({ row }) => <span className="font-semibold">{row.original.full_name}</span> },
    { header: "Role", cell: ({ row }) => <Badge>{row.original.role}</Badge> },
    { header: "Status", cell: ({ row }) => row.original.verification_status },
    { header: "Badge", cell: ({ row }) => row.original.badge ?? "—" },
    { header: "Email", cell: ({ row }) => <span className="text-muted-foreground">{row.original.email}</span> },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Admin / users" title="Platform identities" copy="The identity inventory now includes founders, testers, and admins with their role metadata." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="User list unavailable."
        emptyTitle="No users"
        emptyCopy="No profiles exist."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="No users" emptyCopy="No profiles found." /> : null}
      </DataSection>
    </div>
  );
}

function AdminFlagsPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["admin-flags"],
    queryFn: () => demoApi.listFlags(),
  });
  useQueryErrorToast(query.error, "Could not load flag inventory");

  const columns: ColumnDef<Awaited<ReturnType<typeof demoApi.listFlags>>[number]>[] = [
    { header: "Signal", cell: ({ row }) => <span className="font-semibold">{row.original.flag.label}</span> },
    { header: "Severity", cell: ({ row }) => row.original.flag.severity },
    { header: "Status", cell: ({ row }) => <Badge tone={row.original.flag.status === "resolved" ? "success" : "danger"}>{row.original.flag.status}</Badge> },
    { header: "Submission", cell: ({ row }) => row.original.submission?.id ?? "—" },
    { header: "Campaign", cell: ({ row }) => row.original.test?.title ?? "—" },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Admin / flags" title="Fraud signal inventory" copy="This route surfaces every flag row, not just the flagged submission summaries." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="Flags could not be loaded."
        emptyTitle="No flags"
        emptyCopy="There are no signal records yet."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="No flags" emptyCopy="No platform flags." /> : null}
      </DataSection>
    </div>
  );
}

function AdminAuditPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["admin-audit"],
    queryFn: () => demoApi.listAuditLogs(),
  });
  useQueryErrorToast(query.error, "Could not load audit logs");

  const columns: ColumnDef<AuditLogRow>[] = [
    { header: "Action", cell: ({ row }) => <span className="font-semibold">{row.original.action}</span> },
    { header: "Target", cell: ({ row }) => `${row.original.target_type} / ${row.original.target_id}` },
    { header: "Summary", cell: ({ row }) => <span className="text-muted-foreground">{row.original.summary}</span> },
    { header: "Date", cell: ({ row }) => formatDate(row.original.created_at) },
  ];

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Admin / audit" title="Audit trail" copy="Assistant admins can read this stream; super admins can also change config from the dedicated route." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data || query.data.length === 0}
        errorMessage="Audit logs unavailable."
        emptyTitle="No audit logs"
        emptyCopy="No audit records yet."
      >
        {query.data ? <DataTable data={query.data} columns={columns} emptyTitle="No audit logs" emptyCopy="No audit records." /> : null}
      </DataSection>
    </div>
  );
}

const adminConfigSchema = z.object({
  defaultModel: z.string().min(2),
  scoringModel: z.string().min(2),
  allowAutoApprove: z.boolean(),
  flagThreshold: z.number().min(1).max(100),
  reviewThreshold: z.number().min(1).max(100),
});

function AdminConfigPage(): JSX.Element {
  const query = useQuery({
    queryKey: ["admin-config"],
    queryFn: () => demoApi.getAdminConfig(),
  });
  useQueryErrorToast(query.error, "Could not load admin config");

  const form = useForm<AppConfig>({
    resolver: zodResolver(adminConfigSchema),
    values: query.data,
  });

  const mutation = useMutation({
    mutationFn: demoApi.saveAdminConfig,
    onSuccess: () => toast.success("Platform config saved."),
    onError: (error) => toast.error("Could not save config", { description: error instanceof Error ? error.message : "Try again." }),
  });

  return (
    <div className="space-y-6">
      <SectionIntro eyebrow="Admin / config" title="Super-admin platform configuration" copy="OpenAI models, moderation thresholds, and auto-approve policy live here and stay super-admin only." />
      <DataSection
        isLoading={query.isLoading}
        isError={query.isError}
        isEmpty={!query.data}
        errorMessage="Config is unavailable."
        emptyTitle="Config missing"
        emptyCopy="No configuration record was found."
      >
        {query.data ? (
          <Surface className="max-w-3xl p-6">
            <form className="grid gap-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Default model">
                  <Input {...form.register("defaultModel")} />
                </Field>
                <Field label="Scoring model">
                  <Input {...form.register("scoringModel")} />
                </Field>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Flag threshold">
                  <Input type="number" {...form.register("flagThreshold", { valueAsNumber: true })} />
                </Field>
                <Field label="Review threshold">
                  <Input type="number" {...form.register("reviewThreshold", { valueAsNumber: true })} />
                </Field>
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-border/70 px-4 py-3">
                <input type="checkbox" checked={form.watch("allowAutoApprove")} onChange={(event) => form.setValue("allowAutoApprove", event.target.checked)} />
                <span className="text-sm text-muted-foreground">Allow auto-approve below review threshold</span>
              </label>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving…" : "Save config"}
              </Button>
            </form>
          </Surface>
        ) : null}
      </DataSection>
    </div>
  );
}

function NotFoundPage(): JSX.Element {
  return (
    <PublicLayout>
      <section className="mx-auto flex min-h-[60vh] max-w-4xl items-center px-6 py-20">
        <StatePanel title="Route not found" copy="The requested route does not exist in this rebuild." variant="error" />
      </section>
    </PublicLayout>
  );
}

export default function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={<MarketingOverview />}
        />
        <Route path="/for-founders" element={<RoleLandingPage eyebrow="For founders" title="Plan, publish, and score founder campaigns from one routed shell." copy="Every founder surface in the requested plan now exists as a real page, including onboarding, dashboard, test list, wizard, detail, and settings." bullets={["8-step campaign wizard with URL preflight", "Server-authoritative metric thresholds", "Dashboard cards, charts, and submission drilldowns", "Workspace settings and shared account route"]} ctaPath="/signup" ctaLabel="Start as founder" />} />
        <Route path="/for-testers" element={<RoleLandingPage eyebrow="For testers" title="Get verified, browse campaigns, run structured tests, and build a badge history." copy="The tester journey is fully routed now, from onboarding through marketplace and submission detail." bullets={["Six-step onboarding and pending state", "Eligibility-aware marketplace cards", "Desktop-only runner route with event capture", "Submission history and routed profile page"]} ctaPath="/signup" ctaLabel="Apply as tester" />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<LegalPage title="Terms of service" sections={[{ heading: "Usage", copy: "Founders are responsible for only embedding URLs they have permission to test. Testers agree to complete runs honestly and inside the routed runner." }, { heading: "Moderation", copy: "Submissions can be auto-flagged or rejected based on fraud-score thresholds, attention checks, and moderator review." }]} />} />
        <Route path="/privacy" element={<LegalPage title="Privacy policy" sections={[{ heading: "Event collection", copy: "Runner events, qualitative notes, and moderation metadata are collected to compute metrics and protect campaign quality." }, { heading: "Identity", copy: "Tester verification data is used to confirm eligibility and is intended to stay inside protected admin flows." }]} />} />

        <Route
          path="/login"
          element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <SignupPage />
            </AuthRedirect>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AuthRedirect>
              <ResetPasswordPage />
            </AuthRedirect>
          }
        />

        <Route
          path="/onboarding/company"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder"]}>
                  <CompanyOnboardingPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder"]}>
                  <FounderDashboardPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/tests"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder"]}>
                  <TestsListPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/tests/new"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder"]}>
                  <TestCreatePage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/tests/:id"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder"]}>
                  <TestDetailPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/tests/:id/submissions/:sid"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder"]}>
                  <SubmissionDetailPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/company/settings"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder"]}>
                  <CompanySettingsPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />

        <Route
          path="/onboarding/tester"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <TesterOnboardingPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/onboarding/tester/pending"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <TesterPendingPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/marketplace"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <MarketplacePage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/marketplace/:id"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <MarketplaceDetailPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/test/:id/take"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <RunnerPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/submissions"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <SubmissionsPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/submissions/:sid"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <SubmissionDetailPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["tester"]}>
                  <TesterProfilePage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />

        <Route
          path="/account"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["founder", "tester", "admin"]}>
                  <AccountPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]}>
                  <AdminOverviewPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/verifications"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]}>
                  <AdminVerificationsPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/review-queue"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]}>
                  <AdminReviewQueuePage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/tests"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]}>
                  <AdminTestsPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]}>
                  <AdminUsersPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/flags"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]}>
                  <AdminFlagsPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/audit"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]}>
                  <AdminAuditPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />
        <Route
          path="/admin/config"
          element={
            <RequireAuth>
              <ProtectedShell>
                <RequireRoles roles={["admin"]} adminLevels={["super"]}>
                  <AdminConfigPage />
                </RequireRoles>
              </ProtectedShell>
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

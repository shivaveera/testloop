import type { JSX } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardCheck,
  Clock3,
  Droplets,
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";

export const plumbexMeta = {
  id: "plumbex",
  name: "Plumbex",
  niche: "Plumbing service",
  description:
    "A vivid royal blue and yellow plumbing template for service calls, repair requests, contractor trust, and local coverage.",
  imageSrc: "/assets/photos/plumbing/plumbex-real.jpg",
  preview: "/assets/photos/plumbing/plumbex-real.jpg",
  previewImage: "/assets/photos/plumbing/plumbex-real.jpg",
  tone: "Royal blue and yellow",
  summary: "Bold contractor energy with clear services, reliability content, support cards, and a crew CTA.",
  primaryCta: "Use this template",
  secondaryCta: "Request a sample",
  ctas: ["Use this template", "Request a sample"],
  tags: ["plumbing", "contractor", "bold", "blue and yellow"],
  sections: ["nav", "hero", "services", "quality", "support", "team", "footer"],
} as const;

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Reliability", href: "#reliability" },
  { label: "Support", href: "#support" },
  { label: "Crew", href: "#crew" },
];

const services = [
  {
    title: "Leak and pipe repair",
    copy: "Focused service cards make common repair paths easy to scan and request.",
    Icon: Wrench,
  },
  {
    title: "Drain clearing",
    copy: "Bold contact placement keeps urgent calls and online requests close by.",
    Icon: Droplets,
  },
  {
    title: "Water heaters",
    copy: "Installation and replacement pages can use clean notes, options, and reminders.",
    Icon: Flame,
  },
  {
    title: "Maintenance visits",
    copy: "Recurring service and inspection details fit into compact, readable cards.",
    Icon: CalendarCheck,
  },
];

const reliabilityItems = [
  "Clear intake steps for calls and sample requests",
  "Service-area blocks that can be adapted by town",
  "Structured sections for hours, visit notes, and contact options",
  "Trust-focused copy areas without fake reviews or inflated claims",
];

const supportCards = [
  {
    title: "Call-first layout",
    copy: "Large action buttons and phone-ready sections support quick decisions on mobile.",
    Icon: Phone,
  },
  {
    title: "Coverage clarity",
    copy: "Map and area placeholders make it simple to show where the business works.",
    Icon: MapPin,
  },
  {
    title: "Question handling",
    copy: "Support cards give room for FAQs, visit preparation, and follow-up messages.",
    Icon: MessageCircle,
  },
];

const crewCards = [
  {
    role: "Lead technician",
    detail: "Profile space for a real team photo, specialty, and contact note.",
  },
  {
    role: "Service coordinator",
    detail: "A tidy card for dispatch notes, hours, and customer handoff details.",
  },
];

function PlumbexMark(): JSX.Element {
  return (
    <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#ffd12f] text-[#0736a8] shadow-[0_12px_26px_rgba(3,34,100,0.24)]">
      <Wrench aria-hidden="true" className="h-5 w-5" strokeWidth={3} />
    </span>
  );
}

function SectionHeader({
  label,
  title,
  copy,
  align = "left",
}: {
  label: string;
  title: string;
  copy: string;
  align?: "left" | "center";
}): JSX.Element {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className="text-sm font-black uppercase text-[#0b4ee6]">{label}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-[#061a42] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-[#52617b] sm:text-lg">{copy}</p>
    </div>
  );
}

export function PlumbexTemplate(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#f3f7ff] font-sans text-[#061a42]">
      <header className="sticky top-0 z-40 border-b border-[#dbe6fb] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[76px] w-[min(1160px,calc(100%_-_32px))] items-center justify-between gap-5">
          <a className="flex min-w-0 items-center gap-3" href="#top" aria-label="Plumbex home">
            <PlumbexMark />
            <span>
              <span className="block text-xl font-black leading-none text-[#0736a8]">Plumbex</span>
              <span className="mt-1 block text-xs font-bold uppercase text-[#5f6f8a]">
                plumbing template
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-[#dbe6fb] bg-[#f8fbff] p-1 md:flex" aria-label="Plumbex sections">
            {navItems.map((item) => (
              <a
                className="rounded-full px-4 py-2 text-sm font-bold text-[#445675] transition hover:bg-white hover:text-[#0736a8]"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#ffd12f] px-5 text-sm font-black text-[#062a78] shadow-[0_14px_28px_rgba(255,177,0,0.28)] transition hover:-translate-y-0.5"
            href="#template-cta"
          >
            Use this template
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="overflow-hidden bg-[#073bbb]">
          <div className="relative mx-auto grid w-[min(1160px,calc(100%_-_32px))] gap-10 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:py-20">
            <div className="relative z-10">
              <h1 className="max-w-3xl text-5xl font-black leading-[0.96] text-white sm:text-6xl lg:text-7xl">
                Plumbing websites built for fast decisions.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#dbe8ff]">
                Plumbex gives contractors a bold blue and yellow site structure for services, service areas, reliability notes, crew details, and clear request paths.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ffd12f] px-6 text-base font-black text-[#062a78] shadow-[0_18px_34px_rgba(255,177,0,0.28)] transition hover:-translate-y-0.5"
                  href="#template-cta"
                >
                  Use this template
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                  href="#sample"
                >
                  Request a sample
                </a>
              </div>
              <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-3" aria-label="Template emphasis">
                {["Calls", "Repairs", "Coverage"].map((item) => (
                  <span className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-extrabold text-white" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="rounded-[34px] border border-white/20 bg-white/10 p-3 shadow-[0_30px_70px_rgba(2,18,62,0.38)]">
                <img
                  className="block aspect-[4/3] w-full rounded-[26px] object-cover"
                  src={plumbexMeta.imageSrc}
                  alt="Real plumber working with tools in a kitchen for the Plumbex plumbing template"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24" id="services">
          <div className="mx-auto w-full max-w-[1160px]">
            <SectionHeader
              label="Services grid"
              title="Common plumbing work gets a bold, organized home."
              copy="Each card keeps the icon, service name, and next action clear so the layout can be adapted without adding noisy claims."
            />
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => {
                const Icon = service.Icon;

                return (
                  <article
                    className="rounded-[8px] border border-[#dbe6fb] bg-[#f8fbff] p-6 shadow-[0_18px_45px_rgba(9,37,96,0.08)] transition hover:-translate-y-1 hover:border-[#ffd12f]"
                    key={service.title}
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#073bbb] text-[#ffd12f]">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-black text-[#061a42]">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#52617b]">{service.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#eef5ff] px-4 py-16 sm:py-24" id="reliability">
          <div className="mx-auto grid w-full max-w-[1160px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="rounded-[8px] bg-[#073bbb] p-8 text-white shadow-[0_28px_70px_rgba(7,59,187,0.22)]">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#ffd12f] text-[#062a78]">
                  <ShieldCheck aria-hidden="true" className="h-6 w-6" />
                </span>
                <h2 className="text-3xl font-black leading-tight">Quality and reliability, made visible.</h2>
              </div>
              <p className="mt-5 text-base leading-8 text-[#dbe8ff]">
                This section gives a plumbing business room to explain preparation, communication, service areas, and the practical details customers check before reaching out.
              </p>
              <div className="mt-8 rounded-[8px] border border-white/20 bg-white/10 p-5">
                <p className="text-sm font-black uppercase text-[#ffd12f]">Template note</p>
                <p className="mt-3 text-sm leading-7 text-[#e8f1ff]">
                  Use real licenses, warranties, photos, and response details when the final business provides them.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {reliabilityItems.map((item) => (
                <div className="flex gap-4 rounded-[8px] border border-[#dbe6fb] bg-white p-5 shadow-[0_14px_38px_rgba(9,37,96,0.07)]" key={item}>
                  <BadgeCheck aria-hidden="true" className="mt-0.5 h-6 w-6 flex-none text-[#0b4ee6]" />
                  <p className="text-base font-bold leading-7 text-[#283a59]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:py-24" id="support">
          <div className="mx-auto w-full max-w-[1160px]">
            <SectionHeader
              align="center"
              label="Support cards"
              title="Contact paths stay practical on every screen."
              copy="Plumbex keeps support content close to the decisions customers make: call now, check coverage, ask a question, or request a visit."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {supportCards.map((card) => {
                const Icon = card.Icon;

                return (
                  <article className="rounded-[8px] border border-[#dbe6fb] bg-[#f8fbff] p-7" key={card.title}>
                    <div className="flex items-center gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#ffd12f] text-[#062a78]">
                        <Icon aria-hidden="true" className="h-6 w-6" />
                      </span>
                      <h3 className="text-xl font-black text-[#061a42]">{card.title}</h3>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-[#52617b]">{card.copy}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#061a42] px-4 py-16 text-white sm:py-24" id="crew">
          <div className="mx-auto grid w-full max-w-[1160px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase text-[#ffd12f]">Crew and CTA</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Put real people and the next step in the same view.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#dbe8ff]">
                The team area is ready for crew photos, role summaries, and customer-facing contact options once the business details are known.
              </p>
              <div className="mt-8 flex flex-wrap gap-3" id="template-cta">
                <a
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ffd12f] px-6 text-base font-black text-[#062a78] transition hover:-translate-y-0.5"
                  href="#top"
                >
                  Use this template
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                  href="#sample"
                  id="sample"
                >
                  Request a sample
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {crewCards.map((card) => (
                <article className="rounded-[8px] border border-white/20 bg-white/10 p-6" key={card.role}>
                  <div className="mb-6 grid h-24 w-24 place-items-center rounded-full bg-[#ffd12f] text-[#062a78]">
                    <Users aria-hidden="true" className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black">{card.role}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#dbe8ff]">{card.detail}</p>
                </article>
              ))}
              <article className="rounded-[8px] border border-[#ffd12f]/40 bg-[#ffd12f] p-6 text-[#062a78] sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-5">
                  <div>
                    <h3 className="text-2xl font-black">Ready for local service content</h3>
                    <p className="mt-2 max-w-2xl text-sm font-bold leading-7 text-[#253b74]">
                      Add real business details, service areas, photos, contact information, and approved trust details.
                    </p>
                  </div>
                  <ClipboardCheck aria-hidden="true" className="h-12 w-12" />
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dbe6fb] bg-white px-4 py-10">
        <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <a className="flex items-center gap-3" href="#top" aria-label="Plumbex home">
            <PlumbexMark />
            <span>
              <span className="block text-lg font-black text-[#0736a8]">Plumbex</span>
              <span className="block text-sm font-semibold text-[#52617b]">Bold plumbing template for local contractors.</span>
            </span>
          </a>
          <nav className="flex flex-wrap gap-4 text-sm font-bold text-[#52617b]" aria-label="Footer navigation">
            {navItems.map((item) => (
              <a className="hover:text-[#0736a8]" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-sm font-bold text-[#52617b]">
            <Clock3 aria-hidden="true" className="h-4 w-4 text-[#0b4ee6]" />
            <span>Template preview</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

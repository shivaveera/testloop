import type { JSX } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  PhoneCall,
  Wrench,
} from "lucide-react";

export const swiftRooterMeta = {
  id: "swift-rooter",
  name: "SwiftRooter",
  tone: "Premium white plumbing service page with red and blue identity",
  summary:
    "A modern SwiftRooter plumbing template with service cards, locations, trust content, booking CTA, and FAQ.",
  preview: "/assets/photos/plumbing/swift-rooter-real.jpg",
  industry: "Plumbing",
  description:
    "Premium white plumbing template with red and blue service-company branding, service cards, locations, contact CTA, and FAQ.",
  imageSrc: "/assets/photos/plumbing/swift-rooter-real.jpg",
  previewImage: "/assets/photos/plumbing/swift-rooter-real.jpg",
  tags: ["plumbing", "service business", "light", "red and blue"],
  ctas: ["Use this template", "Request a sample"],
} as const;

const navItems = [
  { label: "Services", href: "#sr-services" },
  { label: "Locations", href: "#sr-locations" },
  { label: "Why Us", href: "#sr-why" },
  { label: "FAQ", href: "#sr-faq" },
];

const services = [
  {
    title: "Drain clearing",
    copy: "A focused card for clogged sinks, slow tubs, and main-line blockage requests.",
    icon: "drain",
  },
  {
    title: "Leak repairs",
    copy: "Clear repair language for supply lines, fixture leaks, and visible water damage.",
    icon: "drop",
  },
  {
    title: "Water heaters",
    copy: "Room for tank, tankless, repair, replacement, and maintenance service details.",
    icon: "heater",
  },
  {
    title: "Fixture installs",
    copy: "Useful for faucets, toilets, disposals, valves, and other common upgrades.",
    icon: "fixture",
  },
];

const locations = [
  "Northside",
  "Downtown",
  "West End",
  "River District",
  "Hillcrest",
  "Oak Grove",
];

const reasons = [
  {
    title: "Fast path to contact",
    copy: "Phone, booking, and sample CTAs stay visible without crowding the page.",
  },
  {
    title: "Service-first structure",
    copy: "Every section helps visitors understand the work offered before they ask for help.",
  },
  {
    title: "Trust cues with restraint",
    copy: "Clean credential, process, and location areas avoid fake review or metric clutter.",
  },
  {
    title: "Built for mobile scans",
    copy: "Large tap targets, short cards, and a compact form suit urgent plumbing visits.",
  },
];

const faqs = [
  {
    question: "Can this template support emergency plumbing pages?",
    answer:
      "Yes. The hero, services, and contact sections are structured so emergency, drain, leak, and water-heater calls can be presented clearly.",
  },
  {
    question: "Can the locations be changed?",
    answer:
      "Yes. The location list is built as simple content so it can be replaced with real towns, neighborhoods, or service areas.",
  },
  {
    question: "Does the page need real photos?",
    answer:
      "Real crew, van, and project photos can be added, but the template preview asset is included so the page still feels complete before photography is available.",
  },
  {
    question: "Can it include booking or quote requests?",
    answer:
      "Yes. The CTA section already includes a compact contact form pattern and buttons for sample requests or service enquiries.",
  },
];

type ServiceIcon = (typeof services)[number]["icon"];

function PlumbingIcon({ type }: { type: ServiceIcon }): JSX.Element {
  if (type === "drain") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M12 17h24v5c0 5.5-4.5 10-10 10h-4c-5.5 0-10-4.5-10-10v-5Z" />
        <path d="M18 17v-5h12v5" />
        <path d="M17 37h14" />
      </svg>
    );
  }

  if (type === "drop") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M24 8s11 12.2 11 22a11 11 0 0 1-22 0C13 20.2 24 8 24 8Z" />
        <path d="M20 31c1.2 2.3 3.4 3.5 6.5 3.5" />
      </svg>
    );
  }

  if (type === "heater") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <rect x="15" y="8" width="18" height="32" rx="8" />
        <path d="M20 18h8" />
        <path d="M21 28c0-3 6-3 6-6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M14 13h20v8H14z" />
      <path d="M24 21v16" />
      <path d="M17 37h14" />
      <path d="M34 17h5v11" />
    </svg>
  );
}

function SectionIntro({
  eyebrow,
  title,
  copy,
  titleId,
  center = false,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  titleId?: string;
  center?: boolean;
}): JSX.Element {
  return (
    <div className={`sr-section-intro${center ? " sr-section-intro--center" : ""}`}>
      <p>{eyebrow}</p>
      <h2 id={titleId}>{title}</h2>
      <span>{copy}</span>
    </div>
  );
}

export function SwiftRooterTemplate(): JSX.Element {
  return (
    <div className="swift-rooter-template">
      <style>{swiftRooterStyles}</style>

      <header className="sr-header">
        <div className="sr-container sr-header__inner">
          <a className="sr-brand" href="#sr-top" aria-label="SwiftRooter home">
            <span className="sr-brand__mark" aria-hidden="true">
              SR
            </span>
            <span>
              <strong>SwiftRooter</strong>
              <small>Plumbing service template</small>
            </span>
          </a>

          <nav className="sr-nav" aria-label="SwiftRooter template navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="sr-button sr-button--primary sr-header__cta" href="#sr-contact">
            Use this template
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="sr-top">
        <section className="sr-hero" aria-labelledby="sr-hero-title">
          <div className="sr-container sr-hero__grid">
            <div className="sr-hero__copy">
              <h1 id="sr-hero-title">SwiftRooter Plumbing</h1>
              <p>
                A premium white, red, and blue website template for plumbing companies that need clear service
                pages, strong contact paths, and a polished local presence.
              </p>
              <div className="sr-hero__actions" aria-label="Template actions">
                <a className="sr-button sr-button--primary" href="#sr-contact">
                  Use this template
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="sr-button sr-button--secondary" href="#sr-contact">
                  Request a sample
                </a>
              </div>
              <div className="sr-hero__service-strip" aria-label="Featured plumbing services">
                <span>
                  <Wrench size={16} aria-hidden="true" />
                  Emergency repairs
                </span>
                <span>
                  <Clock3 size={16} aria-hidden="true" />
                  Clear scheduling
                </span>
                <span>
                  <MapPin size={16} aria-hidden="true" />
                  Service areas
                </span>
              </div>
            </div>

            <figure className="sr-hero__media">
              <img
                src={swiftRooterMeta.imageSrc}
                alt="Real plumber working under a kitchen sink for the SwiftRooter plumbing template"
              />
            </figure>
          </div>
        </section>

        <section className="sr-section" id="sr-services" aria-labelledby="sr-services-title">
          <div className="sr-container">
            <SectionIntro
              eyebrow="Services"
              titleId="sr-services-title"
              title="Cards for the repairs customers search for first."
              copy="Each card has short copy, a distinct icon, and enough structure for a service company to add real details."
            />
            <div className="sr-service-grid">
              {services.map((service) => (
                <article className="sr-service-card" key={service.title}>
                  <div className="sr-service-card__icon">
                    <PlumbingIcon type={service.icon} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <a href="#sr-contact" aria-label={`Request a sample for ${service.title}`}>
                    Request a sample
                    <ChevronRight size={16} aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sr-locations" id="sr-locations" aria-labelledby="sr-locations-title">
          <div className="sr-container sr-locations__grid">
            <div>
              <SectionIntro
                eyebrow="Locations"
                titleId="sr-locations-title"
                title="A service-area section that stays quick to scan."
                copy="Use compact location tiles for towns, neighborhoods, or districts without making visitors dig."
              />
              <a className="sr-text-link" href="#sr-contact">
                Request a sample for your area
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <ul className="sr-location-list" aria-label="Example service locations">
              {locations.map((location) => (
                <li key={location}>
                  <MapPin size={18} aria-hidden="true" />
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="sr-section sr-section--why" id="sr-why" aria-labelledby="sr-why-title">
          <div className="sr-container">
            <SectionIntro
              eyebrow="Why choose us"
              titleId="sr-why-title"
              title="A cleaner way to present a plumbing company."
              copy="The layout builds confidence with useful details instead of fake reviews, invented logos, or inflated numbers."
              center
            />
            <div className="sr-why-grid">
              {reasons.map((reason) => (
                <article className="sr-why-card" key={reason.title}>
                  <CheckCircle2 size={21} aria-hidden="true" />
                  <h3>{reason.title}</h3>
                  <p>{reason.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sr-contact" id="sr-contact" aria-labelledby="sr-contact-title">
          <div className="sr-container sr-contact__panel">
            <div className="sr-contact__copy">
              <p className="sr-contact__label">Booking and contact CTA</p>
              <h2 id="sr-contact-title">Ready to turn this into a SwiftRooter sample?</h2>
              <p>
                Keep the CTA simple: one path for choosing the template, one path for requesting a tailored sample.
              </p>
              <div className="sr-contact__actions">
                <a className="sr-button sr-button--primary" href="mailto:hello@syncforce.com?subject=SwiftRooter%20template">
                  <Mail size={17} aria-hidden="true" />
                  Request a sample
                </a>
                <a className="sr-button sr-button--light" href="#sr-services">
                  <PhoneCall size={17} aria-hidden="true" />
                  Use this template
                </a>
              </div>
            </div>

            {/* TODO: Connect this demo form to the Syncforce request-sample backend before production use. */}
            <form
              className="sr-contact-form"
              action="#sr-contact"
              aria-label="SwiftRooter sample request form"
              onSubmit={(event) => event.preventDefault()}
            >
              <label>
                Name
                <input name="name" type="text" autoComplete="name" placeholder="Your name" />
              </label>
              <label>
                Service area
                <input name="serviceArea" type="text" autoComplete="address-level2" placeholder="Town or city" />
              </label>
              <label>
                Main service
                <select name="mainService" defaultValue="Drain clearing">
                  <option>Drain clearing</option>
                  <option>Leak repairs</option>
                  <option>Water heaters</option>
                  <option>Fixture installs</option>
                </select>
              </label>
              <button className="sr-button sr-button--primary" type="submit">
                <CalendarDays size={17} aria-hidden="true" />
                Request a sample
              </button>
            </form>
          </div>
        </section>

        <section className="sr-section sr-faq" id="sr-faq" aria-labelledby="sr-faq-title">
          <div className="sr-container sr-faq__grid">
            <div>
              <SectionIntro
                eyebrow="FAQ"
                titleId="sr-faq-title"
                title="Questions a plumbing template should answer."
                copy="Short answers help owners understand what can be customized before the first edit."
              />
              <div className="sr-footer-brand">
                <span className="sr-brand__mark" aria-hidden="true">
                  SR
                </span>
                <span>
                  <strong>SwiftRooter</strong>
                  <small>Premium plumbing template</small>
                </span>
              </div>
            </div>
            <div className="sr-faq__list">
              {faqs.map((faq) => (
                <details className="sr-faq__item" key={faq.question}>
                  <summary>
                    {faq.question}
                    <ChevronRight size={17} aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="sr-footer">
        <div className="sr-container sr-footer__inner">
          <p>SwiftRooter plumbing template preview.</p>
          <a href="#sr-top">Back to top</a>
        </div>
      </footer>
    </div>
  );
}

const swiftRooterStyles = `
.swift-rooter-template {
  --sr-red: #df2338;
  --sr-red-dark: #b91f31;
  --sr-blue: #1768e5;
  --sr-blue-dark: #0f3f91;
  --sr-navy: #10213f;
  --sr-ink: #162236;
  --sr-muted: #64748b;
  --sr-soft: #f3f7fc;
  --sr-soft-blue: #eaf3ff;
  --sr-border: #dbe7f4;
  --sr-card: #ffffff;
  --sr-shadow: 0 24px 70px rgba(16, 33, 63, 0.12);
  color: var(--sr-ink);
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, ui-sans-serif, system-ui, sans-serif;
  font-feature-settings: "kern";
  letter-spacing: 0;
  line-height: 1.5;
  overflow: hidden;
}

.swift-rooter-template *,
.swift-rooter-template *::before,
.swift-rooter-template *::after {
  box-sizing: border-box;
}

.swift-rooter-template a {
  color: inherit;
  text-decoration: none;
}

.swift-rooter-template button,
.swift-rooter-template input,
.swift-rooter-template select {
  font: inherit;
}

.sr-container {
  width: min(1160px, calc(100% - 40px));
  margin: 0 auto;
}

.sr-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid rgba(219, 231, 244, 0.88);
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(22px) saturate(160%);
}

.sr-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  min-height: 76px;
}

.sr-brand,
.sr-footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.sr-brand__mark {
  display: grid;
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 8px;
  color: #ffffff;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0)),
    linear-gradient(135deg, var(--sr-red) 0%, var(--sr-red) 48%, var(--sr-blue) 50%, var(--sr-blue-dark) 100%);
  box-shadow: 0 14px 30px rgba(23, 104, 229, 0.18);
  font-size: 0.78rem;
  font-weight: 900;
}

.sr-brand strong,
.sr-footer-brand strong {
  display: block;
  color: var(--sr-navy);
  font-size: 1.02rem;
  line-height: 1.05;
}

.sr-brand small,
.sr-footer-brand small {
  display: block;
  margin-top: 3px;
  color: var(--sr-muted);
  font-size: 0.78rem;
  line-height: 1.1;
}

.sr-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px;
  border: 1px solid var(--sr-border);
  border-radius: 999px;
  background: rgba(243, 247, 252, 0.74);
}

.sr-nav a {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  color: #334155;
  font-size: 0.88rem;
  font-weight: 700;
  white-space: nowrap;
}

.sr-nav a:hover {
  color: var(--sr-blue-dark);
  background: #ffffff;
}

.sr-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.94rem;
  font-weight: 800;
  line-height: 1.1;
  text-align: center;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background 180ms ease;
}

.sr-button:hover {
  transform: translateY(-1px);
}

.sr-button--primary {
  color: #ffffff;
  background: linear-gradient(180deg, #f04a5c, var(--sr-red));
  box-shadow: 0 16px 34px rgba(223, 35, 56, 0.24);
}

.sr-button--secondary {
  border-color: rgba(23, 104, 229, 0.2);
  color: var(--sr-blue-dark);
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(16, 33, 63, 0.08);
}

.sr-button--light {
  border-color: rgba(255, 255, 255, 0.36);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}

.sr-hero {
  position: relative;
  padding: 86px 0 72px;
  background:
    radial-gradient(circle at 80% 12%, rgba(23, 104, 229, 0.12), transparent 34%),
    linear-gradient(180deg, #f8fbff 0%, #ffffff 82%);
}

.sr-hero::before {
  position: absolute;
  inset: 0;
  pointer-events: none;
  content: "";
  background:
    linear-gradient(90deg, rgba(23, 104, 229, 0.05) 1px, transparent 1px),
    linear-gradient(180deg, rgba(23, 104, 229, 0.05) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(180deg, #000000 0%, transparent 70%);
}

.sr-hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(440px, 1.08fr);
  gap: 52px;
  align-items: center;
}

.sr-hero__copy h1 {
  max-width: 620px;
  margin: 0;
  color: var(--sr-navy);
  font-size: clamp(3rem, 6vw, 5.65rem);
  font-weight: 900;
  line-height: 0.94;
}

.sr-hero__copy p {
  max-width: 620px;
  margin: 24px 0 0;
  color: #4b5c73;
  font-size: 1.15rem;
  line-height: 1.7;
}

.sr-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.sr-hero__service-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.sr-hero__service-strip span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid var(--sr-border);
  border-radius: 999px;
  color: #34445b;
  background: rgba(255, 255, 255, 0.78);
  font-size: 0.88rem;
  font-weight: 750;
}

.sr-hero__service-strip svg {
  color: var(--sr-blue);
}

.sr-hero__media {
  margin: 0;
  border: 1px solid rgba(219, 231, 244, 0.92);
  border-radius: 30px;
  background: #ffffff;
  box-shadow: var(--sr-shadow);
  overflow: hidden;
}

.sr-hero__media img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.sr-section {
  padding: 88px 0;
  background: #ffffff;
}

.sr-section-intro {
  max-width: 690px;
}

.sr-section-intro--center {
  margin: 0 auto;
  text-align: center;
}

.sr-section-intro p,
.sr-contact__label {
  margin: 0 0 12px;
  color: var(--sr-red);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sr-section-intro h2,
.sr-contact__copy h2 {
  margin: 0;
  color: var(--sr-navy);
  font-size: clamp(2.1rem, 4vw, 3.7rem);
  font-weight: 900;
  line-height: 1;
}

.sr-section-intro span,
.sr-contact__copy > p {
  display: block;
  margin-top: 18px;
  color: var(--sr-muted);
  font-size: 1.04rem;
  line-height: 1.7;
}

.sr-service-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 38px;
}

.sr-service-card,
.sr-why-card,
.sr-faq__item {
  border: 1px solid var(--sr-border);
  border-radius: 8px;
  background: var(--sr-card);
  box-shadow: 0 18px 46px rgba(16, 33, 63, 0.07);
}

.sr-service-card {
  display: flex;
  min-height: 310px;
  flex-direction: column;
  padding: 22px;
}

.sr-service-card__icon {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 8px;
  color: var(--sr-blue);
  background: var(--sr-soft-blue);
}

.sr-service-card__icon svg {
  width: 34px;
  height: 34px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 3.2;
}

.sr-service-card h3,
.sr-why-card h3 {
  margin: 22px 0 0;
  color: var(--sr-navy);
  font-size: 1.18rem;
  font-weight: 900;
}

.sr-service-card p,
.sr-why-card p,
.sr-faq__item p {
  margin: 12px 0 0;
  color: var(--sr-muted);
  line-height: 1.65;
}

.sr-service-card a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  margin-top: auto;
  padding-top: 22px;
  color: var(--sr-blue-dark);
  font-size: 0.92rem;
  font-weight: 850;
}

.sr-locations {
  padding: 88px 0;
  background:
    linear-gradient(135deg, rgba(23, 104, 229, 0.08), rgba(223, 35, 56, 0.06)),
    #f7faff;
}

.sr-locations__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(360px, 1fr);
  gap: 48px;
  align-items: center;
}

.sr-text-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  color: var(--sr-blue-dark);
  font-weight: 850;
}

.sr-location-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.sr-location-list li {
  display: flex;
  align-items: center;
  gap: 11px;
  min-height: 66px;
  padding: 0 18px;
  border: 1px solid rgba(219, 231, 244, 0.96);
  border-radius: 8px;
  color: var(--sr-navy);
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 14px 34px rgba(16, 33, 63, 0.06);
  font-weight: 850;
}

.sr-location-list svg {
  color: var(--sr-red);
}

.sr-section--why {
  background:
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
}

.sr-why-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 38px;
}

.sr-why-card {
  padding: 22px;
}

.sr-why-card svg {
  color: var(--sr-red);
}

.sr-contact {
  padding: 92px 0;
  background: var(--sr-navy);
}

.sr-contact__panel {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.72fr);
  gap: 44px;
  align-items: center;
}

.sr-contact__copy h2,
.sr-contact__copy > p,
.sr-contact__label {
  color: #ffffff;
}

.sr-contact__copy > p {
  color: rgba(255, 255, 255, 0.76);
}

.sr-contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.sr-contact-form {
  display: grid;
  gap: 14px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.18);
}

.sr-contact-form label {
  display: grid;
  gap: 7px;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.82rem;
  font-weight: 800;
}

.sr-contact-form input,
.sr-contact-form select {
  width: 100%;
  min-height: 46px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
  padding: 0 13px;
  outline: none;
}

.sr-contact-form input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.sr-contact-form select option {
  color: var(--sr-ink);
}

.sr-faq {
  background: #ffffff;
}

.sr-faq__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(420px, 1fr);
  gap: 48px;
  align-items: start;
}

.sr-footer-brand {
  margin-top: 34px;
}

.sr-faq__list {
  display: grid;
  gap: 12px;
}

.sr-faq__item {
  padding: 0 18px;
}

.sr-faq__item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 66px;
  cursor: pointer;
  color: var(--sr-navy);
  font-weight: 850;
  list-style: none;
}

.sr-faq__item summary::-webkit-details-marker {
  display: none;
}

.sr-faq__item summary svg {
  flex: 0 0 auto;
  color: var(--sr-blue);
  transition: transform 180ms ease;
}

.sr-faq__item[open] summary svg {
  transform: rotate(90deg);
}

.sr-faq__item p {
  padding: 0 0 18px;
}

.sr-footer {
  border-top: 1px solid var(--sr-border);
  background: #f8fbff;
}

.sr-footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  min-height: 78px;
  color: var(--sr-muted);
  font-size: 0.92rem;
  font-weight: 700;
}

.sr-footer__inner p {
  margin: 0;
}

.sr-footer__inner a {
  color: var(--sr-blue-dark);
}

@media (max-width: 980px) {
  .sr-header__inner {
    flex-wrap: wrap;
    padding: 14px 0;
  }

  .sr-nav {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    overflow-x: auto;
  }

  .sr-header__cta {
    margin-left: auto;
  }

  .sr-hero {
    padding-top: 58px;
  }

  .sr-hero__grid,
  .sr-locations__grid,
  .sr-contact__panel,
  .sr-faq__grid {
    grid-template-columns: 1fr;
  }

  .sr-service-grid,
  .sr-why-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .sr-container {
    width: min(100% - 28px, 1160px);
  }

  .sr-header__inner {
    gap: 12px;
  }

  .sr-header__cta {
    width: 100%;
  }

  .sr-button {
    width: 100%;
  }

  .sr-hero {
    padding: 44px 0 54px;
  }

  .sr-hero__copy h1 {
    font-size: 3rem;
  }

  .sr-hero__actions,
  .sr-contact__actions {
    flex-direction: column;
  }

  .sr-service-grid,
  .sr-why-grid,
  .sr-location-list {
    grid-template-columns: 1fr;
  }

  .sr-service-card {
    min-height: auto;
  }

  .sr-section,
  .sr-locations,
  .sr-contact {
    padding: 62px 0;
  }

  .sr-footer__inner {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 20px 0;
  }
}
`;

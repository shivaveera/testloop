import type { JSX } from "react";
import { ArrowRight, BadgeCheck, CheckCircle2, Clock3, Mail, ShieldCheck } from "lucide-react";

export const fixUpMeta = {
  id: "fixup",
  name: "FixUp",
  tone: "Electric blue plumbing appointment page with yellow CTA accents",
  summary:
    "Photo-forward plumbing repair template with split hero, appointment panel, service benefits, trust panels, pricing CTA, and footer.",
  preview: "/assets/photos/plumbing/fixup-real.jpg",
  category: "Plumbing",
  description:
    "Electric blue plumbing repair template with a booking-first hero, service benefits, trust panels, and a clear pricing CTA.",
  imageSrc: "/assets/photos/plumbing/fixup-real.jpg",
  primaryCta: "Use this template",
  secondaryCta: "Request a sample",
  accentColor: "#075cff",
} as const;

const services = [
  {
    title: "Leak and pipe repair",
    copy: "Clear service cards help customers understand common repairs before they book.",
  },
  {
    title: "Drain clearing",
    copy: "Simple copy blocks keep urgent jobs easy to scan on mobile.",
  },
  {
    title: "Fixture installs",
    copy: "Appointment-focused layout for taps, toilets, sinks, and appliance hookups.",
  },
  {
    title: "Water heater support",
    copy: "Room for diagnosis notes, service area details, and customer preparation steps.",
  },
] as const;

const pricingItems = [
  "Assessment visit",
  "Repair quote",
  "Maintenance option",
] as const;

const fixUpStyles = `
.fixup-template {
  --fixup-blue: #075cff;
  --fixup-blue-dark: #0637a8;
  --fixup-blue-soft: #eaf2ff;
  --fixup-yellow: #ffd43b;
  --fixup-yellow-dark: #c98a00;
  --fixup-ink: #071527;
  --fixup-muted: #5b6b7d;
  --fixup-line: #d9e6f5;
  --fixup-panel: #ffffff;
  --fixup-soft: #f5f9ff;
  --fixup-radius: 8px;
  color: var(--fixup-ink);
  background: #f8fbff;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
  letter-spacing: 0;
}

.fixup-template *,
.fixup-template *::before,
.fixup-template *::after {
  box-sizing: border-box;
}

.fixup-template a {
  color: inherit;
  text-decoration: none;
}

.fixup-template :focus-visible {
  outline: 3px solid rgba(255, 212, 59, 0.62);
  outline-offset: 3px;
}

.fixup-wrap {
  width: min(1160px, calc(100% - 40px));
  margin: 0 auto;
}

.fixup-nav {
  border-bottom: 1px solid rgba(217, 230, 245, 0.9);
  background: rgba(248, 251, 255, 0.9);
  backdrop-filter: blur(18px);
}

.fixup-nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  min-height: 76px;
}

.fixup-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-weight: 850;
}

.fixup-brand__mark {
  display: grid;
  width: 40px;
  height: 40px;
  place-items: center;
  border-radius: var(--fixup-radius);
  color: #071527;
  background: var(--fixup-yellow);
  box-shadow: 0 12px 28px rgba(7, 92, 255, 0.18);
}

.fixup-brand__name {
  display: block;
  color: var(--fixup-ink);
  font-size: 1.06rem;
  line-height: 1.1;
}

.fixup-brand__line {
  display: block;
  margin-top: 2px;
  color: var(--fixup-muted);
  font-size: 0.76rem;
  font-weight: 700;
  line-height: 1.2;
}

.fixup-nav__links {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px;
  border: 1px solid var(--fixup-line);
  border-radius: var(--fixup-radius);
  background: #ffffff;
}

.fixup-nav__links a {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 6px;
  color: #34465a;
  font-size: 0.88rem;
  font-weight: 750;
  white-space: nowrap;
}

.fixup-nav__links a:hover {
  color: var(--fixup-blue);
  background: var(--fixup-blue-soft);
}

.fixup-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: var(--fixup-radius);
  font-size: 0.94rem;
  font-weight: 850;
  line-height: 1.1;
  text-align: center;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease, border-color 180ms ease;
}

.fixup-button:hover {
  transform: translateY(-1px);
}

.fixup-button--primary {
  color: #071527;
  background: var(--fixup-yellow);
  box-shadow: 0 18px 34px rgba(201, 138, 0, 0.2);
}

.fixup-button--secondary {
  color: #ffffff;
  background: var(--fixup-blue);
  box-shadow: 0 18px 34px rgba(7, 92, 255, 0.22);
}

.fixup-button--outline {
  border-color: rgba(255, 255, 255, 0.38);
  color: #ffffff;
  background: rgba(255, 255, 255, 0.09);
}

.fixup-hero {
  position: relative;
  overflow: hidden;
  padding: 72px 0 78px;
  color: #ffffff;
  background:
    linear-gradient(135deg, rgba(7, 92, 255, 0.96), rgba(3, 31, 94, 0.98)),
    var(--fixup-blue);
}

.fixup-hero::before {
  position: absolute;
  inset: 0;
  content: "";
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.11) 1px, transparent 1px),
    linear-gradient(180deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 70px 70px;
  mask-image: linear-gradient(180deg, #000 0%, transparent 84%);
}

.fixup-hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(390px, 1.05fr);
  gap: 46px;
  align-items: center;
}

.fixup-hero__content {
  max-width: 590px;
}

.fixup-hero h1 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.65rem, 7vw, 5.45rem);
  font-weight: 900;
  line-height: 0.98;
  letter-spacing: 0;
}

.fixup-hero__lead {
  max-width: 560px;
  margin: 24px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 1.08rem;
  line-height: 1.72;
}

.fixup-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.fixup-service-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0 0;
  padding: 0;
  list-style: none;
}

.fixup-service-strip li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--fixup-radius);
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.09);
  font-size: 0.86rem;
  font-weight: 750;
}

.fixup-hero__side {
  display: grid;
  gap: 16px;
}

.fixup-hero__image {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: var(--fixup-radius);
  background: #dceeff;
  box-shadow: 0 28px 64px rgba(0, 17, 58, 0.3);
}

.fixup-booking {
  display: grid;
  gap: 14px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: var(--fixup-radius);
  color: var(--fixup-ink);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 26px 70px rgba(0, 17, 58, 0.24);
}

.fixup-booking__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.fixup-booking__header h2 {
  margin: 0;
  color: var(--fixup-ink);
  font-size: 1.25rem;
  line-height: 1.15;
}

.fixup-booking__header p {
  margin: 6px 0 0;
  color: var(--fixup-muted);
  font-size: 0.9rem;
  line-height: 1.45;
}

.fixup-booking__icon {
  display: grid;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: var(--fixup-radius);
  color: var(--fixup-blue);
  background: var(--fixup-blue-soft);
}

.fixup-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.fixup-field {
  display: grid;
  gap: 7px;
}

.fixup-field--full {
  grid-column: 1 / -1;
}

.fixup-field label {
  color: #263b52;
  font-size: 0.78rem;
  font-weight: 850;
}

.fixup-field input,
.fixup-field select,
.fixup-field textarea {
  width: 100%;
  min-height: 44px;
  border: 1px solid #cbdcf0;
  border-radius: var(--fixup-radius);
  color: var(--fixup-ink);
  background: #ffffff;
  padding: 0 12px;
  font-size: 0.92rem;
}

.fixup-field textarea {
  min-height: 82px;
  padding-top: 11px;
  resize: vertical;
}

.fixup-field input:focus,
.fixup-field select:focus,
.fixup-field textarea:focus {
  border-color: var(--fixup-blue);
  outline: none;
  box-shadow: 0 0 0 4px rgba(7, 92, 255, 0.12);
}

.fixup-booking .fixup-button {
  width: 100%;
}

.fixup-section {
  padding: 76px 0;
}

.fixup-section--soft {
  background:
    linear-gradient(180deg, #ffffff, #f5f9ff);
}

.fixup-section__head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 34px;
  margin-bottom: 28px;
}

.fixup-section__head h2 {
  max-width: 660px;
  margin: 0;
  color: var(--fixup-ink);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 900;
  line-height: 1.03;
  letter-spacing: 0;
}

.fixup-section__head p {
  max-width: 410px;
  margin: 0;
  color: var(--fixup-muted);
  font-size: 1rem;
  line-height: 1.7;
}

.fixup-benefits {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.fixup-benefit {
  min-height: 220px;
  padding: 20px;
  border: 1px solid var(--fixup-line);
  border-radius: var(--fixup-radius);
  background: #ffffff;
}

.fixup-benefit svg {
  color: var(--fixup-blue);
}

.fixup-benefit h3 {
  margin: 54px 0 10px;
  color: var(--fixup-ink);
  font-size: 1.08rem;
  line-height: 1.2;
}

.fixup-benefit p {
  margin: 0;
  color: var(--fixup-muted);
  font-size: 0.93rem;
  line-height: 1.6;
}

.fixup-trust-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 16px;
  align-items: stretch;
}

.fixup-trust-main,
.fixup-trust-list article {
  border-radius: var(--fixup-radius);
}

.fixup-trust-main {
  display: grid;
  align-content: end;
  min-height: 390px;
  padding: 28px;
  color: #ffffff;
  background:
    linear-gradient(160deg, rgba(7, 92, 255, 0.82), rgba(7, 21, 39, 0.92)),
    url("/assets/photos/plumbing/fixup-real.jpg") center / cover no-repeat;
  overflow: hidden;
}

.fixup-trust-main h2 {
  max-width: 520px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 3.35rem);
  font-weight: 900;
  line-height: 1.04;
}

.fixup-trust-main p {
  max-width: 460px;
  margin: 16px 0 0;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.7;
}

.fixup-trust-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.fixup-trust-list article {
  min-height: 186px;
  padding: 22px;
  border: 1px solid var(--fixup-line);
  background: #ffffff;
}

.fixup-trust-list svg {
  color: var(--fixup-yellow-dark);
}

.fixup-trust-list h3 {
  margin: 42px 0 9px;
  color: var(--fixup-ink);
  font-size: 1.05rem;
}

.fixup-trust-list p {
  margin: 0;
  color: var(--fixup-muted);
  font-size: 0.93rem;
  line-height: 1.58;
}

.fixup-pricing {
  color: #ffffff;
  background: #071527;
}

.fixup-pricing__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(330px, 0.65fr);
  gap: 26px;
  align-items: center;
}

.fixup-pricing h2 {
  max-width: 720px;
  margin: 0;
  color: #ffffff;
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  line-height: 1.02;
}

.fixup-pricing p {
  max-width: 620px;
  margin: 18px 0 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 1.02rem;
  line-height: 1.72;
}

.fixup-pricing__items {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
  padding: 0;
  list-style: none;
}

.fixup-pricing__items li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--fixup-radius);
  color: rgba(255, 255, 255, 0.88);
  background: rgba(255, 255, 255, 0.07);
  font-weight: 750;
}

.fixup-pricing__panel {
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: var(--fixup-radius);
  background: rgba(255, 255, 255, 0.08);
}

.fixup-pricing__panel strong {
  display: block;
  color: var(--fixup-yellow);
  font-size: 1.3rem;
  line-height: 1.2;
}

.fixup-pricing__panel span {
  display: block;
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.74);
  line-height: 1.6;
}

.fixup-pricing__actions {
  display: grid;
  gap: 10px;
  margin-top: 22px;
}

.fixup-footer {
  padding: 34px 0;
  border-top: 1px solid var(--fixup-line);
  background: #ffffff;
}

.fixup-footer__grid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.fixup-footer p {
  margin: 8px 0 0;
  color: var(--fixup-muted);
  font-size: 0.92rem;
}

.fixup-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  color: #34465a;
  font-size: 0.92rem;
  font-weight: 750;
}

@media (max-width: 980px) {
  .fixup-nav__links {
    display: none;
  }

  .fixup-hero__grid,
  .fixup-trust-grid,
  .fixup-pricing__grid {
    grid-template-columns: 1fr;
  }

  .fixup-benefits,
  .fixup-trust-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fixup-section__head {
    display: grid;
  }
}

@media (max-width: 640px) {
  .fixup-wrap {
    width: min(100% - 28px, 1160px);
  }

  .fixup-nav__inner {
    min-height: 68px;
  }

  .fixup-nav .fixup-button {
    display: none;
  }

  .fixup-hero {
    padding: 48px 0 58px;
  }

  .fixup-hero__grid {
    gap: 26px;
  }

  .fixup-hero h1 {
    font-size: clamp(2.38rem, 14vw, 3.7rem);
  }

  .fixup-form-grid,
  .fixup-benefits,
  .fixup-trust-list {
    grid-template-columns: 1fr;
  }

  .fixup-section {
    padding: 54px 0;
  }

  .fixup-benefit {
    min-height: auto;
  }

  .fixup-benefit h3 {
    margin-top: 32px;
  }

  .fixup-trust-main {
    min-height: 330px;
  }

  .fixup-footer__grid {
    display: grid;
  }
}
`;

export function FixUpTemplate(): JSX.Element {
  return (
    <div className="fixup-template">
      <style>{fixUpStyles}</style>

      <header className="fixup-nav">
        <div className="fixup-wrap fixup-nav__inner">
          <a className="fixup-brand" href="#fixup-top" aria-label="FixUp home">
            <span className="fixup-brand__mark" aria-hidden="true">
              <BadgeCheck size={22} />
            </span>
            <span>
              <span className="fixup-brand__name">FixUp</span>
              <span className="fixup-brand__line">Plumbing repairs</span>
            </span>
          </a>

          <nav className="fixup-nav__links" aria-label="FixUp navigation">
            <a href="#fixup-services">Services</a>
            <a href="#fixup-trust">Trust</a>
            <a href="#fixup-pricing">Pricing</a>
            <a href="#fixup-appointment">Book</a>
          </nav>

          <a className="fixup-button fixup-button--secondary" href="#fixup-appointment">
            Request a sample
          </a>
        </div>
      </header>

      <main id="fixup-top">
        <section className="fixup-hero" aria-labelledby="fixup-hero-title">
          <div className="fixup-wrap fixup-hero__grid">
            <div className="fixup-hero__content">
              <h1 id="fixup-hero-title">FixUp plumbing repairs booked in a few taps.</h1>
              <p className="fixup-hero__lead">
                A bright, appointment-first template for local plumbers who want clear service pages,
                fast booking paths, and confident follow-up details.
              </p>
              <div className="fixup-hero__actions">
                <a className="fixup-button fixup-button--primary" href="#fixup-pricing">
                  Use this template
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="fixup-button fixup-button--outline" href="#fixup-appointment">
                  Request a sample
                </a>
              </div>
              <ul className="fixup-service-strip" aria-label="Template highlights">
                <li>
                  <Clock3 size={15} aria-hidden="true" />
                  Booking flow
                </li>
                <li>
                  <ShieldCheck size={15} aria-hidden="true" />
                  Trust panels
                </li>
                <li>
                  <Mail size={15} aria-hidden="true" />
                  Contact ready
                </li>
              </ul>
            </div>

            <div className="fixup-hero__side">
              <img
                className="fixup-hero__image"
                src={fixUpMeta.imageSrc}
                alt="Real plumber clearing a bathroom drain for the FixUp plumbing template"
              />

              <form
                className="fixup-booking"
                id="fixup-appointment"
                aria-label="Request a FixUp appointment sample"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="fixup-booking__header">
                  <div>
                    <h2>Request a repair window</h2>
                    <p>Collect the essentials before a call: location, repair type, and timing.</p>
                  </div>
                  <span className="fixup-booking__icon" aria-hidden="true">
                    <Clock3 size={22} />
                  </span>
                </div>

                <div className="fixup-form-grid">
                  <div className="fixup-field">
                    <label htmlFor="fixup-name">Name</label>
                    <input id="fixup-name" name="name" type="text" autoComplete="name" />
                  </div>
                  <div className="fixup-field">
                    <label htmlFor="fixup-phone">Phone</label>
                    <input id="fixup-phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                  <div className="fixup-field">
                    <label htmlFor="fixup-service">Repair needed</label>
                    <select id="fixup-service" name="service" defaultValue="">
                      <option value="" disabled>
                        Choose service
                      </option>
                      <option>Leak repair</option>
                      <option>Drain clearing</option>
                      <option>Fixture install</option>
                      <option>Water heater support</option>
                    </select>
                  </div>
                  <div className="fixup-field">
                    <label htmlFor="fixup-window">Preferred window</label>
                    <select id="fixup-window" name="window" defaultValue="">
                      <option value="" disabled>
                        Select window
                      </option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>
                  <div className="fixup-field fixup-field--full">
                    <label htmlFor="fixup-notes">Repair notes</label>
                    <textarea
                      id="fixup-notes"
                      name="notes"
                      placeholder="Tell us what is leaking, blocked, or being installed."
                    />
                  </div>
                </div>

                <button className="fixup-button fixup-button--secondary" type="submit">
                  Request a sample
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="fixup-section fixup-section--soft" id="fixup-services" aria-labelledby="fixup-services-title">
          <div className="fixup-wrap">
            <div className="fixup-section__head">
              <h2 id="fixup-services-title">Service benefits built for urgent decisions.</h2>
              <p>
                The page leads with the repair categories customers search for, then routes them
                into the appointment request without extra friction.
              </p>
            </div>

            <div className="fixup-benefits">
              {services.map((service) => (
                <article className="fixup-benefit" key={service.title}>
                  <CheckCircle2 size={24} aria-hidden="true" />
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fixup-section" id="fixup-trust" aria-labelledby="fixup-trust-title">
          <div className="fixup-wrap fixup-trust-grid">
            <div className="fixup-trust-main">
              <h2 id="fixup-trust-title">Trust details stay close to the booking path.</h2>
              <p>
                Credential space, service-area notes, and repair policies sit beside the CTA so
                customers can check essentials before reaching out.
              </p>
            </div>

            <div className="fixup-trust-list" aria-label="Trust panels">
              <article>
                <ShieldCheck size={24} aria-hidden="true" />
                <h3>Credential space</h3>
                <p>Dedicated panel for license, insurance, and qualification details.</p>
              </article>
              <article>
                <Clock3 size={24} aria-hidden="true" />
                <h3>Arrival window</h3>
                <p>Set expectations for scheduling, access notes, and follow-up calls.</p>
              </article>
              <article>
                <BadgeCheck size={24} aria-hidden="true" />
                <h3>Repair policy</h3>
                <p>Explain inspection, approval, warranty, or workmanship terms clearly.</p>
              </article>
              <article>
                <Mail size={24} aria-hidden="true" />
                <h3>Contact routes</h3>
                <p>Keep phone, form, email, and service-area details easy to find.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="fixup-section fixup-pricing" id="fixup-pricing" aria-labelledby="fixup-pricing-title">
          <div className="fixup-wrap fixup-pricing__grid">
            <div>
              <h2 id="fixup-pricing-title">A clear pricing section without made-up numbers.</h2>
              <p>
                Use this area for repair ranges, call-out policy, or quote-first language once the
                real business details are ready.
              </p>
              <ul className="fixup-pricing__items" aria-label="Pricing categories">
                {pricingItems.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="fixup-pricing__panel" aria-label="Template call to action">
              <strong>FixUp is ready for a branded plumbing sample.</strong>
              <span>
                Keep the electric blue visual system, swap in local details, and publish a booking-focused
                starter site.
              </span>
              <div className="fixup-pricing__actions">
                <a className="fixup-button fixup-button--primary" href="#fixup-top">
                  Use this template
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
                <a className="fixup-button fixup-button--outline" href="#fixup-appointment">
                  Request a sample
                </a>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="fixup-footer">
        <div className="fixup-wrap fixup-footer__grid">
          <div>
            <a className="fixup-brand" href="#fixup-top" aria-label="FixUp home">
              <span className="fixup-brand__mark" aria-hidden="true">
                <BadgeCheck size={22} />
              </span>
              <span>
                <span className="fixup-brand__name">FixUp</span>
                <span className="fixup-brand__line">Plumbing repairs</span>
              </span>
            </a>
            <p>Electric blue booking template for plumbing repair businesses.</p>
          </div>
          <nav className="fixup-footer__links" aria-label="FixUp footer navigation">
            <a href="#fixup-services">Services</a>
            <a href="#fixup-trust">Trust</a>
            <a href="#fixup-pricing">Pricing</a>
            <a href="#fixup-appointment">Book</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

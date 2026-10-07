import type { JSX } from "react";

const benefits = [
  {
    title: "Calm intake",
    copy: "A focused request flow helps homeowners explain the issue, urgency, and location without feeling rushed.",
  },
  {
    title: "Premium service framing",
    copy: "Repair, installation, and maintenance paths are presented with quiet confidence and plain-language details.",
  },
  {
    title: "Trust-ready layout",
    copy: "Licensing notes, service areas, and contact options sit near the action without relying on fake ratings or logos.",
  },
];

const services = [
  "Fixture repair",
  "Leak detection",
  "Water heater care",
  "Drain service",
  "Valve replacement",
  "Preventive maintenance",
];

const navItems = [
  { label: "Benefits", href: "#master-care-benefits" },
  { label: "About", href: "#master-care-about" },
  { label: "Services", href: "#master-care-services" },
  { label: "Book", href: "#master-care-booking" },
];

export const masterCareMeta = {
  id: "master-care",
  name: "MasterCare",
  tone: "Soft forest green",
  summary: "Calm premium home-repair energy with spacious sections, muted greens, and high-trust service copy.",
  preview: "/assets/photos/plumbing/master-care-real.jpg",
  category: "Plumbing",
  description: "A dark forest green premium home repair and plumbing template for calm, high-trust service brands.",
  imageSrc: "/assets/photos/plumbing/master-care-real.jpg",
  cta: "Use this template",
} as const;

export function MasterCareTemplate(): JSX.Element {
  return (
    <div className="master-care">
      <style>{masterCareStyles}</style>

      <header className="master-care__nav">
        <a className="master-care__brand" href="#master-care-top" aria-label="MasterCare home">
          <span className="master-care__brand-mark" aria-hidden="true">
            MC
          </span>
          <span>
            <strong>MasterCare</strong>
            <span>Plumbing and home repair</span>
          </span>
        </a>

        <nav className="master-care__links" aria-label="MasterCare sections">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="master-care__nav-cta" href="#master-care-booking">
          Request a sample
        </a>
      </header>

      <main id="master-care-top">
        <section className="master-care__hero" aria-labelledby="master-care-title">
          <div className="master-care__hero-copy">
            <p className="master-care__eyebrow">Premium plumbing template</p>
            <h1 id="master-care-title">A composed website for careful home repair.</h1>
            <p>
              MasterCare gives plumbing and home service teams a refined first impression, direct contact paths, and
              service details that feel reassuring before the first call.
            </p>
            <div className="master-care__actions" aria-label="Template actions">
              <a className="master-care__button master-care__button--primary" href="#master-care-booking">
                Use this template
              </a>
              <a className="master-care__button master-care__button--secondary" href="#master-care-booking">
                Request a sample
              </a>
            </div>
          </div>

          <div className="master-care__visual">
            <img src={masterCareMeta.imageSrc} alt="Real plumber repairing a bathroom fixture for the MasterCare template" />
          </div>
        </section>

        <section className="master-care__section" id="master-care-benefits" aria-labelledby="master-care-benefits-title">
          <div className="master-care__section-heading">
            <p className="master-care__eyebrow">Proof and benefits</p>
            <h2 id="master-care-benefits-title">Built for homeowners who want the repair handled properly.</h2>
          </div>

          <div className="master-care__benefit-grid">
            {benefits.map((benefit) => (
              <article className="master-care__benefit-card" key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="master-care__about" id="master-care-about" aria-labelledby="master-care-about-title">
          <div>
            <p className="master-care__eyebrow">About the style</p>
            <h2 id="master-care-about-title">Dark, steady, and service-first.</h2>
          </div>
          <p>
            The layout uses forest green, warm metallic accents, generous spacing, and practical content blocks for a
            plumbing brand that wants to feel polished without becoming flashy. Every section keeps the homeowner moving
            toward a clear request.
          </p>
        </section>

        <section className="master-care__section" id="master-care-services" aria-labelledby="master-care-services-title">
          <div className="master-care__section-heading master-care__section-heading--split">
            <div>
              <p className="master-care__eyebrow">Services gallery</p>
              <h2 id="master-care-services-title">Common service paths, ready to adapt.</h2>
            </div>
            <a className="master-care__text-link" href="#master-care-booking">
              Start with MasterCare
            </a>
          </div>

          <div className="master-care__service-grid">
            {services.map((service) => (
              <article className="master-care__service-card" key={service}>
                <span aria-hidden="true" />
                <h3>{service}</h3>
                <p>Short service copy, booking guidance, and location details can be tailored for the business.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="master-care__booking" id="master-care-booking" aria-labelledby="master-care-booking-title">
          <div>
            <p className="master-care__eyebrow">Booking CTA</p>
            <h2 id="master-care-booking-title">Use MasterCare for a premium plumbing sample.</h2>
            <p>
              A strong fit for contractors, repair teams, and owner-operated service businesses that want a calm,
              high-end request experience.
            </p>
          </div>
          <div className="master-care__booking-actions">
            <a className="master-care__button master-care__button--primary" href="mailto:hello@syncforce.com?subject=MasterCare%20template%20sample">
              Use this template
            </a>
            <a className="master-care__button master-care__button--secondary" href="mailto:hello@syncforce.com?subject=MasterCare%20sample%20request">
              Request a sample
            </a>
          </div>
        </section>
      </main>

      <footer className="master-care__footer">
        <p>
          <strong>MasterCare</strong>
          <span>Premium plumbing and home repair website template.</span>
        </p>
        <a href="#master-care-top">Back to top</a>
      </footer>
    </div>
  );
}

const masterCareStyles = `
.master-care {
  --mc-forest: #102f27;
  --mc-forest-deep: #081c17;
  --mc-forest-soft: #1d4a3f;
  --mc-mint: #b9d9ca;
  --mc-ivory: #f7f3ea;
  --mc-warm: #c79b5b;
  --mc-ink: #17231f;
  --mc-muted: #60716b;
  --mc-line: rgba(16, 47, 39, 0.14);
  color: var(--mc-ink);
  background: var(--mc-forest-deep);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  letter-spacing: 0;
}

.master-care *,
.master-care *::before,
.master-care *::after {
  box-sizing: border-box;
}

.master-care a {
  color: inherit;
  text-decoration: none;
}

.master-care__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: min(1180px, calc(100% - 32px));
  min-height: 78px;
  margin: 0 auto;
  color: var(--mc-ivory);
}

.master-care__brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.master-care__brand-mark {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgba(199, 155, 91, 0.42);
  border-radius: 8px;
  color: var(--mc-forest-deep);
  background: var(--mc-warm);
  font-size: 0.78rem;
  font-weight: 800;
}

.master-care__brand strong,
.master-care__brand span span {
  display: block;
}

.master-care__brand strong {
  font-size: 1rem;
  line-height: 1.1;
}

.master-care__brand span span {
  margin-top: 2px;
  color: rgba(247, 243, 234, 0.68);
  font-size: 0.78rem;
}

.master-care__links {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px;
  border: 1px solid rgba(247, 243, 234, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.master-care__links a,
.master-care__nav-cta {
  display: inline-flex;
  align-items: center;
  min-height: 38px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
}

.master-care__links a {
  padding: 0 12px;
  color: rgba(247, 243, 234, 0.76);
}

.master-care__links a:hover {
  color: var(--mc-ivory);
  background: rgba(255, 255, 255, 0.07);
}

.master-care__nav-cta {
  justify-content: center;
  padding: 0 15px;
  border: 1px solid rgba(199, 155, 91, 0.55);
  color: var(--mc-ivory);
}

.master-care__nav-cta:hover {
  background: rgba(199, 155, 91, 0.12);
}

.master-care__hero {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
  gap: 56px;
  align-items: center;
  min-height: 680px;
  padding: 82px max(24px, calc((100vw - 1180px) / 2)) 88px;
  color: var(--mc-ivory);
  background:
    linear-gradient(115deg, rgba(8, 28, 23, 0.98), rgba(16, 47, 39, 0.94)),
    var(--mc-forest);
}

.master-care__hero-copy {
  max-width: 610px;
}

.master-care__eyebrow {
  margin: 0 0 14px;
  color: var(--mc-warm);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.master-care h1,
.master-care h2,
.master-care h3,
.master-care p {
  margin-top: 0;
}

.master-care h1 {
  margin-bottom: 22px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(3.1rem, 7vw, 6.6rem);
  font-weight: 500;
  line-height: 0.94;
}

.master-care__hero-copy > p:not(.master-care__eyebrow) {
  max-width: 560px;
  margin-bottom: 30px;
  color: rgba(247, 243, 234, 0.76);
  font-size: 1.12rem;
  line-height: 1.75;
}

.master-care__actions,
.master-care__booking-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.master-care__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-size: 0.94rem;
  font-weight: 800;
  line-height: 1.1;
}

.master-care__button--primary {
  color: var(--mc-forest-deep);
  background: var(--mc-warm);
}

.master-care__button--primary:hover {
  background: #d6ad6e;
}

.master-care__button--secondary {
  border-color: rgba(247, 243, 234, 0.2);
  color: var(--mc-ivory);
  background: rgba(255, 255, 255, 0.05);
}

.master-care__button--secondary:hover {
  border-color: rgba(247, 243, 234, 0.36);
  background: rgba(255, 255, 255, 0.09);
}

.master-care__visual {
  position: relative;
}

.master-care__visual img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border: 1px solid rgba(247, 243, 234, 0.15);
  border-radius: 30px;
  box-shadow: 0 34px 90px rgba(2, 10, 8, 0.38);
}

.master-care__section {
  padding: 92px max(24px, calc((100vw - 1180px) / 2));
  background: var(--mc-ivory);
}

.master-care__section-heading {
  max-width: 760px;
  margin-bottom: 34px;
}

.master-care__section-heading--split {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
  max-width: none;
}

.master-care h2 {
  margin-bottom: 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2rem, 4vw, 3.8rem);
  font-weight: 500;
  line-height: 1.02;
}

.master-care h3 {
  margin-bottom: 10px;
  font-size: 1.05rem;
  line-height: 1.25;
}

.master-care__benefit-grid,
.master-care__service-grid {
  display: grid;
  gap: 14px;
}

.master-care__benefit-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.master-care__benefit-card,
.master-care__service-card {
  border: 1px solid var(--mc-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.46);
}

.master-care__benefit-card {
  min-height: 210px;
  padding: 28px;
}

.master-care__benefit-card p,
.master-care__service-card p,
.master-care__about p,
.master-care__booking p,
.master-care__footer p {
  color: var(--mc-muted);
  line-height: 1.7;
}

.master-care__benefit-card p,
.master-care__service-card p {
  margin-bottom: 0;
}

.master-care__about {
  display: grid;
  grid-template-columns: minmax(0, 0.84fr) minmax(320px, 1fr);
  gap: 50px;
  align-items: start;
  padding: 92px max(24px, calc((100vw - 1180px) / 2));
  color: var(--mc-ivory);
  background: var(--mc-forest-deep);
}

.master-care__about p {
  margin: 8px 0 0;
  color: rgba(247, 243, 234, 0.72);
  font-size: 1.05rem;
}

.master-care__text-link {
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  padding-bottom: 3px;
  border-bottom: 2px solid var(--mc-warm);
  color: var(--mc-forest);
  font-weight: 800;
}

.master-care__service-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.master-care__service-card {
  min-height: 236px;
  padding: 24px;
}

.master-care__service-card span {
  display: block;
  width: 100%;
  height: 86px;
  margin-bottom: 22px;
  border: 1px solid rgba(16, 47, 39, 0.12);
  border-radius: 6px;
  background:
    linear-gradient(135deg, rgba(16, 47, 39, 0.16), rgba(199, 155, 91, 0.18)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.14));
}

.master-care__booking {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 32px;
  align-items: center;
  padding: 76px max(24px, calc((100vw - 1180px) / 2));
  color: var(--mc-ivory);
  background: var(--mc-forest);
}

.master-care__booking h2 {
  max-width: 720px;
}

.master-care__booking p {
  max-width: 660px;
  margin: 18px 0 0;
  color: rgba(247, 243, 234, 0.72);
}

.master-care__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px max(24px, calc((100vw - 1180px) / 2));
  border-top: 1px solid var(--mc-line);
  background: var(--mc-ivory);
}

.master-care__footer p {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 0;
}

.master-care__footer strong {
  color: var(--mc-ink);
}

.master-care__footer a {
  color: var(--mc-forest);
  font-weight: 800;
}

.master-care :focus-visible {
  outline: 3px solid rgba(199, 155, 91, 0.45);
  outline-offset: 3px;
}

@media (max-width: 960px) {
  .master-care__nav {
    align-items: flex-start;
    flex-direction: column;
    padding: 18px 0;
  }

  .master-care__links {
    width: 100%;
    overflow-x: auto;
  }

  .master-care__hero,
  .master-care__about,
  .master-care__booking {
    grid-template-columns: 1fr;
  }

  .master-care__hero {
    min-height: auto;
    padding-top: 58px;
  }

  .master-care__benefit-grid,
  .master-care__service-grid {
    grid-template-columns: 1fr 1fr;
  }

  .master-care__section-heading--split {
    align-items: start;
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .master-care__links,
  .master-care__nav-cta {
    display: none;
  }

  .master-care__hero,
  .master-care__section,
  .master-care__about,
  .master-care__booking {
    padding-left: 18px;
    padding-right: 18px;
  }

  .master-care h1 {
    font-size: 3rem;
  }

  .master-care__benefit-grid,
  .master-care__service-grid {
    grid-template-columns: 1fr;
  }

  .master-care__actions,
  .master-care__booking-actions,
  .master-care__button {
    width: 100%;
  }

  .master-care__footer {
    align-items: flex-start;
    flex-direction: column;
  }
}
`;

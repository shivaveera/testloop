import type { JSX } from "react";

export const copperlineMeta = {
  id: "copperline",
  name: "Copperline",
  tone: "Warm copper editorial",
  summary: "A refined cream, navy, and copper layout for plumbers that want a polished town-square feel.",
  preview: "/assets/photos/plumbing/copperline-real.jpg",
  niche: "Plumbing",
  businessName: "Copperline Plumbing",
  description:
    "A premium copper, cream, and navy local plumbing template with editorial storytelling, urgent service messaging, service areas, process, and transparent pricing CTAs.",
  imageSrc: "/assets/photos/plumbing/copperline-real.jpg",
  primaryCta: "Use this template",
  secondaryCta: "Request a sample",
  tags: ["plumbing", "premium", "local service", "small town"],
} as const;

const services = [
  {
    title: "Leak tracing",
    copy: "Finds hidden pipe leaks, wall moisture, and fixture failures before a small drip becomes a room repair.",
  },
  {
    title: "Drain clearing",
    copy: "Clears slow sinks, backed-up tubs, and stubborn kitchen lines with a calm, documented service visit.",
  },
  {
    title: "Water heaters",
    copy: "Helps homeowners compare repair, tune-up, and replacement paths without rushing the decision.",
  },
  {
    title: "Fixture upgrades",
    copy: "Installs faucets, shutoffs, toilets, disposals, and laundry hookups with clean finish work.",
  },
];

const serviceAreas = [
  "Main Street district",
  "North side homes",
  "River road cottages",
  "County line properties",
  "Old mill neighborhood",
  "Lakeside cabins",
];

const processSteps = [
  {
    title: "Listen first",
    copy: "The site makes it easy to gather the issue, address, timing, and photos before the first call back.",
  },
  {
    title: "Locate the cause",
    copy: "Service pages explain diagnosis in plain language so customers know what happens next.",
  },
  {
    title: "Price before repair",
    copy: "The pricing callout sets expectations around service calls, scopes, and approvals before work begins.",
  },
];

function CopperlineMark(): JSX.Element {
  return (
    <svg className="copperline__mark" viewBox="0 0 44 44" aria-hidden="true">
      <circle cx="22" cy="22" r="20" fill="#fbf2df" />
      <path
        d="M13 15h15a6 6 0 0 1 6 6v8h-7v-7H13z"
        fill="none"
        stroke="#b66335"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      />
      <path d="M12 29h18" stroke="#10263d" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

function ArrowIcon(): JSX.Element {
  return (
    <svg className="copperline__button-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10h10m-4-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function ToolIcon(): JSX.Element {
  return (
    <svg className="copperline__service-icon" viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M6 18v-5a6 6 0 0 1 6-6h10v6h-9a2 2 0 0 0-2 2v3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M4 18h10v5H4z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function MapPinIcon(): JSX.Element {
  return (
    <svg className="copperline__pin-icon" viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M10 18s6-5.2 6-10A6 6 0 0 0 4 8c0 4.8 6 10 6 10z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="10" cy="8" r="2" fill="currentColor" />
    </svg>
  );
}

export function CopperlineTemplate(): JSX.Element {
  return (
    <div className="copperline">
      <style>{`
        .copperline {
          --cl-ink: #102032;
          --cl-navy: #132b43;
          --cl-navy-soft: #1f405e;
          --cl-copper: #b66335;
          --cl-copper-dark: #7e3c20;
          --cl-cream: #f7eddc;
          --cl-paper: #fffaf0;
          --cl-sage: #566f62;
          --cl-mist: #e9dfcf;
          --cl-line: rgba(19, 43, 67, 0.16);
          color: var(--cl-ink);
          background: var(--cl-paper);
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .copperline *,
        .copperline *::before,
        .copperline *::after {
          box-sizing: border-box;
        }

        .copperline a {
          color: inherit;
          text-decoration: none;
        }

        .copperline a:focus-visible,
        .copperline button:focus-visible {
          outline: 3px solid rgba(182, 99, 53, 0.55);
          outline-offset: 3px;
        }

        .copperline__wrap {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        .copperline__nav {
          border-bottom: 1px solid var(--cl-line);
          background: rgba(255, 250, 240, 0.94);
        }

        .copperline__nav-inner {
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .copperline__brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 22px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0;
          color: var(--cl-navy);
        }

        .copperline__mark {
          width: 44px;
          height: 44px;
          flex: 0 0 auto;
        }

        .copperline__nav-links {
          display: flex;
          align-items: center;
          gap: 22px;
          color: rgba(16, 32, 50, 0.76);
          font-size: 14px;
          font-weight: 700;
          line-height: 1.2;
        }

        .copperline__button-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }

        .copperline__button {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 6px;
          border: 1px solid transparent;
          padding: 12px 18px;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.1;
        }

        .copperline__button--primary {
          background: var(--cl-copper);
          color: #fffaf0;
          box-shadow: 0 16px 28px rgba(126, 60, 32, 0.18);
        }

        .copperline__button--secondary {
          background: rgba(255, 250, 240, 0.72);
          color: var(--cl-navy);
          border-color: rgba(19, 43, 67, 0.22);
        }

        .copperline__button--dark {
          background: #fffaf0;
          color: var(--cl-navy);
        }

        .copperline__button-icon {
          width: 18px;
          height: 18px;
          flex: 0 0 auto;
        }

        .copperline__hero {
          padding: 78px 0 74px;
          background:
            linear-gradient(90deg, rgba(247, 237, 220, 0.92), rgba(255, 250, 240, 0.72)),
            radial-gradient(circle at 86% 18%, rgba(182, 99, 53, 0.16), transparent 34%);
        }

        .copperline__hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
          gap: 52px;
          align-items: center;
        }

        .copperline__hero-copy {
          max-width: 590px;
        }

        .copperline__hero h1 {
          margin: 0;
          color: var(--cl-navy);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 66px;
          font-weight: 700;
          line-height: 0.96;
          letter-spacing: 0;
        }

        .copperline__lead {
          margin: 24px 0 0;
          color: rgba(16, 32, 50, 0.78);
          font-size: 19px;
          line-height: 1.65;
        }

        .copperline__hero-actions {
          margin-top: 32px;
        }

        .copperline__editorial-note {
          margin-top: 34px;
          padding-left: 18px;
          border-left: 3px solid var(--cl-copper);
          color: rgba(16, 32, 50, 0.72);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          line-height: 1.45;
        }

        .copperline__preview {
          margin: 0;
          border: 1px solid rgba(19, 43, 67, 0.14);
          border-radius: 30px;
          background: #fffaf0;
          box-shadow: 0 28px 54px rgba(19, 43, 67, 0.18);
          overflow: hidden;
        }

        .copperline__preview img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
        }

        .copperline__emergency {
          background: var(--cl-navy);
          color: #fffaf0;
        }

        .copperline__emergency-inner {
          min-height: 96px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
        }

        .copperline__emergency strong {
          display: block;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          line-height: 1.15;
          letter-spacing: 0;
        }

        .copperline__emergency p {
          margin: 8px 0 0;
          color: rgba(255, 250, 240, 0.72);
          font-size: 15px;
          line-height: 1.55;
        }

        .copperline__section {
          padding: 86px 0;
        }

        .copperline__section--cream {
          background: var(--cl-cream);
        }

        .copperline__section--navy {
          background: var(--cl-navy);
          color: #fffaf0;
        }

        .copperline__section-head {
          display: grid;
          grid-template-columns: minmax(0, 0.72fr) minmax(280px, 0.58fr);
          gap: 44px;
          align-items: end;
          margin-bottom: 36px;
        }

        .copperline__section-head h2,
        .copperline__pricing h2 {
          margin: 0;
          color: inherit;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 42px;
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: 0;
        }

        .copperline__section-head p,
        .copperline__pricing p {
          margin: 0;
          color: rgba(16, 32, 50, 0.7);
          font-size: 16px;
          line-height: 1.7;
        }

        .copperline__service-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .copperline__service-card {
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 32px;
          padding: 24px;
          border: 1px solid var(--cl-line);
          border-radius: 8px;
          background: #fffaf0;
        }

        .copperline__service-icon {
          width: 34px;
          height: 34px;
          color: var(--cl-copper);
        }

        .copperline__service-card h3,
        .copperline__area-copy h3,
        .copperline__process-card h3 {
          margin: 0;
          color: var(--cl-navy);
          font-size: 19px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: 0;
        }

        .copperline__service-card p,
        .copperline__area-copy p,
        .copperline__process-card p {
          margin: 12px 0 0;
          color: rgba(16, 32, 50, 0.68);
          font-size: 15px;
          line-height: 1.6;
        }

        .copperline__area-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.92fr) minmax(360px, 1.08fr);
          gap: 44px;
          align-items: center;
        }

        .copperline__area-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          padding: 0;
          margin: 28px 0 0;
          list-style: none;
        }

        .copperline__area-list li {
          min-height: 48px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border: 1px solid rgba(19, 43, 67, 0.14);
          border-radius: 8px;
          background: rgba(255, 250, 240, 0.64);
          font-size: 14px;
          font-weight: 750;
          line-height: 1.25;
          color: var(--cl-navy);
        }

        .copperline__pin-icon {
          width: 18px;
          height: 18px;
          flex: 0 0 auto;
          color: var(--cl-copper);
        }

        .copperline__map {
          min-height: 390px;
          position: relative;
          border: 1px solid rgba(19, 43, 67, 0.14);
          border-radius: 8px;
          overflow: hidden;
          background:
            linear-gradient(34deg, transparent 0 33%, rgba(182, 99, 53, 0.22) 33% 36%, transparent 36%),
            linear-gradient(144deg, transparent 0 42%, rgba(86, 111, 98, 0.22) 42% 45%, transparent 45%),
            linear-gradient(90deg, rgba(19, 43, 67, 0.08) 1px, transparent 1px),
            linear-gradient(0deg, rgba(19, 43, 67, 0.08) 1px, transparent 1px),
            #fbf2df;
          background-size: auto, auto, 56px 56px, 56px 56px, auto;
        }

        .copperline__map::before {
          content: "";
          position: absolute;
          inset: 46px 54px;
          border: 2px solid rgba(19, 43, 67, 0.16);
          border-radius: 8px;
          transform: rotate(-4deg);
        }

        .copperline__map-pin {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--cl-copper);
          box-shadow: 0 0 0 8px rgba(182, 99, 53, 0.16);
        }

        .copperline__map-pin:nth-child(1) {
          top: 31%;
          left: 32%;
        }

        .copperline__map-pin:nth-child(2) {
          top: 53%;
          left: 58%;
        }

        .copperline__map-pin:nth-child(3) {
          top: 67%;
          left: 42%;
        }

        .copperline__map-label {
          position: absolute;
          right: 28px;
          bottom: 28px;
          max-width: 210px;
          padding: 18px;
          border-radius: 8px;
          background: var(--cl-navy);
          color: #fffaf0;
          box-shadow: 0 18px 32px rgba(19, 43, 67, 0.2);
        }

        .copperline__map-label strong {
          display: block;
          font-size: 15px;
          line-height: 1.25;
        }

        .copperline__map-label span {
          display: block;
          margin-top: 8px;
          color: rgba(255, 250, 240, 0.7);
          font-size: 13px;
          line-height: 1.45;
        }

        .copperline__process-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          counter-reset: process;
        }

        .copperline__process-card {
          position: relative;
          min-height: 248px;
          padding: 28px;
          border: 1px solid rgba(255, 250, 240, 0.18);
          border-radius: 8px;
          background: rgba(255, 250, 240, 0.08);
          counter-increment: process;
        }

        .copperline__process-card::before {
          content: counter(process, decimal-leading-zero);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          margin-bottom: 52px;
          border: 1px solid rgba(255, 250, 240, 0.22);
          border-radius: 50%;
          color: #f4c094;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
        }

        .copperline__process-card h3 {
          color: #fffaf0;
        }

        .copperline__process-card p {
          color: rgba(255, 250, 240, 0.7);
        }

        .copperline__pricing {
          display: grid;
          grid-template-columns: minmax(0, 0.86fr) minmax(320px, 0.74fr);
          gap: 44px;
          align-items: center;
          padding: 44px;
          border: 1px solid rgba(19, 43, 67, 0.16);
          border-radius: 8px;
          background:
            linear-gradient(120deg, rgba(255, 250, 240, 0.96), rgba(247, 237, 220, 0.9)),
            radial-gradient(circle at 92% 20%, rgba(182, 99, 53, 0.16), transparent 38%);
          box-shadow: 0 22px 44px rgba(19, 43, 67, 0.1);
        }

        .copperline__pricing p {
          margin-top: 18px;
        }

        .copperline__pricing-list {
          display: grid;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .copperline__pricing-list li {
          padding: 16px 18px;
          border-left: 4px solid var(--cl-copper);
          border-radius: 6px;
          background: rgba(255, 250, 240, 0.82);
          color: rgba(16, 32, 50, 0.76);
          font-size: 14px;
          font-weight: 750;
          line-height: 1.45;
        }

        .copperline__pricing-actions {
          margin-top: 28px;
        }

        .copperline__footer {
          padding: 44px 0;
          background: #0f2236;
          color: #fffaf0;
        }

        .copperline__footer .copperline__brand {
          color: #fffaf0;
        }

        .copperline__footer-inner {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 28px;
          align-items: center;
        }

        .copperline__footer p {
          margin: 12px 0 0;
          max-width: 560px;
          color: rgba(255, 250, 240, 0.68);
          font-size: 14px;
          line-height: 1.55;
        }

        .copperline__footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: flex-end;
          color: rgba(255, 250, 240, 0.76);
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 920px) {
          .copperline__nav-inner,
          .copperline__hero-grid,
          .copperline__section-head,
          .copperline__area-grid,
          .copperline__pricing,
          .copperline__footer-inner {
            grid-template-columns: 1fr;
          }

          .copperline__nav-inner {
            min-height: auto;
            padding: 18px 0;
            align-items: flex-start;
          }

          .copperline__nav-links {
            width: 100%;
            order: 3;
            flex-wrap: wrap;
            gap: 14px;
          }

          .copperline__hero {
            padding: 56px 0;
          }

          .copperline__hero h1 {
            font-size: 50px;
          }

          .copperline__service-grid,
          .copperline__process-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .copperline__emergency-inner {
            grid-template-columns: 1fr;
            padding: 22px 0;
          }

          .copperline__footer-links {
            justify-content: flex-start;
          }
        }

        @media (max-width: 640px) {
          .copperline__wrap {
            width: min(100% - 28px, 1120px);
          }

          .copperline__nav-inner {
            display: grid;
          }

          .copperline__hero h1 {
            font-size: 42px;
          }

          .copperline__lead {
            font-size: 17px;
          }

          .copperline__section {
            padding: 62px 0;
          }

          .copperline__section-head h2,
          .copperline__pricing h2 {
            font-size: 34px;
          }

          .copperline__service-grid,
          .copperline__area-list,
          .copperline__process-grid {
            grid-template-columns: 1fr;
          }

          .copperline__service-card,
          .copperline__process-card {
            min-height: auto;
          }

          .copperline__process-card::before {
            margin-bottom: 32px;
          }

          .copperline__pricing {
            padding: 26px;
          }

          .copperline__map {
            min-height: 320px;
          }
        }
      `}</style>

      <header className="copperline__nav">
        <div className="copperline__wrap copperline__nav-inner">
          <a className="copperline__brand" href="#copperline-top" aria-label="Copperline home">
            <CopperlineMark />
            <span>Copperline</span>
          </a>
          <nav className="copperline__nav-links" aria-label="Copperline sections">
            <a href="#copperline-services">Services</a>
            <a href="#copperline-areas">Service areas</a>
            <a href="#copperline-process">Process</a>
            <a href="#copperline-pricing">Pricing</a>
          </nav>
          <a className="copperline__button copperline__button--primary" href="#copperline-pricing">
            Use this template
            <ArrowIcon />
          </a>
        </div>
      </header>

      <main id="copperline-top">
        <section className="copperline__hero" aria-labelledby="copperline-hero-title">
          <div className="copperline__wrap copperline__hero-grid">
            <div className="copperline__hero-copy">
              <h1 id="copperline-hero-title">Copperline Plumbing</h1>
              <p className="copperline__lead">
                A refined local service site for plumbing teams that want every leak call, water heater
                question, and fixture upgrade to feel handled from the first click.
              </p>
              <div className="copperline__button-row copperline__hero-actions">
                <a className="copperline__button copperline__button--primary" href="#copperline-pricing">
                  Use this template
                  <ArrowIcon />
                </a>
                <a className="copperline__button copperline__button--secondary" href="#copperline-footer">
                  Request a sample
                </a>
              </div>
              <p className="copperline__editorial-note">
                Cream paper textures, burnished copper details, and navy utility sections give the
                template the feel of a trusted shop on the town square.
              </p>
            </div>
            <figure className="copperline__preview">
              <img
                src={copperlineMeta.imageSrc}
                alt="Real copper pipe repair detail for the Copperline plumbing template"
              />
            </figure>
          </div>
        </section>

        <section className="copperline__emergency" aria-label="Emergency plumbing request strip">
          <div className="copperline__wrap copperline__emergency-inner">
            <div>
              <strong>Urgent leak, backup, or no-hot-water call?</strong>
              <p>
                Keep the emergency path obvious with plain-language issue prompts, phone access, and
                service-area confidence.
              </p>
            </div>
            <a className="copperline__button copperline__button--dark" href="#copperline-pricing">
              Request a sample
            </a>
          </div>
        </section>

        <section
          className="copperline__section"
          id="copperline-services"
          aria-labelledby="copperline-services-title"
        >
          <div className="copperline__wrap">
            <div className="copperline__section-head">
              <h2 id="copperline-services-title">Service pages with calm confidence.</h2>
              <p>
                Copperline is built for homeowners who need to understand the problem, the visit, and the
                next step without digging through a cluttered contractor page.
              </p>
            </div>
            <div className="copperline__service-grid">
              {services.map((service) => (
                <article className="copperline__service-card" key={service.title}>
                  <ToolIcon />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="copperline__section copperline__section--cream"
          id="copperline-areas"
          aria-labelledby="copperline-areas-title"
        >
          <div className="copperline__wrap copperline__area-grid">
            <div className="copperline__area-copy">
              <h2 id="copperline-areas-title">A local map moment for small-town routes.</h2>
              <p>
                Use the area section to name neighborhoods, nearby roads, and outlying properties so
                customers can quickly tell whether they are in reach.
              </p>
              <ul className="copperline__area-list" aria-label="Example service areas">
                {serviceAreas.map((area) => (
                  <li key={area}>
                    <MapPinIcon />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
            <div className="copperline__map" aria-label="Decorative service area map">
              <span className="copperline__map-pin" aria-hidden="true" />
              <span className="copperline__map-pin" aria-hidden="true" />
              <span className="copperline__map-pin" aria-hidden="true" />
              <div className="copperline__map-label">
                <strong>Service-area clarity</strong>
                <span>Town center, surrounding roads, and rural stops shown without crowding the page.</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="copperline__section copperline__section--navy"
          id="copperline-process"
          aria-labelledby="copperline-process-title"
        >
          <div className="copperline__wrap">
            <div className="copperline__section-head">
              <h2 id="copperline-process-title">A process that lowers call anxiety.</h2>
              <p style={{ color: "rgba(255, 250, 240, 0.7)" }}>
                The sequence is simple enough for a fast read and polished enough for premium residential
                work.
              </p>
            </div>
            <div className="copperline__process-grid">
              {processSteps.map((step) => (
                <article className="copperline__process-card" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="copperline__section"
          id="copperline-pricing"
          aria-labelledby="copperline-pricing-title"
        >
          <div className="copperline__wrap">
            <div className="copperline__pricing">
              <div>
                <h2 id="copperline-pricing-title">Make transparent pricing part of the brand.</h2>
                <p>
                  Copperline gives the pricing conversation a designed home: service-call language,
                  approval-before-work copy, and a strong template CTA for turning the design into a
                  sample.
                </p>
                <div className="copperline__button-row copperline__pricing-actions">
                  <a className="copperline__button copperline__button--primary" href="#copperline-top">
                    Use this template
                    <ArrowIcon />
                  </a>
                  <a className="copperline__button copperline__button--secondary" href="#copperline-footer">
                    Request a sample
                  </a>
                </div>
              </div>
              <ul className="copperline__pricing-list" aria-label="Transparent pricing talking points">
                <li>Show what is included in a service visit before the customer calls.</li>
                <li>Explain diagnosis, options, and approval steps in steady language.</li>
                <li>Reserve space for repair ranges without inventing one-size-fits-all numbers.</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="copperline__footer" id="copperline-footer">
        <div className="copperline__wrap copperline__footer-inner">
          <div>
            <a className="copperline__brand" href="#copperline-top" aria-label="Copperline home">
              <CopperlineMark />
              <span>Copperline</span>
            </a>
            <p>
              A polished plumbing template for local teams that want premium presentation, clear service
              paths, and straightforward request CTAs.
            </p>
          </div>
          <nav className="copperline__footer-links" aria-label="Copperline footer">
            <a href="#copperline-services">Services</a>
            <a href="#copperline-areas">Areas</a>
            <a href="#copperline-process">Process</a>
            <a href="#copperline-pricing">Pricing</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

import { useEffect } from "react";
import type { JSX } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { PlumbingDetail } from "./plumbing/plumbing-detail";
import { PlumbingHome } from "./plumbing/plumbing-home";

type DemoStyle = {
  id: string;
  niche: string;
  businessName: string;
  description: string;
  included: string[];
  imageSrc: string;
};

const navLinks = [
  { label: "Demos", href: "/#demos" },
  { label: "Plumbing", href: "/plumbing" },
  { label: "What's Included", href: "/#included" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
];

const trustChips = [
  "Built in 24–72 hours",
  "6 months free service",
  "Only $4.99/month after",
  "Domain separate",
  "No technical work needed",
];

const problemCards = [
  {
    title: "No website makes the business look less established",
    copy: "A customer may not know how good you are if the first thing they find is an empty Google listing.",
    imageSrc: "/assets/photos/business/local-storefront-real.jpg",
  },
  {
    title: "Facebook-only presence is not enough",
    copy: "Social pages help, but they can be hard to scan for services, hours, phone numbers, and directions.",
    imageSrc: "/assets/photos/business/shop-owner-real.jpg",
  },
  {
    title: "Competitors with websites look easier to trust",
    copy: "A simple site gives people a clear place to check your work before they pick up the phone.",
    imageSrc: "/assets/photos/business/customer-service-real.jpg",
  },
  {
    title: "A simple site makes calling, directions, and enquiries easier",
    copy: "The right page puts your phone, map, hours, and main services where customers expect them.",
    imageSrc: "/assets/photos/business/local-storefront-real.jpg",
  },
];

const includedFeatures = [
  "Mobile-friendly website",
  "Call button",
  "Google Maps/directions",
  "Services section",
  "Business hours",
  "Contact form or enquiry button",
  "Photo/logo placement",
  "Basic SEO title and description",
  "Fast loading page",
  "6 months free service",
];

const starterIncludes = [
  "1-page professional website",
  "Mobile responsive design",
  "Call + map buttons",
  "Services and business info",
  "Contact form/enquiry button",
  "Basic SEO setup",
  "6 months free service",
];

const addOns = [
  "Extra pages",
  "Booking system",
  "Online payments",
  "Menu/catalog",
  "Logo refresh",
  "Google Business Profile help",
  "Email setup",
  "Monthly content updates",
];

const processSteps = [
  {
    title: "Send your business name, town, phone, and services",
    copy: "Share the basics customers need to know before calling or visiting.",
    imageSrc: "/assets/photos/business/shop-owner-real.jpg",
  },
  {
    title: "We create a preview/sample",
    copy: "You see a practical website direction before the final launch.",
    imageSrc: "/assets/photos/business/customer-service-real.jpg",
  },
  {
    title: "You approve, pay $100, and we launch",
    copy: "We guide the domain and publish steps so you do not need technical knowledge.",
    imageSrc: "/assets/photos/business/local-storefront-real.jpg",
  },
];

const faqs = [
  {
    question: "Is the website really $100?",
    answer:
      "Yes. The starter website is a $100 one-time launch price for a simple professional 1-page site. Extra features, extra pages, and domain charges are separate.",
  },
  {
    question: "What happens after 6 months?",
    answer:
      "The first 6 months of service and maintenance are included. After that, support is $4.99/month if you want us to keep helping with small updates and maintenance.",
  },
  {
    question: "Are domain charges included?",
    answer:
      "No. Domains are charged separately by the domain provider. We can help you choose and connect one, or use a domain you already own.",
  },
  {
    question: "Can I use my own domain?",
    answer:
      "Yes. If you already own a domain, we can help point it to the new website and keep the setup simple.",
  },
  {
    question: "Can I request changes?",
    answer:
      "Yes. The starter site includes practical edits before launch. Bigger changes or new sections may be quoted separately.",
  },
  {
    question: "Do you build booking/payment features?",
    answer:
      "Yes, but they are add-ons. Booking, payments, menus, catalogs, and advanced forms are quoted based on what your business needs.",
  },
  {
    question: "How fast can it go live?",
    answer:
      "Most starter websites can be prepared in 24–72 hours once we have your business details, photos or logo if available, and domain direction.",
  },
  {
    question: "Do I need technical knowledge?",
    answer:
      "No. Send the basics, review the sample, and we handle the page structure, mobile layout, and launch guidance.",
  },
  {
    question: "What if I already have Facebook or Google Business Profile?",
    answer:
      "Keep them. Your website gives customers a cleaner place to see services, hours, directions, contact details, and a more professional first impression.",
  },
  {
    question: "Can you make a sample before I decide?",
    answer:
      "Yes. Send your business name and town, and we can prepare a simple direction so you can see what can be built.",
  },
];

function Header(): JSX.Element {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="brand" href="/#top" aria-label="Syncforce home">
          <img className="brand__logo" src="/assets/syncforce-logo.svg" alt="Syncforce" />
          <span>
            <span className="brand__tagline">built fast, priced fair</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="button button--primary header-cta" href="/#sample">
          Request a sample
        </a>
      </div>
    </header>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  copy,
  align = "left",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
}): JSX.Element {
  return (
    <div className={`section-heading section-heading--${align}`} id={id}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

function HeroWebsiteMockup(): JSX.Element {
  return (
    <div className="hero-visual" aria-label="Example local business website preview">
      <img
        className="hero-asset"
        src="/assets/photos/business/local-storefront-real.jpg"
        alt="Real local business storefront used as website inspiration"
      />
    </div>
  );
}

const demoStyles: DemoStyle[] = [
  {
    id: "roofing-contractor",
    niche: "Roofing contractor",
    businessName: "RidgeLine Roofing",
    description: "A strong service-area layout for roof repairs, inspections, storm damage, and quote requests.",
    included: ["Call now", "Service areas", "Repair list", "Quote request"],
    imageSrc: "/assets/photos/business/roofing-real.jpg",
  },
  {
    id: "plumbing-service",
    niche: "Plumbing service",
    businessName: "ClearFlow Plumbing",
    description: "A fast-response style for phone calls, emergency work, maps, and common plumbing services.",
    included: ["Emergency CTA", "Map block", "Hours", "Enquiry form"],
    imageSrc: "/assets/photos/plumbing/plumbex-real.jpg",
  },
  {
    id: "beauty-salon",
    niche: "Beauty salon",
    businessName: "Willow Beauty Studio",
    description: "A warm, visual layout for salons, barbers, stylists, beauty rooms, and appointment enquiries.",
    included: ["Photo placement", "Services", "Hours", "Appointment request"],
    imageSrc: "/assets/photos/business/salon-real.jpg",
  },
  {
    id: "dental-clinic",
    niche: "Dental/clinic",
    businessName: "Townside Dental",
    description: "A calm trust-first style for clinics, dentists, local health practices, and new patient calls.",
    included: ["Clinic hours", "Call button", "Patient info", "Directions"],
    imageSrc: "/assets/photos/business/clinic-real.jpg",
  },
  {
    id: "restaurant-takeaway",
    niche: "Restaurant/takeaway",
    businessName: "Market Street Takeaway",
    description: "A clear menu-and-call style for restaurants, takeaways, cafes, pubs, and food counters.",
    included: ["Menu preview", "Call to order", "Opening hours", "Map"],
    imageSrc: "/assets/photos/business/restaurant-real.jpg",
  },
];

function DemoCard({ demo, index }: { demo: DemoStyle; index: number }): JSX.Element {
  return (
    <article className={`demo-card demo-card--${index + 1}`} id={`demo-${demo.id}`}>
      <div className="demo-card__visual">
        <img className="demo-image" src={demo.imageSrc} alt={`${demo.niche} website style preview`} />
      </div>
      <div className="demo-card__body">
        <p className="demo-card__niche">{demo.niche}</p>
        <h3>{demo.businessName}</h3>
        <p>{demo.description}</p>
        <ul className="mini-checks">
          {demo.included.map((item) => (
            <li key={item}>
              <Check size={14} />
              {item}
            </li>
          ))}
        </ul>
        <div className="demo-card__actions">
          <Link className="text-link" to={`/demos/${demo.id}`}>
            View demo
            <ExternalLink size={14} />
          </Link>
          <a className="button button--secondary button--small" href="/#sample">
            Use this style
          </a>
        </div>
      </div>
    </article>
  );
}

function Hero(): JSX.Element {
  return (
    <section className="hero-section" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>Get a professional business website for $100.</h1>
          <p className="hero-subhead">
            For USA & UK local businesses without a website. We build a clean, mobile-ready site with call buttons, maps, services, business hours, and contact options — with 6 months free service included.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="/#demos">
              See demo websites
              <ArrowRight size={18} />
            </a>
            <a className="button button--outline" href="/#sample">
              Request a sample for my business
            </a>
          </div>
          <div className="trust-chips" aria-label="Offer details">
            {trustChips.map((chip) => (
              <span key={chip}>
                <CheckCircle2 size={15} />
                {chip}
              </span>
            ))}
          </div>
        </div>
        <HeroWebsiteMockup />
      </div>
    </section>
  );
}

function ProblemSection(): JSX.Element {
  return (
    <section className="section section--problem">
      <div className="container">
        <SectionHeading
          title="Most town businesses lose trust before the customer calls."
          copy="Customers search online first. If a business has no website, they often look less established, even if they are great at their work."
          align="center"
        />
        <div className="problem-grid">
          {problemCards.map((card, index) => (
            <article className="problem-card" key={card.title}>
              <img className="problem-card__image" src={card.imageSrc} alt="" aria-hidden="true" />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoShowcase(): JSX.Element {
  return (
    <section className="section" id="demos">
      <div className="container">
        <SectionHeading
          eyebrow="Demo styles"
          title="Five starter website styles ready for local businesses."
          copy="Each style is a polished starting point. We adapt the words, photos, services, hours, and contact details to your business."
        />
        <div className="demo-grid">
          {demoStyles.map((demo, index) => (
            <DemoCard key={demo.id} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IncludedSection(): JSX.Element {
  return (
    <section className="section section--included" id="included">
      <div className="container included-layout">
        <div>
          <SectionHeading
            eyebrow="What's included"
            title="Everything a local business needs to look real online."
            copy="The starter website keeps the essentials clear: what you do, where you work, when you are open, and how customers can contact you."
          />
          <img
            className="section-visual"
            src="/assets/photos/business/customer-service-real.jpg"
            alt="Real customer service desk for a local business website"
          />
          <div className="included-note">
            <ShieldCheck size={20} />
            <p>
              Built for owner-operated businesses in USA and UK towns, suburbs, county towns, and rural service areas.
            </p>
          </div>
        </div>
        <div className="feature-grid">
          {includedFeatures.map((feature) => (
            <div className="feature-card" key={feature}>
              <Check size={17} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection(): JSX.Element {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing. No agency confusion."
          copy="Start with the page most local businesses need first. Add more only when there is a clear reason."
          align="center"
        />
        <div className="pricing-grid">
          <article className="pricing-card pricing-card--main">
            <img className="pricing-visual" src="/assets/photos/business/local-storefront-real.jpg" alt="" aria-hidden="true" />
            <div className="pricing-card__header">
              <p>Starter Website</p>
              <h3>$100</h3>
              <span>One-time launch price</span>
            </div>
            <ul className="pricing-list">
              {starterIncludes.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="after-card">
              <span>After 6 months</span>
              <strong>$4.99/month support + domain charges</strong>
            </div>
            <a className="button button--primary pricing-button" href="/#sample">
              Request my sample
              <ArrowRight size={18} />
            </a>
          </article>

          <article className="pricing-card pricing-card--addon">
            <img className="pricing-visual" src="/assets/photos/business/shop-owner-real.jpg" alt="" aria-hidden="true" />
            <div className="pricing-card__header">
              <p>Add-ons</p>
              <h3>Custom price</h3>
              <span>Only pay extra if you need extra features.</span>
            </div>
            <ul className="addon-list">
              {addOns.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProcessSection(): JSX.Element {
  return (
    <section className="section section--process" id="process">
      <div className="container">
        <SectionHeading
          eyebrow="Process"
          title="From no website to live website in 3 steps."
          copy="No technical setup. We handle the website structure, mobile layout, and launch guidance."
          align="center"
        />
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article className="process-card" key={step.title}>
              <img className="process-card__image" src={step.imageSrc} alt="" aria-hidden="true" />
              <span>{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DomainSection(): JSX.Element {
  const items = [
    "You can use your existing domain",
    "Or we help you choose/buy a new domain",
    "Domain is charged separately by the domain provider",
    "First 6 months of service/maintenance are free",
    "After that, support is $4.99/month",
    "Extra features are optional and quoted separately",
  ];

  return (
    <section className="section">
      <div className="container domain-panel">
        <div>
          <SectionHeading
            eyebrow="Domains and service"
            title="What about domain and monthly service?"
            copy="The price stays simple because the moving parts are explained before you pay."
          />
          <img className="domain-visual" src="/assets/photos/business/customer-service-real.jpg" alt="Real customer desk representing domain and service support" />
        </div>
        <div className="domain-list">
          {items.map((item) => (
            <div key={item}>
              <BadgeCheck size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleSection(): JSX.Element {
  return (
    <section className="section sample-section" id="sample">
      <div className="container sample-layout">
        <div className="sample-copy">
          <SectionHeading
            eyebrow="Request sample"
            title="Want to see how your business could look online?"
            copy="Send your business name and town. We'll prepare a simple website direction and show you what can be built."
          />
          <img className="sample-visual" src="/assets/photos/business/shop-owner-real.jpg" alt="Local shop owner photo for the sample request section" />
          <div className="sample-contact">
            <div>
              <Mail size={18} />
              <span>hello@syncforce.com</span>
            </div>
            <div>
              <Clock3 size={18} />
              <span>Typical preview: 24–72 hours</span>
            </div>
          </div>
        </div>

        {/* TODO: Replace the mailto fallback with a backend endpoint or CRM integration before production launch. */}
        <form
          className="sample-form"
          action="mailto:hello@syncforce.com"
          method="post"
          encType="text/plain"
        >
          <div className="form-row">
            <label htmlFor="businessName">Business name</label>
            <input id="businessName" name="Business name" type="text" autoComplete="organization" required />
          </div>
          <div className="form-row form-row--split">
            <div>
              <label htmlFor="town">Town/city</label>
              <input id="town" name="Town/city" type="text" autoComplete="address-level2" required />
            </div>
            <div>
              <label htmlFor="country">Country</label>
              <select id="country" name="Country" defaultValue="USA" required>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="businessType">Business type</label>
            <input id="businessType" name="Business type" type="text" placeholder="Roofing, salon, takeaway..." required />
          </div>
          <div className="form-row">
            <label htmlFor="contact">Phone or email</label>
            <input id="contact" name="Phone or email" type="text" autoComplete="email" required />
          </div>
          <div className="form-row">
            <label htmlFor="hasWebsite">Do you currently have a website?</label>
            <select id="hasWebsite" name="Currently has website" defaultValue="No" required>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="Notes" placeholder="Anything customers usually ask about?" />
          </div>
          <button className="button button--primary form-button" type="submit">
            Prepare my sample request
            <ArrowRight size={18} />
          </button>
          <p className="form-note">
            This opens your email app for now. A direct form integration is marked in the code before production.
          </p>
        </form>
      </div>
    </section>
  );
}

function FaqSection(): JSX.Element {
  return (
    <section className="section" id="faq">
      <div className="container faq-layout">
        <SectionHeading
          eyebrow="FAQ"
          title="Straight answers before you decide."
          copy="No guarantees of calls, no SEO ranking promises, and no hidden domain charge."
        />
        <img className="faq-visual" src="/assets/photos/business/customer-service-real.jpg" alt="Customer service counter for simple FAQ answers" />
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <ChevronDown size={18} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta(): JSX.Element {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <div>
          <img className="final-cta__image" src="/assets/photos/business/local-storefront-real.jpg" alt="" aria-hidden="true" />
          <h2>Ready to look professional online?</h2>
        </div>
        <div className="final-cta__actions">
          <a className="button button--primary" href="/#sample">
            Request a sample
          </a>
          <a className="button button--outline button--on-dark" href="/#demos">
            View demo styles
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand brand--footer" href="/#top" aria-label="Syncforce home">
            <img className="brand__logo" src="/assets/syncforce-logo.svg" alt="Syncforce" />
            <span>
              <span className="brand__tagline">Professional websites for local businesses — built fast, priced fair.</span>
            </span>
          </a>
          <p className="footer-copy">
            Starter websites for USA and UK town businesses that need a professional online presence without agency confusion.
          </p>
        </div>
        <div className="footer-links">
          <a href="/#demos">Demos</a>
          <a href="/#included">What's Included</a>
          <a href="/#pricing">Pricing</a>
          <a href="/#process">Process</a>
          <a href="/#faq">FAQ</a>
          <a href="/#sample">Contact</a>
        </div>
        <div className="footer-meta">
          <span>Terms placeholder</span>
          <span>Privacy placeholder</span>
          <a href="mailto:hello@syncforce.com">hello@syncforce.com</a>
        </div>
      </div>
    </footer>
  );
}

function LandingPage(): JSX.Element {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <DemoShowcase />
        <IncludedSection />
        <PricingSection />
        <ProcessSection />
        <DomainSection />
        <SampleSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

function DemoDetailPage(): JSX.Element {
  const params = useParams();
  const demo = demoStyles.find((item) => item.id === params.demoId) ?? demoStyles[0];

  return (
    <div className="site-shell">
      <Header />
      <main className="demo-detail">
        <section className="section">
          <div className="container demo-detail__grid">
            <div className="demo-detail__copy">
              <Link className="text-link" to="/#demos">
                Back to demo styles
              </Link>
              <p className="section-eyebrow">Sample direction</p>
              <h1>{demo.niche} starter website</h1>
              <p>
                This is a polished placeholder demo direction for {demo.businessName}. The final site would use the real business name, town, services, photos, phone number, hours, and domain.
              </p>
              <ul className="mini-checks mini-checks--large">
                {demo.included.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
              <a className="button button--primary" href="/#sample">
                Use this style
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="demo-detail__visual">
              <img className="demo-detail__image" src={demo.imageSrc} alt={`${demo.niche} website style preview`} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ScrollToTop(): null {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

function App(): JSX.Element {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plumbing" element={<PlumbingHome />} />
        <Route path="/plumbing/:templateId" element={<PlumbingDetail />} />
        <Route path="/demos/:demoId" element={<DemoDetailPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;

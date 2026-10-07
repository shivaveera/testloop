import type { CSSProperties, JSX } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { plumbingTemplates } from "./plumbing-templates";

export function PlumbingHome(): JSX.Element {
  return (
    <div className="plumbing-shell">
      <section className="plumbing-hero">
        <div className="container plumbing-hero__grid">
          <div className="plumbing-hero__copy">
            <Link className="text-link" to="/#demos">
              Back to main site
            </Link>
            <p className="section-eyebrow">Plumbing template folder</p>
            <h1>Choose a plumbing website style, then make it yours.</h1>
            <p>
              Tap any orbiting template to open a complete plumbing starter site. Each one has a different visual
              direction, service flow, CTA structure, and image treatment.
            </p>
            <div className="plumbing-hero__actions">
              <a className="button button--primary" href="#plumbing-orbit">
                Browse templates
                <ArrowRight size={18} />
              </a>
              <a className="button button--outline" href="/#sample">
                Request a sample
              </a>
            </div>
            <div className="plumbing-hero__checks">
              <span>
                <CheckCircle2 size={16} />
                Five distinct plumbing sites
              </span>
              <span>
                <CheckCircle2 size={16} />
                Built for USA/UK local services
              </span>
            </div>
          </div>

          <div className="plumbing-orbit" id="plumbing-orbit" aria-label="Plumbing templates">
            <div className="plumbing-orbit__center">
              <img src="/assets/syncforce-logo.svg" alt="Syncforce" />
              <strong>Plumbing templates</strong>
              <span>Tap a style</span>
            </div>
            {plumbingTemplates.map((template, index) => (
              <Link
                className={`plumbing-orbit__item plumbing-orbit__item--${index + 1}`}
                to={`/plumbing/${template.id}`}
                key={template.id}
                style={{ "--orbit-index": index } as CSSProperties}
              >
                <img src={template.preview} alt={`${template.name} real-world plumbing use case`} />
                <span>{template.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="plumbing-folder-grid">
            {plumbingTemplates.map((template) => (
              <article className="plumbing-folder-card" key={template.id}>
                <img src={template.preview} alt={`${template.name} real-world plumbing use case`} />
                <div>
                  <p>{template.tone}</p>
                  <h2>{template.name}</h2>
                  <span>{template.summary}</span>
                </div>
                <div className="plumbing-folder-card__actions">
                  <Link className="text-link" to={`/plumbing/${template.id}`}>
                    Open site
                    <ArrowRight size={15} />
                  </Link>
                  <a className="button button--secondary button--small" href="/#sample">
                    Use this template
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

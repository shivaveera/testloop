import type { JSX } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getPlumbingTemplate, plumbingTemplates } from "./plumbing-templates";

export function PlumbingDetail(): JSX.Element {
  const { templateId } = useParams();
  const template = getPlumbingTemplate(templateId) ?? plumbingTemplates[0];
  const TemplateComponent = template.Component;

  return (
    <div className="plumbing-detail-shell">
      <div className="plumbing-template-bar">
        <Link className="text-link" to="/plumbing">
          <ArrowLeft size={15} />
          Plumbing folder
        </Link>
        <span>{template.name}</span>
        <a className="button button--primary button--small" href="/#sample">
          Use this template
          <ArrowRight size={15} />
        </a>
      </div>
      <TemplateComponent />
    </div>
  );
}

import type { JSX } from "react";
import { CopperlineTemplate, copperlineMeta } from "./templates/copperline";
import { FixUpTemplate, fixUpMeta } from "./templates/fixup";
import { MasterCareTemplate, masterCareMeta } from "./templates/master-care";
import { PlumbexTemplate, plumbexMeta } from "./templates/plumbex";
import { SwiftRooterTemplate, swiftRooterMeta } from "./templates/swift-rooter";

export type PlumbingTemplateMeta = {
  id: string;
  name: string;
  tone: string;
  summary: string;
  preview: string;
};

export type PlumbingTemplate = PlumbingTemplateMeta & {
  Component: () => JSX.Element;
};

export const plumbingTemplates: PlumbingTemplate[] = [
  { ...swiftRooterMeta, Component: SwiftRooterTemplate },
  { ...plumbexMeta, Component: PlumbexTemplate },
  { ...fixUpMeta, Component: FixUpTemplate },
  { ...masterCareMeta, Component: MasterCareTemplate },
  { ...copperlineMeta, Component: CopperlineTemplate },
];

export function getPlumbingTemplate(templateId: string | undefined): PlumbingTemplate | undefined {
  return plumbingTemplates.find((template) => template.id === templateId);
}

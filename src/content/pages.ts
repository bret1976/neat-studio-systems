import { audiences } from "./site";
export type PageContent = {
  label: string;
  title: string;
  intro: string;
  blocks: [string, string][];
  kind?:
    | "assist"
    | "control"
    | "workflow"
    | "demo"
    | "resources"
    | "solutions"
    | "product"
    | "legal";
  links?: [string, string][];
};
export const pages: Record<string, PageContent> = {
  product: {
    label: "PRODUCT / ARCHITECTURAL INTELLIGENCE",
    title: "INTELLIGENCE INSIDE THE DRAWING.",
    intro:
      "Two complementary products. One connected design process. NEAT Assist and NEAT Control are proposed tools for contextual model review and human-led decisions.",
    kind: "product",
    blocks: [
      [
        "NEAT Assist",
        "A contextual design companion for asking questions, investigating model conditions, and comparing proposed adjustments in the drawing.",
      ],
      [
        "NEAT Control",
        "A structured workspace for observations, project standards, review assignments, and approval histories.",
      ],
      [
        "Design Review",
        "Connect potential geometric, coordination, and compliance-related concerns to the elements that need attention. Review findings against the actual project and applicable criteria.",
      ],
      [
        "Approval Workflows",
        "Separate observation, recommendation, review, and authorization. No consequential change should bypass the responsible designer.",
      ],
    ],
    links: [
      ["Explore NEAT Assist", "/product/neat-assist"],
      ["Explore NEAT Control", "/product/neat-control"],
      ["Try the demonstration", "/demo"],
    ],
  },
  "product/neat-assist": {
    label: "PRODUCT 01 / NEAT ASSIST",
    title: "HELP WITHOUT LEAVING THE MODEL.",
    intro:
      "A proposed contextual design companion that helps architects ask questions, investigate model conditions, and explore proposed adjustments. The designer remains responsible for reviewing and approving decisions.",
    kind: "assist",
    blocks: [
      [
        "Ask in context",
        "Connect questions to an active drawing region, model element, or configured project criterion. The demonstration uses scripted examples rather than live AI.",
      ],
      [
        "Compare alternatives",
        "Investigate a corridor adjustment or adjacent door swing. Understand the effect on neighboring spaces before choosing a proposal.",
      ],
      [
        "Approve deliberately",
        "Approval changes the local demonstration state only. Future supported adapters would require explicit permissions, preconditions, and an audit trail.",
      ],
    ],
  },
  "product/neat-control": {
    label: "PRODUCT 02 / NEAT CONTROL",
    title: "THE DETAILS IN ONE CLEAR VIEW.",
    intro:
      "A proposed centralized workspace for design reviews, observations, coordination priorities, approval histories, and team-defined standards.",
    kind: "control",
    blocks: [
      [
        "Review overview",
        "Select an observation to highlight its drawing context. Open, under-review, and resolved counts are labeled illustrative data.",
      ],
      [
        "Approval history",
        "Review a proposed change before recording an approval. This demo keeps its history locally for the current component session.",
      ],
      [
        "Project standards",
        "A future platform would version configured criteria, identify their sources, and keep review assignments scoped to project membership.",
      ],
    ],
  },
  "how-it-works": {
    label: "WORKFLOW / 01—04",
    title: "FROM OBSERVATION TO ACTION.",
    intro:
      "NEAT brings useful information to the designer, explains what matters, and leaves every consequential decision under human control.",
    kind: "workflow",
    blocks: [
      [
        "Inspect",
        "Analyze model geometry, relationships, project parameters, and configured review criteria.",
      ],
      [
        "Interpret",
        "Turn findings into understandable observations with context and suggested next steps.",
      ],
      [
        "Resolve",
        "Compare alternatives and authorize a proposed action when appropriate.",
      ],
      [
        "Improve",
        "Keep approved criteria, decisions, and team preferences connected to future work.",
      ],
    ],
  },
  solutions: {
    label: "SOLUTIONS / DESIGN TEAMS",
    title: "MADE FOR THE PEOPLE BEHIND THE DRAWING.",
    intro:
      "Different roles. One connected design process. Explore how contextual review and structured approvals could support the work your team already does.",
    kind: "solutions",
    blocks: audiences.map(([t, d]) => [t, d]),
    links: audiences.slice(0, 4).map(([t, , s]) => [t, `/solutions/${s}`]),
  },
  resources: {
    label: "RESOURCES / WORKING KNOWLEDGE",
    title: "BETTER MODELS. BETTER DECISIONS.",
    intro:
      "Practical design notes on contextual model review, repeatable workflows, and human authorization. Original editorial guidance for this proposed platform.",
    kind: "resources",
    blocks: [
      [
        "Start with the drawing",
        "Keep each observation tied to a location, element, and project assumption.",
      ],
      [
        "Keep criteria visible",
        "A review is only as useful as the context and sources behind it.",
      ],
      [
        "Record the decision",
        "An approval should explain what was reviewed, who decided, and which version it affects.",
      ],
    ],
    links: [
      ["Design Workflows", "/resources/design-workflows"],
      ["Contextual Model Review", "/resources/model-review"],
      ["Approval Systems", "/resources/approval-systems"],
    ],
  },
  "resources/design-workflows": {
    label: "FIELD NOTES / 001",
    title: "PRECISION WITHOUT REPETITION.",
    intro:
      "Build a repeatable review process without turning every design decision into a routine task.",
    blocks: [
      [
        "01 — Define the review scope",
        "Choose a model version, review region, responsible discipline, and criteria before running a check. A narrow, understandable question produces more useful observations.",
      ],
      [
        "02 — Keep observations in context",
        "Link each finding to its drawing geometry and the assumptions that produced it. Separate a possible concern from a confirmed issue.",
      ],
      [
        "03 — Close the loop",
        "Compare alternatives, record the decision, and verify the revised design. Preserve rejected proposals alongside the reason they were not chosen.",
      ],
    ],
  },
  "resources/model-review": {
    label: "DOCUMENTATION / MODEL REVIEW",
    title: "CONTEXT BEFORE CONCLUSIONS.",
    intro:
      "A drawing contains geometry. A review needs geometry, project requirements, professional judgment, and traceable assumptions.",
    blocks: [
      [
        "Geometry",
        "Normalize units and coordinate systems. Maintain stable element identifiers and version references so a finding stays connected to the correct design.",
      ],
      [
        "Requirements",
        "Real compliance review requires jurisdiction, adopted edition, local amendments, occupancy, construction type, and source references. The website does not perform this assessment.",
      ],
      [
        "Human review",
        "Treat automated findings as observations requiring evaluation. Responsible professionals and relevant authorities remain part of any actual review process.",
      ],
    ],
  },
  "resources/approval-systems": {
    label: "FIELD NOTES / 003",
    title: "YOUR DESIGN. YOUR CONTROL.",
    intro:
      "A useful approval system makes the proposed change clear before it becomes an action.",
    blocks: [
      [
        "Preview",
        "Show the affected elements, expected impact, and a before-and-after comparison. Validate the current model version before seeking authorization.",
      ],
      [
        "Authorize",
        "Require a permitted reviewer and a structured decision. Scope approval to a specific proposal; never infer blanket permission from a conversation.",
      ],
      [
        "Trace",
        "Record the proposal, criteria version, reviewer, timestamp, execution result, and recovery reference. If preconditions change, request a fresh review.",
      ],
    ],
  },
  about: {
    label: "ABOUT / NEAT",
    title: "DESIGN FREELY. BUILD INTELLIGENTLY.",
    intro:
      "NEAT — Intelligent Design Systems is a proposed architectural intelligence platform centered on the people responsible for the design.",
    blocks: [
      [
        "Observe carefully",
        "Make useful information visible in the drawing rather than adding another disconnected tool.",
      ],
      [
        "Explain clearly",
        "Connect observations to their context, assumptions, and suggested review actions.",
      ],
      [
        "Act only with authorization",
        "The designer stays in control. The website demonstrates this philosophy with local interactions; it is not a functioning BIM integration.",
      ],
    ],
  },
  demo: {
    label: "INTERACTIVE DEMONSTRATION / NORTH COURT",
    title: "INSPECT. UNDERSTAND. DECIDE.",
    intro:
      "Explore an original building study, reveal illustrative observations, and compare a controlled design workflow. All actions stay within this local demonstration.",
    kind: "demo",
    blocks: [
      [
        "Draw a selection",
        "Drag across the elevation or use the observation controls to reveal regions requiring review.",
      ],
      [
        "Explore alternatives",
        "Open the Assist workspace and compare the corridor and door examples.",
      ],
      [
        "Record a demo approval",
        "Use Control to inspect an observation, record a local decision, and read the demonstration history.",
      ],
    ],
  },
  privacy: {
    label: "LEGAL / PRIVACY",
    title: "A CLEARER VIEW OF YOUR DATA.",
    intro:
      "This notice describes the behavior of this NEAT concept website as implemented, rather than claiming policies of an established operating company.",
    kind: "legal",
    blocks: [
      [
        "Website demonstrations",
        "Drawing selections, observation discoveries, and demo approvals exist in browser memory. They reset when the relevant page or component is reloaded. No project model files are uploaded.",
      ],
      [
        "Inquiry information",
        "The contact form requests name, work email, firm, role, software interest, team size, challenge, and message. When configured, it sends that information through the selected email provider to the designated recipient. It does not submit successfully when delivery is unconfigured.",
      ],
      [
        "Hosting and protection",
        "The hosting provider may process request metadata and security logs. Rate limiting uses short-lived request identifiers; when a managed limiter is configured, a hashed IP key is retained for up to ten minutes. No analytics, advertising cookies, or marketing subscriptions are implemented.",
      ],
      [
        "Requests and retention",
        "Do not submit confidential model information. A production operator must establish retention periods, a privacy contact, legal identity, and applicable data rights before collecting real leads. Until then this protected preview is a development demonstration.",
      ],
    ],
  },
  terms: {
    label: "LEGAL / TERMS OF USE",
    title: "INTELLIGENCE WITH RESPONSIBILITY.",
    intro:
      "This preview demonstrates the NEAT website and proposed workflow. It does not offer certified architectural, engineering, legal, or code-compliance services.",
    kind: "legal",
    blocks: [
      [
        "Illustrative content",
        "Buildings, observations, interface counts, assistant messages, and approval outcomes are demonstration content. No real customer performance, supported software integration, or autonomous design service is claimed.",
      ],
      [
        "Professional review",
        "Potential issues are examples for human evaluation. Applicable requirements depend on jurisdiction, adopted code edition, amendments, occupancy, construction type, and project conditions. Do not use the demo to determine compliance.",
      ],
      [
        "Model changes",
        "The website cannot read or modify an open BIM application. Any future integration would require an authorized adapter, supported API, explicit approval, and appropriate professional oversight.",
      ],
      [
        "Preview limitations",
        "Availability and features may change. Do not submit confidential files or rely on demo outputs for construction. A production operator must supply its legal identity, support contact, and jurisdiction-specific terms before a commercial launch.",
      ],
    ],
  },
};
for (const [name, description, slug] of audiences.slice(0, 4)) {
  pages[`solutions/${slug}`] = {
    label: `SOLUTIONS / ${name}`,
    title:
      name === "ARCHITECTS"
        ? "MORE SPACE FOR DESIGN."
        : name === "BIM MANAGERS"
          ? "CONSISTENCY IN EVERY REVIEW."
          : name === "ENGINEERS"
            ? "COORDINATION IN CONTEXT."
            : "EVERY CLEARANCE IN CONTEXT.",
    intro: description,
    blocks: [
      [
        "Read the model",
        "Keep project geometry and relevant design relationships visible while examining potential concerns.",
      ],
      [
        "Make review repeatable",
        "Bring team-defined criteria into a structured workflow. Preserve context rather than relying on disconnected comments.",
      ],
      [
        "Keep professional control",
        "Evaluate every observation and proposed change. The demonstration illustrates a workflow and does not replace qualified review.",
      ],
    ],
    links: [
      ["Explore the workflow", "/how-it-works"],
      ["Try NEAT Assist", "/product/neat-assist"],
      ["Discuss your workflow", "/contact"],
    ],
  };
}

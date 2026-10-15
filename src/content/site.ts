export const observations = [
  {
    id: "guardrail",
    title: "GUARDRAIL REVIEW",
    category: "Balcony protection",
    description:
      "Potential guardrail-height concern. Verify the design against the applicable adopted building code and project conditions.",
    region: { x: 0.574, y: 0.711, w: 0.19, h: 0.073 },
    action: "Inspect balcony protection and project criteria.",
  },
  {
    id: "stair",
    title: "STAIR GEOMETRY REVIEW",
    category: "Stair geometry",
    description:
      "Review riser consistency, tread depth, and applicable stair requirements before documentation.",
    region: { x: 0.195, y: 0.785, w: 0.14, h: 0.06 },
    action: "Compare stair dimensions and review consistency.",
  },
  {
    id: "door",
    title: "DOOR CLEARANCE REVIEW",
    category: "Principal entrance",
    description:
      "Check required clear opening dimensions and maneuvering clearances for the intended occupancy and accessibility criteria.",
    region: { x: 0.443, y: 0.6, w: 0.11, h: 0.17 },
    action: "Review opening dimensions and approach clearances.",
  },
  {
    id: "egress",
    title: "EGRESS PATH REVIEW",
    category: "Circulation coordination",
    description:
      "Confirm exit access travel distance, corridor configuration, and applicable fire-safety requirements.",
    region: { x: 0.572, y: 0.43, w: 0.11, h: 0.17 },
    action: "Trace the exit access route within the project.",
  },
] as const;
export const problems = [
  [
    "MANUAL",
    "EVERY SMALL CHANGE BECOMES ANOTHER TASK.",
    "From repetitive adjustments to drawing cleanup, work that could be standardized continues to consume valuable design time.",
  ],
  [
    "DISCONNECTED",
    "PROJECT KNOWLEDGE GETS LOST BETWEEN TOOLS.",
    "Design decisions, model information, code references, and reviewer comments often live in separate places.",
  ],
  [
    "REACTIVE",
    "ISSUES ARE FOUND LATER THAN THEY SHOULD BE.",
    "Potential coordination problems may remain unnoticed until formal reviews or later design phases.",
  ],
  [
    "INEFFICIENT",
    "THE ROUTINE WORK KEEPS INTERRUPTING THE CREATIVE WORK.",
    "The accumulated weight of small tasks can make it harder to focus on the overall design.",
  ],
];
export const phases = [
  {
    name: "INSPECT",
    title: "SEE THE MODEL CLEARLY.",
    description:
      "Analyze the available model geometry, relationships, project parameters, and configured review criteria to identify areas that may need attention.",
    status: "MODEL INSPECTION IN PROGRESS",
    note: "Geometry, relationships and configured criteria are being examined.",
  },
  {
    name: "INTERPRET",
    title: "UNDERSTAND WHAT MATTERS.",
    description:
      "Turn findings into understandable observations with clear context, supporting references, and suggested next steps.",
    status: "OBSERVATION 02 / REVIEW REQUIRED",
    note: "Corridor clearance may need review. Confirm project assumptions before choosing an action.",
  },
  {
    name: "RESOLVE",
    title: "MAKE THE RIGHT CHANGE.",
    description:
      "Review available recommendations, compare alternatives, and approve an action when appropriate. In a future connected product, authorized model changes could be applied through a controlled integration.",
    status: "PROPOSAL / AWAITING HUMAN REVIEW",
    note: "Compare the original corridor and proposed adjustment. No connected model is changed.",
  },
  {
    name: "IMPROVE",
    title: "BUILD ON WHAT YOU LEARN.",
    description:
      "Capture project decisions, approved review criteria, and team preferences to support consistency across future design work.",
    status: "REVIEW HISTORY / UPDATED",
    note: "The demonstration records a review decision. Approved standards remain connected to the project.",
  },
];
export const assistCapabilities = [
  [
    "MODEL QUESTIONS",
    "Ask contextual questions about the active design and available project information.",
  ],
  [
    "DESIGN OBSERVATIONS",
    "Review potential geometric, coordination, or compliance-related concerns.",
  ],
  [
    "SUGGESTED ACTIONS",
    "Explore proposed adjustments and understand what each change would affect.",
  ],
  [
    "APPROVAL CONTROL",
    "Keep consequential model changes subject to explicit authorization.",
  ],
];
export const controlCapabilities = [
  [
    "REVIEW OVERVIEW",
    "A structured picture of open, reviewed, and resolved observations.",
  ],
  [
    "ISSUE PRIORITIZATION",
    "Focus attention on matters most relevant to the project.",
  ],
  [
    "PROJECT STANDARDS",
    "Organize configurable requirements and internal design criteria.",
  ],
  [
    "APPROVAL HISTORY",
    "Record proposed changes, decisions, and review outcomes.",
  ],
  [
    "TEAM COORDINATION",
    "Keep project observations connected to assigned responsibilities.",
  ],
];
export const audiences = [
  [
    "ARCHITECTS",
    "Spend less time navigating repetitive review work and more time shaping the building.",
    "architects",
  ],
  [
    "BIM MANAGERS",
    "Support consistent project standards and more organized model review workflows.",
    "bim-managers",
  ],
  [
    "INTERIOR DESIGNERS",
    "Explore space-planning, clearance, and coordination observations in context.",
    "interior-designers",
  ],
  [
    "ENGINEERS",
    "Identify interdisciplinary coordination questions earlier in the design process.",
    "engineers",
  ],
  [
    "TECHNICAL DESIGNERS",
    "Organize the drawing details and repetitive checks that often slow documentation.",
    "",
  ],
  [
    "DESIGN LEADS",
    "Maintain clearer visibility into reviews, responsibilities, and project decisions.",
    "",
  ],
  [
    "SMALL STUDIOS",
    "Develop repeatable workflows without adding unnecessary operational complexity.",
    "",
  ],
  [
    "MULTIDISCIPLINARY TEAMS",
    "Keep technical information connected across disciplines and responsibilities.",
    "",
  ],
];
export const principles = [
  ["HUMAN APPROVAL", "Consequential changes remain subject to review."],
  [
    "EXPLAINABLE OBSERVATIONS",
    "Review findings should include understandable reasoning and relevant context.",
  ],
  [
    "PROJECT CONTROL",
    "Design teams determine the criteria, permissions, and review workflows.",
  ],
  [
    "TRANSPARENT HISTORY",
    "Decisions and approved changes should remain traceable.",
  ],
];
export const navGroups = {
  Product: [
    ["Product overview", "/product"],
    ["NEAT Assist", "/product/neat-assist"],
    ["NEAT Control", "/product/neat-control"],
    ["Design Review", "/product#design-review"],
    ["Approval Workflows", "/product#approval-workflows"],
  ],
  Solutions: [
    ["Solutions overview", "/solutions"],
    ...audiences.slice(0, 4).map(([n, , s]) => [n, `/solutions/${s}`]),
    ["Design Teams", "/solutions#design-teams"],
  ],
  Resources: [
    ["Insights", "/resources"],
    ["Design Workflows", "/resources/design-workflows"],
    ["Documentation", "/resources/model-review"],
    ["Frequently Asked Questions", "/resources#faq"],
  ],
};

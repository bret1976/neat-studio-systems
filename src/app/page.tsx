import Link from "next/link";
import { DesignerControl } from "@/components/DesignerControl";
import Image from "next/image";
import { ArchitecturalInspectionHero } from "@/components/ArchitecturalInspectionHero";
import {
  DesignContext,
  WorkflowStory,
  InkTransformation,
} from "@/components/DrawingStories";
import { DemoWorkspace } from "@/components/DemoWorkspace";
import {
  problems,
  assistCapabilities,
  controlCapabilities,
  audiences,
  principles,
} from "@/content/site";
function Label({
  children,
  index,
}: {
  children: React.ReactNode;
  index: string;
}) {
  return (
    <div className="section-label">
      <span>
        {index} / {children}
      </span>
      <span>NEAT — INTELLIGENT DESIGN SYSTEMS</span>
    </div>
  );
}
function Capabilities({ items }: { items: string[][] }) {
  return (
    <div className="capabilities">
      {items.map(([t, d], i) => (
        <details key={t}>
          <summary>
            <span>0{i + 1}</span>
            {t}
            <b>+</b>
          </summary>
          <p>{d}</p>
        </details>
      ))}
    </div>
  );
}
export default function Home() {
  return (
    <>
      <ArchitecturalInspectionHero />
      <section className="problem-section" id="design-bottleneck">
        <Label index="02">THE DESIGN BOTTLENECK</Label>
        <div className="problem-intro">
          <div className="tower-drawing ruled">
            <Image
              className="tower-image"
              src="/drawings/tower.svg"
              width={1000}
              height={1100}
              alt="Original axonometric tower study with a structural facade grid and ground-level podium"
              unoptimized
            />
            <span className="red-circle" aria-hidden="true" />
            <span className="mono">
              NORTH COURT / DESIGN STUDY
              <br />
              PRECISION WITHOUT REPETITION.
            </span>
          </div>
          <div className="problem-copy" data-reveal>
            <h2>
              YOUR SOFTWARE
              <br />
              IS POWERFUL.
              <br />
              <span className="muted">
                WHY DOES EVERY DETAIL STILL DEPEND ON YOU?
              </span>
            </h2>
            <p>
              Modern architecture software can model remarkable buildings. But
              the work surrounding the design still demands countless manual
              checks, repetitive edits, disconnected reviews, and time-consuming
              coordination.
            </p>
            <p>
              The software knows the geometry. It doesn&apos;t necessarily know
              which detail needs your attention next.
            </p>
            <Link href="/product" className="button">
              LEARN MORE <span>↗</span>
            </Link>
          </div>
        </div>
        <div className="software-strip mono">
          <span>
            SOFTWARE INTERESTS
            <br />
            <small>FUTURE ADAPTERS / NOT LIVE INTEGRATIONS</small>
          </span>
          {["REVIT", "RHINO", "ARCHICAD", "SKETCHUP", "IFC"].map((s) => (
            <span key={s}>⌑ {s}</span>
          ))}
        </div>
        <div
          className="problem-grid"
          tabIndex={0}
          role="region"
          aria-label="Four design bottlenecks. Scroll horizontally on mobile."
        >
          {problems.map(([t, h, b], i) => (
            <article key={t}>
              <div
                className={`problem-diagram diagram-${i}`}
                aria-hidden="true"
              >
                <span />
                <span />
                <span />
                <b>0{i + 1}</b>
              </div>
              <span className="mono">
                {String(i + 1).padStart(2, "0")} / {t}
              </span>
              <h3>{h}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
        <div className="section-statement" data-reveal>
          GOOD DESIGN NEEDS ATTENTION.
          <br />
          <span className="muted">REPETITION DOESN&apos;T NEED ALL OF IT.</span>
        </div>
      </section>
      <DesignContext />
      <section className="product-section" id="neat-assist">
        <Label index="04">PRODUCT 01 / NEAT ASSIST</Label>
        <div className="section-heading">
          <h2>
            HELP WITHOUT
            <br />
            LEAVING THE MODEL.
          </h2>
          <div>
            <p>
              NEAT Assist is conceived as a contextual design companion that
              helps architects ask questions, investigate model conditions, and
              explore proposed adjustments without constantly switching between
              disconnected tools.
            </p>
            <p>
              The designer remains responsible for reviewing and approving
              decisions.
            </p>
          </div>
        </div>
        <DemoWorkspace />
        <div className="product-bottom">
          <Capabilities items={assistCapabilities} />
          <Link href="/product/neat-assist" className="technical-link">
            EXPLORE NEAT ASSIST <span>↗</span>
          </Link>
        </div>
      </section>
      <section className="product-section" id="neat-control">
        <Label index="05">PRODUCT 02 / NEAT CONTROL</Label>
        <div className="section-heading">
          <h2>
            THE DETAILS
            <br />
            IN ONE CLEAR VIEW.
          </h2>
          <p>
            NEAT Control is conceived as a centralized workspace for design
            reviews, project observations, coordination priorities, approval
            histories, and team-defined standards. It brings the technical
            details into focus without losing sight of the overall project.
          </p>
        </div>
        <DemoWorkspace control />
        <div className="product-bottom">
          <Capabilities items={controlCapabilities} />
          <Link href="/product/neat-control" className="technical-link">
            EXPLORE NEAT CONTROL <span>↗</span>
          </Link>
        </div>
      </section>
      <WorkflowStory />
      <section className="transformation-section" id="drawing-to-design">
        <Label index="07">FROM ANALYSIS TO POSSIBILITY</Label>
        <div className="section-heading">
          <h2>
            A CLEARER PATH
            <br />
            FROM DRAWING
            <br />
            TO DESIGN.
          </h2>
          <p>
            A technical drawing contains the information. A design carries the
            intention. NEAT brings these two perspectives closer together,
            helping design teams examine details while preserving the vision of
            the whole.
          </p>
        </div>
        <InkTransformation />
      </section>
      <section className="use-cases" id="solutions">
        <Label index="08">WHO IT&apos;S FOR</Label>
        <div className="section-heading">
          <h2>
            MADE FOR THE PEOPLE
            <br />
            BEHIND THE DRAWING.
          </h2>
          <span className="mono">
            DIFFERENT ROLES.
            <br />
            ONE CONNECTED DESIGN PROCESS.
          </span>
        </div>
        <div className="audience-editorial">
          <div className="audience-image ruled">
            <Image
              src="/images/north-court-render.webp"
              width={1800}
              height={1200}
              alt="Original North Court architectural study, shared by the NEAT design team"
              sizes="(max-width:760px) 100vw,50vw"
            />
            <span className="mono">
              NORTH COURT / DESIGN STUDY
              <br />
              ONE CONNECTED DESIGN PROCESS.
            </span>
          </div>
          <div className="audience-list">
            {audiences.map(([t, d, s], i) => (
              <details key={t} open={i === 0}>
                <summary>
                  <span className="mono">0{i + 1}</span>
                  {t}
                  <b>+</b>
                </summary>
                <div>
                  <p>{d}</p>
                  <Link
                    className="technical-link"
                    href={s ? `/solutions/${s}` : "/solutions#design-teams"}
                  >
                    EXPLORE <span>↗</span>
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="philosophy" id="philosophy">
        <Label index="09">OUR PHILOSOPHY</Label>
        <div className="philosophy-layout">
          <h2 data-reveal>
            INTELLIGENCE
            <br />
            SHOULD SUPPORT
            <br />
            THE DESIGNER.
            <br />
            <span className="muted">
              NOT REPLACE
              <br />
              THEM.
            </span>
          </h2>
          <div>
            <p>
              The most important decisions in architecture require context,
              experience, judgment, and responsibility.
            </p>
            <p>
              NEAT is designed around the idea that intelligent systems should
              improve how designers work without taking control away from them.
            </p>
            <p className="mono">
              OBSERVE CAREFULLY.
              <br />
              EXPLAIN CLEARLY.
              <br />
              RECOMMEND THOUGHTFULLY.
              <br />
              ACT ONLY WITH AUTHORIZATION.
            </p>
          </div>
        </div>
        <DesignerControl />
        <div className="principle-grid">
          {principles.map(([t, d]) => (
            <article key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <div className="section-statement">THE DESIGNER STAYS IN CONTROL.</div>
      </section>
      <section className="final-cta">
        <Label index="10">A MORE INTELLIGENT WAY TO DESIGN</Label>
        <div className="cta-layout">
          <div>
            <h2>
              LET THE
              <br />
              DESIGN MOVE
              <br />
              FORWARD.
            </h2>
            <span className="mono">
              YOUR NEXT PROJECT DESERVES A CLEARER WORKFLOW.
            </span>
            <p>
              NEAT brings architectural intelligence, model review, and
              controlled automation into one forward-looking design experience.
              Explore what a more connected workflow could look like.
            </p>
            <div className="cta-buttons">
              <Link className="button dark" href="/contact">
                REQUEST A DEMO ↗
              </Link>
              <Link className="button" href="/product">
                EXPLORE THE PRODUCT ↗
              </Link>
            </div>
            <span className="mono">DESIGN FREELY. BUILD INTELLIGENTLY.</span>
          </div>
          <InkTransformation closing />
        </div>
      </section>
    </>
  );
}

import { ProductPreview } from "@/components/ProductPreview";
import { SoftwareStrip } from "@/components/SoftwareStrip";
import { SecondaryClosing } from "@/components/SecondaryClosing";
import { ArchitecturalPortal } from "@/components/ArchitecturalPortal";
import { ProductTour } from "@/components/ProductTour";
import { ResourceLibrary } from "@/components/ResourceLibrary";
import { AboutIdentity } from "@/components/AboutIdentity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { pages } from "@/content/pages";
import { ArchitecturalDrawing } from "@/components/ArchitecturalDrawing";
import { ArchitecturalInspectionHero } from "@/components/ArchitecturalInspectionHero";
import { DemoWorkspace } from "@/components/DemoWorkspace";
import { WorkflowStory } from "@/components/DrawingStories";
export function generateStaticParams() {
  return Object.keys(pages).map((p) => ({ slug: p.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  return { title: page?.title, description: page?.intro };
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = pages[slug.join("/")];
  if (!page) notFound();
  const productPage = page.kind === "assist" || page.kind === "control";
  const aboutPage = slug.join("/") === "about";
  return (
    <>
      <section
        className={
          productPage
            ? "product-detail-page"
            : aboutPage
              ? "about-detail-page"
              : undefined
        }
      >
        <div className="section-label">
          <span>{page.label}</span>
          <Link href="/">INDEX / 001 ↗</Link>
        </div>
        {slug.join("/") === "about" && <AboutIdentity />}
        <div className={productPage ? "product-page-hero" : "page-intro"}>
          <div
            className={productPage ? "product-page-copy" : "page-intro-copy"}
          >
            <h1>{page.title}</h1>
            <div>
              <p>{page.intro}</p>
              <p className="mono">
                PROPOSED PLATFORM / INTERACTIVE DEMONSTRATION
              </p>
            </div>
          </div>
          {productPage && <ProductPreview control={page.kind === "control"} />}
        </div>
        {productPage && <SoftwareStrip />}
        <div className="page-content">
          {productPage && (
            <div className="product-feature-heading">
              <span className="mono">KEY FEATURES</span>
              <h2>
                YOUR DESIGN.
                <br />
                YOUR CONTROL.
              </h2>
            </div>
          )}
          {page.kind === "assist" ? (
            <ProductTour />
          ) : page.kind === "control" ? (
            <ProductTour control />
          ) : page.kind === "resources" ? (
            <ResourceLibrary />
          ) : (
            !["workflow", "demo", "legal"].includes(page.kind || "") &&
            (aboutPage ? (
              <ArchitecturalPortal />
            ) : (
              <ArchitecturalDrawing plan={page.kind === "solutions"} />
            ))
          )}
          <div
            className={`page-blocks ${page.kind === "legal" ? "legal-blocks" : ""}`}
          >
            {page.blocks.map(([t, d], i) => (
              <article
                key={t}
                id={
                  t === "Design Review"
                    ? "design-review"
                    : t === "Approval Workflows"
                      ? "approval-workflows"
                      : t === "DESIGN LEADS"
                        ? "design-teams"
                        : undefined
                }
              >
                <span className="mono">
                  {String(i + 1).padStart(2, "0")} / NEAT
                </span>
                <h2>{t}</h2>
                <p>{d}</p>
              </article>
            ))}
          </div>
          {page.links && (
            <div className="page-links">
              {page.links.map(([t, u]) => (
                <Link href={u} key={u}>
                  {t}
                  <span>↗</span>
                </Link>
              ))}
            </div>
          )}
          {(page.kind === "resources" || productPage) && (
            <div className="faq" id="faq">
              <h2>FREQUENTLY ASKED QUESTIONS.</h2>
              {[
                [
                  "Is NEAT available as a BIM plugin?",
                  "No. This is a proposed platform and interactive marketing demonstration. No native software integrations are implemented.",
                ],
                [
                  "Does the demo assess code compliance?",
                  "No. All observations are illustrative and require professional, project-specific review.",
                ],
                [
                  "Can this website change my model?",
                  "No. Approval controls update local demonstration states only.",
                ],
                [
                  "How can I request a demo?",
                  "Use the contact page. The form clearly reports when delivery configuration is missing.",
                ],
              ].map(([q, a]) => (
                <details key={q}>
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          )}
          {!page.kind?.includes("legal") && (
            <Link className="button dark" href="/contact">
              DISCUSS YOUR WORKFLOW ↗
            </Link>
          )}
        </div>
      </section>
      {(productPage || page.kind === "resources" || aboutPage) && (
        <SecondaryClosing />
      )}
      {page.kind === "workflow" && <WorkflowStory />}
      {page.kind === "demo" && (
        <>
          <ArchitecturalInspectionHero compact />
          <section className="page-content">
            <div className="section-heading">
              <h2>NEAT ASSIST</h2>
              <p>
                Compare alternatives and keep control of the proposed change.
              </p>
            </div>
            <DemoWorkspace />
            <div className="section-heading">
              <h2>NEAT CONTROL</h2>
              <p>
                Inspect observations and record local demonstration decisions.
              </p>
            </div>
            <DemoWorkspace control />
          </section>
        </>
      )}
    </>
  );
}

import { DemoInquiryForm } from "@/components/DemoInquiryForm";
import { inquiriesConfigured } from "@/lib/inquiries";
export const metadata = {
  title: "Request a demo",
  description:
    "Tell us how your architectural design team works and where a connected review workflow could help.",
};
export default function Contact() {
  return (
    <section>
      <div className="section-label">
        <span>CONTACT / REQUEST ACCESS</span>
        <span>NEAT — INTELLIGENT DESIGN SYSTEMS</span>
      </div>
      <div className="page-intro">
        <h1>
          LET&apos;S MAKE
          <br />
          DESIGN WORK
          <br />
          SMARTER.
        </h1>
        <p>
          Tell us how your team works today and which parts of the process are
          slowing you down. We&apos;ll explore how a more connected
          architectural intelligence workflow could help.
        </p>
      </div>
      <div className="contact-layout">
        <aside className="contact-aside">
          <span className="mono">YOUR DESIGN. YOUR CONTROL.</span>
          <h2>
            BETTER MODELS.
            <br />
            BETTER DECISIONS.
          </h2>
          <p>
            Explore the proposed platform, discuss a review challenge, or share
            the workflow your team wants to improve.
          </p>
          <p className="mono">
            NEAT ASSIST / NEAT CONTROL
            <br />
            PROPOSED PLATFORM
          </p>
        </aside>
        <DemoInquiryForm configured={inquiriesConfigured()} />
      </div>
    </section>
  );
}

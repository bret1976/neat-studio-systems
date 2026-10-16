import Link from "next/link";
import { ClosingStudy } from "./ClosingStudy";
export function SecondaryClosing() {
  return (
    <section className="secondary-closing ruled">
      <div className="section-label">
        <span>NEAT / INTELLIGENT DESIGN SYSTEMS</span>
        <span>YOUR DESIGN. YOUR CONTROL.</span>
      </div>
      <h2>
        LET THE DESIGN
        <br />
        MOVE FORWARD.
      </h2>
      <p>Design freely. Build intelligently.</p>
      <Link className="button dark" href="/contact">
        REQUEST A DEMO ↗
      </Link>
      <ClosingStudy />
    </section>
  );
}

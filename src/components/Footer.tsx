"use client";
import Link from "next/link";
import { NeatMonogram } from "./NeatMonogram";
import { FooterInk } from "./FooterInk";
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <Link href="/" className="footer-brand">
            NEAT.
          </Link>
          <span className="mono">INTELLIGENT DESIGN SYSTEMS</span>
          <h3>
            DESIGN FREELY.
            <br />
            BUILD INTELLIGENTLY.
          </h3>
        </div>
        <div>
          <span className="mono">PRODUCT</span>
          {[
            ["NEAT Assist", "/product/neat-assist"],
            ["NEAT Control", "/product/neat-control"],
            ["Design Review", "/product#design-review"],
            ["Approval Workflows", "/product#approval-workflows"],
          ].map(([t, u]) => (
            <Link key={u} href={u}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <span className="mono">EXPLORE</span>
          {[
            ["How It Works", "/how-it-works"],
            ["Solutions", "/solutions"],
            ["Resources", "/resources"],
            ["About", "/about"],
            ["Contact", "/contact"],
          ].map(([t, u]) => (
            <Link key={u} href={u}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <span className="mono">ARCHITECTURAL INTELLIGENCE / 001</span>
          <p>
            YOUR DESIGN.
            <br />
            YOUR CONTROL.
          </p>
          <Link className="technical-link red" href="/contact">
            REQUEST ACCESS ↗
          </Link>
          <small>
            A proposed platform.
            <br />
            An interactive design experience.
          </small>
        </div>
        <NeatMonogram />
        <div className="footer-aux">
          <div><span className="mono">THE DESIGNER STAYS IN CONTROL.</span><p>Observe carefully. Explain clearly. Recommend thoughtfully.</p></div>
          <div><span className="mono">DESIGN REVIEW</span><Link href="/resources/model-review">Context before conclusions ↗</Link></div>
          <div><span className="mono">WORK WITH NEAT</span><Link href="/contact">Request a demonstration ↗</Link></div>
          <div><span className="mono">RESOURCES</span><Link href="/resources">Original field notes ↗</Link></div>
        </div>
      </div>
      <FooterInk />
      <div className="footer-bottom mono">
        <span>© 2026 NEAT. All rights reserved.</span>
        <div>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Use</Link>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
export default function NotFound() {
  return (
    <section>
      <div className="page-intro">
        <h1>
          DRAWING
          <br />
          NOT FOUND.
        </h1>
        <div>
          <p>The requested page is outside this drawing set.</p>
          <Link className="button" href="/">
            RETURN TO INDEX ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

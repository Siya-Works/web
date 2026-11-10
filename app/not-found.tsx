import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section page-section narrow">
      <span className="eyebrow">404 · A LITTLE DETOUR</span>
      <h1>This piece doesn’t fit.</h1>
      <p style={{ margin: "25px 0" }}>
        That page may have moved. There’s plenty more to discover back home.
      </p>
      <Link className="button" href="/">
        Back to the fun ↗
      </Link>
    </section>
  );
}

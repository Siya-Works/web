import { facts } from "@/content/facts";
import { Catalog } from "@/components/catalog";
import { metadata as meta } from "@/lib/site";
export const metadata = meta(
  "Fun facts",
  "Small, surprising discoveries about space, nature, and our planet, with sources to explore.",
  "/fun-facts/",
);
export default function Page() {
  return (
    <section className="section page-section">
      <div className="page-heading">
        <span className="eyebrow">FOR YOUR INNER “DID YOU KNOW?”</span>
        <h1>The world is wonderfully weird.</h1>
        <p>
          Small discoveries worth sharing. Every fact comes with a source for
          the extra curious.
        </p>
      </div>
      <Catalog
        base="fun-facts"
        items={facts.map((f) => ({ ...f, description: f.summary }))}
      />
    </section>
  );
}

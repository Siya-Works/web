import { puzzles } from "@/content/puzzles";
import { Catalog } from "@/components/catalog";
import { metadata as meta } from "@/lib/site";
export const metadata = meta(
  "Puzzles",
  "Original riddles, number challenges, and logic puzzles with friendly hints and explanations.",
  "/puzzles/",
);
export default function Page() {
  return (
    <section className="section page-section">
      <div className="page-heading">
        <span className="eyebrow">A LITTLE HEAD-SCRATCHING IS GOOD</span>
        <h1>Meet your next aha! moment.</h1>
        <p>
          A pinch of logic, a twist of words, a little number magic. Hints are
          always welcome.
        </p>
      </div>
      <Catalog
        base="puzzles"
        items={puzzles.map((p) => ({ ...p, description: p.question }))}
      />
    </section>
  );
}

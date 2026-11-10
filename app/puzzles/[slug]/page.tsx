import Link from "next/link";
import { notFound } from "next/navigation";
import { puzzles } from "@/content/puzzles";
import { metadata } from "@/lib/site";
import { AdSlot } from "@/components/ads";
export const dynamicParams = false;
export function generateStaticParams() {
  return puzzles.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = puzzles.find((p) => p.slug === slug);
  return p ? metadata(p.title, p.question, "/puzzles/" + slug + "/") : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = puzzles.findIndex((p) => p.slug === slug);
  const p = puzzles[index];
  if (!p) notFound();
  return (
    <section className="section page-section narrow">
      <Link className="back-link" href="/puzzles/">
        ← All puzzles
      </Link>
      <div className="page-heading">
        <span className="eyebrow">{p.category} · PAUSE & PONDER</span>
        <h1>{p.title}</h1>
      </div>
      <article className="puzzle-paper">
        <span className="paper-spark" aria-hidden="true">
          ✧
        </span>
        <p className="question">{p.question}</p>
        <details>
          <summary>A little nudge?</summary>
          <p>{p.hint}</p>
        </details>
        <details>
          <summary>Ready for the answer?</summary>
          <h2>{p.answer}</h2>
          <p>{p.explanation}</p>
        </details>
      </article>
      <div className="next-content">
        <span>Keep that curiosity going.</span>
        <Link
          className="button"
          href={"/puzzles/" + puzzles[(index + 1) % puzzles.length].slug + "/"}
        >
          Next puzzle ↗
        </Link>
      </div>
      <AdSlot />
    </section>
  );
}

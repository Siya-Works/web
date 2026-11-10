import Link from "next/link";
import { notFound } from "next/navigation";
import { facts } from "@/content/facts";
import { metadata } from "@/lib/site";
import { AdSlot } from "@/components/ads";
export const dynamicParams = false;
export function generateStaticParams() {
  return facts.map((f) => ({ slug: f.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = facts.find((f) => f.slug === slug);
  return f ? metadata(f.title, f.summary, "/fun-facts/" + slug + "/") : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = facts.findIndex((f) => f.slug === slug);
  const f = facts[index];
  if (!f) notFound();
  return (
    <section className="section page-section narrow">
      <Link className="back-link" href="/fun-facts/">
        ← All fun facts
      </Link>
      <div className="page-heading">
        <span className="eyebrow">{f.category} · A LITTLE WONDER</span>
        <h1>{f.title}</h1>
      </div>
      <article className="puzzle-paper fact-paper">
        <span className="paper-spark" aria-hidden="true">
          ✳
        </span>
        <p className="question">{f.summary}</p>
        <p>{f.detail}</p>
        <a
          className="text-link"
          href={f.source}
          target="_blank"
          rel="noreferrer"
        >
          Explore the source at {f.sourceName} ↗
        </a>
        <p className="small">Source checked November 10, 2026.</p>
      </article>
      <div className="next-content">
        <span>There’s always more to discover.</span>
        <Link
          className="button"
          href={"/fun-facts/" + facts[(index + 1) % facts.length].slug + "/"}
        >
          Next fun fact ↗
        </Link>
      </div>
      <AdSlot />
    </section>
  );
}

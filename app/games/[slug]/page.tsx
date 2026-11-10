import Link from "next/link";
import { notFound } from "next/navigation";
import { games } from "@/content/games";
import { Game } from "@/components/games";
import { AdSlot } from "@/components/ads";
import { metadata } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = games.find((g) => g.slug === slug);
  return g ? metadata(g.title, g.description, "/games/" + slug + "/") : {};
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = games.find((g) => g.slug === slug);
  if (!g) notFound();
  return (
    <section className="section page-section">
      <Link className="back-link" href="/games/">
        ← All games
      </Link>
      <div className="page-heading">
        <span className="eyebrow">{g.category} · A LITTLE PLAY</span>
        <h1>{g.title}</h1>
        <p>{g.description}</p>
      </div>
      <div className="game-layout">
        <Game slug={g.slug} />
        <aside className="instructions">
          <span className="eyebrow">THE LITTLE HOW-TO</span>
          <h2>
            Easy to start.
            <br />
            Fun to figure out.
          </h2>
          <p>{g.instructions}</p>
          <p>Take your time. There’s no timer and no pressure.</p>
          <div className="tip">
            ✦{" "}
            <span>
              Keyboard friendly: use Tab to reach a square or card, then Enter
              or Space to choose it.
            </span>
          </div>
          <p className="small">
            Personal bests, where available, stay in this browser. Clearing
            browser data resets them.
          </p>
        </aside>
      </div>
      <AdSlot />
    </section>
  );
}

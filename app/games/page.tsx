import Link from "next/link";
import { games } from "@/content/games";
import { GameArt } from "@/components/game-art";
import { metadata as meta } from "@/lib/site";
export const metadata = meta(
  "Games",
  "Three free browser games for a happy little brain break.",
  "/games/",
);
export default function Page() {
  return (
    <section className="section page-section">
      <div className="page-heading">
        <span className="eyebrow">A FEW MINUTES, JUST FOR FUN</span>
        <h1>Let the good games begin.</h1>
        <p>
          No downloads or accounts. Pick a game and make yourself a little
          moment.
        </p>
      </div>
      <div className="game-grid">
        {games.map((g) => (
          <Link
            className="game-card"
            href={"/games/" + g.slug + "/"}
            key={g.slug}
          >
            <GameArt kind={g.slug} />
            <div className="game-card-body">
              <span className="eyebrow">{g.category}</span>
              <h2>{g.title} ↗</h2>
              <p>{g.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

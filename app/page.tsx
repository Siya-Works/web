import Link from "next/link";
import { HeroArt, GameArt } from "@/components/game-art";
import { DailyPick } from "@/components/daily-pick";
import { AdSlot } from "@/components/ads";
import { games } from "@/content/games";
import { facts } from "@/content/facts";
import { metadata as meta } from "@/lib/site";
export const metadata = meta(
  "Siya Works — A little play. A little wonder.",
  "Free games, delightful puzzles, and surprising facts. Your happy little corner of the internet.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="pill">
            <span aria-hidden="true">✦</span> A HAPPY LITTLE CORNER OF THE
            INTERNET
          </span>
          <h1>
            A little play.
            <br />A little{" "}
            <span className="wonder">
              wonder
              <svg viewBox="0 0 360 18" aria-hidden="true">
                <path d="M4 11 Q160 -1 354 9 M40 16 Q220 5 322 14" />
              </svg>
            </span>
            .
          </h1>
          <p>
            Give your brain a breather and your curiosity a nudge.
            <br className="desktop-break" /> Puzzles, games, and delightful
            things to discover.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/games/">
              Let’s play <span aria-hidden="true">↗</span>
            </Link>
            <Link className="secondary-link" href="/fun-facts/">
              Surprise me <span aria-hidden="true">✧</span>
            </Link>
          </div>
          <div className="hero-caption">
            <span aria-hidden="true">☺</span> No sign-ups. No downloads. Just a
            little joy.
          </div>
        </div>
        <HeroArt />
      </section>
      <div className="ticker">
        <span>STAY CURIOUS</span>
        <b>✳</b>
        <span>PLAY A LITTLE</span>
        <b>✳</b>
        <span>LEARN SOMETHING NEW</span>
        <b>✳</b>
        <span>MAKE YOUR DAY</span>
        <b>✳</b>
      </div>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">READY, SET, RESET YOUR BRAIN</span>
            <h2>Your next “one more round.”</h2>
          </div>
          <Link className="text-link" href="/games/">
            All games ↗
          </Link>
        </div>
        <div className="game-grid">
          {games.map((game) => (
            <Link
              href={"/games/" + game.slug + "/"}
              className="game-card"
              key={game.slug}
            >
              <GameArt kind={game.slug} />
              <div className="game-card-body">
                <span className="eyebrow">{game.category} · QUICK PLAY</span>
                <h3>
                  {game.title}
                  <span aria-hidden="true">↗</span>
                </h3>
                <p>{game.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <DailyPick />
      <AdSlot />
      <section className="section fact-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">WELL, THAT’S PRETTY COOL</span>
            <h2>A tiny fact. A big “really?!”</h2>
          </div>
          <Link className="text-link" href="/fun-facts/">
            More fun facts ↗
          </Link>
        </div>
        <div className="fact-feature">
          <div className="planet-art" aria-hidden="true">
            <span>✦</span>
            <div className="planet" />
            <b>✧</b>
          </div>
          <div>
            <span className="pill">✧ SPACE & WONDER</span>
            <h3>
              A day on Venus is
              <br />
              longer than its year.
            </h3>
            <p>
              One full spin takes 243 Earth days. One trip around the Sun? Just
              225. Venus really takes its time.
            </p>
            <Link
              className="text-link"
              href={"/fun-facts/" + facts[0].slug + "/"}
            >
              A little more wonder ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="closing">
        <span aria-hidden="true">✳</span>
        <h2>Curiosity looks good on you.</h2>
        <p>Come for a quick break. Leave with a little spark.</p>
        <Link className="text-link" href="/puzzles/">
          Find your next puzzle ↗
        </Link>
      </section>
    </>
  );
}

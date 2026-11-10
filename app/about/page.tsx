import { metadata as meta } from "@/lib/site";
export const metadata = meta(
  "About",
  "Meet Siya Works, a small place for play, discovery, and everyday curiosity.",
  "/about/",
);
export default function Page() {
  return (
    <section className="section page-section narrow prose">
      <span className="eyebrow">OUR LITTLE WORLD</span>
      <h1>
        Small breaks.
        <br />
        Big possibilities.
      </h1>
      <p>
        Siya Works is a happy little corner of the internet for people who enjoy
        figuring things out. We believe a few playful minutes can make an
        ordinary day feel a little brighter.
      </p>
      <h2>Play, ponder, discover.</h2>
      <p>
        Try a quick game, untangle a puzzle, or stumble across a fact that makes
        you say “really?” Everything is free to explore, without an account or a
        download.
      </p>
      <h2>Curiosity, with care.</h2>
      <p>
        Our puzzles include hints and explanations, because the joy is in
        understanding the answer. Our fun facts link to their sources so you can
        keep exploring. We add and refresh content from time to time.
      </p>
      <h2>A place for everyone.</h2>
      <p>
        There are no timers pushing you along and no public scoreboards to keep
        up with. Play at your pace, use a keyboard or a touch screen, and enjoy
        the small discoveries.
      </p>
    </section>
  );
}

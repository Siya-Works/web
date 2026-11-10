export function GameArt({ kind }: { kind: string }) {
  return (
    <div className={"game-art " + kind} aria-hidden="true">
      {kind === "memory-match" ? (
        <div className="mini-cards">
          <span>✿</span>
          <span>?</span>
          <span>?</span>
          <span>✿</span>
        </div>
      ) : kind === "tic-tac-toe" ? (
        <div className="mini-grid">
          {["×", "○", "", "", "×", "○", "○", "", "×"].map((v, i) => (
            <span key={i}>{v}</span>
          ))}
        </div>
      ) : (
        <div className="mini-tiles">
          {[1, 2, 3, 4, 5, 6, 7, 8, ""].map((v, i) => (
            <span key={i}>{v}</span>
          ))}
        </div>
      )}
      <span className="art-spark">✧</span>
    </div>
  );
}
export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <span className="orbit o1">✳</span>
      <span className="orbit o2">✧</span>
      <div className="hero-note">A little play goes a long way.</div>
      <div className="hero-card">
        <div className="eyes">
          <i />
          <i />
        </div>
        <div className="smile" />
        <span>hello, curious mind.</span>
      </div>
      <div className="hero-tile">✿</div>
      <div className="hero-cross">×</div>
      <span className="orbit o3">✦</span>
      <div className="scribble">less scrolling, more smiling ↗</div>
    </div>
  );
}

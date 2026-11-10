"use client";
import { useEffect, useState } from "react";
import {
  computerMove,
  isSolved,
  Mark,
  memoryDeck,
  neighbors,
  readBest,
  saveBest,
  shuffledTiles,
  slide,
  solved,
  winner,
} from "@/lib/game-logic";
function useBest(key: string) {
  const [best, setBest] = useState<number | null>(null);
  useEffect(() => {
    try {
      setBest(readBest(key, window.localStorage));
    } catch {}
  }, [key]);
  return {
    best,
    record: (score: number) => {
      try {
        setBest(saveBest(key, score, window.localStorage));
      } catch {
        setBest((old) => (old === null ? score : Math.min(old, score)));
      }
    },
  };
}
function Score({ moves, best }: { moves: number; best: number | null }) {
  return (
    <div className="score">
      <span>
        Turns <strong>{moves}</strong>
      </span>
      <span>
        Personal best <strong>{best ?? "—"}</strong>
      </span>
    </div>
  );
}
export function MemoryGame() {
  const [deck, setDeck] = useState<number[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const { best, record } = useBest("siya-memory-best");
  const symbols = ["✿", "★", "☀", "♥", "☾", "◆"];
  const names = ["flower", "star", "sun", "heart", "moon", "diamond"];
  function reset() {
    setDeck(memoryDeck());
    setOpen([]);
    setMatched([]);
    setMoves(0);
  }
  useEffect(() => {
    setDeck(memoryDeck());
  }, []);
  useEffect(() => {
    if (open.length !== 2) return;
    const timeout = setTimeout(() => setOpen([]), 850);
    return () => clearTimeout(timeout);
  }, [open]);
  function flip(i: number) {
    if (open.length === 2 || open.includes(i) || matched.includes(i)) return;
    const next = [...open, i];
    setOpen(next);
    if (next.length === 2) {
      const turns = moves + 1;
      setMoves(turns);
      if (deck[next[0]] === deck[i]) {
        const found = [...matched, ...next];
        setMatched(found);
        setOpen([]);
        if (found.length === 12) record(turns);
      }
    }
  }
  return (
    <div className="play-panel">
      <Score moves={moves} best={best} />
      <div className="memory-board">
        {deck.map((value, i) => {
          const revealed = open.includes(i) || matched.includes(i);
          return (
            <button
              key={i}
              className={
                "memory-card " +
                (revealed ? "revealed " : "") +
                (matched.includes(i) ? "matched" : "")
              }
              aria-label={`Card ${i + 1}: ${revealed ? names[value] : "face down"}${matched.includes(i) ? ", matched" : ""}`}
              aria-disabled={revealed || open.length === 2}
              onClick={() => flip(i)}
            >
              {revealed ? symbols[value] : "?"}
            </button>
          );
        })}
      </div>
      <p className="game-status" role="status">
        {matched.length === 12
          ? "Beautifully matched! All six pairs found."
          : `${matched.length / 2} of 6 pairs found${open.length === 2 ? " · Not a match. Try again!" : ""}`}
      </p>
      <button className="button" onClick={reset}>
        New game ↻
      </button>
    </div>
  );
}
export function TicTacToe() {
  const [board, setBoard] = useState<Mark[]>(Array(9).fill(null));
  const [thinking, setThinking] = useState(false);
  const won = winner(board);
  const draw = !won && board.every(Boolean);
  useEffect(() => {
    if (!thinking) return;
    const timeout = setTimeout(() => {
      setBoard((previous) => {
        const index = computerMove(previous);
        if (index < 0) return previous;
        const next = [...previous];
        next[index] = "O";
        return next;
      });
      setThinking(false);
    }, 450);
    return () => clearTimeout(timeout);
  }, [thinking]);
  function play(i: number) {
    if (board[i] || won || draw || thinking) return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    if (!winner(next) && next.some((v) => v === null)) setThinking(true);
  }
  return (
    <div className="play-panel">
      <div className="score">
        <span>
          You <strong>×</strong>
        </span>
        <span>
          Computer <strong>○</strong>
        </span>
      </div>
      <div className="tic-board">
        {board.map((value, i) => (
          <button
            key={i}
            className={value === "O" ? "o-mark" : ""}
            aria-label={`Row ${Math.floor(i / 3) + 1}, column ${(i % 3) + 1}: ${value || "empty"}`}
            aria-disabled={!!value || !!won || draw || thinking}
            onClick={() => play(i)}
          >
            {value === "X" ? "×" : value === "O" ? "○" : ""}
          </button>
        ))}
      </div>
      <p className="game-status" role="status">
        {won === "X"
          ? "Three cheers — you won!"
          : won === "O"
            ? "The computer wins. Fancy a rematch?"
            : draw
              ? "A well-played draw!"
              : thinking
                ? "Computer is thinking…"
                : "Your turn. Pick a square."}
      </p>
      <button
        className="button"
        onClick={() => {
          setThinking(false);
          setBoard(Array(9).fill(null));
        }}
      >
        New game ↻
      </button>
    </div>
  );
}
export function SlidingTiles() {
  const [board, setBoard] = useState([...solved]);
  const [ready, setReady] = useState(false);
  const [moves, setMoves] = useState(0);
  const { best, record } = useBest("siya-tiles-best");
  useEffect(() => {
    setBoard(shuffledTiles());
    setReady(true);
  }, []);
  const won = ready && isSolved(board);
  function move(i: number) {
    if (!ready || won) return;
    const next = slide(board, i);
    if (next === board) return;
    setBoard(next);
    setMoves(moves + 1);
    if (isSolved(next)) record(moves + 1);
  }
  return (
    <div className="play-panel">
      <Score moves={moves} best={best} />
      <div
        className="tile-board"
        role="group"
        tabIndex={0}
        aria-label="Sliding puzzle. Arrow keys move the empty space."
        onKeyDown={(event) => {
          const delta: Record<string, number> = {
            ArrowUp: -3,
            ArrowDown: 3,
            ArrowLeft: -1,
            ArrowRight: 1,
          };
          if (event.key in delta) {
            event.preventDefault();
            const blank = board.indexOf(0);
            move(blank + delta[event.key]);
          }
        }}
      >
        {board.map((value, i) => (
          <button
            key={i}
            className={value === 0 ? "empty" : ""}
            tabIndex={value === 0 ? -1 : 0}
            aria-label={value === 0 ? "Empty space" : `Tile ${value}`}
            aria-disabled={!neighbors(board.indexOf(0)).includes(i) || won}
            onClick={() => move(i)}
          >
            {value || ""}
          </button>
        ))}
      </div>
      <p className="game-status" role="status">
        {won
          ? "Everything in its place. Nicely done!"
          : "Slide a neighbor into the empty space."}
      </p>
      <button
        className="button"
        onClick={() => {
          setBoard(shuffledTiles());
          setMoves(0);
        }}
      >
        Shuffle & restart ↻
      </button>
    </div>
  );
}
export function Game({ slug }: { slug: string }) {
  return slug === "memory-match" ? (
    <MemoryGame />
  ) : slug === "tic-tac-toe" ? (
    <TicTacToe />
  ) : (
    <SlidingTiles />
  );
}

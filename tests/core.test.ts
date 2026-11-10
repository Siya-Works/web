import test from "node:test";
import assert from "node:assert/strict";
import {
  computerMove,
  dailyIndex,
  isSolved,
  lines,
  Mark,
  memoryDeck,
  neighbors,
  readBest,
  saveBest,
  shuffledTiles,
  slide,
  solved,
  winner,
} from "../lib/game-logic";
import { validateCollection, validateContent } from "../lib/validate";
test("all eight winning lines and a draw", () => {
  for (const line of lines) {
    const board: Mark[] = Array(9).fill(null);
    for (const i of line) board[i] = "X";
    assert.equal(winner(board), "X");
  }
  assert.equal(winner(["X", "O", "X", "X", "O", "O", "O", "X", "X"]), null);
});
test("computer wins before blocking, blocks threats and never overwrites", () => {
  assert.equal(
    computerMove(["O", "O", null, "X", "X", null, null, null, null]),
    2,
  );
  assert.equal(
    computerMove(["X", "X", null, null, "O", null, null, null, null]),
    2,
  );
  assert.equal(computerMove(Array(9).fill(null)), 4);
  assert.equal(computerMove(["X", "O", "X", "X", "O", "O", "O", "X", "X"]), -1);
  assert.equal(
    computerMove(["X", "X", "X", null, null, null, null, null, null]),
    -1,
  );
});
test("sliding respects row boundaries and completes from one move away", () => {
  assert.deepEqual(neighbors(2), [5, 1]);
  assert.equal(slide(solved, 0), solved);
  assert.deepEqual(slide(slide(solved, 7), 8), solved);
  assert.equal(isSolved(slide(solved, 7)), false);
  assert.equal(isSolved(solved), true);
});
test("500 generated sliding puzzles are solvable and not already complete", () => {
  for (let n = 0; n < 500; n++) {
    const board = shuffledTiles();
    assert.deepEqual(
      [...board].sort((a, b) => a - b),
      [0, 1, 2, 3, 4, 5, 6, 7, 8],
    );
    assert.equal(isSolved(board), false);
    const values = board.filter(Boolean);
    let inversions = 0;
    for (let i = 0; i < values.length; i++)
      for (let j = i + 1; j < values.length; j++)
        if (values[i] > values[j]) inversions++;
    assert.equal(inversions % 2, 0);
  }
});
test("memory deck has exactly six pairs", () => {
  for (let n = 0; n < 50; n++) {
    const deck = memoryDeck();
    assert.equal(deck.length, 12);
    for (let i = 0; i < 6; i++)
      assert.equal(deck.filter((v) => v === i).length, 2);
  }
});
test("daily selection uses the same UTC date across time zones and advances", () => {
  assert.equal(
    dailyIndex(new Date("2026-11-10T00:01:00Z"), 15),
    dailyIndex(new Date("2026-11-10T23:59:00Z"), 15),
  );
  assert.equal(
    dailyIndex(new Date("2026-11-10T05:30:00+05:30"), 15),
    dailyIndex(new Date("2026-11-10T00:00:00Z"), 15),
  );
  assert.equal(
    dailyIndex(new Date("2026-11-11"), 15),
    (dailyIndex(new Date("2026-11-10"), 15) + 1) % 15,
  );
  assert.throws(() => dailyIndex(new Date(), 0));
});
test("best scores tolerate blocked storage and corrupt values", () => {
  const blocked = {
    getItem: () => {
      throw Error("blocked");
    },
    setItem: () => {
      throw Error("blocked");
    },
  };
  assert.equal(readBest("test", blocked), null);
  assert.equal(saveBest("test", 12, blocked), 12);
  for (const raw of ["oops", "-4", "0", "Infinity", "2.5"])
    assert.equal(readBest("test", { getItem: () => raw }), null);
  let value: string | null = null;
  const store = {
    getItem: () => value,
    setItem: (_key: string, v: string) => {
      value = v;
    },
  };
  assert.equal(saveBest("test", 14, store), 14);
  assert.equal(saveBest("test", 20, store), 14);
  assert.equal(saveBest("test", 9, store), 9);
});
test("content is valid; missing values, duplicate and unsafe slugs fail", () => {
  validateContent();
  assert.throws(() =>
    validateCollection(
      [
        { slug: "same", title: "a" },
        { slug: "same", title: "b" },
      ],
      ["slug", "title"],
    ),
  );
  assert.throws(() =>
    validateCollection([{ slug: "ok", title: " " }], ["slug", "title"]),
  );
  assert.throws(() => validateCollection([{ slug: "../bad" }], ["slug"]));
  assert.throws(() =>
    validateCollection(
      [{ slug: "good", source: "http://example.com" }],
      ["slug", "source"],
    ),
  );
});

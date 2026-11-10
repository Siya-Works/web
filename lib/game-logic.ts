export type Mark = "X" | "O" | null;
export const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export function winner(board: Mark[]) {
  for (const [a, b, c] of lines)
    if (board[a] && board[a] === board[b] && board[a] === board[c])
      return board[a];
  return null;
}
export function computerMove(board: Mark[]): number {
  if (winner(board)) return -1;
  const empty = board.flatMap((v, i) => (v === null ? [i] : []));
  for (const mark of ["O", "X"] as const)
    for (const i of empty) {
      const copy = [...board];
      copy[i] = mark;
      if (winner(copy)) return i;
    }
  return [4, 0, 2, 6, 8, 1, 3, 5, 7].find((i) => board[i] === null) ?? -1;
}
export const solved = [1, 2, 3, 4, 5, 6, 7, 8, 0];
export function isSolved(board: number[]) {
  return board.every((v, i) => v === solved[i]);
}
export function neighbors(i: number) {
  return [
    i - 3,
    i + 3,
    i % 3 !== 0 ? i - 1 : -1,
    i % 3 !== 2 ? i + 1 : -1,
  ].filter((v) => v >= 0 && v < 9);
}
export function slide(board: number[], i: number) {
  const blank = board.indexOf(0);
  if (!neighbors(blank).includes(i)) return board;
  const copy = [...board];
  [copy[i], copy[blank]] = [copy[blank], copy[i]];
  return copy;
}
export function shuffledTiles(random = Math.random) {
  let board = [...solved],
    previous = -1;
  for (let n = 0; n < 120; n++) {
    const blank = board.indexOf(0);
    const options = neighbors(blank).filter((i) => i !== previous);
    board = slide(board, options[Math.floor(random() * options.length)]);
    previous = blank;
  }
  return isSolved(board) ? slide(board, 7) : board;
}
export function memoryDeck(random = Math.random) {
  const cards = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5];
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
export function dailyIndex(date: Date, length: number) {
  if (length < 1) throw new Error("Content cannot be empty");
  return (
    Math.floor(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) /
        86400000,
    ) % length
  );
}
export function readBest(key: string, storage: Pick<Storage, "getItem">) {
  try {
    const raw = storage.getItem(key);
    const value = Number(raw);
    return raw !== null && Number.isInteger(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}
export function saveBest(
  key: string,
  score: number,
  storage: Pick<Storage, "getItem" | "setItem">,
) {
  const old = readBest(key, storage);
  const best = old === null ? score : Math.min(old, score);
  try {
    storage.setItem(key, String(best));
  } catch {}
  return best;
}

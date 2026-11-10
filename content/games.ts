export const games = [
  {
    slug: "memory-match",
    title: "Memory Match",
    category: "Memory",
    description: "A little focus. A lucky flip. Find all six matching pairs.",
    instructions:
      "Select two cards to reveal their symbols. Matching pairs stay face up; other cards turn back after a moment. Find all six pairs in as few turns as you can.",
    icon: "✿",
    color: "peach",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    category: "Strategy",
    description: "Your X, our O. Three in a row and the glory is yours.",
    instructions:
      "You play X and move first. Select an empty square, then the computer plays O. Make a line of three horizontally, vertically, or diagonally. A full board without a line is a draw.",
    icon: "×",
    color: "lavender",
  },
  {
    slug: "sliding-tiles",
    title: "Sliding Tiles",
    category: "Logic",
    description:
      "Eight little numbers. One satisfying moment when it all clicks.",
    instructions:
      "Select a tile next to the empty space to slide it. Arrange the numbers from 1 to 8, left to right, with the empty space at the bottom right. Every shuffle is solvable. Use Tab and Enter, or arrow keys while the board is focused.",
    icon: "▦",
    color: "mint",
  },
] as const;

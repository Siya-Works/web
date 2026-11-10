export type Puzzle = {
  slug: string;
  title: string;
  category: "Logic" | "Numbers" | "Wordplay";
  question: string;
  hint: string;
  answer: string;
  explanation: string;
};
export const puzzles: Puzzle[] = [
  {
    slug: "the-mislabeled-jars",
    title: "The mixed-up snack jars",
    category: "Logic",
    question:
      "Three jars contain only almonds, only raisins, or a mixture. Their labels read Almonds, Raisins, and Mixed — and every label is wrong. From which jar should you take one snack to identify all three?",
    hint: "Start with the label that rules out a mixture.",
    answer: "Take a snack from the jar labeled Mixed.",
    explanation:
      "That jar cannot be mixed. If you draw an almond, it is the almond jar. The jar labeled Raisins must then be mixed, because it cannot contain only raisins or the already identified almonds. The remaining jar holds raisins. Reverse the reasoning if you draw a raisin.",
  },
  {
    slug: "staircase-sum",
    title: "A staircase of numbers",
    category: "Numbers",
    question:
      "Siya writes 1 on the first step, 2 on the second, and so on to 10. What is the total of all ten numbers?",
    hint: "Pair the first step with the last.",
    answer: "55",
    explanation:
      "There are five pairs that each total 11: 1 + 10, 2 + 9, 3 + 8, 4 + 7, and 5 + 6. Five times 11 is 55.",
  },
  {
    slug: "silent-guide",
    title: "The silent guide",
    category: "Wordplay",
    question:
      "I can show you a river without getting wet, and a road without taking a step. Fold me up and take me along. What am I?",
    hint: "Travelers used me long before phones.",
    answer: "A map.",
    explanation:
      "A map represents places with marks and symbols. Its rivers are ink, and its roads are lines, so it can guide a journey without containing the real landscape.",
  },
  {
    slug: "three-friends",
    title: "Who brought the kite?",
    category: "Logic",
    question:
      "Asha, Ben, and Chen each brought one different item: a ball, a kite, or a book. Asha brought neither the ball nor the book. Ben did not bring the book. Who brought each item?",
    hint: "Asha has only one possibility.",
    answer: "Asha: kite. Ben: ball. Chen: book.",
    explanation:
      "Eliminating the ball and book leaves the kite for Asha. Ben cannot have the book, and the kite is taken, so he has the ball. That leaves Chen with the book.",
  },
  {
    slug: "double-and-one",
    title: "The growing garden",
    category: "Numbers",
    question:
      "A pattern of flower counts goes 2, 5, 11, 23. Using the rule “double the previous number, then add one,” what comes next?",
    hint: "Apply both parts of the rule to 23.",
    answer: "47",
    explanation:
      "23 × 2 = 46, and 46 + 1 = 47. Stating the rule matters: a short number sequence can otherwise have many possible continuations.",
  },
  {
    slug: "paper-window",
    title: "A window made of paper",
    category: "Wordplay",
    question:
      "I have a cover but am not a bed. I have a spine but no bones. Open me and a story begins. What am I?",
    hint: "You might borrow me from a library.",
    answer: "A book.",
    explanation:
      "A book has a front and back cover and a spine joining its pages. These words also describe other objects or body parts, which is what makes the clues playful.",
  },
  {
    slug: "bridge-lineup",
    title: "The picnic queue",
    category: "Logic",
    question:
      "Four friends stand in a line. Dev is immediately behind Asha. Ben is first. Chen is not last. What is the order from first to last?",
    hint: "Try placing the Asha–Dev pair in each available position.",
    answer: "Ben, Chen, Asha, Dev.",
    explanation:
      "After Ben, the pair could occupy positions 2–3 or 3–4. Positions 2–3 would leave Chen last, which is forbidden. So Asha and Dev occupy 3–4.",
  },
  {
    slug: "coin-count",
    title: "The pocket collection",
    category: "Numbers",
    question:
      "You have eight coins worth either 1 or 2 points each. Their total value is 13 points. How many 2-point coins do you have?",
    hint: "Imagine all eight coins were worth just 1 point.",
    answer: "Five 2-point coins.",
    explanation:
      "Eight 1-point coins would total 8. You need 5 extra points, and replacing each 1-point coin with a 2-point coin adds exactly one. So five coins are worth 2 and three are worth 1.",
  },
  {
    slug: "borrowed-light",
    title: "The evening companion",
    category: "Wordplay",
    question:
      "I follow your feet on a sunny walk, stretch when the Sun gets low, and disappear in complete darkness. What am I?",
    hint: "You block the light that makes me.",
    answer: "Your shadow.",
    explanation:
      "Your body blocks sunlight, creating a darker area. A low Sun casts a long shadow. Without a light source, there is no separately visible shadow.",
  },
  {
    slug: "two-switches",
    title: "The honest signs",
    category: "Logic",
    question:
      "A prize is in either a red box or a blue box. The red sign says “The prize is here.” The blue sign says “The prize is in the red box.” If both signs are false, where is the prize?",
    hint: "Both signs make the same claim.",
    answer: "In the blue box.",
    explanation:
      "Both statements say the prize is in the red box. If both are false, it is not in red. With only two possible boxes, it must be in blue.",
  },
  {
    slug: "clock-hop",
    title: "A little clock hop",
    category: "Numbers",
    question: "A clock shows 9:40. What time will it show 95 minutes later?",
    hint: "First add one hour, then the remaining minutes.",
    answer: "11:15",
    explanation:
      "95 minutes is 1 hour and 35 minutes. From 9:40, one hour reaches 10:40, and 35 more minutes reaches 11:15.",
  },
  {
    slug: "letter-trick",
    title: "A shorter word",
    category: "Wordplay",
    question:
      "Which five-letter word becomes “shorter” when you add two letters to its end?",
    hint: "Read “shorter” as the actual word, not as a measurement.",
    answer: "Short.",
    explanation:
      "Adding E and R to SHORT makes SHORTER. The resulting word has more letters, even though its meaning suggests less length.",
  },
  {
    slug: "marble-guarantee",
    title: "The mystery marble bag",
    category: "Logic",
    question:
      "A bag contains red, yellow, and blue marbles, with at least four of each. Without looking, how many must you take to guarantee two of the same color?",
    hint: "What is the most you can draw while keeping every color different?",
    answer: "Four marbles.",
    explanation:
      "The first three could be one of each color. The fourth must match one of those three colors. This is an example of the pigeonhole principle.",
  },
  {
    slug: "rectangle-fence",
    title: "Fence the tiny garden",
    category: "Numbers",
    question:
      "A rectangular garden is 7 meters long and 4 meters wide. How much fencing is needed to surround it, with no gap?",
    hint: "There are two long sides and two short sides.",
    answer: "22 meters.",
    explanation:
      "The perimeter is 7 + 4 + 7 + 4 = 22 meters. Multiplying 7 by 4 would give the area, not the length around the edge.",
  },
  {
    slug: "tomorrow-word",
    title: "Always one day away",
    category: "Wordplay",
    question:
      "You can plan for me tonight, but when I arrive you call me today. What am I?",
    hint: "A word whose meaning moves with the calendar.",
    answer: "Tomorrow.",
    explanation:
      "Tomorrow means the day after the current day. When that date arrives, it becomes today and the word tomorrow refers to a new date.",
  },
];

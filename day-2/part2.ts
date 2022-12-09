import fs from "fs";

const typeMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const resultMap = {
  X: "loss",
  Y: "draw",
  Z: "win",
};

const typeScoreMap = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const resultScoreMap = {
  loss: 0,
  draw: 3,
  win: 6,
};

const fight = (hand1, hand2) => {
  if (hand1 === hand2) return "draw";

  if (hand2 === "rock" && hand1 === "scissors") return "win";
  if (hand2 === "paper" && hand1 === "rock") return "win";
  if (hand2 === "scissors" && hand1 === "paper") return "win";

  return "loss";
};

const getHandForOutcome = (opponentHand, outcome) => {
  if (outcome === "draw") return opponentHand;

  if (outcome === "win") {
    if (opponentHand === "rock") return "paper";
    if (opponentHand === "paper") return "scissors";
    if (opponentHand === "scissors") return "rock";
  }

  if (outcome === "loss") {
    if (opponentHand === "rock") return "scissors";
    if (opponentHand === "paper") return "rock";
    if (opponentHand === "scissors") return "paper";
  }
};

const getHighestCaloryCount = (_err, data) => {
  let totalScore = 0;

  data.split("\n").forEach((value) => {
    const [opponentHandCode, wantedOutcomeCode] = value.split(" ");
    const opponentHand = typeMap[opponentHandCode];
    const wantedOutcome = resultMap[wantedOutcomeCode];
    const hand2 = getHandForOutcome(opponentHand, wantedOutcome);

    const result = fight(opponentHand, hand2);

    totalScore += resultScoreMap[result];
    totalScore += typeScoreMap[hand2];
  });

  console.log("🔈 ~ totalScore", totalScore);
};

fs.readFile("./input.txt", "utf8", getHighestCaloryCount);

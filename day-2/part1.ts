import fs from "fs";

const typeMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
  // response
  X: "rock",
  Y: "paper",
  Z: "scissors",
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

const getTotalScore = (_err, data) => {
  let totalScore = 0;

  data.split("\n").forEach((value) => {
    const [v1, v2] = value.split(" ");
    const hand1 = typeMap[v1];
    const hand2 = typeMap[v2];

    const result = fight(hand1, hand2);
    totalScore += resultScoreMap[result];
    totalScore += typeScoreMap[hand2];
  });

  console.log("🔈 ~ totalScore", totalScore);
};

fs.readFile("./input.txt", "utf8", getTotalScore);

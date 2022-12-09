import fs from "fs";

const getPriority = (letter) => {
  const isUppercase = letter.toUpperCase() === letter;
  const minusValue = isUppercase ? 64 - 26 : 96;
  const value = letter.charCodeAt(0) - minusValue;
  return value;
};

const findBadges = (_err, data) => {
  const elfGroups: string[][][] = [];
  let buffer: string[][] = [];

  data.split("\n").forEach((value) => {
    buffer.push(value.split(""));
    if (buffer.length === 3) {
      elfGroups.push(buffer);
      buffer = [];
    }
  });

  let totalValue = 0;

  elfGroups.forEach((group) => {
    let foundBadge = false;
    group[0].forEach((letter) => {
      if (foundBadge) return;
      if (group[1].includes(letter) && group[2].includes(letter)) {
        foundBadge = true;
        totalValue += getPriority(letter);
      }
    });
  });

  console.log("totalValue", totalValue);
};

fs.readFile("./input.txt", "utf8", findBadges);

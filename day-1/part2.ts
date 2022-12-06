import fs from "fs";

const getTopElves = (_err, data) => {
  const elves: number[] = [];
  let buffer = 0;

  data.split("\n").forEach((value) => {
    if (value === "") {
      elves.push(Number(buffer));
      buffer = 0;
    } else {
      buffer += Number(value);
    }
  });

  const caloriesOfTop3Elves = elves
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b, 0);

  console.log("result", caloriesOfTop3Elves);
  return caloriesOfTop3Elves;
};

fs.readFile("./input.txt", "utf8", getTopElves);

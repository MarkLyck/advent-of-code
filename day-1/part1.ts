import fs from "fs";

const getHighestCaloryCount = (_err, data) => {
  let highestTotalCalories = 0;
  let buffer = 0;

  data.split("\n").forEach((value) => {
    if (value === "") {
      if (buffer > highestTotalCalories) {
        highestTotalCalories = buffer;
      }
      buffer = 0;
    } else {
      buffer += Number(value);
    }
  });

  console.log(highestTotalCalories);
  return highestTotalCalories;
};

fs.readFile("./input.txt", "utf8", getHighestCaloryCount);

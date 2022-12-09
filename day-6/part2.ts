import fs from "fs";

const start = (_err, data) => {
  const stream = data.split("");

  let foundSignal = false;
  stream.forEach((_, index) => {
    if (foundSignal) return;

    const n = 14;
    const lastX = stream.slice(index - n, index);
    const areDifferent =
      lastX.every((item, index) => lastX.indexOf(item) === index) &&
      lastX.length === n;

    if (areDifferent) {
      foundSignal = index;
    }
  });

  console.log("🔈 ~ foundSignal", foundSignal);
};

fs.readFile("./input.txt", "utf8", start);

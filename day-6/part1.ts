import fs from "fs";

const start = (_err, data) => {
  const stream = data.split("");

  let foundSignal = false;
  stream.forEach((_, index) => {
    if (foundSignal) return;

    const last4 = stream.slice(index - 4, index);
    const areDifferent =
      last4.every((item, index) => last4.indexOf(item) === index) &&
      last4.length === 4;

    if (areDifferent) {
      foundSignal = index;
    }
  });

  console.log("🔈 ~ foundSignal", foundSignal);
};

fs.readFile("./input.txt", "utf8", start);

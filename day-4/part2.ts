import fs from "fs";

const test = (_err, data) => {
  let assignments = 0;

  data.split("\n").forEach((value) => {
    const ranges = value.split(",");

    const range1Min = Number(ranges[0].split("-")[0]);
    const range1Max = Number(ranges[0].split("-")[1]);
    const range2Min = Number(ranges[1].split("-")[0]);
    const range2Max = Number(ranges[1].split("-")[1]);

    let matched = false;

    if (range1Min <= range2Min && range1Max >= range2Min) {
      matched = true;
    }
    if (range2Min <= range1Min && range2Max >= range1Min) {
      matched = true;
    }

    if (matched) {
      assignments++;
    }
  });
  console.log("🔈 ~ assignments", assignments);
};

fs.readFile("./input.txt", "utf8", test);

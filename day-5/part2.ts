import fs from "fs";

type StackMapType = {
  [key: number]: string[];
};

const buildStackMap = (stackLines: string[]) => {
  const lineWithNumbers = stackLines[stackLines.length - 1];
  const indexList: number[] = [];

  lineWithNumbers.split("").forEach((char, index) => {
    if (!isNaN(parseInt(char))) {
      indexList.push(index);
    }
  });

  let stackMap: StackMapType = {};

  stackLines.reverse().forEach((line, index) => {
    // don't run on the numbers line
    if (index === 0) return;

    const parts = line.split("");
    indexList.forEach((numberIndex, index) => {
      const item = parts[numberIndex];
      if (item === " ") return;
      if (stackMap[index + 1]) {
        stackMap[index + 1].push(item);
      } else {
        stackMap[index + 1] = [item];
      }
    });
  });

  return stackMap;
};

const getInstructions = (instructionLines) => {
  return instructionLines.map((line) => {
    let numbers = line.match(/\d+/g);
    return {
      quantity: parseInt(numbers[0]),
      from: parseInt(numbers[1]),
      to: parseInt(numbers[2]),
    };
  });
};

const performInstructions = (instructions, stackMap) => {
  instructions.forEach((instruction) => {
    const { quantity, from, to } = instruction;
    // console.log(`move ${quantity} from ${from} to ${to}`);
    const spliced = stackMap[from].splice(-quantity, quantity);
    stackMap[to] = [...stackMap[to], ...spliced];
  });
  return stackMap;
};

const getTopCrates = (stackMap: StackMapType) => {
  return Object.values(stackMap).map((arr: string[]) => {
    return arr[arr.length - 1];
  });
};

const start = (_err, data) => {
  const stackLines: string[] = [];
  const instructionLines: string[] = [];

  let isInstructions = false;
  data.split("\n").forEach((line) => {
    if (line === "") {
      isInstructions = true;
      return;
    }
    if (isInstructions) {
      instructionLines.push(line);
    } else {
      stackLines.push(line);
    }
  });

  const initialStackMap = buildStackMap(stackLines);
  const instructions = getInstructions(instructionLines);
  const resultStackMap = performInstructions(instructions, initialStackMap);
  // console.log("🔈 ~ resultStackMap", resultStackMap);
  const topCrates = getTopCrates(resultStackMap).join("");
  console.log("🔈 ~ topCrates", topCrates);
};

fs.readFile("./input.txt", "utf8", start);

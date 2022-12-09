import fs from "fs";

const reorganizeRucksack = (_err, data) => {
  let totalValue = 0;
  data.split("\n").forEach((value) => {
    let items = value.split("");

    const compartment1 = items.slice(0, items.length / 2);
    const compartment2 = items.slice(items.length / 2);

    const itemsInCompartment1 = {};

    compartment1.forEach((letter) => {
      itemsInCompartment1[letter] = true;
    });

    let foundLetter = false;

    compartment2.forEach((letter) => {
      if (foundLetter) return;
      if (itemsInCompartment1[letter]) {
        foundLetter = true;
        const isUppercase = letter.toUpperCase() === letter;
        const minusValue = isUppercase ? 64 - 26 : 96;
        const value = letter.charCodeAt(0) - minusValue;
        totalValue += value;

        return;
      }
    });
    console.log(totalValue);
  });
};

fs.readFile("./input.txt", "utf8", reorganizeRucksack);

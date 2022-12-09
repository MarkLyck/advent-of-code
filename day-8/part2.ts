import fs from "fs";

const start = (_err, data) => {
  let viewScore = 0;
  const rows = data.split("\n");
  rows.forEach((row, rowIndex) => {
    const trees = row.split("");
    trees.forEach((currentTree, colIndex) => {
      const verticalArray = rows.map((row) => row.split("")[colIndex]);

      let visibleLeft = 0;
      let visibleRight = 0;
      let visibleTop = 0;
      let visibleBottom = 0;

      trees
        .slice(0, colIndex)
        .reverse()
        .some((tree) => {
          visibleLeft++;
          if (parseInt(tree) >= currentTree) {
            return true;
          }
        });
      trees.slice(colIndex + 1).some((tree) => {
        visibleRight++;
        if (parseInt(tree) >= currentTree) {
          return true;
        }
      });

      verticalArray
        .slice(0, rowIndex)
        .reverse()
        .some((tree) => {
          visibleTop++;
          if (parseInt(tree) >= currentTree) {
            return true;
          }
        });

      verticalArray.slice(rowIndex + 1).some((tree) => {
        visibleBottom++;
        if (parseInt(tree) >= currentTree) {
          return true;
        }
      });

      const treeScore = visibleLeft * visibleRight * visibleTop * visibleBottom;

      if (treeScore > viewScore) viewScore = treeScore;
    });
  });

  console.log("viewScore", viewScore);
};

fs.readFile("./input.txt", "utf8", start);

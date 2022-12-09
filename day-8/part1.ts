import fs from "fs";

const start = (_err, data) => {
  let visibleTrees = 0;
  const rows = data.split("\n");
  rows.forEach((row, rowIndex) => {
    const trees = row.split("");
    trees.forEach((currentTree, colIndex) => {
      // all trees on edges are always visible from the edge
      if (
        rowIndex === 0 ||
        rowIndex === rows.length - 1 ||
        colIndex === 0 ||
        colIndex === trees.length - 1
      ) {
        visibleTrees++;
        return;
      }

      // check if tree is visible from the left;
      const isBlockedLeft = trees
        .slice(0, colIndex)
        .some((tree) => parseInt(tree) >= currentTree);
      const isBlockedRight = trees
        .slice(colIndex + 1)
        .some((tree) => parseInt(tree) >= currentTree);

      const isVisibleHorizontally = !isBlockedLeft || !isBlockedRight;
      if (isVisibleHorizontally) {
        visibleTrees++;
        return;
      }

      // Create vertical array
      const verticalArray = rows.map((row) => row.split("")[colIndex]);
      const isBlockedTop = verticalArray
        .slice(0, rowIndex)
        .some((tree) => parseInt(tree) >= currentTree);
      const isBlockedBottom = verticalArray
        .slice(rowIndex + 1)
        .some((tree) => parseInt(tree) >= currentTree);

      const isVisibleVertically = !isBlockedTop || !isBlockedBottom;
      if (isVisibleVertically) {
        visibleTrees++;
        return;
      }
    });
  });

  console.log("visibleTrees", visibleTrees);
};

fs.readFile("./input.txt", "utf8", start);

import fs from "fs";

const getNested = (currentDirectory: string[], obj) => {
  let value = currentDirectory.reduce(function (obj, key) {
    return obj[key];
  }, obj);

  return value;
};

const buildDirectory = (lines) => {
  const fileTree = {};

  let currentDirectory: string[] = [];
  lines.forEach((line) => {
    if (line.includes("$ cd")) {
      if (line === "$ cd /") {
        currentDirectory = [];
        return;
      }
      if (line === "$ cd ..") {
        currentDirectory.pop();
        return;
      }

      const cdFolder = line.split(" ")[2];
      const currentFolder = getNested(currentDirectory, fileTree);
      if (!currentFolder[cdFolder]) {
        currentFolder[cdFolder] = {};
      }

      currentDirectory.push(cdFolder);
    } else if (line.includes("$ ls")) {
    } else {
      const isDir = line.includes("dir ");
      const currentFolder = getNested(currentDirectory, fileTree);
      if (!isDir) {
        const [size, name] = line.split(" ");
        currentFolder[name] = parseInt(size);
      }
    }
  });

  return fileTree;
};

const directorySizes: any[] = [];

const calculateEachDirectorySize = (directory, dirName) => {
  let size = 0;
  Object.keys(directory).forEach((key) => {
    if (typeof directory[key] === "number") {
      size += directory[key];
    } else {
      size += calculateEachDirectorySize(directory[key], key);
    }
  });

  directorySizes.push({ name: dirName, size });

  return size;
};

const sumDirectoriesWithMaxSize = (size) => {
  let totalSize = 0;

  directorySizes.forEach((dir) => {
    if (dir.size <= size) {
      totalSize += dir.size;
    }
  });

  return totalSize;
};

const start = (_err, data) => {
  const directory = buildDirectory(data.split("\n"));
  calculateEachDirectorySize(directory, "/");
  const result = sumDirectoriesWithMaxSize(100000);
  console.log("🔈 ~ result", result);
};

fs.readFile("./input.txt", "utf8", start);

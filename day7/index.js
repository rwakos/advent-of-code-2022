import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = " ";
const TREE_SEPARATOR = "___";

const array = DATA.toString().split(LINE_SEPARATOR);
const folderStructure = {};

function buildDirectory(array) {
  let tempDirectory = ["/"];

  for (let i = 0; i < array.length; i++) {
    const instruction = array[i].split(COL_SEPARATOR);

    if (instruction[0] === "$") {
      //console.log(instruction[1], instruction[2]);
      //instruction
      if (instruction[1] === "cd") {
        if (instruction[2] === "/") {
          //Need to reset the path
          tempDirectory = ["/"];
        } else if (instruction[2] === "..") {
          //Need to go back a step
          //   console.log("back", tempDirectory);
          if (tempDirectory.length > 1) {
            tempDirectory.pop();
          }
          //   console.log("back-after", tempDirectory);
        } else {
          //Add to the folder path
          tempDirectory.push(instruction[2]);
        }
        //Add change current directory
      } else if (instruction[1] === "ls") {
        //We need to loop and clock the files ONLY
        let folderWeight = 0;
        // console.log(instruction[1], instruction[2]);
        for (let j = i + 1; j < array.length; j++) {
          const file = array[j].split(COL_SEPARATOR);

          if (file[0] !== "$" && file[0] !== "dir") {
            folderWeight += parseInt(file[0], 10);
          } else if (file[0] === "$") {
            i = j - 1;
            break;
          }
        }
        //We add to the folder structure
        folderStructure[tempDirectory.join(TREE_SEPARATOR)] = folderWeight;

        // addToFolder(tempDirectory, folderWeight);
      }
    }
  }
}

let acum = 0;

buildDirectory(array);

function calculateWeight(currentFolder, folders, pos = 0, acum = 0) {
  if (pos === folders.length) {
    return acum;
  }

  let loop = true;
  while (loop) {
    if (pos === folders.length) {
      return acum;
    }
    if (currentFolder === folders[pos].substr(0, currentFolder.length)) {
      acum += folderStructure[folders[pos]];
      acum += calculateWeight(folders[pos], folders, pos + 1);
      pos++;
    } else {
      return acum;
    }
  }

  return acum;
}

const folders = Object.keys(folderStructure);
console.log(folderStructure);
console.log("---------------------------------------------------------");
const smallFolders = [];

for (let i = 0; i < folders.length; i++) {
  if (folders[i] !== "/") {
    // console.log("Calling with Folder:", folders[i]);
    const total = calculateWeight(
      folders[i],
      folders,
      i + 1,
      folderStructure[folders[i]]
    );
    // console.log("Got:", total);
    smallFolders.push(total);

    if (total <= 100000 && total > 0) {
      //   console.log(folders[i], total, acum);
      acum += total;
    }
  }
}

console.log(`PART 1: The total is: ${acum}`);

//Part 2
//Find what is available
const final = [];
const finalKeys = Object.keys(folderStructure);
for (let i = 0; i < finalKeys.length - 1; i++) {
  //   debugger;
  const currentFolder = finalKeys[i];
  let acum = folderStructure[finalKeys[i]];

  for (let j = i + 1; j < finalKeys.length; j++) {
    if (currentFolder === finalKeys[j].substr(0, currentFolder.length)) {
      acum += folderStructure[finalKeys[j]];
    } else {
      folderStructure[currentFolder] = acum;
      acum = 0;
      break;
    }
  }

  if (acum > 0) {
    folderStructure[currentFolder] = acum;
  }

  final.push(folderStructure[currentFolder]);
}

console.log(folderStructure);

const available = 70000000 - folderStructure["/"];
const limit = 30000000 - available;

final.sort((a, b) => a - b);
// console.log(`PART 2: The total is: ${acum}`);
let theNumber = 0;
for (let i = 0; i < final.length; i++) {
  console.log(final[i], limit);
  if (final[i] > limit) {
    theNumber = final[i];
    break;
  }
}
console.log("The answer", theNumber, limit, final);

// bad 9494924

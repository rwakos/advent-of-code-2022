import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = " ";

function getData() {
  return {
    1: "STHFWR".split(""),
    2: "SGDQW".split(""),
    3: "BTW".split(""),
    4: "DRWTNQZJ".split(""),
    5: "FBHGLVTZ".split(""),
    6: "LPTCVBSG".split(""),
    7: "ZBRTWGP".split(""),
    8: "NGMTCJR".split(""),
    9: "LGBW".split(""),
  };
}

function getTestData() {
  return {
    1: "ZN".split(""),
    2: "MCD".split(""),
    3: "P".split(""),
  };
}

const array = DATA.toString().split(LINE_SEPARATOR);
let myStacks = getData();

for (let i = 0; i < array.length; i++) {
  const [verb, times, origin, fromQueue, target, targetQueue] =
    array[i].split(COL_SEPARATOR);

  if (verb !== "move") {
    console.log("bad instruction");
    break;
  }
  for (let k = 0; k < times; k++) {
    const temp = myStacks[fromQueue].pop();
    myStacks[targetQueue].push(temp);
  }
}

let keys = Object.keys(myStacks);
let response = "";
for (let i = 1; i < keys.length + 1; i++) {
  const temp = myStacks[i].pop();
  response += temp;
}

console.log(`PART 1: The response: ${response}`);

//Part 2 Crane 9001
myStacks = getData();
keys = Object.keys(myStacks);

for (let i = 0; i < array.length; i++) {
  const [verb, times, origin, fromQueue, target, targetQueue] =
    array[i].split(COL_SEPARATOR);

  if (verb !== "move") {
    console.log("bad instruction");
    break;
  }
  const temp = [];
  for (let k = 0; k < times; k++) {
    const popped = myStacks[fromQueue].pop();
    temp.push(popped);
  }
  temp.reverse();

  for (let i = 0; i < temp.length; i++) {
    myStacks[targetQueue].push(temp[i]);
  }
}
//MCD test
keys = Object.keys(myStacks);
response = "";
for (let i = 1; i < keys.length + 1; i++) {
  const temp = myStacks[i].pop();
  response += temp;
}

console.log(`PART 2: The response: ${response}`);

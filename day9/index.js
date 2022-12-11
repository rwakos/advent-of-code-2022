import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = " ";

const array = DATA.toString().split(LINE_SEPARATOR);

let xHead = 0;
let yHead = 0;
let xTail = 0;
let yTail = 0;
let tailStepped = {};
let xPrevHead = 0;
let yPrevHead = 0;

function store(key) {
  if (key !== "0-0") {
    tailStepped[`${xTail}-${yTail}`] = true;
  }
}
function fillPrevious() {
  xPrevHead = xHead;
  yPrevHead = yHead;
}
function moveHead(x, y) {
  xHead = x;
  yHead = y;

  if (xHead === 1 && yHead === 4) {
    debugger;
  }
  console.log("Head", xHead, yHead);
}

function distanceBetween() {
  return Math.ceil(
    Math.sqrt(
      Math.pow(Math.abs(xHead - xTail), 2) +
        Math.pow(Math.abs(yHead - yTail), 2)
    )
  );
}
function moveTail(x, y, xPrevHead, yPrevHead) {
  if (xPrevHead === xTail && yPrevHead === yTail) {
    return;
  }

  const distance = distanceBetween();
  console.log("Distance", distance);
  if (distance > 2) {
    xTail = xPrevHead;
    yTail = yPrevHead;
    console.log("following diagonal head", xTail, yTail);
    store(`${xTail}-${yTail}`);
    return;
  } else if (distance === 2 && (xTail === xHead || yTail === yHead)) {
    xTail = x !== 0 ? xTail + x : xTail;
    yTail = y !== 0 ? yTail + y : yTail;

    console.log("Tail", xTail, yTail);
    store(`${xTail}-${yTail}`);
    return;
  }

  console.log("should not move");
}

for (let i = 0; i < array.length; i++) {
  const instruction = array[i].split(COL_SEPARATOR);
  const direction = instruction[0];
  const steps = parseInt(instruction[1], 10);

  if (direction === "R") {
    for (let j = 0; j < steps; j++) {
      fillPrevious();
      moveHead(xHead, yHead + 1);
      moveTail(0, 1, xPrevHead, yPrevHead);
    }
  } else if (direction === "L") {
    for (let j = 0; j < steps; j++) {
      fillPrevious();
      moveHead(xHead, yHead - 1);
      moveTail(0, -1, xPrevHead, yPrevHead);
    }
  } else if (direction === "U") {
    for (let j = 0; j < steps; j++) {
      fillPrevious();
      moveHead(xHead + 1, yHead);
      moveTail(1, 0, xPrevHead, yPrevHead);
    }
  } else if (direction === "D") {
    for (let j = 0; j < steps; j++) {
      fillPrevious();
      moveHead(xHead - 1, yHead);
      moveTail(-1, 0, xPrevHead, yPrevHead);
    }
  }
}
console.log(tailStepped);
const singleStep = Object.keys(tailStepped);

console.log(
  `PART 1: The total is: ${singleStep.length + 1} /test should be 13`
);

//Part 2**************************************************************************

// acum = 0;
// for (let i = 0; i < array.length; i++) {
//   const elvePair = array[i].split(COL_SEPARATOR);
//   const elveFirst = elvePair[0];
//   const elveSecond = elvePair[1];

//   if (overlaps(elveFirst, elveSecond)) {
//     acum++;
//   }
// }

// console.log(`PART 2: The total is: ${acum}`);

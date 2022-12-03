import { DATA } from "./data.js";
// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won
// A = 65, X = 88, Diff -23
const allowedChars = ["A", "B", "C", "X", "Y", "Z"];
const extraPoints = { X: 1, Y: 2, Z: 3 };
const LINE_SEPARATOR = "\n";
const CHR_SEPARATOR = " ";
const array = DATA.toString().split(LINE_SEPARATOR);

function transformMine(mine) {
  const transformed = mine.charCodeAt(0) - 23;
  return String.fromCharCode(transformed);
}
// X for Rock, Y for Paper, and Z for Scissors and A, B, C respectevly
function iWon(mine, opponent) {
  if (mine === "X" && opponent === "C") {
    return true;
  }

  if (mine === "Z" && opponent === "B") {
    return true;
  }

  if (mine === "Y" && opponent === "A") {
    return true;
  }

  return false;
}

let acum = 0;
for (let i = 0; i < array.length; i++) {
  const [opponent, mine] = array[i].split(CHR_SEPARATOR);

  if (!allowedChars.includes(opponent) || !allowedChars.includes(mine)) {
    console.log("break-error", opponent, mine);
    break;
  }

  if (iWon(mine.toUpperCase(), opponent.toUpperCase())) {
    acum += 6;
  } else if (opponent.toUpperCase() === transformMine(mine.toUpperCase())) {
    acum += 3;
  }

  acum += extraPoints[mine.toUpperCase()];
}

console.log(`PART 1: The total is: ${acum}`);

//Part 2
// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
function getLooseForShape(shape) {
  //receive in oponent format (A-C), and we need it in (X-Z)
  if (shape === "A") {
    return "Z";
  }

  if (shape === "B") {
    return "X";
  }

  if (shape === "C") {
    return "Y";
  }
}

function getWonForShape(shape) {
  if (shape === "A") {
    return "Y";
  }

  if (shape === "B") {
    return "Z";
  }

  if (shape === "C") {
    return "X";
  }
}

function getDrawForShape(shape) {
  if (shape === "A") {
    return "X";
  }

  if (shape === "B") {
    return "Y";
  }

  if (shape === "C") {
    return "Z";
  }
}

function getShape(action, currentShape) {
  if (action === "X") {
    return getLooseForShape(currentShape);
  }
  if (action === "Y") {
    return getDrawForShape(currentShape);
  }
  if (action === "Z") {
    return getWonForShape(currentShape);
  }
  console.log("Something went really bad, with values: ", action, currentShape);
  return "";
}
// X loose, Y Draw, Z Win
acum = 0;
for (let i = 0; i < array.length; i++) {
  const [opponent, action] = array[i].split(CHR_SEPARATOR);

  if (!allowedChars.includes(opponent) || !allowedChars.includes(action)) {
    console.log("break-error", opponent, action);
    break;
  }

  const mine = getShape(action, opponent);

  if (action === "Y") {
    acum += 3;
  } else if (action === "Z") {
    acum += 6;
  }

  acum += extraPoints[mine.toUpperCase()];
}

console.log(`PART 2: The total is: ${acum}`);

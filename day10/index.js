import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = " ";
const RANGE_SEPARATOR = "-";

const array = DATA.toString().split(LINE_SEPARATOR);

const values = {
  20: 0,
  60: 0,
  100: 0,
  140: 0,
  180: 0,
  220: 0,
};

function getSum() {
  return (
    values["20"] +
    values["60"] +
    values["100"] +
    values["140"] +
    values["180"] +
    values["220"]
  );
}

function setValue(cicle, value) {
  if (keys.includes(cicle.toString())) {
    values[cicle] = cicle * value;
  }
}

const keys = Object.keys(values);
let x = 1;
let cicle = 0;
// for (let i = 0; i < array.length; i++) {
//   const [instruction, addX] = array[i].split(COL_SEPARATOR);
//   if (instruction === "addx") {
//     setValue(cicle + 1, x);
//     setValue(cicle + 2, x);
//     x += parseInt(parseInt(addX, 10), 10);
//     cicle += 2;
//   } else {
//     setValue(cicle + 1, x);
//     cicle++;
//   }
// }

console.log(`PART 1: The total is: ${getSum()}`, values);

//Part 2**************************************************************************

function makeMatrix() {
  const matrix = [];
  for (let i = 0; i < 240; i++) {
    matrix.push(".");
  }
  return matrix;
}

function printMatrix() {
  let tableString = `
    <table border=0>
        <thead>
        <tr>`;

  for (let i = 0; i < 40; i++) {
    if (i < 10) {
      tableString += `<td>0${i}</td>`;
    } else {
      tableString += `<td>${i}</td>`;
    }
  }
  tableString += `
        </tr>
        </thead>
        <tbody>
        `;

  for (let i = 0; i < 6; i++) {
    tableString += `<tr>`;
    let temp = matrix.slice(i * 40, i * 40 + 40);
    for (let j = 0; j < temp.length; j++) {
      tableString += `
            <td>${temp[j]}</td>
            `;
    }
    tableString += `</tr>`;
  }

  tableString += `
        </tbody>        
    </table>
    `;
  document.getElementById("painting-area").innerHTML = tableString;
}

function shouldPaint() {
  //x has one more point than cicle
  let lo;
  let hi;
  let xPosition = x;

  if (cicle === 0) {
    lo = cicle;
    hi = cicle + 3;
  } else if (cicle === 39) {
    lo = cicle;
    hi = cicle;
  } else {
    lo = cicle - 1;
    hi = cicle + 1;
  }

  if (inSameLine() && lo <= xPosition && hi >= xPosition) {
    return true;
  }
  return false;
}

function inSameLine() {
  return true;
}

function paint(position) {
  matrix[row * 40 + position] = "#";
}

function moveCicle() {
  if (cicle === 39) {
    row++;
    cicle = 0;
  } else {
    cicle++;
  }

  console.log("cicle:", cicle, x);
}

let matrix = makeMatrix();

x = 1;
cicle = 0;
let row = 0;

// debugger;
for (let i = 0; i < array.length; i++) {
  debugger;
  const [instruction, addX] = array[i].split(COL_SEPARATOR);

  if (instruction === "addx") {
    if (shouldPaint()) {
      paint(cicle);
    }

    moveCicle();
    if (shouldPaint()) {
      paint(cicle);
    }

    moveCicle();
    x += parseInt(addX, 10);
  } else {
    // Adds one to cicle
    if (shouldPaint(cicle, x)) {
      paint(cicle);
    }
    moveCicle();
  }

  //   if (cicle === 39) {
  //     debugger;
  //   }
}

printMatrix();

console.log("finished", cicle, matrix);

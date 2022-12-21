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
  if (cicle == 220) {
    debugger;
  }
  if (keys.includes(cicle.toString())) {
    values[cicle] = cicle * value;
  }
}

const keys = Object.keys(values);
let x = 1;
let cicle = 0;
// debugger;
for (let i = 0; i < array.length; i++) {
  const [instruction, addX] = array[i].split(COL_SEPARATOR);
  //   debugger;
  if (instruction === "addx") {
    // Add to X does two cicles
    //value = cicle * X
    setValue(cicle + 1, x);
    setValue(cicle + 2, x);
    x += parseInt(parseInt(addX, 10), 10);
    cicle += 2;
  } else {
    // Adds one to X
    setValue(cicle + 1, x);
    cicle++;
  }
}

console.log(`PART 1: The total is: ${getSum()}`, values);

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

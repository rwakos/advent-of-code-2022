import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = ",";
const RANGE_SEPARATOR = "-";

const array = DATA.toString().split(LINE_SEPARATOR);

let acum = 0;
// for (let i = 0; i < array.length; i++) {
//   const elvePair = array[i].split(COL_SEPARATOR);
//   const elveFirst = elvePair[0];
//   const elveSecond = elvePair[1];

//   if (duplicateWork(elveFirst, elveSecond)) {
//     acum++;
//   }
// }

console.log(`PART 1: The total is: ${acum}`);

//Part 2, simple overlap

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

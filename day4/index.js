import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = ",";
const RANGE_SEPARATOR = "-";

const array = DATA.toString().split(LINE_SEPARATOR);

function duplicateWork(elve1, elve2) {
  const elve1Range = elve1.split(RANGE_SEPARATOR);
  const elve2Range = elve2.split(RANGE_SEPARATOR);

  /**
   *  .2345678.  2-8
      ..34567..  3-7
   * 
   */
  if (
    (Math.min(...elve1Range) <= Math.min(...elve2Range) &&
      Math.max(...elve1Range) >= Math.max(...elve2Range)) ||
    (Math.min(...elve2Range) <= Math.min(...elve1Range) &&
      Math.max(...elve2Range) >= Math.max(...elve1Range))
  ) {
    console.log(elve1, elve2);
    return true;
  }

  return false;
}

let acum = 0;
for (let i = 0; i < array.length; i++) {
  const elvePair = array[i].split(COL_SEPARATOR);
  const elveFirst = elvePair[0];
  const elveSecond = elvePair[1];

  if (duplicateWork(elveFirst, elveSecond)) {
    acum++;
  }
}

console.log(`PART 1: The total is: ${acum}`);

//Part 2, simple overlap
function overlaps(elve1, elve2) {
  const elve1Range = elve1.split(RANGE_SEPARATOR);
  const elve2Range = elve2.split(RANGE_SEPARATOR);

  const elve1Min = Math.min(...elve1Range);
  const elve1Max = Math.max(...elve1Range);

  const elve2Min = Math.min(...elve2Range);
  const elve2Max = Math.max(...elve2Range);

  if (
    (elve2Min >= elve1Min && elve2Min <= elve1Max) ||
    (elve2Max >= elve1Min && elve2Max <= elve1Max) ||
    (elve1Min >= elve2Min && elve1Min <= elve2Max) ||
    (elve1Max >= elve2Min && elve1Max <= elve2Max)
  ) {
    return true;
  }

  return false;
}

acum = 0;
for (let i = 0; i < array.length; i++) {
  const elvePair = array[i].split(COL_SEPARATOR);
  const elveFirst = elvePair[0];
  const elveSecond = elvePair[1];

  if (overlaps(elveFirst, elveSecond)) {
    acum++;
  }
}

console.log(`PART 2: The total is: ${acum}`);

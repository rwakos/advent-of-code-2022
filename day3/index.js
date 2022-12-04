import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const array = DATA.toString().split(LINE_SEPARATOR);

function getPriority(char) {
  if (
    char.charCodeAt(0) < 65 ||
    (char.charCodeAt(0) > 90 && char.charCodeAt(0) < 97) ||
    char.charCodeAt(0) > 122
  ) {
    console.log("Something went wrong..... char:", char);
    return 0;
  }

  if (char.charCodeAt(0) < 97) {
    //in Caps
    return char.charCodeAt(0) - 64 + 26;
  }

  return char.charCodeAt(0) - 96;
}

function getPrioritiesSum(duplicates) {
  return duplicates.reduce(
    (accumulator, currentValue) => accumulator + getPriority(currentValue),
    0
  );
}

function findDuplicates(left, right) {
  const duplicates = {};

  for (let i = 0; i < left.length; i++) {
    if (right.includes(left[i])) {
      duplicates[left[i]] = true;
    }
  }

  return Object.keys(duplicates);
}

function findDuplicatesPart2(first, second, third) {
  const duplicates = {};

  for (let i = 0; i < first.length; i++) {
    if (second.includes(first[i]) && third.includes(first[i])) {
      duplicates[first[i]] = true;
    }
  }

  return Object.keys(duplicates);
}

let acum = 0;
for (let i = 0; i < array.length; i++) {
  const leftSide = array[i].substring(0, array[i].length / 2);
  const rightSide = array[i].substring(array[i].length / 2, array[i].length);
  const duplicates = findDuplicates(leftSide.split(""), rightSide.split(""));
  const temp = getPrioritiesSum(duplicates);
  acum += temp;
}

console.log(`PART 1: The total is: ${acum}`);

// PART 2:
acum = 0;
for (let i = 0; i < array.length; i++) {
  const first = array[i].split("");
  const second = array[i + 1].split("");
  const third = array[i + 2].split("");
  const duplicates = findDuplicatesPart2(first, second, third);

  const temp = getPrioritiesSum(duplicates);
  acum += temp;
  i += 2;
}

console.log(`PART 2: The total is: ${acum}`);

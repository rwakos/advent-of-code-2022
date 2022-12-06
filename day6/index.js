import { DATA, DATA_TEST } from "./data.js";

const COL_SEPARATOR = " ";

const array = DATA.toString().split("");

let acum = 0;

function isStream(sliced) {
  for (let j = 0; j < 4; j++) {
    const char = sliced[j];

    for (let i = j + 1; i < 4; i++) {
      if (char === sliced[i] && char) {
        return false;
      }
    }
  }

  return true;
}

function isStream14(sliced) {
  for (let j = 0; j < 14; j++) {
    const char = sliced[j];

    for (let i = j + 1; i < 14; i++) {
      if (char === sliced[i] && char) {
        return false;
      }
    }
  }

  return true;
}

for (let i = 0; i < array.length - 14; i++) {
  const slice = [array[i], array[i + 1], array[i + 2], array[i + 3]];

  if (isStream(slice)) {
    acum = i;
    break;
  }
}

console.log(`PART 1: The total is: ${acum + 4}`);

//Part 2, simple overlap

acum = 0;
for (let i = 0; i < array.length - 14; i++) {
  const slice = [
    array[i],
    array[i + 1],
    array[i + 2],
    array[i + 3],
    array[i + 4],
    array[i + 5],
    array[i + 6],
    array[i + 7],
    array[i + 8],
    array[i + 9],
    array[i + 10],
    array[i + 11],
    array[i + 12],
    array[i + 13],
  ];

  if (isStream14(slice)) {
    acum = i;
    break;
  }
}

console.log(`PART 2: The total is: ${acum + 14}`);

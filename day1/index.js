import { DATA } from "./data.js";

const LINE_SEPARATOR = "\n";

const array = DATA.toString().split(LINE_SEPARATOR + LINE_SEPARATOR);
let maxValue = 0;
let maxIndex = 0;
const arraySum = [];
for (let i = 0; i < array.length; i++) {
  const tmp = array[i].split(LINE_SEPARATOR);
  const tmpMax = tmp.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue, 10),
    0
  );

  if (tmpMax > maxValue) {
    maxValue = tmpMax;
    maxIndex = i;
  }

  arraySum.push(tmpMax);
}

console.log(
  `PART 1: The max calories is: ${maxValue} from the ${maxIndex + 1}th elve`
);

arraySum.sort();

console.log(
  `PART 2: The max carried by the top 3 is: ${
    arraySum[arraySum.length - 1] +
    arraySum[arraySum.length - 2] +
    arraySum[arraySum.length - 3]
  }`
);

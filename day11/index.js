import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = " ";
const RANGE_SEPARATOR = "-";
const monkeyArray = {};
const array = DATA.toString().split(LINE_SEPARATOR);

function parseMonkeys() {
  for (let i = 0; i < array.length; i++) {
    // debugger;
    let [monkeyTag, monkeyId] = array[i].split(COL_SEPARATOR);
    i++;
    let monkeyStartList = array[i].split("Starting items: ")[1];
    const spacesReplaced = monkeyStartList.replace(/ /g, "");
    monkeyStartList = spacesReplaced.split(",");
    i++;
    const [operationSymbol, operationValue] = array[i]
      .split("Operation: new = old ")[1]
      .split(COL_SEPARATOR);
    i++;
    const testValue = array[i].split("Test: divisible by ")[1];
    i++;
    const testTrue = array[i].split("If true: throw to monkey ")[1];
    i++;
    const testFalse = array[i].split("If false: throw to monkey ")[1];

    monkeyArray[monkeyId.replace(":", "")] = {
      iniList: monkeyStartList,
      operation: (val) => {
        if (operationSymbol === "+") {
          if (isNaN(parseInt(operationValue, 10))) {
            return parseInt(val, 10) * 2;
          } else {
            return parseInt(val, 10) + parseInt(operationValue, 10);
          }
        } else if (operationSymbol === "*") {
          if (isNaN(parseInt(operationValue, 10))) {
            return parseInt(val, 10) * parseInt(val, 10);
          } else {
            return parseInt(val, 10) * parseInt(operationValue, 10);
          }
        } else {
          console.log("this is f*&$ up", operationSymbol, operationValue);
        }
      },
      test: (val) => parseInt(val, 10) % testValue === 0,
      toMonkeyIfTrue: parseInt(testTrue, 10),
      toMonkeyIfFalse: parseInt(testFalse, 10),
      counted: 0,
    };
    i++;
  }
}

function throwToMonkey(value, to, from = false) {
  //   console.log(`throwing: ${value} from: ${from} to ${to}`);
  monkeyArray[to].iniList.push(value);
}

parseMonkeys();

let acum = 0;
let keys = Object.keys(monkeyArray);
const rounds = 20;

for (let i = 0; i < rounds; i++) {
  for (let j = 0; j < keys.length; j++) {
    const monkey = monkeyArray[keys[j]];
    for (let k = 0; k < monkey.iniList.length; k++) {
      const itemValue = parseInt(monkey.iniList[k], 10);
      //   console.log(`Starting value: ${itemValue} from ${keys[j]}`);
      const newValue = monkey.operation(itemValue);
      //   console.log(`New value: ${newValue} from ${keys[j]}`);
      const reliefValue = Math.floor(parseInt(newValue, 10) / 3);

      if (monkey.test(reliefValue)) {
        throwToMonkey(reliefValue, monkey.toMonkeyIfTrue, keys[j]);
      } else {
        throwToMonkey(reliefValue, monkey.toMonkeyIfFalse, keys[j]);
      }
    }

    monkey.counted += monkey.iniList.length;
    monkey.iniList = [];
  }
}

const countedArray = [];

for (let i = 0; i < keys.length; i++) {
  countedArray.push(monkeyArray[i].counted);
}

countedArray.sort((a, b) => a - b);

console.log(
  `PART 1: The total is: ${
    countedArray[countedArray.length - 1] *
    countedArray[countedArray.length - 2]
  }`,
  countedArray
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

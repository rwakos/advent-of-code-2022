import { DATA, DATA_TEST } from "./data.js";
const LINE_SEPARATOR = "\n";
const COL_SEPARATOR = "";

const array = DATA.toString().split(LINE_SEPARATOR);

const rows = array.length;
const cols = `${array[0]}`.split(COL_SEPARATOR).length;
const outerTrees = 2 * rows + 2 * (cols - 2);
let innerTrees = 0;

function buildMatrix() {
  const matrix = [];
  for (let i = 0; i < array.length; i++) {
    matrix.push([]);
    const temp = `${array[i]}`.split(COL_SEPARATOR);
    for (let j = 0; j < temp.length; j++) {
      matrix[i][j] = temp[j];
    }
  }

  return matrix;
}

function isVisible(x, y) {
  let visible = false;
  let temp = true;
  const height = matrix[x][y];

  //Eval top
  for (let i = x - 1; i >= 0; i--) {
    if (matrix[i][y] >= height) {
      temp = false;
      break;
    }
  }

  if (temp) {
    // console.log("True Top", x, y);
    visible = true;
  }

  //eval bottom
  if (!visible) {
    temp = true;
    for (let i = x + 1; i < matrix.length; i++) {
      if (matrix[i][y] >= height) {
        temp = false;
        break;
      }
    }

    if (temp) {
      //   console.log("True Bottom", x, y);
      visible = true;
    }
  }

  //eval left
  if (!visible) {
    temp = true;
    for (let i = y - 1; i >= 0; i--) {
      if (matrix[x][i] >= height) {
        //Not visible
        temp = false;
        break;
      }
    }

    if (temp) {
      //   console.log("True Left", x, y);
      visible = true;
    }
  }

  //eval right
  if (!visible) {
    temp = true;
    for (let i = y + 1; i < matrix[0].length; i++) {
      if (matrix[x][i] >= height) {
        //Not visible
        temp = false;
        break;
      }
    }

    if (temp) {
      //   console.log("True Right", x, y);
      visible = true;
    }
  }

  return visible;
}

const matrix = buildMatrix();

for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    if (isVisible(i, j)) {
      innerTrees++;
    }
  }
}

console.log(`PART 1: The total is: ${outerTrees + innerTrees}`);

//Part 2, *********************************************************************
function getScore(x, y) {
  debugger;
  let acum = 1;
  let temp = 0;
  const height = matrix[x][y];
  //   debugger;

  //Eval top
  for (let i = x - 1; i >= 0; i--) {
    temp++;
    if (matrix[i][y] >= height) {
      break;
    }
  }
  acum = acum * temp;

  //eval bottom
  temp = 0;
  for (let i = x + 1; i < matrix.length; i++) {
    temp++;
    if (matrix[i][y] >= height) {
      break;
    }
  }
  acum = acum * temp;

  //eval left
  temp = 0;
  for (let i = y - 1; i >= 0; i--) {
    temp++;
    if (matrix[x][i] >= height) {
      break;
    }
  }
  acum = acum * temp;

  //eval right
  temp = 0;
  for (let i = y + 1; i < matrix[0].length; i++) {
    temp++;
    if (matrix[x][i] >= height) {
      break;
    }
  }

  acum = acum * temp;
  return acum;
}

let highest = 0;
let score = 0;
for (let i = 1; i < rows - 1; i++) {
  for (let j = 1; j < cols - 1; j++) {
    score = getScore(i, j);
    if (score > highest) {
      highest = score;
    }
  }
}
console.log(`PART 2: The total is: ${highest}`);

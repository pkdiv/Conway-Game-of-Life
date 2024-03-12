var { innerHeight, innerWidth } = window;
var squareSide = 20;
var rowCount = Math.floor(innerHeight / squareSide);
var columnCount = Math.floor(innerWidth / squareSide);

var gridArray;

function createTwoDimensionalArray(rows, columns) {
    var arr = new Array(columns);
    for (let i = 0; i < columns; i++) {
        arr[i] = new Array(rows).fill(0)
    }
    return arr;
}

function randomizeArray() {
    for (let i = 0; i < columnCount; i++) {
        for (let j = 0; j < rowCount; j++) {
            gridArray[i][j] = Math.random() >= 0.5 ? 1 : 0;
        }
    }
}


function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0, 0, 0);
    gridArray = createTwoDimensionalArray(rowCount, columnCount);
    randomizeArray();
}


function draw() {
    frameRate(10);
    for (let i = 0; i < columnCount; i++) {
        for (let j = 0; j < rowCount; j++) {
            fill(255 * gridArray[i][j])
            square((i * squareSide), (j * squareSide), squareSide)
        }
    }
    conwayRules();
}

function conwayRules() {
    var tempArray = createTwoDimensionalArray(rowCount, columnCount);

    for (let i = 1; i < columnCount - 1; i++) {
        for (let j = 1; j < rowCount - 1; j++) {
            var count = gridArray[i - 1][j - 1] + gridArray[i - 1][j] + gridArray[i - 1][j + 1]
                + gridArray[i][j - 1] + gridArray[i][j + 1]
                + gridArray[i + 1][j - 1] + gridArray[i + 1][j] + gridArray[i + 1][j + 1]
            if (gridArray[i][j] == 1) {
                if (count == 2 || count == 3) {
                    tempArray[i][j] = 1;
                }
            } else {
                if (count == 3) {
                    tempArray[i][j] = 1;
                }
            }
        }
    }
    gridArray = tempArray;
}
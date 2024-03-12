function createTwoDimensionalArray(rows, columns) {
    var arr = new Array(columns);
    for (let i = 0; i < columns; i++) {
        arr[i] = new Array(rows).fill(0)
    }
    return arr;
}

var gridArray = createTwoDimensionalArray(8, 8);

gridArray[2][2] = 1; gridArray[2][3] = 1; gridArray[2][4] = 1;


var rowCount = 8;
var columnCount = 8;

function conwayRules() {
    var tempArray = createTwoDimensionalArray(rowCount, columnCount);
    // if alive
    //  < 2 die
    // = 2 or 3 live
    //  > 3 die
    //  if dead
    //  = 3 born
    console.table(gridArray);

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

conwayRules();

console.table(gridArray);


const scale = 90;
const factor = 15;
const RULESETS = { GAME_OF_LIFE: 0, DAY_AND_NIGHT: 1, MOV_DAY_AND_NIGHT: 2 };

let generation = 0;
let active = 0;
let field;
let colorfield;
let game = RULESETS.DAY_AND_NIGHT;

function setup() {
    createCanvas(scale * factor + 1000, scale * factor);
    initField();
}

function draw() {
    updateField();
}

function init2DArray(array, size) {
    array = new Array(size);
    for (var i = 0; i < size; i++) {
        array[i] = new Array(scale);
    }
    return array;
}

function initField() {
    field = init2DArray(field, scale);
    colorfield = init2DArray(colorfield, scale);

    for (var x = 0; x < scale; x++) {
        for (var y = 0; y < scale; y++) {
            result = round(random(0, 1));
            field[x][y] = result;
            active += result;
            colorfield[x][y] = 0;
        }
    }
}

function showField(localField, x, y) {
    if (localField[x][y] == 1) {
        fill(0, 0, colorfield[x][y] * 32);
        rect(x * factor, y * factor, scale, scale);
    }
    else {
        fill(0, 0, 0);
        rect(x * factor, y * factor, scale, scale);
    }
}

function updateText() {
    background(220);
    textSize(100);
    textFont('consolas')
    text("Generation: " + generation, scale * factor + 100, 100);
    text('Active: ' + active, scale * factor + 100, 200);
}

function updateField() {
    updateText();
    generation++;
    active = 0;
    var newField;
    if (game == RULESETS.MOV_DAY_AND_NIGHT) {
        newField = init2DArray(newField, scale + 1);
    }
    else {
        newField = init2DArray(newField, scale);
    }
    var offset;

    for (var x = 0; x < scale; x++) {
        for (var y = 0; y < scale; y++) {
            offset = round(random(0.4, 1));
            active += field[x][y];
            var liveNeighbors = 0;

            // Get active neighbors
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (i == 0 && j == 0) continue;
                    else if (x == 0 || y == 0 || x == scale - 1 || y == scale - 1) {
                        try {
                            liveNeighbors += field[x + i][y + j];
                        }
                        catch (IndexOutOfRangeException) { continue; }
                    }
                    else {
                        liveNeighbors += field[x + i][y + j];
                    }
                }
            }

            colorfield[x][y] = liveNeighbors;

            // Apply rules based on game type 
            switch (game) {
                case RULESETS.GAME_OF_LIFE:
                    if (liveNeighbors == 2 && field[x][y] == 1) newField[x][y] = 1;
                    else if (liveNeighbors == 3) newField[x][y] = 1;
                    else newField[x][y] = 0;
                    break;
                case RULESETS.DAY_AND_NIGHT:
                    if ([3, 4, 6, 7, 8].includes(liveNeighbors) && field[x][y] == 1) newField[x][y] = 1;
                    else if ([3, 6, 7, 8].includes(liveNeighbors) && field[x][y] == 0) newField[x][y] = 1;
                    else newField[x][y] = 0;
                    break;
                case RULESETS.MOV_DAY_AND_NIGHT:
                    if ([3, 4, 6, 7, 8].includes(liveNeighbors) && field[x][y] == 1) newField[x + 1][y] = 1;
                    else if ([3, 6, 7, 8].includes(liveNeighbors) && field[x][y] == 0) newField[x + 1][y] = 1;
                    else newField[x + 1][y] = 0;
                    newField[0][y] = offset;
                    break;
            }
            showField(newField, x, y);
        }
    }
    field = newField;
}

function addPattern(p, x, y) {
    for (var i = 0; i < p.length; i++) {
        field[p[i][0] + x][p[i][1] + y] = 1;
    }
}

class Patterns {
    static GLIDER() {
        return [[0, 2], [1, 3], [2, 1], [2, 2], [2, 3]];
    }
    static HWSS() {
        return [[0, 3], [0, 5], [1, 2], [2, 2], [2, 6], [3, 2], [3, 6], [4, 2], [5, 2], [5, 5], [6, 2], [6, 3], [6, 4]];
    }
    static TOAD() {
        return [[0, 1], [1, 0], [1, 1], [2, 0], [2, 1], [3, 0]];
    }

    static GLIDERGUN() {
        return [[0, 4], [0, 5], [1, 4], [1, 5], [10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8], [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5], [16, 6],
        [17, 5], [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4], [22, 1], [22, 5], [24, 0], [24, 1], [24, 5], [24, 6], [34, 2], [34, 3], [35, 2], [35, 3]];
    }
}
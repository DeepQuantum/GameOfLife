const scale = 110;
const factor = 15;
const RULESETS = { GAME_OF_LIFE: "B3/S23", DAY_AND_NIGHT: "B3678/S34678"};

let game;

function setup() {
    createCanvas(scale * factor + 1000, scale * factor);
    game = new CellularAutomaton(RULESETS.DAY_AND_NIGHT, 90, 0);
    game.setupButton();
    game.initField();
}

function draw() {
    if (!game.isPaused){
        game.updateField();
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
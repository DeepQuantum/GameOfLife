//TODO: code graph https://editor.p5js.org/aferriss/sketches/S1UTHZBHm
const AUTOMATON_RULESETS = 
{
    //https://www.conwaylife.com/wiki/List_of_Life-like_cellular_automata 
    GAME_OF_LIFE: ["B3/S23", 90], 
    DAY_AND_NIGHT: ["B3678/S34678", 90],
    LIFE_WITHOUT_DEATH: ["B3/S012345678", 2],
    SEEDS: ["B2/S0", 1],
    REPLICATOR: ["B1357/S1357", 10], 
    _34LIFE: ["B34/S34", 40], 
    DIAMOEBAE: ["B35678/S5678", 50], 
    _2x2: ["B36/S125", 30],
    HIGHLIFE: ["B36/S23", 30], 
    MORLEY: ["B368/S245", 35], 
    ANNEAL: ["B4678/S35678", 50], 
    MAZE: ["B3/S12345", 2], 
    MAZECETRIC: ["B3/S1234", 25], 
    FREDKIN: ["B1357/S02468", 10],
    VOTE45: ["B4678/S35678", 50], 
    WALLED_CITIES: ["B45678/S2345", 20], 
    H_TREES: ["B1/S012345678", 10],
}; 

let game;

function setup() {
    createCanvas(3000, 1500);
    game = new MovingCellularAutomaton(AUTOMATON_RULESETS.WALLED_CITIES, 90, 1, 0, 40);
}

function draw() {
    if (!game.isPaused){
        game.updateField();
    }
}

const PATTERNS = {
    GLIDER: [[0, 2], [1, 3], [2, 1], [2, 2], [2, 3]], 
    HWSS: [[0, 3], [0, 5], [1, 2], [2, 2], [2, 6], [3, 2], [3, 6], [4, 2], [5, 2], [5, 5], [6, 2], [6, 3], [6, 4]],
    TOAD: [[0, 1], [1, 0], [1, 1], [2, 0], [2, 1], [3, 0]],
    GLIDERGUN: [[0, 4], [0, 5], [1, 4], [1, 5], [10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8], [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5], [16, 6],
    [17, 5], [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4], [22, 1], [22, 5], [24, 0], [24, 1], [24, 5], [24, 6], [34, 2], [34, 3], [35, 2], [35, 3]] };

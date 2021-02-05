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
    MAZE: ["B3/S12345", 3], 
    MAZECETRIC: ["B3/S1234", 25], 
    FREDKIN: ["B1357/S02468", 10],
    VOTE45: ["B4678/S35678", 50], 
    WALLED_CITIES: ["B45678/S2345", 22.5], 
    H_TREES: ["B1/S012345678", 0.05],
}; 

let game;
let slider;

function setup() {
    game = new CellularAutomaton(AUTOMATON_RULESETS.H_TREES, 90);

    createCanvas(3000, 1500);
    background(0);

    slider = createSlider(0, 60, 60, 1);
    slider.position(game.scale * 15 + 600, 220);
    slider.style('width', '');
    slider.style('height', '10px');
    slider.size(200, 200);

    setupButton();
    
}

function draw() {
    if (!game.isPaused){
        updateText();
        updateFramerate();
        game.updateField();
    }
}

function setupButton()
{
    var buttonP = createButton('Pause');
    buttonP.position(game.scale * 15 + 40*15, 15*75)
    buttonP.size(width/8 + 30, height/8);
    buttonP.mousePressed(() => game.isPaused = !game.isPaused);
    buttonP.style('background-color', color(0,0,255));
    buttonP.style('font-size', 100)

    var buttonR = createButton('Restart');
    buttonR.position(game.scale * 15 + 7*15, 15*75);
    buttonR.size(width/8 + 30, height/8);
    buttonR.mousePressed(() => game.initField());
    buttonR.style('background-color', color(0,0,255));
    buttonR.style('font-size', 100)
}


function updateText() 
{
    background(0);
    textSize(90);
    textFont("consolas")
    text("Generation: " + game.generation, game.scale * 15 + 100, 100);
    text("Active: " + game.active, game.scale * 15 + 100, 200);
    text("FPS: " + round(frameRate()), game.scale * 15 + 100, 300)
    text("Current Rule: " + game.rule, game.scale * 15 + 100, 500);
    textSize(40);
    text("Probability: " + game.probability + "% per cell", game.scale * 15 + 100, 600);
}

function updateFramerate()
{
    frameRate(slider.value());
}

const PATTERNS = {
    GLIDER: [[0, 2], [1, 3], [2, 1], [2, 2], [2, 3]], 
    HWSS: [[0, 3], [0, 5], [1, 2], [2, 2], [2, 6], [3, 2], [3, 6], [4, 2], [5, 2], [5, 5], [6, 2], [6, 3], [6, 4]],
    TOAD: [[0, 1], [1, 0], [1, 1], [2, 0], [2, 1], [3, 0]],
    GLIDERGUN: [[0, 4], [0, 5], [1, 4], [1, 5], [10, 4], [10, 5], [10, 6], [11, 3], [11, 7], [12, 2], [12, 8], [13, 2], [13, 8], [14, 5], [15, 3], [15, 7], [16, 4], [16, 5], [16, 6],
    [17, 5], [20, 2], [20, 3], [20, 4], [21, 2], [21, 3], [21, 4], [22, 1], [22, 5], [24, 0], [24, 1], [24, 5], [24, 6], [34, 2], [34, 3], [35, 2], [35, 3]] };

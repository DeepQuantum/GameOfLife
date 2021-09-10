
const AUTOMATON_RULESETS = 
{
    //https://www.conwaylife.com/wiki/List_of_Life-like_cellular_automata 
    GAME_OF_LIFE: ["B3/S23", 10], 
    DAY_AND_NIGHT: ["B3678/S34678", 50],
    LIFE_WITHOUT_DEATH: ["B3/S012345678", 2],
    SEEDS: ["B2/S0", 0.2],
    REPLICATOR: ["B1357/S1357", 10], 
    _34LIFE: ["B34/S34", 40], 
    DIAMOEBAE: ["B35678/S5678", 50], 
    _2x2: ["B36/S125", 30],
    HIGHLIFE: ["B36/S23", 30], 
    MORLEY: ["B368/S245", 35], 
    ANNEAL: ["B4678/S35678", 50], 
    MAZE: ["B3/S12345", 3], 
    MAZECETRIC: ["B3/S1234", 10], 
    FREDKIN: ["B1357/S02468", 0.1],
    VOTE45: ["B4678/S35678", 50], 
    WALLED_CITIES: ["B45678/S2345", 22.5], 
    H_TREES: ["B1/S012345678", 0.05],
    GOL_ZERO: ["B3/S23", 0],
}; 

let game;
let slider;
let graphPoints;
let ruleSelect;
let patternSelect;
let isInEditingMode;
let images;


function setup() {
    game = new CellularAutomaton(AUTOMATON_RULESETS.GOL_ZERO, 90 );
    game.addPattern(PATTERNS.GLIDERGUN, 20, 10);
    createCanvas(3000, 1500);
    //preloadImages();
    background(0);
    graphPoints = [];
    isInEditingMode = false;
    setupSlider();
    setupButtons();
    setupSelect();
}


function setupSlider() {
    slider = createSlider(1, 60, 60, 1);
    slider.position(game.scale * 15 + 500, 180);
    slider.style('width', '');
    slider.style('height', '10px');
    slider.size(200, 200);
}

function draw() 
{
    if (!game.isPaused)
    {
        updateText();
        updateFramerate();
        if (!isInEditingMode){
            drawGraph();
        }
        game.updateField();
    }
    //game.isPaused = true;
}

function resetGame()
{
    graphPoints = [];
    game.initField();
}

function setupSelect()
{
    ruleSelect = createSelect();
    for (var i = 0; i < Object.keys(AUTOMATON_RULESETS).length; i++)
    {
        ruleSelect.option(Object.keys(AUTOMATON_RULESETS)[i] + ": " + Object.values(AUTOMATON_RULESETS)[i]);
    }
    ruleSelect.position(game.scale * 15 + 800, 430);
    ruleSelect.style('font-size', 50);
    ruleSelect.style('background-color', color(0, 0, 255));
    ruleSelect.size(width/20 + 600, height/15);
    ruleSelect.changed(selectNewRule);
}

function selectNewRule()
{
    var value = ruleSelect.value();
    var substrName = value.substring(0, value.indexOf(":"));
    var substrRule = value.substring(substrName.length + 2, value.length);
    var newRuleValue = Object.values(AUTOMATON_RULESETS).find(element => element == substrRule);
    game = new CellularAutomaton(newRuleValue, 90);
    game.initField();
}


function setupButtons()
{
    var buttonP = createButton('Pause');
    buttonP.position(game.scale * 15 + 1200, 50)
    buttonP.size(width/20 + 30, height/20);
    buttonP.mousePressed(() => game.isPaused = !game.isPaused);
    buttonP.style('background-color', color(0,0,255));
    buttonP.style('font-size', 40)

    var buttonR = createButton('Restart');
    buttonR.position(game.scale * 15 + 1400, 50);
    buttonR.size(width/20 + 30, height/20);
    buttonR.mousePressed(() => resetGame());
    buttonR.style('background-color', color(0,0,255));
    buttonR.style('font-size', 40)

    var buttonEM = createButton('Editing Mode');
    buttonEM.position(game.scale * 15 + 1200, 150);
    buttonEM.size(width/8 + 5, height/20);
    buttonEM.mousePressed(() => enterEditingMode());
    buttonEM.style('background-color', color(0,0,255));
    buttonEM.style('font-size', 40);
} 

function drawGraph()
{
    graphPoints.push(game.active);
    rect(game.scale * 15 + 100, 640, 5, 760);
    rect(game.scale * 15 + 100, 1400, 1500, 5);
    for(var i = 0; i < graphPoints.length; i++)
    {
        const pointX = (game.scale * 15 + 100) + (i * 10);
        const pointY = 1400 - graphPoints[i] / 10.6578947;
        if (pointX > width - 70)
        {
            graphPoints.splice(0, 1);
        }
        ellipse(pointX, pointY, 7);
        stroke(255);
        prevX = (game.scale * 15 + 100) + ((i - 1) * 10);
        prevY = 1400 - graphPoints[i - 1] / 10.6578947
        line(prevX, prevY, pointX, pointY);
        noStroke();
    }
}

function enterEditingMode(){
    isInEditingMode = true;
    patternSelect = createSelect();
    for (var i = 0; i < Object.keys(PATTERNS).length; i++)
    {
        patternSelect.option(Object.keys(PATTERNS)[i]);
    }
    patternSelect.position(game.scale * 15 + 110, 680);
    patternSelect.style('font-size', 50);
    patternSelect.style('background-color', color(0, 0, 255));
    patternSelect.size(width/20 + 600, height/15);
    patternSelect.changed(showSelectedPattern);
}

function showSelectedPattern() {
    var patternName = patternSelect.value();
    var pattern = Object.keys(PATTERNS).find(element => element == patternName);
    var patternImage = images[pattern];
    image(patternImage, game.scale * 15 +110, 800);
}

function updateText() 
{
    background(0);
    textSize(90);
    textFont("consolas")
    text("Generation: " + game.generation, game.scale * 15 + 100, 100);
    text("Active: " + game.active, game.scale * 15 + 100, 200);
    text("FPS: " + round(frameRate()), game.scale * 15 + 100, 300)
    text("Current Rule: ", game.scale * 15 + 100, 500);
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

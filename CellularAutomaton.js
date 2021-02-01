class CellularAutomaton
{
    generation = 0;
    scale = 0;
    active = 0;
    movement = 0;
    factor = 15;

    field = [];
    colorfield = [];
    born = [];
    survive = [];

    isPaused = false;
    fieldinitfunc = () => {};
    rule = "";

    constructor(rule, scale, movement, fieldinitfunc)
    {
        this.rule = rule;
        this.scale = scale;
        this.movement = movement;
        this.fieldinitfunc = fieldinitfunc;

        var tempborn = rule.split('/')[0];
        var tempsurvive = rule.split('/')[1];
        this.born = tempborn.split('');
        this.survive = tempsurvive.split('');
        this.born.shift();
        this.survive.shift();
        for (var i = 0; i < this.born.length; i++) this.born[i] = +this.born[i];
        for (var i = 0; i < this.survive.length; i++) this.survive[i] = +this.survive[i];
        
        this.setupButton();
        this.initField();
    }

    initField() 
    {
        this.generation = 0;
        this.field = CellularAutomaton.init2DArray(this.scale);
        this.colorfield = CellularAutomaton.init2DArray(this.scale);
    
        for (var x = 0; x < this.scale; x++) {
            for (var y = 0; y < this.scale; y++) {
                var result = this.fieldinitfunc();
                this.field[x][y] = result;
                this.active += result;
                this.colorfield[x][y] = 0;
            }
        }
    }


    setupButton(){
        var buttonP = createButton('Pause');
        buttonP.position(this.scale * this.factor + 40*this.factor, this.factor*75)
        buttonP.size(width/8 + 30, height/8);
        buttonP.mousePressed(() => this.isPaused = !this.isPaused);
        buttonP.style('background-color', color(0,0,255));
        buttonP.style('font-size', 100)
    
        var buttonR = createButton('Restart');
        buttonR.position(this.scale * this.factor + 7*this.factor, this.factor*75);
        buttonR.size(width/8 + 30, height/8);
        buttonR.mousePressed(() => this.initField());
        buttonR.style('background-color', color(0,0,255));
        buttonR.style('font-size', 100)
    }

    updateText() 
    {
        background(220);
        textSize(90);
        textFont("consolas")
        text("Generation: " + this.generation, this.scale * this.factor + 100, 100);
        text("Active: " + this.active, this.scale * this.factor + 100, 200);
        text("FPS: " + round(frameRate()), this.scale * this.factor + 100, 300)
        text("Current Rule: " + this.rule, this.scale * this.factor + 100, 500);
        textSize(40);
        text("fieldinitfunc: " + this.fieldinitfunc.toString(), this.scale * this.factor + 100, 600);
    }

    showField(localField, x, y) 
    {
        if (localField[x][y] == 1) {
            fill(0, 0, 255);
            rect(x * this.factor, y * this.factor, this.scale, this.scale);
        }
        else {
            fill(0, 0, 0);
            rect(x * this.factor, y * this.factor, this.scale, this.scale);
        }
    }

    //TODO Fix movement
    updateField() 
    {
        this.updateText();
        this.generation++;
        this.active = 0;
        var newField;
        var offset;

        newField = CellularAutomaton.init2DArray(this.scale + this.movement);
        for (var x = 0; x < this.scale; x++) {
            for (var y = 0; y < this.scale; y++) {
                //if (this.movement != 0) offset = round(random(0.4, 1));
                this.active += this.field[x][y];
                var liveNeighbors = 0;
    
                // Get active neighbors
                for (var i = -1; i <= 1; i++) {
                    for (var j = -1; j <= 1; j++) {
                        if (i == 0 && j == 0) continue;
                        else if (x == 0 || y == 0 || x == this.scale - 1 || y == this.scale - 1) {
                            try {
                                liveNeighbors += this.field[x + i][y + j];
                            }
                            catch (IndexOutOfRangeException) { continue; }
                        }
                        else {
                            liveNeighbors += this.field[x + i][y + j];
                        }
                    }
                }
    
                this.colorfield[x][y] = liveNeighbors;
    
                if (this.survive.includes(liveNeighbors) && this.field[x][y] == 1) newField[x + this.movement][y] = 1;
                else if (this.born.includes(liveNeighbors) && this.field[x][y] == 0) newField[x + this.movement][y] = 1;
                else newField[x][y] = 0;
                //if (this.movement != 0) newField[0][y] = offset;
                this.showField(newField, x, y);
            }
        }
        this.field = newField;
    }

    addPattern(p, x, y) {
        for (var i = 0; i < p.length; i++) {
            this.field[p[i][0] + x][p[i][1] + y] = 1;
        }
    }
    
    static init2DArray(size) 
    {
        var array = new Array(size);
        for (var i = 0; i < size; i++) {
            array[i] = new Array(scale);
        }
        return array;
    }
}
class CellularAutomaton
{
    constructor(rule, scale)
    {
        this.rule = rule;
        this.scale = scale;
        this.probability = +rule[1];
        this.isPaused = false;

        var rulestring = rule[0];
        var tempborn = rulestring.split('/')[0];
        var tempsurvive = rulestring.split('/')[1];
        this.born = tempborn.split('');
        this.survive = tempsurvive.split('');
        this.born.shift();
        this.survive.shift();
        for (var i = 0; i < this.born.length; i++) this.born[i] = +this.born[i];
        for (var i = 0; i < this.survive.length; i++) this.survive[i] = +this.survive[i];
        
        this.initField();
    }

    initField() 
    {
        this.generation = 0;
        this.field = CellularAutomaton.init2DArray(this.scale);
        this.colorfield = CellularAutomaton.init2DArray(this.scale);
        

    
        for (var x = 0; x < this.scale; x++) {
            for (var y = 0; y < this.scale; y++) {
                var result = random(0, 100) <= this.probability ? 1 : 0;
                this.field[x][y] = result;
                this.active += result;
                this.colorfield[x][y] = 0;
            }
        }
    }

    showField(localField, x, y) 
    {
        if (localField[x][y] == 1) {
            fill(0, 0, 255);
            stroke(0);
            rect(x * 15, y * 15, (this.scale / 5) - 3, (this.scale / 5) - 3);
        }
    }


    updateField() 
    {
        this.generation++;
        this.active = 0;
        var newField;

        newField = CellularAutomaton.init2DArray(this.scale);
        for (var x = 0; x < this.scale; x++) {
            for (var y = 0; y < this.scale; y++) {
                this.active += this.field[x][y];
                var liveNeighbors = 0;
    
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
    
                if (this.survive.includes(liveNeighbors) && this.field[x][y] == 1) newField[x][y] = 1;
                else if (this.born.includes(liveNeighbors) && this.field[x][y] == 0) newField[x][y] = 1;
                else newField[x][y] = 0;
                this.showField(newField, x, y);
            }
        }
        this.field = newField;
    }

    addPattern(p, x, y) 
    {
        for (var i = 0; i < p.length; i++) 
        {
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
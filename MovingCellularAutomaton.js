class MovingCellularAutomaton extends CellularAutomaton
{
    constructor(rule, scale, movx, movy, probabilityoffset)
    {
        super(rule, scale);
        this.movx = movx;
        this.movy = movy;
        this.probabilityoffset = probabilityoffset;
    }

    updateField()
    {
        this.updateText();
        this.generation++;
        this.active = 0;
        var offset = 0;
        var newField;

        newField = CellularAutomaton.init2DArray(this.scale + this.movx);
        for (var x = 0; x < this.scale; x++) 
        {
            for (var y = 0; y < this.scale; y++) 
            {
                this.active += this.field[x][y];
                var liveNeighbors = 0;
                offset = random(0, 100) <= this.probabilityoffset ? 1 : 0;
                
                for (var i = -1; i <= 1; i++) 
                {
                    for (var j = -1; j <= 1; j++) 
                    {
                        if (i == 0 && j == 0) continue;
                        else if (x == 0 || y == 0 || x == this.scale - 1 || y == this.scale - 1) {
                            try 
                            {
                                liveNeighbors += this.field[x + i][y + j];
                            }
                            catch (IndexOutOfRangeException) { continue; }
                        }
                        else 
                        {
                            liveNeighbors += this.field[x + i][y + j];
                        }
                    }
                }
    
                this.colorfield[x][y] = liveNeighbors;
    
                if (this.survive.includes(liveNeighbors) && this.field[x][y] == 1) newField[x + this.movx][y + this.movy] = 1;
                else if (this.born.includes(liveNeighbors) && this.field[x][y] == 0) newField[x + this.movx][y + this.movy] = 1;
                else newField[x + this.movx][y] = 0;
                newField[0][y] = offset;
                this.showField(newField, x, y);
            }
        }
        this.field = newField;
    }
}
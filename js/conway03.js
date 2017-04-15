

//It should display cells
// 100x100 pixels according to their state 
//It should have a way to control the time 

//Array of objects 

//Object values:
//alive true /false
//Age integer while alive =true
//Display method 

//model view controller
let cellsArray = {
    cells: [],

    populateCellsArray: function() {
         for (x=0; x<this.cells.length; x++){
             for (y=0; y<this.cells.length;y++){
                this.cells[x][y] = {
                    alive: false,
                    aliveNew: false,
                    age: 1, 
                    color: '#000000',
                    }
                }
             }    
    },

    generateColorFromAge: function(age){
        let rgbColor = age;
        let colorFromAge = '#' + ((1 << 24) + (rgbColor << 16) + (rgbColor << 8) + rgbColor).toString(16).slice(1);
    },

    generateCellArray: function(rows){
        for ( i=0; i < rows; i++){
            this.cells[i] = [];    
        };
    },

    populateRandom: function(){
        for ( x=0; x<this.cells.length ; x++){
            for( y=0; y<this.cells.length; y++){
                this.cells[x][y].alive = this.spawnRandomBoolean();
            }
        }
    },

    spawnRandomBoolean: function() {
             let binaryRandom = Math.floor(Math.random() * 2);
             if (binaryRandom === 1){
                 return true;
             } else {
                 return false;
             }
    },
    
    checkLivingConditions: function(){ //check surroundings
        //debugger;
        for (var x = 1; x < this.cells.length - 1; x++) { //iterate through rows
            for (var y = 1; y < this.cells.length - 1; y++) { //iterate through columns
                let totalCells = 0;
                totalCells += this.cells[x -1][y - 1].alive ? 1 : 0;
                totalCells += this.cells[x -1][y].alive ? 1 : 0;
                totalCells += this.cells[x -1][y + 1].alive ? 1 : 0;

                totalCells += this.cells[x][y - 1].alive ? 1 : 0;
                totalCells += this.cells[x][y + 1].alive ? 1 : 0;

                totalCells += this.cells[x + 1][y - 1].alive ? 1 : 0;
                totalCells += this.cells[x + 1][y].alive ? 1 : 0;
                totalCells += this.cells[x + 1][y + 1].alive ? 1 : 0;

                if (this.cells[x][y].alive === false) {
                switch (totalCells) {
                    case 3:
                        this.spawnCell(x,y); //if cell is dead and has 3 neighbours, switch it on
                        break;
                    default:
                        this.killCell(x,y);
                        break; //otherwise leave it dead
                }
            } else if (this.cells[x][y].alive === true) { //apply rules to living cell
                switch (totalCells) {
                    case 0:
                    case 1:
                        this.killCell(x,y); //die of lonelines
                        break;
                    case 2:
                    case 3: //carry on living
                        this.cells[x][y].age++;
                        this.cells[x][y].aliveNew = true;
                        break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        this.killCell(x,y); //die of overcrowding
                        break;
                    default:
                        this.killCell(x,y); //
                }
            }
        }   
        }
    for (var x = 0; x < this.cells.length - 1; x++) { //iterate through rows
            for (var y = 0; y < this.cells.length - 1; y++) { //iterate through columns
        this.cells[x][y].alive = this.cells[x][y].aliveNew;
         }
    }
    
    },

    spawnCell: function(x,y){
        let cells = this.cells[x][y];
        cells.aliveNew = true;
        cells.age = 1;
    },

    killCell: function(x,y){
        let cells = this.cells[x][y];
        cells.aliveNew = false;
        cells.age = 1;
    },


};

let handlers = {
    loopFrame: 0,

    initializeCells: function(){
        cellsArray.generateCellArray(250);
        cellsArray.populateCellsArray();
        cellsArray.populateRandom();
        view.displayCells();
    },

    updateCells: function(){
        cellsArray.checkLivingConditions();
        view.displayCells();
        view.counter++;
        view.displayCounter();
        
    },

    playLoop: function(){
        cellsArray.checkLivingConditions();
        view.displayCells();
        view.counter++;
        view.displayCounter();
        loopFrame = requestAnimationFrame(handlers.playLoop);
    },

    disableBtn: function(){
        playBtn = document.getElementById('playButton');
        playBtn.className += ' disabled';
    },

    stopLoop: function(){
        cancelAnimationFrame(loopFrame);
    }
};

let view = {
    displayCells: function(){
        let canvas = document.getElementById("canvas");
        let canvasContext = canvas.getContext("2d");
        canvasContext.clearRect(0, 0, canvas.scrollWidth, canvas.scrollHeight); //this should clear the canvas ahead of each redraw
            for (var x = 1; x < cellsArray.cells.length; x++) { //iterate through rows
                for (var y = 1; y < cellsArray.cells.length; y++) { //iterate through columns
                    if (cellsArray.cells[x][y].alive) {
                        canvasContext.fillStyle = cellsArray.generateColorFromAge(cellsArray.cells[x][y].age);
                        //canvasContext.fillStyle = '#FF0000';
                        cellsArray.cells[x][y].color = cellsArray.generateColorFromAge(cellsArray.cells[x][y].age);
                        canvasContext.fillRect(x*2, y*2, 2, 2);
                    }
                }
            };
    }, 

    displayCounter: function(){
        document.getElementById("counter").textContent = 'Generation ' + this.counter;
    },
    counter: 0,
}
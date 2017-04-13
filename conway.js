

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
    cellsRows: [],
    cellsColumns: [],

    generateCells: function() {
         this.cellsColumns.push({
            alive: false,
            age: 0, 
            color: '#000000',
            });     
    },

    populateCellArray: function(rows){
        for ( i=0; i < rows; i++){
            this.cellsRows.push(this.cellsColumns[i]);
            this.cells.push(this.cellsRows[i]);    
        }
    },

    spawnRandom: function() {
             let binaryRandom = Math.floor(Math.random() * 2);
             if (binaryRandom === 1){
                 return true;
             } else {
                 return false;
             }
    },

    changeLivingCondition: function(position){
        let cells = this.cells[position];
        cells.alive = !cells.alive; 
    },

    checkLivingConditions: function(position){ //check surroundings

    },
};



for ( i=0; i<10 ; i++){
    cellsArray.generateCells();
    cellsArray.cellsColumns[i].alive = cellsArray.spawnRandom();
}

cellsArray.populateCellArray(10);

for ( i=0; i < cellsArray.cells.length; i++){
    console.log(cellsArray.cells[i].alive);

}





// function checkLivingConditions(){

// }

// function displayCells(){

// }

// function pauseSimulation(){

// }

// function skipFrameSimulation(){

// }

// function startSimulation(){

// }



// var c = document.getElementById(“myCanvas”);
// var ctx = c.getContext(“2d”);
// ctx.clearRect(0, 0, 400, 400); //this should clear the canvas ahead of each redraw
// ctx.fillStyle = “#FF0000”;
// ctx.fillRect(j, k, 1, 1);

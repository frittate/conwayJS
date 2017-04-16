#Conway's Game of LIFE
##A learning simulation
##Written in JavaScript (VanillaJS)

1. This game will simulate a cellular automata, in this case visualized by a grid of cells.
2. Each "turn", a new generation of cells is born, according to some very simple rules
  * Every cell that has 2 or 3 neighbors lives into the new generation.
  * All other cases, the cell dies (starvation or over-crowding)
3. The code is split into a model (cellsArray), a controller (handlers) and a view-object
4. When the code is first played, the grid is initialized, where the grid is set up and each cell will be randomly assigned a status of alive or dead. 
5. Each turn, the code checks the living conditions of the cell and decided whether it will be alive in the next generation. The grid is then drawn within a canvas object.

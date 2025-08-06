import numpy as np
from scipy import signal


class GameOfLife:

    def __init__(self, height, width):
        self.height =  height
        self.width = width
        # Initialize Grid
        self.grid = np.random.randint(0, 2, size=(self.height, self.width), dtype=bool)
        self.kernel = np.array([ [1,1,1], [1,0,1], [1,1,1] ])

    # Next generation Grid
    def nextGen(self):
        # Generate next genration by convolving the kernel over grid
        nextGeneration = signal.convolve2d(self.grid, self.kernel, boundary='wrap', mode='same')

        # Apply Conway's Game of life.
        self.grid = (nextGeneration == 3) | ((self.grid == 1) & (nextGeneration == 2))

    def gridList(self):
        return self.grid.tolist()
    

gameoflife = GameOfLife(600, 800)

def genLoop():
    gameoflife.nextGen()
    return gameoflife.gridList()

    


   
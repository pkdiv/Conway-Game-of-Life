#include <stdexcept>
#include <iostream>
#include <cstdlib>
#include <vector>

std::pair<int, int> convertInput(std::string rows, std::string columns);

void randomizeArray(std::vector<std::vector<int>> &grid, int rows, int columns);

void conwayRules (std::vector<std::vector<int>> &grid, int rows, int columns);

int cellCount (std::vector<std::vector<int>> &grid, int i, int j, int rows, int columns);

int main(int argc, char* argv[]){

    int rows, columns;

    if(argc < 3){
        std::cerr << "Minimum of two arguments are required " << std::endl;
    }   

    std::pair<int, int> result = convertInput(argv[1], argv[2]);

    rows = result.first;
    columns = result.second;
    
    std::vector<std::vector<int>> grid(rows, std::vector<int>(columns));

    randomizeArray(grid, rows, columns);
    
    conwayRules(grid, rows, columns);

    return 0;

}


std::pair<int, int> convertInput(std::string row, std::string column){

    try{
        int rows = std::stoi(row);
        int columns = std::stoi(column);
        return std::make_pair(rows, columns);
    }catch (const std::invalid_argument& e) {
        std::cerr << "Invalid input: not a number\n";
    } catch (const std::out_of_range& e) {
        std::cerr << "Input is out of integer range\n";
    }

    return std::make_pair(0, 0);
}

void randomizeArray(std::vector<std::vector<int>> &grid, int rows, int columns){
    
    for(int i = 0; i < rows; i++){
        for(int j = 0 ; j < columns; j++){
            grid[i][j] = rand() % 2;
        }
    }

    return;

}

void conwayRules (std::vector<std::vector<int>> &grid, int rows, int columns){
    
    std::vector<std::vector<int>> tempGrid(rows, std::vector<int>(columns));

    for(int i = 0; i < rows; i++){
        for(int j = 0 ; j < columns; j++){

            int count;
            
            count = cellCount(grid, i, j, rows, columns);
            
            if(grid[i][j] == 1){
                if (count == 2 || count == 3){
                    tempGrid[i][j] = 1;
                }
            }else{
                if(count == 3){
                    tempGrid[i][j] = 1;
                }
            }
        }
    }

    grid = tempGrid;

}

int cellCount(std::vector<std::vector<int>> &grid, int i, int j, int rows, int columns){

    if (i > 0 && j > 0){
        return grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1]
            + grid[i][j-1] + grid[i][j] + grid[i][j+1]
            + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1] ;
    }else if(i == 0 && j == 0){
        return grid[i + 1][j]
            + grid[i][j + 1] + grid[i + 1][j + 1];
    }else if (i == 0 && j == columns - 1) {
        return grid[i][j - 1]
            + grid[i + 1][j] + grid[i + 1][j];
    }else if (i == rows - 1 && j == 0) {
        return grid[i - 1][j]
            + grid[i - 1][j + 1] + grid[i][j + 1];
    }else if (i == rows - 1 && j == columns - 1){
        return grid[i - 1][j - 1]+grid[i - 1][j]
            + grid[i][j - 1];
    }else if (i == 0) {
        return grid[i][j - 1] + grid[i][j + 1]
            + grid[i + 1][j - 1] + grid[i + 1][j] + grid[i + 1][j + 1];
    }else if (i == rows - 1) {
        return grid[i][j - 1] + grid[i][j + 1]
            + grid[i - 1][j - 1] + grid[i - 1][j] + grid[i - 1][j + 1]; 
    }else if (j == 0) {
        return grid[i - 1][j] + grid[i + 1][j]
            + grid[i - 1][j + 1] + grid[i][j + 1] + grid[i + 1][j + 1];
    }else if (j == columns - 1){
        return grid[i - 1][j] + grid[i + 1][j]
            + grid[i - 1][j - 1] + grid[i][j - 1] + grid[i + 1][j - 1];
    }

    throw std::out_of_range("Index out of range");

}

// Advent of Code 2022 https://adventofcode.com/2022/day/8#part2

let grid = require('fs')
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(e => e.split('').map(e => parseInt(e, 10)));

const visAbove = function (grid, row, col) {
    let target = grid[row][col], total = 0;
    for (let i = row - 1; i >= 0; i--) {
        total++;
        if (grid[i][col] >= target) { return total; }
    }
    return total;
};
const visLeft = function (grid, row, col) {
    let target = grid[row][col], total = 0;
    for (let i = col - 1; i >= 0; i--) {
        total++;
        if (grid[row][i] >= target) { return total; }
    }
    return total;
}
const visRight = function (grid, row, col) {
    let target = grid[row][col], total = 0;
    for (let i = col + 1; i < grid.length; i++) {
        total++;
        if (grid[row][i] >= target) { return total; }
    }
    return total;
}
const visBottom = function (grid, row, col) {
    let target = grid[row][col], total = 0;
    for (let i = row + 1; i < grid.length; i++) {
        total++;
        if (grid[i][col] >= target) { return total; }
    }
    return total;
}

//find visibility in all 4 directions
let max = 0;
for (let rowIndex = 1; rowIndex < grid.length - 1; rowIndex++) {
    for (let colIndex = 1; colIndex < grid[rowIndex].length - 1; colIndex++) {
        let result = visAbove(grid, rowIndex, colIndex) 
            * visLeft(grid, rowIndex, colIndex) 
            * visRight(grid, rowIndex, colIndex) 
            * visBottom(grid, rowIndex, colIndex);
        if (max < result) { max = result; }
    }
}

console.log(max);
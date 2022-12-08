// Advent of Code 2022 https://adventofcode.com/2022/day/8

let grid = require('fs')
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(e => e.split('').map(e => parseInt(e, 10)));

const visAbove = function (grid, row, col) {
    let target = grid[row][col];
    for (let i = row - 1; i >= 0; i--) {
        if (grid[i][col] >= target) { return false; }
    }
    return true;
};
const visLeft = function (grid, row, col) {
    let target = grid[row][col];
    for (let i = col - 1; i >= 0; i--) {
        if (grid[row][i] >= target) { return false; }
    }
    return true;
}
const visRight = function (grid, row, col) {
    let target = grid[row][col];
    for (let i = col + 1; i < grid.length; i++) {
        if (grid[row][i] >= target) { return false; }
    }
    return true;
}
const visBottom = function (grid, row, col) {
    let target = grid[row][col];
    for (let i = row + 1; i < grid.length; i++) {
        if (grid[i][col] >= target) { return false; }
    }
    return true;
}

let total = grid[0].length * 2 + (grid.length - 2) * 2;

//go through and figure out if each tree is visible from all directions
for (let rowIndex = 1; rowIndex < grid.length - 1; rowIndex++) {
    for (let colIndex = 1; colIndex < grid[rowIndex].length - 1; colIndex++) {
        if (visAbove(grid, rowIndex, colIndex)
            || visLeft(grid, rowIndex, colIndex)
            || visRight(grid, rowIndex, colIndex)
            || visBottom(grid, rowIndex, colIndex)) { total++; }
    }
}

console.log({total});
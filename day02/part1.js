// Advent of Code 2022 https://adventofcode.com/2022/day/2

const fs = require('fs');

const charToInt = function (e) {
    return {
    'A': 1, 'B': 2, 'C': 3,
    'X': 1, 'Y': 2, 'Z': 3
    }[e];
};

input = fs
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(e => e
        .split(' ')
        .map(charToInt)
    );

let score = 1;

for (let i = 0; i < input.length; i++) {
    //shape
    score += input[i][1];

    //score: draw
    if (input[i][1] === input[i][0]) { score += 3; }

    //score: win
    else if (input[i][1] - input[i][0] === 1
        || input[i][1] - input[i][0] === -2)
        { score += 6; }
}

console.log(score);
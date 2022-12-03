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

let score = 0, pick = -1;

for (let i = 0; i < input.length; i++) {
    if (input[i][1] === 1) { 
        //lose
        pick = input[i][0] - 1;
        score += pick || 3;
    }
    else if (input[i][1] === 2) {
        //draw
        score += input[i][0] + 3;
    }
    else {
        //win
        pick = input[i][0] + 1;
        score += pick === 4 ? 7 : pick + 6;
    }
}

console.log(score);
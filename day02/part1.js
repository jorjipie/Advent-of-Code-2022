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

let score = 1, result = 0;


for (let i = 0; i < input.length; i++) {

    //shape
    score += input[i][1];

    //break even or win
    switch (input[i][1] - input[i][0]) {
        case 0:
            score += 3;
            break;
        case 1:
            score += 6;
            break;
        case -2:
            score += 6;
            break;
    }
}

console.log(score);
// Advent of Code 2022 https://adventofcode.com/2022/day/4#part2

const fs = require('fs');

const anyOverlap = function (left, right) {
    const lower = left[0] < right[0] ? left : right;
    const higher = lower === right ? left : right;
    return lower[1] >= higher[0];
}

let input = fs
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(e => e.split(',')
        .map(e => e.split('-')
            .map(e => parseInt(e, 10))))
    .map(e => anyOverlap(e[0], e[1]));

console.log(input.filter(i => i).length);
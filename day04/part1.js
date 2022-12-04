// Advent of Code 2022 https://adventofcode.com/2022/day/4

const fs = require('fs');

const oneContainsTheOther = function (left, right) {
    //if left contains right
    if (left[0] <= right[0] && left[1] >= right[1]) { return true; }
    //if right contains left
    if (right[0] <= left[0] && right[1] >= left[1]) { return true; }
    return false
}

let input = fs
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(e => e.split(',')
        .map(e => e.split('-')
            .map(e => parseInt(e, 10))))
    .map(e => oneContainsTheOther(e[0], e[1]));

console.log(input.filter(i => i).length);
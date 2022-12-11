// Advent of Code 2022 https://adventofcode.com/2022/day/10

let instructions = require('fs')
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n');

let printCycle = function (clockCycle, register, sum) {
    if ((clockCycle - 20) % 40 === 0) {
        sum +=  clockCycle * register;
    }
    return sum;
};

let clockCycle = 1, register = 1, instructionIndex = 0, ins = [], sum = 0;
while (instructionIndex < instructions.length) {
    ins = instructions[instructionIndex].split(' ');
    switch(ins[0]) {
        case 'noop':
            clockCycle++;
            sum = printCycle(clockCycle, register, sum);
            break;
        case 'addx':
            clockCycle += 1;
            sum = printCycle(clockCycle, register, sum);
            clockCycle += 1;
            register += parseInt(ins[1], 10);
            sum = printCycle(clockCycle, register, sum);
            break;
    }
    instructionIndex++;
}
console.log(sum);
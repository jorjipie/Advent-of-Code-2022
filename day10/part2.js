// Advent of Code 2022 https://adventofcode.com/2022/day/10#part2

let instructions = require('fs')
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n');

let printCycle = function (clockCycle, register, sum) {
    let c = (clockCycle % 40); 
    console.log({register, c});  
    if ((register >= c - 1) && register <= c + 1) {
        return sum + '#'
    }
    return sum + '.'

};

let clockCycle = 0, register = 1, instructionIndex = 0, ins = [], sum = '';
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
let arr = []
for (let i = 0; i < sum.length; i += 40) {
    arr.push(sum.substring(i, i + 39))
}
console.log(arr.join('\n'));
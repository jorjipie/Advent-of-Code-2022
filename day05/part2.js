// Advent of Code 2022 https://adventofcode.com/2022/day/5#part2

const fs = require('fs');
let stacksStr = '', instructions = '';
[stacksStr, instructions] = fs
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n\n');

//Because I'm not a former coworker and I'm not appending strings.
const getStacks = function (str) {
    let arr = str.split('\n');
    let cols = arr[arr.length -2].length;
    let rowIndex = 0;
    let output = [];
    for (let charIndex = 0; charIndex < cols; charIndex++) {
        let outputArr = []
        for (rowIndex = 0; rowIndex < arr.length - 1; rowIndex++ ) {
            let char = arr[rowIndex][charIndex], 
                charCode = char.charCodeAt(0);
            if (charCode > 64 && charCode < 91) { outputArr.push(char); }
        }
        
        if (outputArr.length > 0) {output.push(outputArr.reverse())};
        rowIndex = 0;
    }
    return output;
}
const processSingleInstruction = function (insLine, stacks) {
    let stepsCount = 0, from = 0, to = 0;
    [stepsCount, from, to] = insLine
        .split(' ')
        .filter(e => /^\d+$/.test(e))
        .map(e => parseInt(e, 10));
    
    from = from - 1;
    to = to - 1;

    const startAt = stacks[from].length - stepsCount
    const crane = stacks[from].slice(startAt);
    stacks[to] = stacks[to].concat(crane);
    stacks[from] = stacks[from].filter((e,i) => i < startAt)

    return stacks;
}
const processInstructions = function (ins, stacks) {
    ins = ins.split('\n');
    for (let insIndex = 0; insIndex < ins.length; insIndex++) {
        stacks = processSingleInstruction(ins[insIndex], stacks);
    }
    return stacks;
};
const getTops = s => s.map(e => e[e.length - 1]).join('');
console.log(getTops(processInstructions(instructions, getStacks(stacksStr))));
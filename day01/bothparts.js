// Advent of Code 2022 https://adventofcode.com/2022/day/1

const fs = require('fs');
const parseStrToInt = e => e.length > 0 ? parseInt(e,10) : -1;

let arr = fs.readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(parseStrToInt),
    current = 0, newArr = [];

for (i = 0; i < arr.length; i++) {
	if (arr[i] != -1) { current += arr[i]; }
  else { 
  	newArr.push(current);
    current = 0;
  }
}

let top3 = newArr.sort((a,b) => b-a).slice(0,3);

console.log(`Problem 1: ${top3[0]}`)
console.log(`Problem 2: ${top3.reduce((sum, a) => sum + a, 0)}`)
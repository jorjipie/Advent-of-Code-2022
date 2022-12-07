// Advent of Code 2022 https://adventofcode.com/2022/day/7
//find the total size of all directories containing at most 100k

//Oh hell. This actually needs to factor in the size of child directories as well. Whelp, not getting this done tonight.
const fs = require('fs');
const internal = require('stream');
let arr = fs.readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')

let directoryTotal = 0, directories = []
for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === '$') { 
        if (directoryTotal > 0) {
            if (directoryTotal < 100001) { 
                directories.push(directoryTotal);
                console.log('adding ' + directoryTotal)
            }
            else {
                console.log('tossing ' + directoryTotal)
            }
            directoryTotal = 0;
        }
        continue;
    }
    if (arr[i].substring(0,3) === 'dir') { continue; } // ignore dir listings. 
    let amount = parseInt(arr[i].split(' ')[0], 10);
    directoryTotal += amount;
}
console.log(directories.reduce((sum, e) => sum + e, 0));
console.log(directories.length);
let set = new Set(directories);
console.log(set.size);

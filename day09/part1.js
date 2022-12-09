// Advent of Code 2022 https://adventofcode.com/2022/day/9

let instructions = require('fs')
    .readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(e => { 
        let [dir, steps] = e.split(' ');
        steps = parseInt(steps, 10);
        return { dir, steps };
    });

let hHistory = [[0, 0]], hCurrentLoc = [0, 0], hTemp = [0, 0];
let tHistory = [], tCurrentLoc = [0, 0], tUniques = [], tTemp = [0, 0];
let directionFunc = null;

let getT = (newH, oldT, direction) => {
    let moveX = newH[0] - oldT[0];
    let moveY = newH[1] - oldT[1];
    //no move needed. 
    if (Math.abs(moveX) < 2 && Math.abs(moveY) < 2) { return oldT; }
    //diagonal
    if (Math.abs(moveX) + Math.abs(moveY) === 3) {
        if (moveX > 0 && moveY > 0) {
            return [oldT[0]+1, oldT[1]+1];
        }
        if (moveX < 0 && moveY < 0) {
            return [oldT[0]-1, oldT[1]-1];
        }
        if (moveX > 0 && moveY < 0) {
            return [oldT[0]+1, oldT[1]-1];
        }
        if (moveX < 0 && moveY > 0) {
            return [oldT[0]-1, oldT[1]+1];
        }
    }
    else {
        switch (direction) {
            case 'U':
                return [oldT[0], oldT[1]+1];
            case 'D':
                return [oldT[0], oldT[1]-1];
            case 'L':
                return [oldT[0]-1, oldT[1]];
            case 'R':
                return [oldT[0]+1, oldT[1]];
        }
    }
    
}

for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i].dir) {
        case 'U':
            directionFunc = e => [e[0], e[1] + 1]
            break;
        case 'D':
            directionFunc = e => [e[0], e[1] - 1]
            break;
        case 'L':
            directionFunc = e => [e[0] - 1, e[1]]
            break;
        case 'R':
            directionFunc = e => [e[0] + 1, e[1]]
            break;
    }
    for (let j = 0; j < instructions[i].steps; j++) {
        hTemp = directionFunc(hCurrentLoc);
        tTemp = getT(hTemp, tCurrentLoc, instructions[i].dir);
        if (!tUniques.some(e => e[0] === tTemp[0] && e[1] === tTemp[1])) { tUniques.push(tTemp); }
        hHistory.push(hCurrentLoc);
        hCurrentLoc = hTemp;
        tHistory.push(tCurrentLoc);
        tCurrentLoc = tTemp;
    }
}
console.log(tUniques.length);

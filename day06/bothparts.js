// Advent of Code 2022 https://adventofcode.com/2022/day/6

String.prototype.findPacket = function(packetLength) {
    for(let i = 0; i < this.length - packetLength - 1; i++) {
        if (new Set(this.substring(i, i + packetLength).split('')).size === packetLength) { 
            return i + packetLength; 
        }
    }
}

const fs = require('fs');
let packetIndex = fs
    .readFileSync('./input.txt')
    .toString('utf-8')
    .findPacket(4) //changed to 14 for part 2.

console.log(packetIndex);
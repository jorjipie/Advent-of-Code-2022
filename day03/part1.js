const fs = require('fs');

let common2 = function (a, b) {
    for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) != -1) { return a[i]; }
    }
}

let getValue = function (a) {
    const charCode = a.charCodeAt(0);
    return charCode > 96 && charCode < 123 ? charCode - 96 : charCode - 38;
}

let findBothSides = function(a) {
    const middle = a.length / 2;
    return getValue(common2(a.substring(0, middle), a.substring(middle)));
}

let result = fs.readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n')
    .map(findBothSides)
    .reduce((sum, a) => sum + a, 0);

console.log(result);
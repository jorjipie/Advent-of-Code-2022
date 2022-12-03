const fs = require('fs');

let common3 = function (a, b, c) {
    for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) != -1 && c.indexOf(a[i]) != -1) { return a[i]; }
    }
}

let getValue = function (a) {
    const charCode = a.charCodeAt(0);
    return charCode > 96 && charCode < 123 ? charCode - 96 : charCode - 38;
}

let text = fs.readFileSync('./input.txt')
    .toString('utf-8')
    .split('\n');

let total = 0;

for (let i = 0; i < text.length; i += 3) {
    total += getValue(common3(text[i], text[i+1], text[i+2]));
}

console.log(total);
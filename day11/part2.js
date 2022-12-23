// Advent of Code 2022 https://adventofcode.com/2022/day/11#part2

let monkeys = require('fs').readFileSync('input.txt').toString('utf-8').split('\n\n').map(str => {
    let arr = str.split('\n');
    let monkey = { 
        items: arr[1].match(/\d+/g).map(e => parseInt(e)),
        timesInspected: 0,
        operation: old => eval(arr[2].match(/= ([^\n]+)/i)[1]),
        testDivisBy: parseInt(arr[3].match(/\d+/g)[0]),
        throwTrue: parseInt(arr[4].match(/\d+/g)[0]),
        throwFalse: parseInt(arr[5].match(/\d+/g)[0])
    };

    return monkey;
});

let allMod = monkeys.map(m => m.testDivisBy).reduce((sum, m) => sum * m, 1);

for (let round = 1; round <= 10000; round++) {

    for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
        let monkey = monkeys[monkeyIndex];
        while (monkey.items.length > 0) {
            let item = monkey.items[0];
            monkey.timesInspected++;
            item = monkey.operation(item);
            item = item % allMod;
            let test = (item % monkey.testDivisBy === 0)
            if (test) { 
                monkeys[monkey.throwTrue].items.push(item);
            }
            else { 
                monkeys[monkey.throwFalse].items.push(item)
            };
            monkey.items = monkey.items.slice(1);
        }
    }
}
for(let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
    console.log(`Monkey ${monkeyIndex}: ${monkeys[monkeyIndex].items.join(', ')}`)
}

let monkeyBusiness = monkeys.map(e => e.timesInspected).sort((a, b) => b-a);
console.log(monkeyBusiness)
console.log(`Level of Monkey Business: ${ monkeyBusiness[0] * monkeyBusiness[1]}`)

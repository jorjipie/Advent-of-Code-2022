// Advent of Code 2022 https://adventofcode.com/2022/day/11

let monkeys = require('fs').readFileSync('input.txt').toString('utf-8').split('\n\n').map(str => {
    let arr = str.split('\n');
    let monkey = { 
        items: arr[1].match(/\d+/g).map(e => +e),
        timesInspected: 0,
        operation: old => eval(arr[2].match(/= ([^\n]+)/i)[1]),
        testDivisBy: parseInt(arr[3].match(/\d+/g)[0]),
        throwTrue: parseInt(arr[4].match(/\d+/g)[0]),
        throwFalse: parseInt(arr[5].match(/\d+/g)[0])
    };

    return monkey;
});

for (let round = 1; round < 21; round++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
        let monkey = monkeys[monkeyIndex];
        console.log(`Monkey: ${monkeyIndex}`)
        while (monkey.items.length > 0) {
            let item = monkey.items[0];
            monkey.timesInspected++;
            console.log(`   Monkey inspects an item with a worry level of ${item}.`)
            item = monkey.operation(item);
            console.log(`       Worry level to ${item}.`);
            item = Math.floor(item / 3);
            console.log(`       Monkey gets bored with item. Worry level is divided by 3 to ${item}.`)
            let test = (item % monkey.testDivisBy === 0)
            console.log(`       Current worry level is ${ test ? '' : 'NOT'} divisible by ${monkey.testDivisBy}.`)
            if (test) { 
                monkeys[monkey.throwTrue].items.push(item);
                console.log(`       Item with worry level ${item} is thrown to monkey ${monkey.throwTrue}.`)
            }
            else { 
                monkeys[monkey.throwFalse].items.push(item)
                console.log(`       Item with worry level ${item} is thrown to monkey ${monkey.throwFalse}.`)
            };
            monkey.items = monkey.items.slice(1);
        }
    }
}
for(let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
    console.log(`Monkey ${monkeyIndex}: ${monkeys[monkeyIndex].items.join(', ')}`)
}
console.log(monkeys);
let monkeyBusiness = monkeys.map(e => e.timesInspected).sort((a, b) => b-a);
console.log(`Level of Monkey Business: ${ monkeyBusiness[0] * monkeyBusiness[1]}`)

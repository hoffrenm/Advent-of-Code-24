var input = require('fs').readFileSync('13-input.txt').toString().split("\n")

let sum = 0;

for (let i = 0; i < input.length; i += 4) {
    const first = input[i].split(" ")
    const second = input[i+1].split(" ")
    const target = input[i+2].split(" ")
    const a1 = Number(first[2].replace(/\D/g,''));
    const b1 = Number(second[2].replace(/\D/g,''));
    const a2 = Number(first[3].replace(/\D/g,''));
    const b2 = Number(second[3].replace(/\D/g,''));
    const c1 = Number(target[1].replace(/\D/g,'')) + 10000000000000
    const c2 = Number(target[2].replace(/\D/g,'')) + 10000000000000
    
    const multiplier1 = a2;
    const multiplier2 = a1;

    const eq1_multiplied = [a1 * multiplier1, b1 * multiplier1, c1 * multiplier1];
    const eq2_multiplied = [a2 * multiplier2, b2 * multiplier2, c2 * multiplier2];

    const b = (eq2_multiplied[2] - eq1_multiplied[2]) / (eq2_multiplied[1] - eq1_multiplied[1]);
    const a = (c1 - b * b1) / a1;

    if (a % 1 == 0 && b % 1 == 0) {
        sum += (a*3) + b
    }
}

console.log(sum);
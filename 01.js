const left = []
const right = []

var fs = require('fs');
var inputs = fs.readFileSync('01-input.txt').toString().split("\n")
for (i in inputs) {
    const line = inputs[i].replace("\r", "").split(" ")
    left.push(Number(line[0]))
    right.push(Number(line[3]))
}

left.sort()
right.sort()

let sum = 0;

for (let index = 0; index < left.length; index++) {
    sum += Math.abs(left[index] - right[index])
}

let sum2 = 0

for (let i = 0; i < left.length; i++) {
    const target = left[i]
    let amount = 0;

    for (let j = 0; j < right.length; j++) {
        if (right[j] == target) amount++
    }

    sum2 += target * amount
}

console.log(sum)
console.log(sum2)

var fs = require('fs');
var input = fs.readFileSync('03-input.txt').toString().split("\n")
const pattern = /(don't\(\))|(do\(\))|(mul\(\d{1,3},\d{1,3}\))/g
let sum = 0

let calculate = true

for (const line of input) {
    const expressions = [...line.matchAll(pattern)]

    for (const expr of expressions) {
        const expression = expr[0]
        console.log(expression);

        if (expression == "do()") {
            calculate = true
        } else if (expression == "don't()") {
            calculate = false
        } else if (calculate && expression.startsWith("mul(")) {
            const calc = expression.replace("mul(", "").replace(")", "").split(",")
            sum += Number(calc[0]) * Number(calc[1])
        }
    }
}

console.log(sum);

// 184511516 high
// 95085090  high
// 63252165  low
// 90044227  correct
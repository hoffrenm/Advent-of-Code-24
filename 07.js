const formattedInputs = []
var fs = require('fs');
var inputs = fs.readFileSync('07-input.txt').toString().split("\n")
for (i in inputs) {
    formattedInputs.push(inputs[i].replace(":", "").replace("\r", "").split(" "))
}

const testInputs = [
    [190, 10, 19], [3267, 81, 40, 27], [83, 17, 5],
    [156, 15, 6], [7290, 6, 8, 6, 15], [161011, 16, 10, 13],
    [192, 17, 8, 14], [21037, 9, 7, 18, 13], [292, 11, 6, 16, 20]
]

const operators = ["*", "+", "||"];
const length = 12;
const opCombinations = []

const start1 = Date.now()

function generateOperatorCombinations(operators, length) {
    const result = [];

    function combine(tempArr) {
        if (tempArr.length === length) {
            result.push(tempArr);
            return;
        }

        for (let i = 0; i < operators.length; i++) {
            combine([...tempArr, operators[i]]);
        }
    }
    combine([]);
    return result;
}

const end = Date.now()

console.log(end - start1);


for (let index = 1; index < length; index++) {
    opCombinations.push(generateOperatorCombinations(operators, index));
}

var totalSum = 0

const start = Date.now()

for (const input of formattedInputs) {
    const target = Number(input.shift())
    const operators = opCombinations[input.length - 2]

    for (let i = 0; i < operators.length; i++) {
        const temp = []
        const operation = operators[i]

        for (let j = 0; j < operation.length; j++) {
            temp.push(input[j])
            temp.push(operation[j])
            if (j === operation.length - 1) temp.push(input[j + 1])
        }

        while (temp.length > 1) {
            const t1 = Number(temp.shift())
            const operand = temp.shift()
            const t2 = Number(temp.shift())

            if (operand === "*") {
                const mul = t1 * t2
                temp.unshift(mul)
            } else if (operand === "||") {
                const con = "" + t1 + t2
                temp.unshift(Number(con))
            } else {
                const sum = t1 + t2
                temp.unshift(sum)
            }
        }

        if (temp[0] === target) {
            totalSum += temp[0]
            break;
        }
    }
}

console.log(totalSum);
console.log(Math.floor((Date.now() - start)));


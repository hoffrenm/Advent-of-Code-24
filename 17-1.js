var fs = require('fs');
var input = fs.readFileSync('17-input.txt').toString().replaceAll("\r", "").split("\n")

var opCodes = input[4].split(":")[1].split(",").map(Number)
let a = Number(input[0].split(":")[1])
let b = 0
let c = 0
let pointer = 0
let output = []

const combo = (num) => {
    if (num >= 0 && num <= 3) {
        return num
    } else if (num == 4) {
        return a
    } else if (num == 5) {
        return b
    } else if (num == 6) {
        return c
    }
}
const adv = (num) => {
    const result = Math.floor(a / Math.pow(2, combo(num)))
    a = result
}

const bxl = (num) => {
    const result = (b ^ num) >>> 0
    b = result
}

const bst = (num) => {
    const result = Math.abs(combo(num) % 8)
    b = result
}

const jnz = (num) => {
    if (a == 0) return
    pointer = num
}

const bxc = (num) => {
    const result = (b ^ c) >>> 0
    b = result
}

const out = (num) => {
    const result = Math.abs(combo(num) % 8)
    output.push(result)
}

const bdv = (num) => {
    const result = Math.floor(a / Math.pow(2, combo(num)))
    b = result
}

const cdv = (num) => {
    const result = Math.floor(a / Math.pow(2, combo(num)))
    c = result
}


while (pointer < opCodes.length - 1) {
    const op = opCodes[pointer]
    const operand = opCodes[pointer + 1]

    switch (op) {
        case 0:
            adv(operand)
            break
        case 1:
            bxl(operand)
            break
        case 2:
            bst(operand)
            break
        case 3:
            jnz(operand)
            if (a == 0) { pointer = 9999 }
            continue
        case 4:
            bxc(operand)
            break
        case 5:
            out(operand)
            break
        case 6:
            bdv(operand)
            break
        case 7:
            cdv(operand)
            break
    }

    pointer += 2
}

console.log(output.join(","));

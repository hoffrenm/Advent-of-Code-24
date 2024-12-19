var fs = require('fs');
var input = fs.readFileSync('17-input.txt').toString().replaceAll("\r", "").split("\n")

const opCodes = input[4].split(":")[1].split(",").map(Number)
var a = Number(input[0].split(":")[1])
var b = 0
var c = 0
var pointer = 0
var output = []

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

const checkNumber = (num) => {
    a = num
    b = 0
    c = 0
    pointer = 0
    output = []

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

    //console.log("Output: ", output.toString());

    return output
}

const finishedProgram = "2,4,1,1,7,5,0,3,1,4,4,0,5,5,3,0"
const originalProgram = "2,4,1,1,7,5,0,3,1,4,4,0,5,5,3,0".split(",").reverse()
let candidates = [0]
let solutions = []

for (let j = 0; j < opCodes.length; j++) {
    let opToFind = originalProgram[j];
    let newCandidates = []
    while (candidates.length > 0) {
        let value = candidates.shift()
        for (let i = 0; i < 8; i++) {
            let candidate = value + i
            const program = checkNumber(candidate)
            const currentOp = program[0]


            console.log("Value + i: ", Number(value), " + ",  Number(i));
            console.log("Searching: ", Number(opToFind), " Found: ", Number(currentOp));
            console.log("Current opCode: ", program.join(","))
            console.log("----------------------------------------");
            

            if (program.join(",") == finishedProgram) {
                solutions.push(candidate)
            } else if (currentOp == opToFind) {
                newCandidates.push((candidate * 8))
            }
        }
    }

    candidates = newCandidates
}

// 130330968691472 low
// 202356708354602
// 202356708354602
// 202356708377891 high

console.log("Check: " + checkNumber(202356708377891).join(","))

console.log(solutions.sort());


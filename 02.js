const input = []
var fs = require('fs');
var inputs = fs.readFileSync('02-input.txt').toString().split("\n")
for (i in inputs) {
    input.push(inputs[i].replace("\r", "").split(" "))
}

const safes = []
const unsafes = []

const differences = []
for (const row of input) {
    const report = row.map((x => Number(x)))
    const diffs = []

    for (let i = 0; i < report.length - 1; i++) {
        diffs.push(report[i] - report[i + 1])
    }

    if (diffs.every((x) => x >= 1 && x <= 3) || diffs.every((x) => x <= -1 && x >= -3)) {
        safes.push(report)
    } else {
        unsafes.push(report)
    }

    differences.push(diffs)
}

for (const report of unsafes) {
    const reportLength = report.length

    for (let i = 0; i < report.length - 1; i++) {
        const curr = report[i]
        const next = report[i + 1]

        if (curr - next) {

        }
    }
}

const isSafe = (report) => {
    const diffs = []

    for (let i = 0; i < report.length - 1; i++) {
        diffs.push(report[i] - report[i + 1])
    }

    return (diffs.every((x) => x >= 1 && x <= 3) || diffs.every((x) => x <= -1 && x >= -3))
}

// 673 high
// 654 high
// 686
// 617 wrong
// 624 wrong
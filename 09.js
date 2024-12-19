var input = require('fs').readFileSync('09-input.txt').toString().split("")
const hardDrive = []
const sortedDrive = []

const lol = () => {
    for (let i = 0; i < input.length; i++) {
        const value = input[i]

        if (i % 2 == 0) {
            for (let j = 0; j < value; j++) {
                hardDrive.push(i / 2)
            }
        } else {
            for (let j = 0; j < value; j++) {
                hardDrive.push('.')
            }
        }
    }
}

const easier = () => {
    OUTER:
    for (let index = input.length - 1; index > 0; index -= 2) {
        const length = Number(input[index]);
        const id = index / 2

        INNER:
        for (let i = 0; i < hardDrive.length; i++) {
            if (hardDrive[i] == id) continue OUTER
            if (hardDrive[i] == ".") {
                let space = 1

                for (let j = i; j < i + 10; j++) {
                    if (space == length) {
                        for (let e = 0; e < hardDrive.length; e++) {
                            if (hardDrive[e] == id) hardDrive[e] = "."
                        }
                        hardDrive.fill(id, i, i + length)
                        continue OUTER
                    }

                    if (hardDrive[j + 1] == ".") {
                        space++
                    } else {
                        continue INNER
                    }
                }
            }
        }
    }
}

const sort = () => {
    for (let k = 0; k < hardDrive.length; k++) {
        const element = hardDrive[k];

        if (element == ".") {
            let rightMost = hardDrive.pop()

            while (rightMost == ".") {
                rightMost = hardDrive.pop()
            }

            sortedDrive.push(rightMost)
        } else {
            sortedDrive.push(element)
        }
    }
}


lol()

console.log(hardDrive);

easier()

console.log(hardDrive);

const sum = hardDrive.reduce((prev, curr, index) => prev + curr * index, 0)

console.log(sum);

let summ = 0

for (let index = 0; index < hardDrive.length; index++) {
    if (hardDrive[index] != ".") {
        summ += hardDrive[index] * index
    }
}

console.log(summ);
6289564433984

/*
lol()
sort()
sortedDrive.pop()



const sum = sortedDrive.reduce((prev, curr, index) => prev + curr * index, 0)


console.log(sum)
*/
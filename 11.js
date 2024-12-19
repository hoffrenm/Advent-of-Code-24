var input = require('fs').readFileSync('11-test-input.txt').toString().split(" ")

let iteration = []

const part1 = () => {
    for (let x = 0; x < 25; x++) {
        iteration = []
        console.log(input.length)


        for (let i = 0; i < input.length; i++) {
            const element = input[i];
            if (element == 0) {
                iteration.push('1')
            } else if (element.length % 2 == 0) {
                const left = Number(element.substring(0, element.length / 2)).toString()
                const right = Number(element.substring(element.length / 2, element.length)).toString()
                iteration.push(left, right)
            } else {
                iteration.push((element * 2024).toString())
            }
        }

        input = iteration
    }
}

const lol1 = () => {
    const stones = []
    const counts = []

    for (let i = 0; i < stones.length; i++) {
        const element = array[i];

        if (element == 0) {
            stones[1]
        } else if (element.length % 2 == 0) {
            const left = Number(element.substring(0, element.length / 2)).toString()
            const right = Number(element.substring(element.length / 2, element.length)).toString()
            iteration.push(left, right)
        } else {
            iteration.push((element * 2024).toString())
        }
    }

}

let sum = 0

const lol = () => {
    for (let k = 0; k < input.length; k++) {
        let stones = [(input[k]).toString()]

        for (let j = 0; j < 75; j++) {
            const iteration = []
            console.log(stones.length);

            for (let i = 0; i < stones.length; i++) {
                const element = stones[i]

                if (element == 0) {
                    iteration.push('1')
                } else if (element.length % 2 == 0) {
                    const left = Number(element.substring(0, element.length / 2)).toString()
                    const right = Number(element.substring(element.length / 2, element.length)).toString()
                    iteration.push(left, right)
                } else {
                    iteration.push((element * 2024).toString())
                }
            }

            stones = iteration
        }

        sum += stones.length
    }
}

const test = () => {
    let stones = [(24).toString()]
    console.log(stones);

    for (let j = 0; j < 10; j++) {
        const iteration = []
        for (let i = 0; i < stones.length; i++) {
            const element = stones[i]

            if (element == 0) {
                iteration.push('1')
            } else if (element.length % 2 == 0) {
                const left = Number(element.substring(0, element.length / 2)).toString()
                const right = Number(element.substring(element.length / 2, element.length)).toString()
                iteration.push(left, right)
            } else {
                iteration.push((element * 2024).toString())
            }
        }

        stones = iteration
    }

    sum += stones.length
}

//test()
//lol()

const test2 = (stones) => {
    const newStones = {}

    for (const [stone, occurrences] of Object.entries(stones)) {
        const number = stone

        if (number == 0) {
            newStones[1] = Number((newStones[1] || 0) + occurrences)
        } else if (number.length % 2 == 0) {
            const left = Number(number.substring(0, number.length / 2))
            const right = Number(number.substring(number.length / 2, number.length))

            newStones[left] = Number((newStones[left] || 0) + occurrences)
            newStones[right] = Number((newStones[right] || 0) + occurrences)
        } else {
            const newStone = number * 2024
            newStones[newStone] = Number((newStones[newStone] || 0) + occurrences)
        }
    }

    return newStones;
}

// let stones = { 4022724: 1, 951333: 1, 0: 1, 21633: 1, 5857: 1, 97: 1, 702: 1, 6: 1 }
let stones = { 125: 1, 17: 1 }

for (let index = 0; index < 5; index++) {
    console.log("Was: ", stones);
    stones = test2(stones)
    console.log("Next: ", stones, "\n");
}

let sum2 = 0
for (const [num, value] of Object.entries(stones)) {
    sum2 += Number(value)
}

console.log(sum2);




/*
const calculate = (stone, times) => {
    for (let x = 0; x < times; x++) {
        const iteration = [stone]
        const stones = [stone]

        for (let i = 0; i < stones.length; i++) {
            const element = stone[i];
            if (element == 0) {
                stones.push('1')
            } else if (element.length % 2 == 0) {
                const left = Number(element.substring(0, element.length / 2)).toString()
                const right = Number(element.substring(element.length / 2, element.length)).toString()
                stones.push(left, right)
            } else {
                stones.push((element * 2024).toString())
            }
        }

        input = iteration
    }
}
*/

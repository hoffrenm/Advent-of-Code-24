var fs = require('fs');
var input = fs.readFileSync('15-input.txt').toString().replaceAll("\r", "").split("\n")

let moves = input
let map = moves.splice(0, moves.indexOf(''));
moves.splice(0, 1)

map = map.map(x => x.split(""))
moves = moves.join()

let robotX = 0
let robotY = 0

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const element = map[i][j];

        if (element == "@") {
            robotX = j
            robotY = i
        }
    }
}

console.log(robotX, " : ", robotY);


const next = (x, y, dir) => {
    switch (dir) {
        case '^':
            var a = map[y - 1][x]
            if (a == ".") {
                return [x, y - 1]
            } else if (a == "O") {
                return next(x, y - 1, dir)
            } else if (a == "#") {
                return undefined
            }
            break
        case '>':
            var a = map[y][x + 1]
            if (a == ".") {
                return [x + 1, y]
            } else if (a == "O") {
                return next(x + 1, y, dir)
            } else if (a == "#") {
                return undefined
            }
            break
        case 'v':
            var a = map[y + 1][x]
            if (a == ".") {
                return [x, y + 1]
            } else if (a == "O") {
                return next(x, y + 1, dir)
            } else if (a == "#") {
                return undefined
            }
            break
        case '<':
            var a = map[y][x - 1]
            if (a == ".") {
                return [x - 1, y]
            } else if (a == "O") {
                return next(x - 1, y, dir)
            } else if (a == "#") {
                return undefined
            }
            break
    }
}

let x = robotX
let y = robotY

for (let i = 0; i < moves.length; i++) {
    const move = moves[i];

    if (move == '^') {
        const location = next(x, y, move)
        if (location != undefined) {
            map[location[1]][location[0]] = map[y - 1][x]
            map[y - 1][x] = "@"
            map[y][x] = "."
            y--
        }
    } else if (move == '>') {
        const location = next(x, y, move)
        if (location != undefined) {
            map[location[1]][location[0]] = map[y][x + 1]
            map[y][x + 1] = "@"
            map[y][x] = "."
            x++
        }
    } else if (move == 'v') {
        const location = next(x, y, move)
        if (location != undefined) {
            map[location[1]][location[0]] = map[y + 1][x]
            map[y + 1][x] = "@"
            map[y][x] = "."
            y++
        }
    } else if (move == '<') {
        const location = next(x, y, move)
        if (location != undefined) {
            map[location[1]][location[0]] = map[y][x - 1]
            map[y][x - 1] = "@"
            map[y][x] = "."
            x--
        }
    }
}

console.log(map.forEach(x => console.log(x.join(""))))

let sum = 0

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const element = map[i][j];

        if (element == "O") {
            sum += i * 100 + j
        }
    }
}

console.log(sum);

class Box {
    constructor(x1, x2, y) {
        this.x1 = x1
        this.x2 = x2
        this.y = y
      }
}
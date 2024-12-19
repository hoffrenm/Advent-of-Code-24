var fs = require('fs');
var input = fs.readFileSync('14-input.txt').toString().replaceAll("\r", "").split("\n")

let robots = []

for (let i = 0; i < input.length; i++) {
    const element = input[i];
    const temp = element.split(" ")

    const pos = temp[0].replace("p=", "").split(",")
    const vel = temp[1].replace("v=", "").split(",")

    robots.push({ x: pos[0], y: pos[1], velX: vel[0], velY: vel[1] })
}

const copy = structuredClone(robots);

const xLength = 101
const yLength = 103

const iterate = (times) => {
    robots = structuredClone(copy)

    for (let i = 0; i < robots.length; i++) {
        const robot = robots[i];

        robot.x = (Number(robot.x) + Number(robot.velX) * times) % xLength
        robot.y = (Number(robot.y) + Number(robot.velY) * times) % yLength

        if (robot.x < 0) robot.x = Number(xLength + robot.x)
        if (robot.y < 0) robot.y = Number(yLength + robot.y)
    }
}

const xMid = Math.floor(xLength / 2)
const yMid = Math.floor(yLength / 2)

const calculateQuadrants = () => {
    const quadrants = [0, 0, 0, 0]

    for (const robot of robots) {
        if (robot.x < xMid && robot.y < yMid) quadrants[0]++
        if (robot.x > xMid && robot.y < yMid) quadrants[1]++
        if (robot.x < xMid && robot.y > yMid) quadrants[2]++
        if (robot.x > xMid && robot.y > yMid) quadrants[3]++
    }

    return quadrants.reduce((a, b) => a * b, 1)
}

const wrap = (times) => {
    const safetyFactors = []
    for (let i = 0; i < times + 1; i++) {
        iterate(i)
        const factor = calculateQuadrants()
        safetyFactors.push({ i: i, factor })
    }

    console.log(safetyFactors.sort((a, b) => a.factor - b.factor).slice(0, 15));
}

const print = (times) => {
    iterate(times)
    let bots = new Array(yLength).fill().map(() => new Array(xLength).fill("."));

    for (const robot of robots) {
        const x = robot.x
        const y = robot.y

        bots[y][x] = "0"
    }

    for (let j = 0; j < bots.length; j++) {
        console.log(bots[j].join(""));
    }
}

//wrap(10000)
print(6446)
//iterate(100)

/*
[
  { i: 6446, factor: 69850836 },
  { i: 1800, factor: 105618240 },
  { i: 1901, factor: 106111116 },
  { i: 285, factor: 107227296 },
  { i: 8567, factor: 108081600 },
  { i: 3921, factor: 108184736 },
  { i: 790, factor: 108422496 },
  { i: 588, factor: 108704600 },
  { i: 9072, factor: 109149040 },
  { i: 7456, factor: 109405200 },
  { i: 891, factor: 109740015 },
  { i: 8365, factor: 110157880 },
  { i: 8971, factor: 110552904 },
  { i: 9779, factor: 110573986 },
  { i: 9678, factor: 110604468 }
]
*/
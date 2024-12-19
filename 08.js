const map = []
const antennas = new Set()
const nodes = new Set()

var fs = require('fs');
var inputs = fs.readFileSync('08-input.txt').toString().split("\n")
for (i in inputs) {
    map.push(inputs[i].replace("\r", "").split(""))
}

map.forEach((row, i) => row.forEach((el, j) => (el != "." ? antennas.add({ symbol: el, x: j, y: i }) : (null))))

const solveNodes = () => {
    for (const a of antennas) {
        for (const b of antennas) {
            if (a === b) continue
            if (a.symbol === b.symbol) {
                const x1 = a.x
                const y1 = a.y
                const x2 = b.x
                const y2 = b.y

                const xdif = x1 - x2
                const ydif = y1 - y2

                if (x1 < x2 && y1 < y2) nodes.add({ x: x1 + xdif, y: y2 + ydif })

                nodes.add({ x: x1 + xdif, y: y1 + ydif })
            }
        }
    }
}

solveNodes()

const validNodes = []


for (const node of nodes) {
    if (node.x < 0 || node.x > 50 || node.y < 0 || node.y > 50) continue
    validNodes.push(node)
}

const lol = validNodes.filter((obj1, i, arr) =>
    arr.findIndex(obj2 =>
        JSON.stringify(obj2) === JSON.stringify(obj1)) === i
)


console.log(lol.length);

const map = []
const graph = []

var fs = require('fs');
var input = fs.readFileSync('12-test-input.txt').toString().split("\n")
for (i in input) {
    map.push(input[i].replace("\r", "").split(""))
}

for (let i = 0; i < map.length; i++) {
    const row = []
    for (let j = 0; j < map[i].length; j++) {
        const value = map[i][j]
        row.push({ value: value, x: j, y: i, neighbors: [], isVisited: false })
    }
    graph.push(row)
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const node = graph[i][j]

        if (i - 1 >= 0 && node.value == map[i - 1][j]) node.neighbors.push(graph[i - 1][j])
        if (j - 1 >= 0 && node.value == map[i][j - 1]) node.neighbors.push(graph[i][j - 1])
        if (i + 1 < map.length && node.value == map[i + 1][j]) node.neighbors.push(graph[i + 1][j])
        if (j + 1 < map.length && node.value == map[i][j + 1]) node.neighbors.push(graph[i][j + 1])
    }
}

const traverse = (node) => {
    if (node.isVisited) return
    let temp = [node]

    node.isVisited = true

    for (const adj of node.neighbors) {
        if (!adj.isVisited) {
            temp = temp.concat(traverse(adj))
        }
    }

    return temp
}

let sum = 0

const calculateFence = () => {
    const regions = []

    for (const node of graph.flat()) {
        if (node.isVisited) continue
        regions.push((traverse(node)))
    }

    for (const region of regions) {
        let perimeter = 0
        let corners = 0

        for (const node of region) {
            perimeter += 4 - node.neighbors.length
        }

        for (const node of region) {
            const neighbors = node.neighbors
            if (neighbors.length == 0) {
                corners += 4
            } else if (neighbors.length == 1) {
                corners += 2
            } else if (neighbors.length == 2) {
                const left = neighbors[0]
                const right = neighbors[1]

                if (left.x != right.x || left.y != right.y) {
                    corners += 1
                }

            } else if (neighbors.length == 3) {
                corners += 2
            } else if ((neighbors.length == 4)) {
                const x = node.x
                const y = node.y

                if (map[x + 1][y + 1] != node.value) corners += 1
                if (map[x + 1][y - 1] != node.value) corners += 1
                if (map[x - 1][y + 1] != node.value) corners += 1
                if (map[x - 1][y - 1] != node.value) corners += 1
            }
        }

        //sum += perimeter * region.length
        sum += corners * region.length

    }
}

calculateFence()

//console.log(sum)

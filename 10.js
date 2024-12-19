const map = []
const graph = []
const trailheads = []

var fs = require('fs');
var input = fs.readFileSync('10-input.txt').toString().split("\n")
for (i in input) {
    map.push(input[i].replace("\r", "").split(""))
}

for (let i = 0; i < map.length; i++) {
    const row = []
    for (let j = 0; j < map[i].length; j++) {
        const value = map[i][j]
        row.push({ value: Number(value), neighbors: [], isVisited: false })
    }
    graph.push(row)
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const node = graph[i][j]

        if (i - 1 >= 0) node.neighbors.push(graph[i - 1][j])
        if (j - 1 >= 0) node.neighbors.push(graph[i][j - 1])
        if (i + 1 < graph.length) node.neighbors.push(graph[i + 1][j])
        if (j + 1 < graph.length) node.neighbors.push(graph[i][j + 1])
    }
}

graph.forEach(row => {
    row.forEach(node => {
        if (node.value == 0) trailheads.push(node)
    })
})

let sum = 0

const search = () => {
    for (const node of trailheads) {
        traverse(node)

        graph.forEach(row => {
            row.forEach(node => {
                node.isVisited = false
            })
        })
    }
}

const traverse = (node) => {
    if (node.value == 9 && !node.isVisited) {
        node.isVisited = true
        sum++
    }

    for (const adj of node.neighbors) {
        if (node.value + 1 == adj.value) {
            traverse(adj)
        }
    }
}

console.log(trailheads);

search()

console.log(sum);
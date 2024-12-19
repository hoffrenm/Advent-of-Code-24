const generateGraph = (input) => {
    graph = []

    for (let i = 0; i < map.length; i++) {
        const row = []
        for (let j = 0; j < map[i].length; j++) {
            const value = map[i][j]
            row.push({ value: value, neighbors: [] })
        }
        graph.push(row)
    }

    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const node = graph[i][j]

            if (i - 1 >= 0) node.neighbors.push(graph[i - 1][j])
            if (j - 1 >= 0) node.neighbors.push(graph[i][j - 1])
            if (i + 1 < graph.length - 1) node.neighbors.push(graph[i + 1][j])
            if (j + 1 < graph.length - 1) node.neighbors.push(graph[i][j + 1])
        }
    }

    return graph
}

export { generateGraph }
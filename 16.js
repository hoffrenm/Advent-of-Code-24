const DIRECTIONS = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
];

// Dijkstra's algorithm with multiple shortest paths
function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Initialize distance map and visited set
    const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    dist[start[0]][start[1]] = 0;

    const prev = {};  // To store previous cells for path reconstruction
    const pq = [];  // Priority queue (min-heap), stores [cost, x, y, last_direction]
    pq.push([0, start[0], start[1], -1]);  // No previous direction at the start

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]);  // Sorting by cost (min-heap)
        const [cost, x, y, lastDir] = pq.shift(); // Pop the least cost element

        // If we reached the destination, backtrack to get the paths
        if (x === end[0] && y === end[1]) {
            const paths = [];
            const backtrack = (current, path, lastDirection) => {
                if (current[0] === start[0] && current[1] === start[1]) {
                    paths.push([...path, current]);  // Add the full path to the result
                    return;
                }

                const previousSteps = prev[current[0] * cols + current[1]];
                for (const [prevX, prevY] of previousSteps) {
                    path.push(current);
                    backtrack([prevX, prevY], path, lastDirection);
                    path.pop(); // Remove the current step before exploring another path
                }
            };

            backtrack([x, y], [], -1);
            return { paths, cost };  // Return all possible paths and the total cost
        }

        // Explore all 4 possible directions
        for (let i = 0; i < DIRECTIONS.length; i++) {
            const [dx, dy] = DIRECTIONS[i];
            const nx = x + dx;
            const ny = y + dy;

            // Check if the new position is within bounds and not an obstacle
            if (grid[nx][ny] != "#") {
                let newCost = cost + 1;
                if (lastDir !== -1 && lastDir !== i) {
                    newCost += 1000;  // Add turn cost if direction changes
                }

                // If we found a cheaper way to get to (nx, ny), update and push to pq
                if (newCost < dist[nx][ny]) {
                    dist[nx][ny] = newCost;
                    prev[nx * cols + ny] = [[x, y]];  // Store the previous step for path reconstruction
                    pq.push([newCost, nx, ny, i]);
                } else if (newCost === dist[nx][ny]) {
                    // If the new path has the same cost, store the new previous step
                    if (!prev[nx * cols + ny]) {
                        prev[nx * cols + ny] = [];  // Initialize if it's undefined
                    }
                    prev[nx * cols + ny].push([x, y]);
                }
            }
        }
    }

    // If no path is found
    return null;
}

let start = [1, 13]
let end = [13, 1]
const map = []

var fs = require('fs');
var inputs = fs.readFileSync('16-input.txt').toString().split("\n")
for (i in inputs) {
    map.push(inputs[i].replace("\r", "").split(""))
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const element = map[i][j];
        if (element == "E") end = [i, j]
        if (element == "S") start = [i, j]
    }
}

const result = dijkstra(map, start, end);
if (result) {
    console.log("Paths found:", result.paths);
    console.log("Total cost of the paths:", result.cost);
} else {
    console.log("No path found");
}


for (let i = 0; i < result.paths[0].length; i++) {
    const element = result.paths[0][i]
    map[element[0]][element[1]] = "O"
}

map.forEach(row => console.log(row.join("")))

// 73400 high
// 73999 high

// 469 high
// 468 high
// 401 low
// Directions for 4 possible moves: up, down, left, right
const DIRECTIONS = [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
];

function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Initialize distance map and visited set
    const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    dist[start[0]][start[1]] = 0;

    // Priority queue stores tuples (cost, x, y, last_direction)
    const pq = [];
    pq.push([0, start[0], start[1], -1]);  // -1 means no previous direction
    const prev = {};  // To store the previous step for path reconstruction

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]); // Sorting by cost (min-heap)
        const [cost, x, y, lastDir] = pq.shift(); // Pop the least cost element

        // If we reached the destination, backtrack to get the path
        if (x === end[0] && y === end[1]) {
            const path = [];
            let current = [x, y];
            let totalCost = 0; // Initialize total path cost
            let lastDirection = -1; // Variable to track direction of previous step

            while (current[0] !== start[0] || current[1] !== start[1]) {
                path.push(current);
                const [prevX, prevY] = prev[current[0] * cols + current[1]];

                // Calculate the cost for the current step
                totalCost += 1; // Base cost for the step
                if (lastDirection !== -1) {
                    // Check if the direction changed from the previous step
                    const [dx, dy] = [current[0] - prevX, current[1] - prevY];
                    const direction = DIRECTIONS.findIndex(([dx2, dy2]) => dx === dx2 && dy === dy2);
                    if (lastDirection !== direction) {
                        totalCost += 1000; // Add turn cost if direction changes
                    }
                }

                lastDirection = DIRECTIONS.findIndex(([dx, dy]) => current[0] - prevX === dx && current[1] - prevY === dy);

                current = [prevX, prevY];
            }

            path.push(start); // Add the start point to the path
            path.reverse(); // Reverse the path to go from start to end

            return { path, totalCost }; // Return both path and the total cost
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
                    prev[nx * cols + ny] = [x, y];  // Store the previous step for path reconstruction
                    pq.push([newCost, nx, ny, i]);
                }
            }
        }
    }

    // If no path is found
    return null;
}

const map = []
let start = [0, 0];
let end = [4, 4];

var fs = require('fs');
var inputs = fs.readFileSync('16-input.txt').toString().split("\n")
for (i in inputs) {
    map.push(inputs[i].replace("\r", "").split(""))
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const element = map[i][j];
        if (element == "E") end = [j, i]
        if (element == "S") start = [j, i]
    }
}

const result = dijkstra(map, start, end);
if (result) {
    console.log("Path found:", result.path);
    console.log("Path length:", result.path.length);
    console.log("Total cost of the path:", result.totalCost);
} else {
    console.log("No path found");
}

for (let i = 0; i < result.path.length; i++) {
    const element = result.path[i]
    map[element[0]][element[1]] = "O"
}

map.forEach(row => console.log(row.join("")))


function dijkstra(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;

    // Directions: Right, Down, Left, Up
    const directions = [
        [0, 1],  // Right
        [1, 0],  // Down
        [0, -1], // Left
        [-1, 0]  // Up
    ];

    // Initialize distance and path tracking
    const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
    const previous = Array.from({ length: rows }, () => Array(cols).fill([])); // Store all predecessors
    const pq = []; // Min-heap (priority queue)
    const paths = []; // To store all shortest paths


    console.log(dist.length);
    console.log(previous.length);



    // Initialize the starting point
    dist[start[0]][start[1]] = 0;
    pq.push([start[0], start[1], 0, 3]); // [x, y, distance, lastDirection]

    function backtrackPaths(x, y) {
        const allPaths = [];
        function backtrack(currX, currY, path) {
            if (currX === start[0] && currY === start[1]) {
                allPaths.push([start, ...path]); // Include the start point
                return;
            }
            for (let i = 0; i < previous[currX][currY].length; i++) {
                const [px, py] = previous[currX][currY][i];
                backtrack(px, py, [[currX, currY], ...path]);
            }
        }

        backtrack(x, y, []);
        return allPaths;
    }

    // Dijkstra's algorithm
    while (pq.length > 0) {
        // Sort the priority queue by distance (min-heap)
        pq.sort((a, b) => a[2] - b[2]);
        const [x, y, currDist, lastDir] = pq.shift();

        // If we reached the destination, we can backtrack and store the path
        if (x === end[0] && y === end[1]) {
            // Backtrack and store all shortest paths
            console.log("ENDS");

            const newPaths = backtrackPaths(x, y);
            paths.push(...newPaths);
        }

        // Explore all neighbors
        for (let i = 0; i < directions.length; i++) {
            const [dx, dy] = directions[i];
            const nx = x + dx;
            const ny = y + dy;

            // Check bounds and if the neighbor is walkable (grid value > 0)
            if (grid[nx][ny] != "#") {
                // Calculate the cost of the move
                let newDist = currDist + 1; // Base step cost is 1
                if (lastDir != i) {
                    // If direction changes, add extra cost of 1000
                    newDist += 1000;
                }

                // If we found a shorter path, update the distance and previous node
                if (newDist < dist[nx][ny]) {
                    dist[nx][ny] = newDist;
                    previous[nx][ny] = [[x, y]]; // Store the predecessor
                    pq.push([nx, ny, newDist, i]); // Push to priority queue with new direction
                }
                // If the new distance is equal to an existing distance, we found another path
                else if (newDist - 1000 == dist[nx][ny]) {
                    // Add another predecessor for this node
                    previous[nx][ny].push([x, y]);
                    //pq.push([nx, ny, newDist, i]); // Push to priority queue with same direction
                }
            }
        }
    }

    return paths;
}

const map = []

var fs = require('fs');
var inputs = fs.readFileSync('16-input.txt').toString().split("\n")
for (i in inputs) {
    map.push(inputs[i].replace("\r", "").split(""))
}

//map.forEach(row => console.log(row.join("")))


let start = [1, 13]
let end = [13, 1]

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const element = map[i][j];
        if (element == "E") end = [j, i]
        if (element == "S") start = [j, i]
    }
}

console.log(start);

const allPaths = dijkstra(map, start, end);

let sum = 0

const temp = allPaths.flat()
console.log(temp);



/*
for (let i = 0; i < allPaths.length; i++) {
    for (let j = 0; j < allPaths[i].length; j++) {
        const e = allPaths[i][j]
        map[e[0]][e[1]] = "O"
    }
}*/

for (let i = 0; i < temp.length; i++) {
    const element = temp[i]
    map[element[0]][element[1]] = "O"
}

for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        const symbol = map[i][j]
        if (symbol == "O") sum++
    }
}

console.log(sum);

map.forEach(row => console.log(row.join("")))
//console.log("All shortest paths: ", allPaths.length)

const arr = []

OUTER:
for (let i = 0; i < temp.length; i++) {
    const [a, b] = temp[i]
    for (let j = 0; j < arr.length; j++) {
        if (arr[j][0] == a && arr[j][1] == b) continue OUTER
    }

    arr.push([a, b])
}

console.log(arr.length);

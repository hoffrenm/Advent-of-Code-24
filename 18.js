var fs = require("fs");
var input = fs.readFileSync("18-input.txt").toString().split("\n");
input = input.map((x) => x.replace("\r", "").split(",").map(Number));

const map = Array.from(Array(71), (_) => Array(71).fill("."));

for (let i = 0; i < input.length; i++) {
  const el = input[i];

  const x = Number(el[0]);
  const y = Number(el[1]);
  map[y][x] = "#";
}

const directions = [
  { x: 1, y: 0 }, // right
  { x: 0, y: 1 }, // down
  { x: -1, y: 0 }, // left
  { x: 0, y: -1 }, // up
];

function AStar(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  function isValid(x, y) {
    return x >= 0 && x < cols && y >= 0 && y < rows && grid[y][x] !== "#";
  }

  function heuristic(x, y, goalX, goalY) {
    return Math.abs(x - goalX) + Math.abs(y - goalY);
  }

  class Node {
    constructor(x, y, g, h, parent = null) {
      this.x = x;
      this.y = y;
      this.g = g; // Cost from start to node
      this.h = h; // Heuristic cost from node to goal
      this.f = g + h; // Total cost
      this.parent = parent; // Parent node to reconstruct path
    }
  }

  const start = new Node(0, 0, 0, heuristic(0, 0, cols - 1, rows - 1));
  const end = { x: cols - 1, y: rows - 1 };

  const openList = [];
  const closedList = new Set();

  openList.push(start);

  while (openList.length > 0) {
    // Sort the open list by f value (lowest f first)
    openList.sort((a, b) => a.f - b.f);

    const currentNode = openList.shift();

    if (currentNode.x === end.x && currentNode.y === end.y) {
      const path = [];
      let temp = currentNode;
      while (temp) {
        path.push([temp.x, temp.y]);
        temp = temp.parent;
      }
      return path.reverse();
    }

    closedList.add(`${currentNode.x},${currentNode.y}`);

    for (const direction of directions) {
      const newX = currentNode.x + direction.x;
      const newY = currentNode.y + direction.y;

      if (!isValid(newX, newY) || closedList.has(`${newX},${newY}`)) continue;

      const gCost = currentNode.g + 1;
      const hCost = heuristic(newX, newY, end.x, end.y);

      const neighbor = new Node(newX, newY, gCost, hCost, currentNode);

      const existingNodeIndex = openList.findIndex(
        (node) => node.x === newX && node.y === newY
      );

      if (existingNodeIndex === -1) {
        openList.push(neighbor);
      } else if (gCost < openList[existingNodeIndex].g) {
        openList[existingNodeIndex] = neighbor;
      }
    }
  }

  return []; // No path found
}

let path = AStar(map);

while (path.length == 0) {
  [x, y] = input.pop();
  map[y][x] = ".";
  path = AStar(map);
}

console.log(x, y);

//console.log(path); // Path from top-left to bottom-right
//path.forEach(([x, y]) => (map[y][x] = "O"));
//map.forEach((row) => console.log(row.join("")));
//console.log(path.length - 1);

// 417 high
// [ 50, 23 ]

var fs = require("fs");
var input = fs
  .readFileSync("19-input.txt")
  .toString()
  .replaceAll("\r", "")
  .split("\n");

const towels = input[0].replaceAll(" ", "").split(",");
const patterns = input.slice(2);

console.log(
  towels.filter((a) => a.includes("r") || a.includes("b") || a.includes("g"))
);
console.log(towels.sort((a, b) => b.length - a.length));

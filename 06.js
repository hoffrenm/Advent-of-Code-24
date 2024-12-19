const node = {
    dir: "",
    type: "",
    nodes: [node, node, node, node]
}

const directions = ["^", ">", "v", "<"]
const nextNode = node = [node.u, node.r, node.d, node.l]

function move(node) {
    if (node === null) return

    if (node.nodes[directions.indexOf(node.dir)] === "#") node.dir = directions.indexOf((node.dir + 1) % 4)

    if (node.type === "X") {
        move(node.nodes[directions.indexOf(node.dir)])
    } else {
        node.type = "X"
        return 1 + move(node.nodes[directions.indexOf(node.dir)])
    }
}
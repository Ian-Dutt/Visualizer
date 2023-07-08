const moves = [[1,0],[-1,0],[0,1],[0,-1]]

export function DFS(start, end, grid){
    let visited = makeVisited(grid)
    let stack = []
    let nodesInOrder = []
    
    stack.push(start)
    while(stack.length !== 0){
        let s = stack.pop()
        if(s === end){
            console.log("FOUND THE NODE")
            return {traversal: nodesInOrder, path: undefined}
        }
        if(visited[s.i][s.j] === false){
            visited[s.i][s.j] = true
            nodesInOrder.push(s)
        }
        
        moves.forEach((move) => {
            let i = s.i + move[0]
            let j = s.j + move[1]
            if(isValid(i, j, grid.length, grid[0].length) && visited[i][j] === false && !grid[i][j].isWall){
                stack.push(grid[i][j])
            }
        })
    }

    return {traversal: undefined, path: undefined}
}

export function BFS(start, end, grid){
    let visited = makeVisited(grid)
    let parent = {}
    let queue = []
    let nodesInOrder = []
    queue.push(start)
    start.seen = true
    while(queue.length > 0){
        let s = queue[0]
        queue.shift()
        nodesInOrder.push(s)
        if(s === end){
            console.log("FOUND THE NODE")
            return {traversal: nodesInOrder, path: backTrace(parent, start, end)}
        }
        for(const move of moves){
            const i = s.i + move[0]
            const j = s.j + move[1]
            
            if(isValid(i, j, grid.length, grid[0].length) && !grid[i][j].isWall){
                const node = grid[i][j]
                if(visited[i][j] === false){
                    parent[node.node] = s
                    visited[i][j] = true
                    queue.push(node)
                }
            }
        }
    }
    
    return {traversal: undefined, path: undefined}
}

/*
    AStart alg



*/

export function AStar(start, end, grid){
    let pathsInOrder = []
    let visited = []
    let queue = []
    queue.push([0, distanceSL(start, end), start])
    // let i = 0
    while(queue.length !== 0){
        let [pCost, pHCost, ...path] = queue[0]

        const curr = path[0]
        queue.shift()
        if(path.length > 5) pathsInOrder.push([...path])
        if(curr === end){
            console.log("FOUND THE NODE")
            return {traversal: pathsInOrder, path: path}
        }
        if(visited.includes(curr.node)){
            queue = findMin(queue)
        }
        else{
            for(const move of moves){
                const i = curr.i + move[0]
                const j = curr.j + move[1]

                if(isValid(i, j, grid.length, grid[0].length) && !grid[i][j].isWall){
                    const nPCost = pCost + 1
                    const nPHCost = Math.round(100*(nPCost + distanceManhattan(grid[i][j], end)))/100
                    queue.push([nPCost, nPHCost, grid[i][j], ...path])
                }
            }

            visited.push(curr.node)
            queue = findMin(queue)
        }
        // i++
        // if(i > 100000) break
    }
    
    return {traversal: pathsInOrder, path: undefined}
}

function findMin(paths){
    let min = Infinity
    let index = 0
    for(let i = 0; i < paths.length; i++){
        const ph = paths[i][1]
        if(ph < min){
            min = ph
            index = i
        }
    }
    const tmp = paths[index]
    paths[index] = paths[0]
    paths[0] = tmp
    return paths
}

// finds straight line distance between node a and node b
function distanceSL(a, b){
    return Math.round(100 * Math.sqrt((a.i - b.i)*(a.i - b.i) + (a.j - b.j)*(a.j - b.j)))/100
}

function distanceManhattan(a, b){
    return Math.abs(a.i - b.i) + Math.abs(a.j - b.j)
}

function backTrace(parent, start, end){
    let path = [end]
    while(path[path.length-1].node !== start.node){
        path.push(parent[path[path.length-1].node])
    }
    // path.reverse()
    return path
}

function isValid(i, j, height, width){
    return i >= 0 && j >= 0 && i < height && j < width
}

function makeVisited(grid){
    let visited = []
    grid.forEach((gridRow) => {
        let row = []
        gridRow.forEach((col) => {
            row.push(false)
        })
        visited.push(row)
    })

    return visited
}


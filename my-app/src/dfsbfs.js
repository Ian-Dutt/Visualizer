const moves = [[1,0],[-1,0],[0,1],[0,-1]]

export function DFS(start, end, grid){
    let stack = []
    let nodesInOrder = []
    
        stack.push(start)
        while(stack.length !== 0){
            let s = stack.pop()
            if(s === end){
                console.log("FOUND THE NODE")
                break
            }
            if(s.seen === false){
                s.seen = true
                nodesInOrder.push(s)
            }
            
            moves.forEach((move) => {
                let i = s.i + move[0]
                let j = s.j + move[1]
                if(isValid(i, j, grid.length, grid[0].length) && grid[i][j].seen === false && !grid[i][j].isWall){
                    stack.push(grid[i][j])
                }
            })
        }

    return {traversal: nodesInOrder, path: undefined}
}

export function BFS(start, end, grid){
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
            break
        }
        for(const move of moves){
            const i = s.i + move[0]
            const j = s.j + move[1]
            
            if(isValid(i, j, grid.length, grid[0].length) && !grid[i][j].isWall){
                const node = grid[i][j]
                if(node.seen === false){
                    parent[node.node] = s
                    node.seen = true
                    queue.push(node)
                }
            }
        }
    }
    
    return {traversal: nodesInOrder, path: backTrace(parent, start, end)}
}

function backTrace(parent, start, end){
    let path = [end]
    while(path[path.length-1].node !== start.node){
        path.push(parent[path[path.length-1].node])
    }
    path.reverse()
    return path
}

function isValid(i, j, height, width){
    return i >= 0 && j >= 0 && i < height && j < width
}


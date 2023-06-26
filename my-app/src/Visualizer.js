import React, { useState} from 'react'
import './c.css'
import { BFS, DFS } from './dfsbfs'
const moves = [[1,0],[-1,0],[0,1],[0,-1]]
let isClicked = false

export default function Visualizer() {
    const width = 20;
    const height = 15;
    const [count, setCount] = useState(0);
    const [gridMap, setGridMap] = useState(createGrid(width, height));
    const [up, setUp] = useState(0)
    document.documentElement.style.setProperty('--size', `repeat(${width}, 11px)`)
    
    document.addEventListener("mousedown", () => {
        isClicked = true
    })
    document.addEventListener("mouseup", () => {
        isClicked = false
    })
    document.addEventListener("mousemove", (e) => {
        if(isClicked){
            makeWall(e)
        }
    })

    function makeWall(e){
        const id = document.elementFromPoint(e.clientX, e.clientY).id
        if(id){
            const row = Math.floor(id / width)
            const col = id % width
            
            gridMap[row][col].isWall = true
            setUp( prev => {
                return prev + 1
            })
        }
    }

    function isValid(i, j){
        return i >= 0 && j >= 0 && i < height && j < width
    }

    function callDFS(){
        setCount(0)
        clean(gridMap)
        const seearch = DFS(gridMap[6][7], gridMap[13][15], gridMap)
        console.log(seearch)
    }

    async function callBFS(){
        setCount(0)
        clean(gridMap)
        const seearch = BFS(gridMap[6][7], gridMap[13][15], gridMap)
        console.log(seearch)
    }

    function updateGrid(node){
        node.seen = true;
        setCount( prev => {
            return prev + 1
        })
    }
    
    
    
    // async function BFS(start, end, grid){
    //     let parent = {}
    //     let queue = []
    //     queue.push(start)
    //     start.seen = true
    //     while(queue.length > 0){
    //         let s = queue[0]
    //         queue.shift()
    //         if(s === end){
    //             console.log("FOUND NODE")
    //             return backTrace(parent, start, end)
    //         }
    //         for(const move of moves){
    //             const i = s.i + move[0]
    //             const j = s.j + move[1]
                
    //             if(isValid(i, j) && !grid[i][j].isWall){
    //                 const node = grid[i][j]
    //                 if(node.seen === false){
    //                     parent[node.node] = s
    //                     updateGrid(node)
    //                     queue.push(node)
    //                 }
    //             }

    //             await new Promise(resolve => {
    //                 setTimeout(() => 
    //                     resolve(`done`), 5)
    //             })
    //         }
    //     }
    // }

    // async function DFS(start, end, grid){
    //     let stack = []
    
    //     stack.push(start)
    //     while(stack.length !== 0){
    //         let s = stack.pop()
    //         if(s === end){
    //             console.log("FOUND THE NODE")
    //             break
    //         }
    //         if(s.seen === false){
    //             updateGrid(s, setCount)
    //         }
            
    
    //         moves.forEach((move) => {
    //             let i = s.i + move[0]
    //             let j = s.j + move[1]
    //             if(isValid(i, j) && grid[i][j].seen === false && !grid[i][j].isWall){
    //                 stack.push(grid[i][j])
    //             }
    //         })
    //         await new Promise(resolve => {
    //             setTimeout(() => 
    //                 resolve(`done`), 10)
    //         })
    //     }
    // }

    // async function backTrace(parent, start, end){
    //         let path = [end]
    //         while(path[path.length-1].node !== start.node){
    //             path.push(parent[path[path.length-1].node])
    //         }
    //         path.reverse()
            
    //         for(let node of path){
    //             node.path = true
    //             setCount(prev => { return prev + 1})
    //             await new Promise(resolve => {
    //                 setTimeout(() => 
    //                     resolve(`done`), 75)
    //             })   
    //         }   
    // }
    
    return (
    <div className='App-header'>
        Nodes Updated: {count}
        
        <div>
            DFS: <button onClick={callDFS}>Run</button> &emsp;
            BFS: <button onClick={callBFS}>Run</button>
            <br />
            <button onClick={() => {
                clear(gridMap)
                setUp(prev => {
                    return prev + 1
                })
                }}>Clear</button>
        </div>
        <div align='center'>
            <div className='flex-container'>
                {gridMap.map((row, r) => {
                    return row.map(({seen, isStart, isEnd, isWall, path}, c) => {
                        return <Tile seen={seen} isEnd={isEnd} isStart={isStart} isWall={isWall} cid={`${(r*width)+c}`} path={path} key={`${r} + ${c}`}/>
                    })
                })}
            </div>
        </div>
    </div>
  )
}

function createGrid(width, height){
    let gridMap = []
    
    for(let i = 0; i < height; i++){
        let gridRow = []
        for(let j = 0; j < width; j++) gridRow.push({
            seen: false,
            i: i,
            j: j,
            node: (i * width) + j,
            path: false,
            isWall: false
        })
        gridMap.push(gridRow)
    }

    gridMap[6][7].isStart = true
    gridMap[13][15].isEnd = true
    return gridMap
}

function clear(grid){
    grid.forEach((row) => {
        row.forEach((node) => {
            node.seen = false
            node.path = false
            node.isWall = false
        })
    })
}

function clean(grid){
    grid.forEach((row) => {
        row.forEach((node) => {
            node.seen = false
            node.path = false
        })
    })
}

function Tile({seen, isStart, isEnd, path, cid, isWall}){
    let color = !seen ? "green":"red";
    if(isWall){
        color = 'gray'
    }
    else if(isStart) color = 'blue'
    else if(isEnd) color = 'gold'
    else if(path) color = 'slateBlue'
    return (
        <div className='grid-item' id={cid} style={{backgroundColor: color}}>

        </div>
    )
}
import React, { useState} from 'react'
import './c.css'
const moves = [[1,0],[-1,0],[0,1],[0,-1]]
export default function Visualizer() {
    const width = 20;
    const height = 15;
    const [count, setCount] = useState(0);
    const [gridMap, setGridMap] = useState(createGrid(width, height));
    document.documentElement.style.setProperty('--size', `repeat(${width}, 11px)`)

    function isValid(i, j){
        return i >= 0 && j >= 0 && i < height && j < width
    }

    function clean(grid){
        grid.forEach((row) => {
            row.forEach((node) => {
                node.seen = false
            })
        })
    }

    function callDFS(){
        setCount(0)
        clean(gridMap)
        console.log("Running DFS")
        DFS(gridMap[3][3], gridMap[5][8], gridMap)
    }

    function callBFS(){
        setCount(0)
        clean(gridMap)
        console.log("Running BFS")
        BFS(gridMap[3][3], gridMap[5][8], gridMap)
    }

    function updateGrid(node){
        node.seen = true;
        // document.getElementById(`row${node.i}col${node.j}`).style.backgroundColor = 'red';
        setCount( prev => {
            return prev + 1
        })
    }

    async function BFS(start, end, grid){
        let queue = []
        queue.push(start)
        start.seen = true
        mainLoop:
        while(queue.length > 0){
            let s = queue[0]
            queue.shift()

            for(const move of moves){
                const i = s.i + move[0]
                const j = s.j + move[1]
                if(isValid(i, j)){
                    if(grid[i][j].seen === false){
                        if(grid[i][j] === end){
                            console.log("FOUND NODE")
                            break mainLoop
                        }
                        updateGrid(grid[i][j])
                        queue.push(grid[i][j])
                    }
                }

                await new Promise(resolve => {
                    setTimeout(() => 
                        resolve(`done`), 5)
                })
            }
        }
    }

    async function DFS(start, end, grid){
        let stack = []
    
        stack.push(start)
        while(stack.length !== 0){
            let s = stack.pop()
            if(s === end){
                console.log("FOUND THE NODE")
                break
            }
            if(s.seen === false){
                updateGrid(s, setCount)
            }
            
    
            moves.forEach((move) => {
                let i = s.i + move[0]
                let j = s.j + move[1]
                if(isValid(i, j) && grid[i][j].seen === false){
                    stack.push(grid[i][j])
                }
            })
            await new Promise(resolve => {
                setTimeout(() => 
                    resolve(`done`), 10)
            })
        }
    }

    return (
    <div className='App-header'>
        Nodes checked: {count}
        
        <div>
            DFS: <button onClick={callDFS}>Run</button> &emsp;
            BFS: <button onClick={callBFS}>Run</button>
        </div>
        <div align='center'>
            <div className='flex-container'>
                {gridMap.map((row, r) => {
                    return row.map(({seen, isStart, isEnd, i, j}, c) => {
                        return <Tile seen={seen} isEnd={isEnd} isStart={isStart} cid={`row${i}col${j}`} key={`${r} + ${c}`}/>
                    })
                })}
            </div>
        </div>
    </div>
  )
}

function createGrid(width, height){
    let gridMap = []
    
    for(let j = 0; j < height; j++){
        let gridRow = []
        for(let i = 0; i < width; i++) gridRow.push({
            seen: false,
            i: j,
            j: i,
        })
        gridMap.push(gridRow)
    }

    gridMap[3][3].isStart = true
    gridMap[5][8].isEnd = true
    return gridMap
}


function Tile({seen, isStart, isEnd, cid}){
    let color = !seen ? "green":"red";
    if(isStart) color = 'blue'
    else if(isEnd) color = 'gold'
    return (
        <div className='grid-item' id={cid} style={{backgroundColor: color}}>

        </div>
    )
}
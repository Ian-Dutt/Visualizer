import React, { useState} from 'react'
import './c.css'
import { AStar, BFS, DFS } from './dfsbfs'
const moves = [[1,0],[-1,0],[0,1],[0,-1]]
let isClicked = false

export default function Visualizer() {
    const width = 20;
    const height = 15;
    const [count, setCount] = useState(0);
    const [gridMap, setGridMap] = useState(createGrid(width, height));
    const [up, setUp] = useState(0)
    let start = gridMap[0][0]
    let end = gridMap[14][19]
    document.documentElement.style.setProperty('--size', `repeat(${width}, 11px)`)
    

    // Event listeners for wall creation
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

    function delay(ms){
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('done')
            }, ms)
        })
    }

    async function callDFS(){
        setCount(0)
        clean(gridMap)
        const {traversal, path} = DFS(start, end, gridMap)
        showSearch(traversal)
    }

    async function callBFS(){
        setCount(0)
        clean(gridMap)
        const {traversal, path} = BFS(start, end, gridMap)
        await showSearch(traversal)
        showPath(path)
    }

    async function callAStar(){
        setCount(0)
        clean(gridMap)
        const {traversal, path} = AStar(start, end, gridMap)
        // console.log(traversal)s
        showPaths([...traversal, path])
    }

    async function showPaths(paths){
        let i;
        for(i = 0; i < paths.length-1; i++){
            for(let j = 0; j < paths[i].length; j++){
                paths[i][j].seen = true
                
            }
            setCount(prev => {
                return prev + paths[i].length
            })
            await delay(25)
            for(let j = 0; j < paths[i].length; j++) paths[i][j].seen = false
        }
        for(let j = 0; j < paths[i].length; j++){
            paths[i][j].path = true
            setCount(prev => {
                return prev + 1
            })
            await delay(10)
        }
    }

    async function showSearch(traversal){
        for(let i = 0; i < traversal.length; i++){
            traversal[i].seen = true
            setCount(prev => {
                return prev + 1
            })
            await delay(10)
        }
    }
    async function showPath(path){
        for(let i = 0; i < path.length-1; i++){
            path[i].path = true
            setCount(prev => {
                return prev + 1
            })
            await delay(10)
        }
    }
    return (
    <div className='App-header'>
        Nodes Updated: {count}
        
        <div>
            DFS: <button onClick={callDFS}>Run</button> &emsp;
            BFS: <button onClick={callBFS}>Run</button> &emsp;
            AStar: <button onClick={callAStar}>Run</button>
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
            i: i,
            j: j,
            node: (i * width) + j,
            isWall: false
        })
        gridMap.push(gridRow)
    }

    gridMap[0][0].isStart = true
    gridMap[14][19].isEnd = true
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
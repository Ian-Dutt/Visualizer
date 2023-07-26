import React, { useEffect, useState} from 'react'
import './css/c.css'
import { AStar, BFS, BestFirstSearch, DFS } from './utils/dfsbfs'
import { delay } from './utils/misc'
let isClicked = false

export default function Visualizer(props) {
    const width = 50;
    const height = 50;
    const [count, setCount] = useState(0);
    const [gridMap, setGridMap] = useState(createGrid(width, height, [props.startY, props.startX], [props.endY, props.endX]));
    const [up, setUp] = useState(0)
    let start = gridMap[props.startY][props.startX]
    let end = gridMap[props.endY][props.endX]
    document.documentElement.style.setProperty('--size', `repeat(${width}, 11px)`)

    useEffect(() =>{
        // Event listeners for wall creation
        function mousedown(){
            isClicked = true
        }
        function mouseup(){
            isClicked = false
        }
        function mousemove(e){
            if(isClicked){
                makeWall(e)
            }
        }
        document.addEventListener("mousedown", mousedown)
        document.addEventListener("mouseup", mouseup)
        document.addEventListener("mousemove", mousemove)

        return function cleanupListener(){
            document.removeEventListener('mousedown', mousedown)
            document.removeEventListener('mousemove', mousemove)
            document.removeEventListener('mouseup', mouseup)
        }
    })

    function makeWall(e){
        const div = document.getElementById("search-grid").getBoundingClientRect()
        if(e.clientY < div.top||  e.clientY > div.bottom || e.clientX > div.right || e.clientX < div.left ) return
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

    async function callBestFS(){
        setCount(0)
        clean(gridMap)
        const {traversal, path} = BestFirstSearch(start, end, gridMap)
        await showSearch(traversal)
        showPath(path)
    }

    async function callAStar(){
        setCount(0)
        clean(gridMap)
        const {traversal, path} = AStar(start, end, gridMap)
        await showSearch(traversal)
        showPath(path)
    }

    async function showSearch(traversal){
        if(!traversal) return
        for(let i = 0; i < traversal.length; i++){
            traversal[i].seen = true
            setCount(prev => {
                return prev + 1
            })
            await delay(10)
        }
    }
    async function showPath(path){
        if(!path) return

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
        <div className='flex-col'>
        <div>
            <button onClick={callDFS}> Depth First Search</button> <br/>
            <button onClick={callBFS}>Breadth First Search</button> <br/>
            <button onClick={callBestFS}>Best First Search</button> <br/>
            <button onClick={callAStar}>A*</button>
            <br />
            <button onClick={() => {
                clear(gridMap)
                setUp(prev => {
                    return prev + 1
                })
                }}>Clear</button>
        </div>
        </div>
        <div align='center' className='flex-col' >
            <div id="search-grid" className='flex-container'>
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

function createGrid(width, height, start, end){
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
    gridMap[start[0]][start[1]].isStart = true
    gridMap[end[0]][end[1]].isEnd = true
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
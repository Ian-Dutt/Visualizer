import React, { useState } from 'react'
import { FormEnd, FormStart } from './Form'
import Visualizer from './PathFinder'

export default function SearchAlgorithmVisualizer() {
    const [load, setLoad] = useState(false)
    const [start, setStart] = useState([0,0])
    const [end, setEnd] = useState([24,54])
  return (
    load? <Visualizer startY={start[0]} startX={start[1]} endY={end[0]} endX={end[1]} /> : 
    <div className="App-header">
        <div className=''>
            <FormStart setStart={setStart}/>
            <FormEnd setEnd={setEnd}/>
        </div>
        &emsp;
        <button onClick={() => {setLoad(true)}} style={{height:"2rem", fontSize:"1rem", borderRadius:"1rem"}}>Generate Grid</button>
    </div>
  )
}

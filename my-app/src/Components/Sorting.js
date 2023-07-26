import React, { useState } from 'react'
import './css/c.css'
import { selectionSort, bubbleSort, mergeSort} from './utils/sortingAlgs'
import { delay } from './utils/misc'
import { Slider } from '@material-ui/core'
export default function Sorting() {
  const [size, setSize] = useState(150)
  const [arr, setArr] = useState(generateArray(size))
  const [c, setC] = useState(0)
  const [comps, setComps] = useState(0)
  const [up, setUp] = useState(0)
  const [speed, setSpeed] = useState(1)


  function runBubbleSort(){
    const copy = arr.map(e => e[0])
    setC(0)
    setComps(0)
    const animationOrder = bubbleSort(copy)
    animateSort(animationOrder)
  }

  function runSelectionSort(){
    const copy = arr.map(e => e[0])
    setC(0)
    setComps(0)
    const animationOrder = selectionSort(copy)    
    animateSort(animationOrder)
  }

  function runMergeSort(){
    setSpeed(25)
    document.getElementById('speed-in-ms').innerHTML = `${speed}ms delay`
    const copy = arr.map(e => e[0])
    setC(0)
    setComps(0)
    const animationOrder = mergeSort(copy)
    animateMerge(animationOrder)
  }

async function animateMerge(animationOrder){
  for(const i in animationOrder){
    const animation = animationOrder[i]
    arr[animation[0]][1] = 'red'
    setComps(prev => prev+1)
    setC(prev => prev+1)
    await delay(speed)

    arr[animation[0]] = [animation[1], 'blue']
    setUp(prev => prev+1)
  }

  for(const e of arr){
    e[1]='red'
    setUp(prev => prev+1)
    await delay(10)
    e[1] = 'blue'
  }
  setUp(0)
}

async function animateSort(animationOrder){
  function swap(i, j){
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  for(const i in animationOrder){
    const animation = animationOrder[i]
    if(Array.isArray(animation)){
      swap(animation[0], animation[1])
      setC(prev => prev+1)
    }
    else{
      arr[animation][1] = 'red'
      setComps(prev => prev+1)
      await delay(speed)
      arr[animation][1] = 'blue'
    } 
    setUp(prev => prev+1)
  }
  for(const e of arr){
    e[1]='red'
    setUp(prev => prev+1)
    await delay(10)
    e[1] = 'blue'
  }
  setUp(0)
}


  return (
    <div className='App-header' align='left'>
      <div className='flex-col'>
        <div>
          <br/> Swaps: {c}
          <br/> Comparisons: {comps}
        </div>
        <div id='speed-in-ms'>{speed}ms delay</div>
        {/* <Selector setSize={setSize} setArr={setArr}/> */}
        <button onClick={runSelectionSort}>Selection Sort</button> <br/>
        <button onClick={runBubbleSort}>Bubble Sort</button> <br/>
        <button onClick={runMergeSort}>Merge Sort</button> <br/>
        <button onClick={() => {
          document.getElementById('speed-in-ms').innerHTML = `${speed}ms delay`
          setSpeed(1)
          setArr(generateArray(size))
        }}>New Array</button>
      </div>
      <div style={{display: 'flex', border: '2px solid yellow'}} className='flex-col'>
        <ArrayVis arr={arr}/>
      </div>
      
    </div>
  )
}
// Code gotten from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
// function randomNumber(max, min){
//   return Math.floor(Math.random() * (max - min + 1) + min)
// }

function generateArray(size){
  const arr = []
  const step = parseInt(((window.innerHeight * .85)/size))
  for(let i = 0; i < size; i++) arr.push([step * (i+1), 'blue'])
  shuffle(arr)
  return arr
}

// Code creadted by user coolaj86 on StackOverflow
// url: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function Selector({setSize, setArr}){
  return(
    <div>
      List Size: &nbsp;
    <select id='arraySize' onChange={() =>{
      const ns = document.getElementById('arraySize').value
      // localStorage.setItem("array-length", String(ns))
      setSize(ns)
      setArr(generateArray(ns))
    }}>
      <option value={50}>50</option>
      <option value={25}>25</option>
      <option value={75}>75</option>
    </select>
    </div>
  )
}

function ArrayVis({arr}){
  
  return(
    <>
      {arr.map((num, idx) => {
        return(
          <div className='arr-element' style={{height: `${num[0]}px`, backgroundColor: num[1]}} key={idx} ></div>
        )
      })}
    </>
  )
}

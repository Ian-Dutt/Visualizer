import React, { useState } from 'react'
import './css/c.css'

export default function Sorting() {
  const [size, setSize] = useState(150)
  const [arr, setArr] = useState(generateArray(size))
  const [c, setC] = useState(0)
  const [comp, setComp] = useState(0)

  function delay(ms){
      return new Promise(resolve => {
          setTimeout(() => {
              resolve('done')
          }, ms)
      })
  }
  function swap(arr, i, j){
    const tmp = arr[i]
    arr[i] = arr[j]
    arr[j] = tmp
  }

  async function insertionSort(arr){
    for(let i = 1; i < arr.length; i++){
      const key = arr[i]
      let j = i-1;

      while(j >= 0 && arr[j] > key){
        setComp(p => p+1)
        arr[j + 1] = arr[j]
        j--
        setC(prev => prev+1)
        await delay(1)
      }
      arr[j+1] = key;
      setComp(p => p+1)
      setC(prev => prev+1)      
    }
      
  }

  async function bubbleSort(arr){
    let swapped = false
    for(let i = 0; i < arr.length; i++){
      swapped = false
      for(let j = i; j < arr.length; j++){
        setComp(p => p+1)
        if(arr[i] > arr[j]){
          swap(arr, i, j)
          swapped = true
          setC(prev => prev+1)
          await delay(1)
        }
      }

      if(swapped === false) break
    }
  }


  return (
    <div className='App-header' align='left'>
      <div className='flex-col'>
        {/* <select id='arraySize' onChange={() =>{
          const ns = document.getElementById('arraySize').value
          setSize(ns)
          setC(prev => prev+1)

        }}>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
        </select> */}
        <div> Comparisons: {comp}
        <br/> Swaps: {c}
        </div>
        <button onClick={() => {
          setComp(0)
          setC(0)
          insertionSort(arr)
        }}>Insertion Sort</button>
        <button onClick={() => {
          setComp(0)
          setC(0)
          bubbleSort(arr)
        }}>Bubble Sort</button>
        <button onClick={() => {
          setComp(0)
          setC(0)
          setArr(generateArray(size))
        }}>New Array</button>
      </div>
      <div style={{display: 'flex'}} className='flex-col'>
        <ArrayVis arr={arr}/>
      </div>
      
    </div>
  )
}
// Code gotten from https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomNumber(max, min){
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateArray(size){
  const arr = []
  for(let i = 0; i < size; i++) arr.push(randomNumber(550, 5))
  return arr
}


function ArrayVis({arr}){
  return(
    <>
      {arr.map((num, idx) => {
        return(
          <div className='arr-element' style={{height: `${num}px`}} key={idx}></div>
        )
      })}
    </>
  )
}

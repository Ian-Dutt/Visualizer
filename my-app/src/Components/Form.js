import React from 'react'

export function FormStart(props) {
  return (
    <div style={{fontSize: "1.5rem"}}>
    Start Node:
    <form >
        <input id="start-y" className="input" type="number" defaultValue="0" min="0" max="24" onChange={() => {
          if(!document.getElementById("start-y").value) return
          if(document.getElementById("start-y").value < 0 || document.getElementById("start-y").value > 24){
            document.getElementById("start-y").value = 0
            alert("Value must be between 0-24")
          }
          props.setStart(coords => 
            [document.getElementById("start-y").value, coords[1]]
          )
        }}/> 
        <input id="start-x" className="input" type="number" defaultValue="0" min="0" max="54" onChange={() => {
          if(!document.getElementById("start-x").value) return
          if(document.getElementById("start-x").value < 0 || document.getElementById("start-x").value > 54){
            document.getElementById("start-x").value = 0
            alert("Value must be between 0-54")
          }
          props.setStart(coords => 
            [coords[0], document.getElementById("start-x").value]
          )
        }}/><br/>
    </form>
    </div>
  )
}

export function FormEnd(props) {
    return (
      <div style={{fontSize: "1.5rem"}}>
        End Node:
      <form >
        <input id="end-y" className="input" type="number" defaultValue="24" min="0" max="24" onChange={() => {
          if(!document.getElementById("end-y").value) return
          if(document.getElementById("end-y").value < 0 || document.getElementById("end-y").value > 24){
            document.getElementById("end-y").value = 0
            alert("Value must be between 0-24")
          }
          props.setEnd(coords => 
            [document.getElementById("end-y").value, coords[0]]
          )
        }}/> 
        <input id="end-x" className="input" type="number" defaultValue="54" min="0" max="54" onChange={() => {
          if(!document.getElementById("end-x").value) return
          if(!document.getElementById("end-x").value) return
          if(document.getElementById("end-x").value < 0 || document.getElementById("end-x").value > 54){
            document.getElementById("end-x").value = 0
            alert("Value must be between 0-54")
          }
          props.setEnd(coords => 
            [coords[0], document.getElementById("end-x").value]
          )
        }}/><br/>
      </form>
      </div>
    )
  }

function valid(x, y){
    return Number.isInteger(x) && Number.isInteger(y)
}
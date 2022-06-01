// import React from 'react';
// import './Styles/Log.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export default function Log(props) {
  const [score, setScore] = useState(0)
  const [unit, setUnit] = useState("Mile")
  const location = useLocation();

  const handleFormSubmit = e => {
    e.preventDefault();
    const scoreObj = {
      challenge_id: 2,
      user_id: 2,
      distance: score,

    }

    console.log( localStorage.getItem("SavedToken"))
    console.log(scoreObj)
    // save the log
    fetch("http://localhost:3001/api/scores/new", {
      method: "POST",
      body: JSON.stringify(scoreObj),
      headers: {
       "Content-Type": "application/json",
        authorization: localStorage.getItem("SavedToken")
      }
    }).then(res => {
      console.log("res")
      console.log(res)
      if (res.ok) {
        window.location.reload(false);
      } else {
        alert("failed to upload Log")
      }
    })
    console.log("*************")
    console.log(score)
// get the challenges
    // fetch("http://localhost:3001/challenge/2", {
    //   headers: {
    //     "Content-Type": "application/json",
    //      authorization: localStorage.getItem("SavedToken")
    //   }
    // }).then(res => res.json()).then(data => {

    //   props.setChallenge(data)
    //   props.setScores(data.scores)    
    // }) 

    const newLog = {
      score: score,
      unit: unit
    }
    props.addLog(newLog)
    // props.setChallenge([])
    
    setScore(0);
    setUnit("Mile");
  }
  return (
    <>

      <h1>Log Activity</h1>
      <form className="Form" onSubmit={handleFormSubmit}>
        <input placeholder="text" name="text" type="number" value={score} onChange={(e) => { setScore(e.target.value) }} />
        <select name="unit" value={unit} onChange={(e) => { setUnit(e.target.value) }}>
          <option value="Mile">Mile</option>
          <option value="KM">Kilo Meter</option>

        </select>
        <button>Log new Score!</button>
      </form>

    </>
  );
}

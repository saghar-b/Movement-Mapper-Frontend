// import React from 'react';
// import './Styles/Log.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import UnitConverter from './UnitConverter';

export default function Log(props) {
  //  const [amount, setAmount] = useState(0);
  const [score, setScore] = useState(0)
  const [unit, setUnit] = useState("Mile")
  const location = useLocation();

  useEffect(() => {
    setScore(score)
      }, [])
  const handleFormSubmit = e => {
    e.preventDefault();
    const scoreObj = {
      challenge_id: props.challenge.id,
      user_id: 1,
      distance: score,

    }

    console.log( localStorage.getItem("SavedToken"))
    console.log("props.challenge.id vagheannnnnn")
    console.log(props.challenge.id)
    console.log(scoreObj)
    // save the log
    fetch("http://localhost:3001/api/scores/new", {
      method: "POST",
      body: JSON.stringify(scoreObj),
      headers: {
       "Content-Type": "application/json",
        authorization:"Bearer"+ localStorage.getItem("SavedToken")
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
  

    const newLog = {
      score: score,
      unit: unit
    }
    // props.addLog(newLog)
    // props.setChallenge([])
    
    setScore(0);
    setUnit("Mile");
  }
  return (
    <>

      <h1>Log Activity</h1>
      <form className="Form" onSubmit={handleFormSubmit}>
        <input placeholder="text" name="text" type="number" value={score} onChange={(e) => { setScore(e.target.value) }} />
       <label>{props.challenge.unit}</label>
        {/* <select name="unit" value={unit} onChange={(e) => { setUnit(e.target.value) }}>
          <option value="Mile">Mile</option>
          <option value="KM">Kilo Meter</option>

        </select> */}
        <button>Log new Score!</button>
      </form>

      <UnitConverter setScore={setScore}/>
    </>
  );
}

// import React from 'react';
// import './Styles/Log.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


export default function Log(props) {
  const [score, setScore] = useState(0)
    const [unit, setUnit] = useState("Mile")
  // const location = useLocation();
  
  // useEffect(() => {
  //   fetch("http://localhost:3001/challenge/3", {
  //     headers: {
  //       "Content-Type": "application/json"
  //       //  authorization: localStorage.getItem("SavedToken")
  //     }
  //   }).then(res => res.json()).then(data => {
  //     setChallenge(data)
  //     setparticipants(data.participants)
      
      

  //   })
  // }, [])
  const handleFormSubmit = e=>{
    e.preventDefault();
    const newLog = {
        score:score,
        unit:unit
    }
    props.addLog(newLog)
    setScore(0);
    setUnit("Mile");
}
  return (
    <>
      
      <h1>Log Activity</h1>
      <form className="Form" onSubmit={handleFormSubmit}>
           <input placeholder="text" name="text" type="number" value={score} onChange={(e)=>{setScore(e.target.value)}}/>
           <select name="unit" value={unit}  onChange={(e)=>{setUnit(e.target.value)}}>
               <option value="Mile">Mile</option>
               <option value="KM">Kilo Meter</option>
              
           </select>
           <button>Log new Score!</button>
        </form>

    </>
  );
}

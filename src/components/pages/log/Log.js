
import './Log.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import UnitConverter from '../unitConvert/UnitConverter';
import jwt from 'jwt-decode'
import { getBaseUrl } from '../../../utils/API'



export default function Log(props) {
  const [score, setScore] = useState(0)
  const [unit, setUnit] = useState("Mile")
  const [token, setToken] = useState("");
  const location = useLocation();

  useEffect(() => {
    setScore(score)
    const tokenrow = localStorage.getItem('SavedToken');
    if (tokenrow) {
      const t = "Bearer " + tokenrow;
      setToken(t)

    }
    else {
      alert("Please log in")
    }
  }, [])
  const handleFormSubmit = e => {
    e.preventDefault();
    const scoreObj = {
      challenge_id: props.challenge.id,
      user_id: jwt(token).id,
      distance: score,

    }

    // save the log
    fetch(`${getBaseUrl()}/api/scores/new`, {
      method: "POST",
      body: JSON.stringify(scoreObj),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("SavedToken")
      }
    }).then(res => {

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

    setScore(0);
    setUnit("Mile");
  }
  return (
    <>

      <h2 className='logHead'>Log Activity</h2>
      <form className="Form logInput" onSubmit={handleFormSubmit}>
        <input placeholder="text" name="text" type="number" value={score} onChange={(e) => { setScore(e.target.value) }} />
        <label>{props.challenge.unit.charAt(0).toUpperCase() + props.challenge.unit.slice(1)}(s)</label>

        <button className="button">Log New Activity!</button>
      </form>
      <div className='unitConvert'>

        <UnitConverter setScore={setScore} />
      </div>
    </>
  );
}

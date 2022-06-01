// import React from 'react';
import './Styles/Score.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Log from './Log';
export default function Score() {
  // const location = useLocation();
  const participate = {
    distance: ""
  }
  const [challenge, setChallenge] = useState([]);
  const [participants, setparticipants] = useState([
    { user_name: "", participate }]);

  useEffect(() => {
    setChallenge("data")
    fetch("http://localhost:3001/challenge/3", {
      headers: {
        "Content-Type": "application/json"
        //  authorization: localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {
      setChallenge(data)
      setparticipants(data.participants)
      
      console.log(challenge)
      console.log(participants)

    })
  }, [])

  function addLog(score){
    console.log(score)
  }
  //   console.log("////")
  // console.log(participants)
  return (
    <>
      {/* <div>{location.state.name}</div>
    <div>{location.state.id}</div> */}
      <h1>Score</h1>
      <section className='card'>
        <div className='card-head'>
          <h3>{challenge.Challenge_type}</h3>
        </div>
        <div className='card-body'>

          {challenge.Challenge_name}
          {participants.map(part => (
            <p>
              {part.user_name}
              {part.participate.distance}

            </p>
          ))}

        </div>
      </section>

      <Log addLog={addLog}/>

    </>
  );
}

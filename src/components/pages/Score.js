// import React from 'react';
import './Styles/Score.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Log from './Log';
export default function Score() {
  // const location = useLocation();
  const score = {
    distance: ""
  }
  const [challenge, setChallenge] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // setChallenge("data")
    fetch("http://localhost:3001/challenge/2", {
      headers: {
        "Content-Type": "application/json"
        //  authorization: localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {

      setChallenge(data)
      setScores(data.scores)    
    }) 
  }, [])

  function addLog(newscore){

    // setChallenge(challenge)
    //   setScores(scores)

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
          {/* {scores[0].user_name}   */}
          {scores.map(part => (
            <p>
              {part.user_name}
              {part.score.distance}

             </p>
          ))} 

        </div>
      </section>

      <Log setScores={setScores} setChallenge={setChallenge} addLog={addLog}/>

    </>
  );
}

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
  const [isCurrent, setIsCurrent] = useState(false);
 

  useEffect(() => {
//  get the specific challange
    fetch("http://localhost:3001/challenge/1", {
      headers: {
        "Content-Type": "application/json"
        //  authorization: localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {

      setChallenge(data)
      setScores(data.scores)
      const today = new Date();
      const start = new Date(data.start_time);
    const end = new Date(data.end_time);
      if (start < today && end>today)  {
        setIsCurrent(true)
        console.log("current")
      }else{
        setIsCurrent(false)
      }
      
      console.log("date")
      // console.log(amount)
      
    }) 
  }, [])

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
          <ul>

          {scores.map(part => (
            <li key="{part.id}">
              {part.user_name}
              {part.score.distance}

             </li>
          ))} 
          </ul>

        </div>
      </section>
{ isCurrent &&
<>
  <Log setScores={setScores} setChallenge={setChallenge} challenge ={challenge}/>
  
</>
}

    </>
  );
}

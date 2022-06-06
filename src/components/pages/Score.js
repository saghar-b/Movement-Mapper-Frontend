// import React from 'react';
import './Styles/Score.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Log from './Log';
import Chart from './Chart';
import jwt from 'jwt-decode'

export default function Score() {
  const location = useLocation();
  const score = {
    distance: ""
  }
  const [challenge, setChallenge] = useState([]);
  const [scores, setScores] = useState([]);
  const [isCurrent, setIsCurrent] = useState(false);
  const [isJoined, setIsJoined] = useState(false);


  useEffect(() => {
    //  get the specific challange
    fetch(`http://localhost:3001/challenge/${location.state.challenge_id}`, {
      headers: {
        "Content-Type": "application/json"
        //  authorization: localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {

      console.log(data)
      setChallenge(data)
      setScores(data.scores)

      const today = new Date();
      const start = new Date(data.start_time);
      const end = new Date(data.end_time);
      console.log(start);
      console.log(end);
      if (start < today && end > today) {
        setIsCurrent(true)
        console.log("current")
      } else {
        setIsCurrent(false)
      }

      checkJoined();

    })
  }, [])

  function checkJoined() {
    console.log("joinnnnnn")
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;


      // check the use is joined
      fetch(`http://localhost:3001/challenges/score/${location.state.id}/${location.state.challenge_id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(data => {

        console.log("dathhhhhhhhhhhhhha", data.msg)
        if (data.msg === "NO") {

          setIsJoined(false)
        } else {
          setIsJoined(true)
          console.log("joined")

        }
      })
    } else {
      console.log("Notlogedin")
      // navigate(`/score`, { state: { id: "", name: "", challenge_id: oneChallenge } })
    }
    // console.log(location.state.id)
    // console.log("location.state.challenge_id")



  }

  console.log(scores)
  // TODO: check if the person is in the event
  return (
    <>

      <div>{location.state.challenge_id}</div>
      <div>{location.state.name}</div>
      <div>{location.state.id}</div>
      <h1>Leaderboard</h1>
      {/* changed "score to leaderboard" */}
      <section className='card'>
        <div className='card-head'>
          <h3>{challenge.Challenge_type}</h3>
        </div>
        <div className='card-body'>

          <label for="challenge">Challenge:</label>{challenge.Challenge_name}
          <label for="participant">Participant:</label>
          <ul>
            {/* show all the participants */}
            {scores.map(part => (
              <li key="{part.id}">
                {part.user_name}
                {part.score.distance}

              </li>
            ))}
          </ul>

        </div>
      </section>
      {isCurrent && location.state.id && isJoined &&
        <>
          <Log setScores={setScores} setChallenge={setChallenge} challenge={challenge} userId={location.state.id} />

        </>
      }

      <Chart scores={scores}></Chart>


    </>
  );
}


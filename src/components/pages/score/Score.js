// import React from 'react';
import './Score.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Log from '../log/Log';
import Chart from '../chart/Chart';
import { getBaseUrl } from '../../../utils/API'
import "../../../global.css"

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
    //  get the specific challange that already joined
    fetch(`${getBaseUrl()}/challenge/${location.state.challenge_id}`, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(data => {

      console.log(data)
      setChallenge(data)
      setScores(data.scores)

      const today = new Date();
      const start = new Date(data.start_time);
      const end = new Date(data.end_time);
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
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;


      // check the use is joined
      fetch(`${getBaseUrl()}/challenges/score/${location.state.id}/${location.state.challenge_id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(data => {

        if (data.msg === "NO") {

          setIsJoined(false)
        } else {
          setIsJoined(true)
          console.log("joined")

        }
      })
    } else {
      console.log("Notlogedin")
    }

  }

  console.log(scores)

  return (
    <>
      <div className='Leaderboard'>
        <section className='Scorecard'>
          <div className='cardHead'>
            <h3>{challenge.Challenge_type}</h3>
          </div>
          <div className='cardBody'>
            <div>
            <div className='challenge'>
              {/* <label for="challenge">Challenge:</label> */}
              {challenge.Challenge_name} Challenge
            </div>
            <div className='titles'>
              <div id="participantHead">Participant:</div>
              <div id="participantStats">Stats:</div>
            </div>
            <div className='scores'>
              {scores.map(part => (
                <li key="{part.id}">
                  <p id="name">{part.user_name}</p>
                  <p id="score">{part.score.distance}</p>
                </li>
              ))}
            </div>
            </div>
            <div className='picture'>
            <img className= "challengePic" src={challenge.picture_path}/>
            </div>
          </div>
        </section>
        {isCurrent && location.state.id && isJoined &&
          <div className='log'>
            <Log setScores={setScores} setChallenge={setChallenge} challenge={challenge} userId={location.state.id} />

          </div>
        }
        <h1 className='saghar'>Leaderboard</h1>
        <div className='chart'>

          <Chart scores={scores}></Chart>
        </div>

      </div>


    </>
  );
}


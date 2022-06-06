import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PublicCard from './PublicCard';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [token, setToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    // const t =""
    // const tokenrow = localStorage.getItem('SavedToken');
    // if (tokenrow) {
    //  const t = "Bearer " + tokenrow;
    //   setToken(t)
    //   fetch(`http://localhost:3001/challenges/types/login/${ jwt(t).id}/${location.state.type}`, {
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then(res => res.json()).then(challengesDB => {
    //   setChallenges(challengesDB)

    // })
    // }
    // else {
      // setToken("")
      fetch(`http://localhost:3001/challenges/types/no/${location.state.type}`, {
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(challengesDB => {
        setChallenges(challengesDB)
  
      })

    // }
    
  }, [])


  function getoneChallenge(oneChallenge) {

    console.log(token)
    if (token != "") {
      console.log("tokennnnnn")
      console.log(token)
      navigate(`/Leaderboard`, { state: { id: jwt(token).id, name: jwt(token).name, challenge_id: oneChallenge } })

    } else {
      console.log("Notlogedin")

      navigate(`/leaderboard`, { state: { id: "", name: "", challenge_id: oneChallenge } })
    }

  }
  return (
    <>
      <div>{location.state.type}</div>
      <h1>Challenges</h1>
      {challenges.map(chal => (
        <PublicCard challenge={chal} getoneChallenge={getoneChallenge} token={token}></PublicCard>
      ))}

    </>
  );
} 

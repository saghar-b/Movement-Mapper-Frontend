import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PublicCard from './PublicCard';
import { useNavigate } from 'react-router-dom';

import jwt from 'jwt-decode'

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:3001/challenges/types/${location.state.type}`, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(challengesDB => {
      setChallenges(challengesDB)

    })
  }, [])
  function getoneChallenge(oneChallenge) {
    console.log("oneChallenge")
    console.log(oneChallenge)
    
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      console.log("logedin")
      navigate(`/score`, { state: { id: jwt(t).id, name: jwt(t).name, challenge_id: oneChallenge } })
     
    } else {
      console.log("Notlogedin")
      navigate(`/score`, { state: { id: "", name: "", challenge_id: oneChallenge } })
    }

  }
  return (
    <>
      <div>{location.state.type}</div>
      <h1>Challenges</h1>
      {challenges.map(chal => (
        <PublicCard challenge={chal} getoneChallenge={getoneChallenge}></PublicCard>
      ))}

    </>
  );
} 

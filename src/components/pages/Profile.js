import React from 'react';
import './Styles/Profile.css';
import Moment from 'moment';
import PrivateCard from './PrivateCard';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode'


export default function Profile() {

  const [token, setToken] = useState([]);
  const [createdChallenges, setCreatedChallenges] = useState([]);
  const [participatingChallenges, setParticipatingChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  // This gets challenges AND the creator because of the route
   getCreatedChallenges();
  // This does not include the creator information in the route
   getParticipatingChallenges();
  }, [])

  const location = useLocation();

  function getCreatedChallenges(){
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      // setToken(jwt(t))
      // console.log((jwt(t)).id);
      fetch(`http://localhost:3001/challenges/creator/${(jwt(t)).id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: t
         }
       }).then(res => res.json()).then(challengesDB => {
         setCreatedChallenges(challengesDB)
         console.log(challengesDB);
       })
     } else {
       alert("please log in")
     }
  }

  function getParticipatingChallenges(){
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      // setToken(jwt(t))
      console.log("Jwt ID:",(jwt(t)).id);
      fetch(`http://localhost:3001/challenges/joined/${(jwt(t)).id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: t
         }
       }).then(res => res.json()).then(challengesDB => {
         setParticipatingChallenges(challengesDB)
         console.log(challengesDB);
       })
     } else {
       alert("please log in")
     }
  }

  function handleScoreViewBtn() {
    navigate(`/score`, { state: { id: token.id, name: token.user_name } })
  }

  function handleNewViewBtn() {
    navigate(`/profile/newchallenge`, { state: { id: token.id, name: token.user_name } })
  }

  function handleViewBtn() {
    navigate(`/score`, { state: { id: token.id, name: token.user_name } })
  }

  function getoneChallenge(oneChallenge) {
    
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      console.log("logedin")
      navigate(`/score`, { state: { id: jwt(t).id, name: jwt(t).name, challenge_id: oneChallenge } })
     
    } else {
      console.log("Notlogedin")
    }

  }

  // console.log("challenges: ",challenges);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>{location.state.name}'s Dashboard</h3>
      <p style={{ textAlign: "center" }}>User ID: {location.state.id}</p>

      {/* start of creator's card */}
      <h1>Created Challenges</h1>
      {createdChallenges.map(chal => (
        <PrivateCard challenge={chal} getoneChallenge={getoneChallenge}></PrivateCard>
      ))}
      <h1>Joined Challenges</h1>

       {participatingChallenges.map(chal => (
        <PrivateCard challenge={chal} getoneChallenge={getoneChallenge}></PrivateCard>
      ))}

      <button onClick={handleViewBtn} style={{ textAlign: "center" }}>View Challenge</button>
      <button onClick={handleNewViewBtn}>Create a New Challenge</button>
    </>
  )

}

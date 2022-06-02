import React from 'react';
import './Styles/Profile.css';
import Moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode'

export default function Profile() {
  const [token, setToken] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token=localStorage.getItem('SavedToken');
    if(token){
      const t = "Bearer "+token;
      // setToken(jwt(t))
      console.log((jwt(t)).id);
      fetch(`http://localhost:3001/challenges/creator/${(jwt(t)).id}`, {
      headers: {
        "Content-Type": "application/json",
         authorization:t
      }
    }).then(res => res.json()).then(challengesDB => {
      setChallenges(challengesDB)
      console.log(challengesDB);
    }) 
    }else{
      alert("please log in")
    }
  }, [])

  const location = useLocation();
  function handleScoreViewBtn() {
    navigate(`/score`, { state: { id: token.id, name: token.user_name } })

  }
   
  function handleNewViewBtn() {
    navigate(`/profile/newchallenge`, { state: { id: token.id, name: token.user_name } })
  }

  function handleViewBtn() {
    navigate(`/score`, { state: { id: token.id, name: token.user_name } })
  }
  return (
    <>
      <h3 style={{textAlign: "center"}}>{location.state.name}'s Dashboard</h3>
      <p style={{textAlign: "center"}}>User ID: {location.state.id}</p>

{/* start of public card */}
{/* <section data-type={challenge} className='card' onClick={handleChallengeClick}>
                <div >
                    <h1 data-type={challenge.id}>{challenge.Challenge_name}</h1>
                </div>
                <div className='card-body'>
                    <h4>{challenge.creator.user_name}</h4>
                    <h4>{Moment(challenge.starttimr).format('d MMM')}</h4>
                    <h4>{Moment(challenge.end_timr).format('d MMM')}</h4>
                    <button onClick={handleJoinBtn}>Join</button>
                    <button>Delete</button>
                </div>
            </section > */}

{/* '/challenges/:user_id' */}
      {/* saghar made this*/}
      <button onClick={handleViewBtn} style={{textAlign: "center"}}>View Challenge</button>
      <button onClick={handleNewViewBtn}>Create a New Challenge</button>
      </>
     )       
  
}

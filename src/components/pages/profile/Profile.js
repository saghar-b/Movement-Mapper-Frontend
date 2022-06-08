import React from 'react';
import './Profile.css';
import PrivateCard from '../privateCard/PrivateCard';
import PendingCard from '../pendingCard/PendingCard';
import PublicCard from '../publicCard/PublicCard';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode'
import {getBaseUrl} from '../../../utils/API'
import "../../../global.css"


export default function Profile() {

  const [token, setToken] = useState();
  const [createdChallenges, setCreatedChallenges] = useState([]);
  const [participatingChallenges, setParticipatingChallenges] = useState([]);
  const [PendingChallenges, setPendingChallenges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCreatedChallenges();
    getParticipatingChallenges();
    getPendingChallenges();
  }, [])

  const location = useLocation();

  function getCreatedChallenges() {
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      setToken(t)
      fetch(`${getBaseUrl()}/challenges/creator/${(jwt(t)).id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: t
        }
      }).then(res => res.json()).then(challengesDB => {
        setCreatedChallenges(challengesDB)
      })
    } else {
      alert("please log in")
    }
  }
  // check challenges that user joined
  function getParticipatingChallenges() {
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      setToken(t)
      // check challenges that user joined
      fetch(`${getBaseUrl()}/challenges/joined/${(jwt(t)).id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: t
        }
      }).then(res => res.json()).then(challengesDB => {
        setParticipatingChallenges(challengesDB)

      })
    } else {
      alert("please log in")
    }
  }

  // get pending challenges
  function getPendingChallenges() {
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      setToken(t)
      fetch(`${getBaseUrl()}/challenges/pending/${(jwt(t)).id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: t
        }
      }).then(res => res.json()).then(challengesDB => {
        setPendingChallenges(challengesDB)

      })
    } else {
      alert("please log in")
    }
  }

  function handleNewViewBtn() {
    navigate(`/profile/newchallenge`, { state: { id: token.id, name: token.user_name } })
  }

  function getoneChallenge(oneChallenge) {

    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;
      navigate(`/Leaderboard`, { state: { id: jwt(t).id, name: jwt(t).name, challenge_id: oneChallenge } })

    } else {
      alert("Notlogedin")
    }

  }


  return (
    <>
      <h3 id='user-dashboard' style={{ textAlign: "center" }}>{location.state.name}'s Dashboard</h3>
      <p style={{ textAlign: "center", display: "none" }}>User ID: {location.state.id}</p>
      <div id="challBtn">
      <button className='button' onClick={handleNewViewBtn}>Create a New Challenge</button>
      </div>
      {/* start of creator's card */}
      <h1 className='profile-title'>Created Challenges</h1>
      <div className='createdChallenges'>

        {createdChallenges.map(chal => (
          <PrivateCard challenge={chal} getoneChallenge={getoneChallenge}></PrivateCard>
        ))}

      </div>
      <div>
        <h1 className='profile-title' id="joinedTitle">Joined Challenges</h1>
      </div>
      <div className='joinedChallenges'>
        {participatingChallenges.map(chal => (
          <PublicCard challenge={chal} getoneChallenge={getoneChallenge} token={token}></PublicCard>
        ))}
      </div>
      <div>
        <h1 className='profile-title' id='pendingTitle'>Pending Challenges</h1>

      </div>
      <div className='pendingChallenges'>
        {PendingChallenges.map(chal => (
          <PendingCard challenge={chal} getoneChallenge={getoneChallenge} token={token}></PendingCard>
        ))}
      </div>
    </>
  )

}
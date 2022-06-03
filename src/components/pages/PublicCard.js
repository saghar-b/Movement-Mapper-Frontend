import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import jwt from 'jwt-decode'
import './Styles/PublicCard.css';
function PublicCard({ challenge, getoneChallenge, setType }) {
  const [token, setToken] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  useEffect(() => {
    checkJoined();
  }, [])
  // const [hide, setHide] = useState(false);
  console.log("challenge");
  console.log(challenge);
  function handleChallengeClick(e) {
    e.preventDefault();

    getoneChallenge(e.target.dataset.type);
  }
  function handleJoinBtn(e) {
    e.preventDefault();
    const tokenrow = localStorage.getItem("SavedToken")
    console.log(tokenrow)
    if (tokenrow) {
      const t = "Bearer " + tokenrow;
      // setToken(jwt(t))
      const addChallenge = {
        challenge_id: challenge.id,
        user_id: jwt(t).id,
        distance: "0"
      }
      console.log(addChallenge)
      console.log(jwt(t))
      insertToDB(addChallenge)
    } else {

      // saghar not to show the join btn if not logged in 
      // saghar not to show delete button unless on dashboard page 
      // TODO: Only show the edit & delete button when the creator is on their dashboard page

      alert("please log in")
    }


  }
  function checkJoined() {
    console.log("did you joinnnnnn")
    const token = localStorage.getItem('SavedToken');
    if (token) {
      const t = "Bearer " + token;


      // check the use is joined
      fetch(`http://localhost:3001/challenges/score/${jwt(t).id}/${challenge.id}`, {
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
    //   console.log(location.state.challenge_id)
    //   console.log(isCurrent)


  }
  function insertToDB(addChallenge) {
    fetch("http://localhost:3001/api/scores/new", {
      method: "POST",
      body: JSON.stringify(addChallenge),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("SavedToken")
      }
    })
  }
  return (
    <>
      <div className='publicCard'>
        <section data-type={challenge} className='card' >
          <div>
            <h1 data-type={challenge.id} onClick={handleChallengeClick}>{challenge.Challenge_name}</h1>
          </div>
          <div className='card-body'>
            <h4>{challenge.creator.user_name}</h4>
            <h4>{Moment(challenge.start_time).format('MMM DD yyyy')}</h4>
            <h4>{Moment(challenge.end_time).format('MMM DD yyyy')}</h4>
            {/* {isJoined &&
                        <button onClick={handleLeaveBtn}>Leave</button>
                    } */}
            {!isJoined &&
              <button onClick={handleJoinBtn}>Join</button>
            }


          </div>
        </section >
      </div>
    </>
  );
}

export default PublicCard;
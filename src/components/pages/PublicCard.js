import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import jwt from 'jwt-decode'
function PublicCard({ challenge, getoneChallenge, setType }) {
const [token, setToken] = useState([]);
    console.log("challenge");
    console.log(challenge);
    function handleChallengeClick(e) {
        e.preventDefault();

        getoneChallenge(e.target.dataset.type);
    }
    function handleJoinBtn(e) {
        e.preventDefault();
        const tokenrow= localStorage.getItem("SavedToken")
        console.log(tokenrow)
        if(tokenrow){
            const t = "Bearer "+tokenrow;
            // setToken(jwt(t))
            const addChallenge = {
                challenge_id: challenge.id,
                user_id: jwt(t).id,
                distance: "0"
            }
            console.log(addChallenge)
            console.log(jwt(t))
            insertToDB(addChallenge)
          }else{
            // saghar not to show the join btn if not logged in 
            // saghar not to show delete button unless on dashboard page 
            // TODO: Only show the edit & delete button when the creator is on their dashboard page
            
            alert("please log in")
          }
        
       
    }
    function insertToDB(addChallenge){
        fetch("http://localhost:3001/api/scores/new", {
            method: "POST",
            body: JSON.stringify(addChallenge),
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("SavedToken")
    }})
    }
    return (
        <>
            <section data-type={challenge} className='card' >
                <div >
                    <h1 data-type={challenge.id} onClick={handleChallengeClick}>{challenge.Challenge_name}</h1>
                </div>
                <div className='card-body'>
                    <h4>{challenge.creator.user_name}</h4>
                    <h4>{Moment(challenge.starttimr).format('d MMM')}</h4>
                    <h4>{Moment(challenge.end_timr).format('d MMM')}</h4>
                    <button onClick={handleJoinBtn}>Join</button>
                </div>
            </section >

        </>
    );
}

export default PublicCard;
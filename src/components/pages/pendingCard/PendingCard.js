import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import jwt from 'jwt-decode';
import './PendingCard.css';
// import { useNavigate } from 'react-router-dom';


// function PendingCard({ challenge, getoneChallenge, setType }) {
function PendingCard({ challenge, getoneChallenge, token }) {

    const [isPending, setIspending] = useState(false);
    useEffect(() => {

        // checkJoined();
    }, [])

    console.log("challenge");
    console.log(challenge);
    function handleChallengeClick(e) {
        e.preventDefault();

        getoneChallenge(e.target.dataset.type);
    }
    function handleAcceptBtn(e) {
        e.preventDefault();

        if (token != "") {

            const addChallenge = {
                challenge_id: challenge.id,
                user_id: jwt(token).id,
                distance: "0",
                join: true
            }

            insertToDB(addChallenge)
        } else {
            alert("please log in")
        }
    }

    function insertToDB(addChallenge) {
        fetch("http://localhost:3001/api/scores/new", {
            method: "POST",
            body: JSON.stringify(addChallenge),
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("SavedToken")
            }
        }).then(res => res.json()).then(data => {
            if (data) {
                window.location.reload(false);
                // setIspending(true)
            } else {
               console.log("not to be able to accept")

            }
        })
    }
    return (
        <>
            <div className='pendingCard'>
                <section data-type={challenge} className='card-hearder1' >
                    <div>
                        <h1 data-type={challenge.id} onClick={handleChallengeClick}>{challenge.Challenge_name}</h1>
                        <img data-type={challenge.id} onClick={handleChallengeClick} src={challenge.picture_path}/>
                    </div>
                    <div className='card-body'>
                        <h4>{challenge.creator.user_name}</h4>
                        <h4>{Moment(challenge.start_time).format('MMM DD yyyy')}</h4>
                        <h4>{Moment(challenge.end_time).format('MMM DD yyyy')}</h4>
                        
                            <button className="button" onClick={handleAcceptBtn}>Accept</button>
                        
                        
                    </div>
                </section >
            </div>
        </>
    );
}

export default PendingCard;
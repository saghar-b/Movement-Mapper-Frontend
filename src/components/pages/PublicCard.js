import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import jwt from 'jwt-decode'
import './Styles/PublicCard.css';
function PublicCard({ challenge, getoneChallenge, token }) {

    const [isJoined, setIsJoined] = useState(false);
    useEffect(() => {

        checkJoined();
    }, [])
    
    console.log("challenge");
    console.log(challenge);
    function handleChallengeClick(e) {
        e.preventDefault();

        getoneChallenge(e.target.dataset.type);
    }
    function handleJoinBtn(e) {
        e.preventDefault();
       
        if (token != "") {
            
            const addChallenge = {
                challenge_id: challenge.id,
                user_id: jwt(token).id,
                distance: "0"
            }
         
            insertToDB(addChallenge)
        } else {
            alert("please log in")
        }
    }
    function checkJoined() {
    
        if (token != "") {
          
            // check the use is joined
            fetch(`http://localhost:3001/challenges/score/${jwt(token).id}/${challenge.id}`, {
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
        } 
        else {
            console.log("Notloged in")

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

                setIsJoined(true)
            } else {
                setIsJoined(false)

            }
        })
    }

    const handleLeaveBtn = async () => {
        const response = await fetch(`http://localhost:3001/api/scores/${jwt(token).id}/${challenge.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            console.log("response")
            console.log(response)
            window.location.reload(false);
        } else {
            alert('Failed to delete');
        }
        setIsJoined(false)
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
                        {isJoined &&
                            <button onClick={handleLeaveBtn}>Leave</button>
                        }
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
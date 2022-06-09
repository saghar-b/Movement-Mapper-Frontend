import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import jwt from 'jwt-decode'
import './PublicCard.css';
import { getBaseUrl } from '../../../utils/API';
import "../../../global.css";

function PublicCard({ challenge, getoneChallenge, token }) {
    const [isPsast, setIsPsast] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    useEffect(() => {
        const today = new Date();
        const start = new Date(challenge.start_time);
        const end = new Date(challenge.end_time);
        if (end < today) {
            setIsPsast(true)
        } else {
            setIsPsast(false)
        }

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
                distance: "0",
                join: true
            }

            insertToDB(addChallenge)
        } else {
            alert("please log in")
        }
    }
    function checkJoined() {
        console.log(token)
        if (token != "") {

            // check the use is joined
            fetch(`${getBaseUrl()}/challenges/score/${jwt(token).id}/${challenge.id}`, {
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
        fetch(`${getBaseUrl()}/api/scores/new`, {
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
        const response = await fetch(`${getBaseUrl()}/api/scores/${jwt(token).id}/${challenge.id}`, {
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
                <section data-type={challenge}>
                    <div className='card-header1'>
                        <h1 className='public-title' data-type={challenge.id} onClick={handleChallengeClick}>{challenge.Challenge_name}</h1>
                        <div className='public-img cursor-hand'>
                            <img data-type={challenge.id} onClick={handleChallengeClick} src={challenge.picture_path} />
                        </div>
                    </div>

                    <div className='card-body2'>
                        <div className="public-card-body">Created by:
                            <h4>{challenge.creator.user_name}</h4>
                            <h4>{Moment(challenge.start_time).format('MMM DD yyyy')}</h4>
                            <h4>{Moment(challenge.end_time).format('MMM DD yyyy')}</h4>
                        
                            <div className="cardButtons">   
                        {isJoined &&
                            <button className="button" onClick={handleLeaveBtn}>Leave</button>
                        }
                        {!isJoined &&
                            <button className="button" onClick={handleJoinBtn}>Join</button>
                        }
                            </div>
                        </div>

                            {(isJoined && !isPsast)  &&
                                <button className="button" onClick={handleLeaveBtn}>Leave</button>
                            }
                            {(!isJoined && !isPsast) && 
                                <button className="button" onClick={handleJoinBtn}>Join</button>
                            }
                            {/* } */}
                        </div>
                        <h3 className=''> {challenge.scores.length}</h3>

                    </div>
                </section >
            </div>
        </>
    );
}

export default PublicCard;
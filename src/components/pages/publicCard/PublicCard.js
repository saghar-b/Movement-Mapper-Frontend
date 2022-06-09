import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import jwt from 'jwt-decode'
import './PublicCard.css';
import { getBaseUrl } from '../../../utils/API';
import "../../../global.css";
import userImage from '../../../assets/user.png'

function PublicCard({ challenge, getoneChallenge, token }) {

    const [isPast, setIsPast] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    useEffect(() => {
        fetch(`${getBaseUrl()}/challenge/${challenge.id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(data => {

            setParticipants(data.scores)
        })

        const today = new Date();
        const start = new Date(challenge.start_time);
        const end = new Date(challenge.end_time);
        if (end < today ) {
            setIsPast(true)
        } else {
            setIsPast(false)
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
                            <img data-type={challenge.id} onClick={handleChallengeClick} src={challenge.picture_path} alt="a challenge to overcome" />
                        </div>
                    </div>

                    <div className='card-body1'>
                        <div className='participant-circle'>
                            <div className='participant-number'>{participants.length}</div>
                        </div>
                        <img src={userImage} className='icon' alt='user'></img>
                        <div className="public-card-body">
                            <h6>Created by</h6>
                            <h4>{challenge.creator.user_name}</h4>
                            <h4>{Moment(challenge.start_time).format('MMM DD yyyy')}</h4>
                            <h4>{Moment(challenge.end_time).format('MMM DD yyyy')}</h4>

                            <div className="cardButtons">
                                {(isJoined && !isPast) &&
                                    <button className="button" onClick={handleLeaveBtn}>Leave</button>
                                }
                                {(!isJoined && !isPast) &&
                                    <button className="button" onClick={handleJoinBtn}>Join</button>
                                }
                            </div>
                        </div>


                    </div>
                </section >
            </div>
        </>
    );
}

export default PublicCard;
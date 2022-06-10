import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import jwt from 'jwt-decode'
import './PrivateCard.css';
import { useNavigate } from 'react-router-dom';
import { getBaseUrl } from '../../../utils/API'
import "../../../global.css"
import userImage from '../../../assets/user.png'

function PrivateCard({ challenge, getoneChallenge, setType }) {
    const [isPsast, setIsPsast] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date();
        const start = new Date(challenge.start_time);
        const end = new Date(challenge.end_time);
        if (end < today) {
            setIsPsast(false)
        } else {
            setIsPsast(true)
        }

    }, [])
    function handleChallengeClick(e) {
        e.preventDefault();

        getoneChallenge(e.target.dataset.type);
    }
    function handleJoinBtn(e) {
        e.preventDefault();
        const tokenrow = localStorage.getItem("SavedToken")
        if (tokenrow) {
            const t = "Bearer " + tokenrow;
            const addChallenge = {
                challenge_id: challenge.id,
                user_id: jwt(t).id,
                distance: "0"
            }
            insertToDB(addChallenge)
        } else {

            alert("please log in")
        }


    }
    function insertToDB(addChallenge) {
        fetch(`${getBaseUrl()}/api/scores/new`, {
            method: "POST",
            body: JSON.stringify(addChallenge),
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("SavedToken")
            }
        })
    }
    // delete challenges
    const handleDeleteBtn = async () => {
        const response = await fetch(`${getBaseUrl()}/api/challenges/${challenge.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: "Bearer " + localStorage.getItem("SavedToken")
            }
        });
        if (response.ok) {
            window.location.reload(false);
        } else {
            alert('Failed to delete');
        }
        // setIsJoined(false)
    }

    function handleViewInvitedBtn() {
        navigate(`/invite`, { state: { challenge: challenge } })
    }
    return (
        <>

            <div className='privateCard'>
                <section data-type={challenge} >
                    <div className='card-header1'>
                        <h1 className='private-title cursor-hand' data-type={challenge.id} onClick={handleChallengeClick}>{challenge.Challenge_name}</h1>
                        <div className='private-img cursor-hand'>
                            <img data-type={challenge.id} onClick={handleChallengeClick} src={challenge.picture_path} alt="a challenge to overcome" />
                        </div>
                    </div>
                    <div className='card-body1'>
                        <div className='participant-circle'>
                            <div className='participant-number'>{challenge.scores.length}</div>
                        </div>
                        <img src={userImage} className='icon' alt='user'></img>
                        <div className="private-card-body">
                            <h6>Created by</h6>
                            {challenge.creator.user_name && <h4>{challenge.creator.user_name}</h4>}
                            <h4>Start: {Moment(challenge.start_time).format('MMM DD yyyy')}</h4>
                            <h4>End: {Moment(challenge.end_time).format('MMM DD yyyy')}</h4>
                            {/* <button>Edit</button> */}
                            <div className="cardButtons">
                                <button onClick={handleDeleteBtn} className="button">Delete</button>
                                {isPsast &&

                                    <button className='button' onClick={handleViewInvitedBtn}>Invite</button>
                                }
                            </div>
                        </div>
                    </div>
                </section >
            </div>

        </>
    );
}

export default PrivateCard;
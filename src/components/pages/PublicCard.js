import React from 'react';
import Moment from 'moment';

function PublicCard({ challenge, getoneChallenge, setType }) {
    // console.log("challenge");
    // console.log(challenge);
    function handleChallengeClick(e) {
        e.preventDefault();

        getoneChallenge(e.target.dataset.type);
    }
    return (
        <>
            <section data-type={challenge} className='card' onClick={handleChallengeClick}>
                <div >
                    <h1 data-type={challenge.id}>{challenge.Challenge_name}</h1>
                </div>
                <div className='card-body'>
                    <h4>{challenge.creator.user_name}</h4>
                    <h4>{Moment(challenge.start_time).format('DD MMM yyyy')}</h4>
                    <h4>{Moment(challenge.end_time).format('DD MMM yyyy')}</h4>
                </div>
            </section >

        </>
    );
}

export default PublicCard;
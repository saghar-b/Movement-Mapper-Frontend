import React from 'react';
import './Card.css';

const Card = ({card,getChallenge,setType}) =>
{
//     console.log("card******")
//     console.log(card)
    function handleChallengeClick(e){
        e.preventDefault();
        // console.log(e.target.dataset.type)
        // setType(e.target.dataset.type)
        getChallenge(e.target.dataset.type);
    }
 return (
     <div data-type={card} className='card' onClick={handleChallengeClick}>
         <div className='card-body'>
            <h1 data-type={card}>{card}</h1>
            <img className="card-img-top" src="https://thumbs.dreamstime.com/b/fast-run-icon-rush-graphic-design-logo-web-site-social-media-mobile-app-ui-illustration-183359890.jpg" alt="Card image"></img>
         </div>
    </div>
 )
}

export default Card;
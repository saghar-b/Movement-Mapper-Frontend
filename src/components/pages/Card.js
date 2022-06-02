import React from 'react';

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
         <h1 data-type={card}>{card}</h1>
         </div>
 )
}

export default Card;
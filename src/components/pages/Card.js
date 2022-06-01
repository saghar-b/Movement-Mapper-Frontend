import React from 'react';

const Card = ({card,getChallenge}) =>
{
    console.log("card******")
    console.log(card)
 return (
     <div data-type={card} className='card' onClick={getChallenge}>
         <h1>{card}</h1>
         </div>
 )
}

export default Card;
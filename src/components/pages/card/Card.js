import React, { useEffect, useState } from 'react';
import './Card.css';
import run from '../../../assets/run.png'
import hike from '../../../assets/hike.png'
import bike from '../../../assets/bike.png'
import walk from '../../../assets/walk.png'
import swim from '../../../assets/swim.png'
import row from '../../../assets/row.png'
import weight from '../../../assets/weight.png'


const Card = ({ card, getChallenge, setType }) => {
    const [image, setImage] = useState(false);
    useEffect(() => {
        if (card === "Run") {
            setImage(run)

        } else if (card === "Hike") {
            setImage(hike)
        }
        else if (card === "Bike") {
            setImage(bike)
        }
        else if (card === "Walk") {
            setImage(walk)
        }
        else if (card === "Swim") {
            setImage(swim)
        }
        else if (card === "Row") {
            setImage(row)
        }
        else if (card === "Weights") {
            setImage(weight)
        }
    }, [])

    function handleChallengeClick(e) {
        e.preventDefault();
        getChallenge(e.target.dataset.type);
    }
    return (
        <div data-type={card} className='card' onClick={handleChallengeClick}>
            <div className='card-body'>
                <h1 data-type={card}>{card}</h1>
                <img data-type={card} className="card-img-top" src={image} alt="Card image" onClick={handleChallengeClick}></img>
            </div>
        </div>
    )
}
export default Card;
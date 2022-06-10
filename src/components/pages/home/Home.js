import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/Card';
import { Carousel } from 'react-bootstrap';
import { getBaseUrl } from '../../../utils/API'
import './Home.css';
import '../../../../src/global.css'

export default function Home() {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${getBaseUrl()}/challenges/types`, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(data => {
      setTypes(data)
      setType(type)
    })
  }, [])
  const getChallenge = (selectedType) => {
    // get challenges for that type
    navigate(`/challenges/`, { state: { type: selectedType } });

  }

  return (
    <div className='homepage'>
      <Carousel className='container' variant="dark">
        <Carousel.Item>
          <div id="box1"
            className="d-block w-100">
          </div>
          <Carousel.Caption className='headers'>
            <h3 id="welcome">Welcome to Movement Mapper</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div id="box2"
            className="d-block w-100">
          </div>
          <Carousel.Caption className='headers'>
            <h3 id="join">Find Challenges to Join</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div id="box3"
            className="d-block w-100">
          </div>

          <Carousel.Caption className='headers'>
            <h3 id="create">Create Challenges with your Friends!</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className='homepage-cards'>
        {types.map((activity) => <Card key={types.id} card={activity.challenge_type} getChallenge={getChallenge} setType={setType} />)}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../card/Card';
import {Carousel} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import './Home.css';

export default function Home() {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/challenges/types", {
      headers: {
        "Content-Type": "application/json"
        //  authorization: localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {
      setTypes(data)
      setType(type)
      // 
      // console.log("/////////")
      console.log(types)
      // console.log(type)
    }) 
  }, [])
  const getChallenge = (selectedType) => {
   
    console.log(selectedType)

    navigate(`/challenges/`, { state: { type: selectedType} });
  
  }
  
  return (
    <div className ='homepage'>
<Carousel className='container' variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="http://webvision.med.utah.edu/wp-content/uploads/2012/06/50-percent-gray.jpg"
      alt="First slide"
    />
    <Carousel.Caption className='headers'>
      <h3>Welcome to MoveMovement Mapper</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="http://webvision.med.utah.edu/wp-content/uploads/2012/06/50-percent-gray.jpg"
      alt="Second slide"
    />
    <Carousel.Caption className='headers'>
      <h3>Find Challenges to Join</h3>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="http://webvision.med.utah.edu/wp-content/uploads/2012/06/50-percent-gray.jpg"
      alt="Third slide"
    />

    <Carousel.Caption className='headers'>
      <h3>Create Challenges with your Friends!</h3>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<Container>
<div className='homepage-cards'>
<Row md={4}>
    <Col className="card" key={{type}} style={{width: "18rem"}}>
    {types.map((activity) => <Card  key={types.id} card={activity.challenge_type} getChallenge={getChallenge} setType={setType}/>)}
  </Col>
</Row>
</div>
</Container>
    </div>
    );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

export default function Home() {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(" ");
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3001/challenges/types", {
      headers: {
        "Content-Type": "application/json"
        //  authorization: localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {
      setTypes(data)
      // 
      console.log("/////////")
      console.log(types)
    })
  }, [])
  const getChallenge = () => {
    // setType()
    navigate(`/challenges/`, { state: { type: type} });
    console.log("//////\\\\\\\\")
    console.log(type)
  }
  
  return (
    <div>
      home
      <h1>Home Page</h1>
    <div className="card" style={{width: "18rem"}}>
    {types.map((activity) => <Card card={activity.challenge_type} getChallenge={getChallenge} setType={setType}/>)}
</div>
    </div>
    );
}
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

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
    <div>
      home
      <h1>Home Page</h1>
    <div className="card" key={{type}} style={{width: "18rem"}}>
    {types.map((activity) => <Card  key={types.id} card={activity.challenge_type} getChallenge={getChallenge} setType={setType}/>)}
</div>
    </div>
    );
}
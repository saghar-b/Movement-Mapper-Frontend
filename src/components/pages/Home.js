import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function Home() {
  const [types, setTypes] = useState([]);
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
    console.log("clicked")
  }
  
  return (
    <div>
      home
      <h1>Home Page</h1>
    <div className="card" style={{width: "18rem"}}>
    {types.map((activity) => <Card card={activity.challenge_type} getChallenge={getChallenge}/>)}
</div>
    </div>
    );
}

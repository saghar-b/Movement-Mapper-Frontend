import React,{useEffect, useState} from 'react';

export default function Home() {
  const [challenges, setChallenges] = useState([]);
  useEffect(()=>{
     fetch("http://localhost:3001/challenges",{
       headers:{
         authorization: localStorage.getItem("SavedToken")
       }
     }).then(res => res.json()).then(data =>{
       setChallenges(data)
     })
  })
  return (
    <div>
      home
      <h1>Home Page</h1>
      <ul className="list-group">
            {challenges.map(challenge => (
        <li className="list-group-item" key={challenge.id}>
          {challenge.Challenge_name}
        </li>
      ))}
    </ul>
    </div>
  );
}

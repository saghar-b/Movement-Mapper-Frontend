import React from 'react';
import './Styles/Profile.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode'

export default function Profile() {
  const [token, setToken] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token=localStorage.getItem('SavedToken');
    if(token){
      const t = "Bearer "+token;
      setToken(jwt(t))
    }else{
      alert("please log in")
    }
  }, [])

  const location = useLocation();
  function handleViewBtn() {
    navigate(`/score`, { state: { id: token.id, name: token.user_name } })
  } return (
    <>
      <h3 style={{textAlign: "center"}}>{location.state.name}'s Dashboard</h3>
      <p style={{textAlign: "center"}}>User ID: {location.state.id}</p>


      {/* saghar */}
      <button onClick={handleViewBtn} style={{textAlign: "center"}}>View Challenge</button>
      {/* saghar */}
    </>
  );
}

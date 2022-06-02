import React from 'react';
import './Styles/Profile.css';
import { useLocation } from 'react-router-dom';
// saghar
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jwt from 'jwt-decode'
// saghar

export default function Profile() {
  // saghar
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

  // saghar
  const location = useLocation();
  function handleViewBtn() {
    navigate(`/score`, { state: { id: token.id, name: token.user_name } })
  }
  return (
    <>
      <div>{location.state.name}</div>
      <div>{location.state.id}</div>
      <h1>Dashboard</h1>
      {/* saghar */}
      <button onClick={handleViewBtn}>View Challenge</button>
      {/* saghar */}
    </>
  );
}
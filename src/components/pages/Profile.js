import React from 'react';
import './Styles/Profile.css';
import {useLocation} from 'react-router-dom';

export default function Profile() {
  const location = useLocation();
  return (
    <>
    <div>{location.state.name}</div>
    <div>{location.state.id}</div>
    <h1>Dashboard</h1>
    </>
  );
}

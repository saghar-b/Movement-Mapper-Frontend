import React from 'react';
import {useLocation} from 'react-router-dom';

export default function Challenges() {
  const location = useLocation();
  return (
    <>
    <div>{location.state.type}</div>
    <h1>Challenges</h1>
    </>
  );
}

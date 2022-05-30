import React from 'react';
import '../styles/Navbar.css';
// import  image from './Assets/saghar.jpeg'

function NavTabs({}) {
  return (
    <header >
      <nav className='navbar'>
        <div className='logo'>
          <img src="{image}" className="d-inline-block align-text-center  "></img>
          <h3>Challenger...?</h3>
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="/home"> Home </a>
          </li>
          <li className="nav-item" >
            <a className="nav-link active" href="/login"> Login </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavTabs;

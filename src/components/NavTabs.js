
import '../styles/Navbar.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode'
import M from '../assets/M.png'
import '../../src/global.css';


function NavTabs(props) {
  const [token, setToken] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const t = localStorage.getItem('SavedToken');
    if (t) {
      const token = jwt(t)
      setToken(jwt(t))
      props.setIsLoggedIn(true);

    } else {
      props.setIsLoggedIn(false);

    }
  }, [])

  // logout button click
  function handleLogout() {
    localStorage.setItem('SavedToken', "")
    props.setIsLoggedIn(false);
    navigate(`/login`);
  }

  //  login button click
  function handleLogin() {
    navigate(`/login`);
  }

  //  Dashboard button
  function handlePortfolio() {
    const tok = localStorage.getItem('SavedToken');
    if (tok) {
      navigate(`/profile/`, { state: { id: jwt(tok).id, name: jwt(tok).user_name } });
    } else {
      alert("Please log in")
    }
  }

  return (
    <header >
      <nav className='navbar'>
        <div className='logo'>
          <img src={M} className="d-inline-block align-text-center nav-img"></img>
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" href="/home"> Home </a>
          </li>
          {props.isLoggedIn &&
            <li className="nav-item" >
              <a className="nav-link active" onClick={handleLogout}> Logout </a>
            </li>
          }
          {props.isLoggedIn &&
            <li className="nav-item" >
              <a className="nav-link active" onClick={handlePortfolio}> Dashboard </a>
            </li>
          }
          {!props.isLoggedIn &&
            <li className="nav-item" > <a className="nav-link active" onClick={handleLogin} > Login </a> </li>
          }

        </ul>
      </nav>
    </header>
  );
}

export default NavTabs;

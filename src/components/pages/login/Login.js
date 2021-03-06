import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {getBaseUrl} from '../../../utils/API'


//  login to the website
function Login(props) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    if (name === 'userName') {
      setUserName(value);

    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // submit click button
  const handleFormSubmit = (e) => {
    const userObj = {
      user_name: userName,
      password: password,
    }
    e.preventDefault();

    fetch(`${getBaseUrl()}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      let token = res.token;
      localStorage.setItem("SavedToken",token);
      if (res.token) {
        props.setIsLoggedIn(true);
        navigate(`/profile/`, { state: { id: res.user.id, name: res.user.user_name } });

      } else {
        alert("login failed")
      }
    })

    setUserName('');
    setPassword('');
    setErrorMessage("")
  };

  return (
    <div className="login-form"  >
      <h2 className='login-title'>Login</h2>

      <div >

        <form className="form">
          <div>
            <input
              value={userName}
              name="userName"
              onChange={handleInputChange}
              type="text"
              placeholder="User Name"
            />
          </div>
          <div>

            <input
              value={password}
              name="password"
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
            />
          </div>

          <button className="button " type="button" onClick={handleFormSubmit}>
            Submit
          </button>
          <a href="/signup"> Sign Up! </a>
          {errorMessage && (
            <div>
              <p className="error-text">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>

    </div>

  );
}

export default Login;
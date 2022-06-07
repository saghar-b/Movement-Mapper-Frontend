import React, { useState } from 'react';
import './Signup.css';
// import { checkPassword, validateEmail } from '../../utils/helpers';
import { checkPassword, validateEmail } from '../../../utils/helpers';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {

    const { name, value } = e.target;

    if (name === 'userName') {
      setUserName(value);

    } else if (name === 'password') {
      setPassword(value);
    } else {
      setEmail(value)
    }
  };

  const handleFormSubmit = (e) => {
    const userObj = {
      user_name: userName,
      email: email,
      password: password,

    }
    e.preventDefault();
    if (!validateEmail(email) || !userName) {
      setErrorMessage('Email or username is invalid');

      return;

    }
    if (!checkPassword(password)) {
      setErrorMessage(
        `Choose a more secure password for the account: ${userName}`
      );
      return;
    }

    fetch("http://localhost:3001/api/users/signup", {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then(res => {
      let token = res.token;
      localStorage.setItem("SavedToken",token);
      if (res.token) {

        navigate(`/profile/`, { state: { id: res.user.id, name: res.user.user_name } });

      } else {
        alert("Signup failed")
      }
    })

    setUserName('');
    setPassword('');
    setEmail('')
    setErrorMessage('')
  };

  return (
    <div className ='signup-form'  >
      <h2 className = 'signup-title'>Signup</h2>

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
              value={email}
              name="email"
              onChange={handleInputChange}
              type="text"
              placeholder="Email Address"
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

          <button className="btn btn-outline-warning" type="button" onClick={handleFormSubmit}>
            Submit
          </button>

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

export default Signup;

import { useEffect, useState } from 'react';
import './Invite.css';
import { useLocation } from 'react-router-dom';
import { getBaseUrl } from '../../../utils/API'


function Invite() {

  let inviteObj = {
    challenge_id: 0,
    user_id: 0,
    distance: "0",
    join: false
  }
  const [userName, setUserName] = useState('');
  const [foundUser, setfoundUser] = useState(inviteObj);
  const [message, setmessage] = useState("");
  const location = useLocation();



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
    }
  };
  const handleFormSubmit = (e) => {
    if (userName === "") {
      alert("Please enter a valid name")
    }
    else {

    
    e.preventDefault();
    //   find the searched username
    fetch(`${getBaseUrl()}/user/${userName}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {
      if (data.msg != "NO") {
        setfoundUser(data)
      } else {
        setmessage("user name not found")
      }
    })

    
  }
  };
  const handleInviteBtn = async () => {
    if (userName === "") {
      alert("Please enter a valid name")
    }
    else { 
    const tokenrow = localStorage.getItem("SavedToken")
    console.log(tokenrow)
    if (tokenrow) {
      const t = "Bearer " + tokenrow;
      inviteObj = {
        challenge_id: location.state.challenge.id,
        user_id: foundUser.id,
        distance: "0",
        join: false
      }

      saveInvite(inviteObj)
    } else {

      alert("please log in")
    }
  }
  setUserName('');
  }
  async function saveInvite(inviteObj) {
    const response = await fetch(`${getBaseUrl()}/api/scores/invite`, {
      method: "POST",
      body: JSON.stringify(inviteObj),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("SavedToken")
      }

    })
    if (response.ok) {
      setmessage(`${foundUser.user_name} is invited to the challenge!!`)

    } else {

      setmessage(`${foundUser.user_name} is already joined`)

    }
  }



  return (
    <div className='inviteContainer'>
    <div className='inviteUser' >
      <p className='find'>Find user to invite to challenge: </p>
      <form className="form box">
        <div>
          <input
            value={userName}
            name="userName"
            onChange={handleInputChange}
            type="text"
            placeholder="User Name"
          />
        </div>

        <button id='searchBtn' className="btn btn-outline-warning" type="button" onClick={handleFormSubmit}>
          Search
        </button>
      </form>
      <div>
        {foundUser.id != 0 &&
          <div >
            <button className='button' onClick={handleInviteBtn}>Invite</button>
            <label>{foundUser.user_name}</label>
            <label>To</label>
            <label>{location.state.challenge.Challenge_name}</label>
            <label>Challenge</label>
          </div>
        }
        <label className='msg'>{message}</label>
      </div>
    </div>
    </div>
  )
}

export default Invite;

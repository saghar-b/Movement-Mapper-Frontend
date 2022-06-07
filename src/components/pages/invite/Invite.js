import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Invite.css';
// import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import jwt from 'jwt-decode'

function Invite() {

  let inviteObj = {
    challenge_id: 0,
    user_id: 0,
    distance: "0",
    join: false
  }
  const [userName, setUserName] = useState('');
  const [foundUser, setfoundUser] = useState(inviteObj);
  const [errMessage, seterrMessage] = useState("");
  const [message, setmessage] = useState("");
  const location = useLocation();



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
    }
  };
  const handleFormSubmit = (e) => {
console.log(userName)
    e.preventDefault();
    //   find the searched username
    fetch(`http://localhost:3001/user/${userName}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("SavedToken")
      }
    }).then(res => res.json()).then(data => {
      if (data.msg != "NO") {
        setfoundUser(data)
      } else {
        alert("user name not found")
      }
    })

    setUserName('');

  };
  const handleInviteBtn = async () => {
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
 async function saveInvite(inviteObj) {
    const response = await fetch("http://localhost:3001/api/scores/invite", {
      method: "POST",
      body: JSON.stringify(inviteObj),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("SavedToken")
      }

    })
    if (response.ok) {
      setmessage( `${foundUser.user_name} is invited to the challenge!!`)
      
    }else{
      console.log("joined already")
      seterrMessage( `${foundUser.user_name} is already joined`)
      // alert( `${location.state.challenge.Challenge_name} is already joined`)
    }
  }
  // console.log(inviteObj)


  return (
    <div className='inviteUser' >
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
        
        <button className="btn btn-outline-warning" type="button" onClick={handleFormSubmit}>
          Search
        </button>
      </form>
      <div>
      {foundUser.id !=0 &&
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

  )
}

export default Invite;

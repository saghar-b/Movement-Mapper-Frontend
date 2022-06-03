import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import dateFormat from "dateformat";

//drop down on form type AND/OR new option
//drop down menu for form unit
//creator id from local storage session
//add more to dropdown menu
function NewChallenge() {
    const navigate = useNavigate();
    const [formTitle, setTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formType, setFormType] = useState('');
    const [unit, setUnit] = useState("Mile")
    const [formStartDate, setFormStartDate] = useState(new Date());
    const [formEndDate, setFormEndDate] = useState(new Date());
    const [formPicture, setFormPicture] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'formTitle') {
            setTitle(value);
        } else if (name === 'formDescription') {
            setFormDescription(value);
        } else if (name === 'formType') {
            setFormType(value);
        } else if (name === 'formUnit') {
            setUnit(value);
        } else if (name === 'formStartDate') {
            setFormStartDate(value);
        } else if (name === 'formEndDate') {
            setFormEndDate(value);
        } else if (name === 'formPicture') {
            setFormPicture(value);
        }
    }

    const handleFormSubmit = (e) => {
        const t = localStorage.getItem('SavedToken');
        // setToken(jwt(t))
        console.log("jwt username ", jwt(t).user_name)
        console.log("jwt id ", jwt(t).id)


        const challengeObj = {
            Challenge_name: formTitle,
            description: formDescription,
            Challenge_type: formType,
            start_time: dateFormat(formStartDate, "isoUtcDateTime"),
            end_time: dateFormat(formEndDate, "isoUtcDateTime"),
            picture_path: formPicture,
            unit: unit,
            user_name: jwt(t).user_name,
            creator_id: jwt(t).id
        }
        console.log('challengeObj', challengeObj)


        fetch("http://localhost:3001/api/challenges/new", {
            method: "POST",
            body: JSON.stringify(challengeObj),
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + t
            }
        }).then(res => {
            if (res.ok) {
                console.log(res.json)
                insertToDB(jwt(t).id,formTitle)
                return res.json();
                
                alert("new challenge created!!")
            } else {
                throw res.json
                console.log('an error has occurred')
            }
        })


        setTitle('');
        setFormDescription('');
        setFormType('')
        setUnit('')
        setFormStartDate('')
        setFormEndDate('')
        setFormPicture('')
        e.preventDefault();
    };
    function insertToDB(userId,challenge_name) {
        console.log("vaghean")
        // get the new challenge id
        
        fetch(`http://localhost:3001/challenges/score/id/${challenge_name}`, {
            headers: {
                "Content-Type": "application/json",
                // authorization: "Bearer " + localStorage.getItem("SavedToken")
            }
        }).then(res => res.json()).then(newChallengesId => {
           const  addToScore = {
                challenge_id: newChallengesId.id,
                user_id: userId,
                distance: "0"
            }
            // save the new challge and user to the score
        fetch("http://localhost:3001/api/scores/new", {
            method: "POST",
            body: JSON.stringify(addToScore),
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("SavedToken")
            }
        })
            console.log("new challange id")
            console.log(addToScore)
            console.log(newChallengesId)
        })
    }

    return (
        <>
            <form className="form">
                <label>Title:</label>
                <input
                    type="text"
                    value={formTitle}
                    onChange={handleInputChange}
                    name="formTitle"
                />

                <label>Description:</label>
                <input
                    type="text"
                    value={formDescription}
                    onChange={handleInputChange}
                    name="formDescription"
                />

                <label>Type:</label>
                <input
                    type="text"
                    value={formType}
                    onChange={handleInputChange}
                    name="formType"
                />

                <label>Unit:</label>
                <select name="unit" value={unit} onChange={(e) => { setUnit(e.target.value) }}>
                    <option value="Mile">Mile</option>
                    <option value="km">km</option>
                </select>

                <label>Start:</label>
                <div>
                    <DatePicker name='formStartDate' selected={formStartDate} onChange={(date) => setFormStartDate(date)} />
                </div>

                <label>End:</label>
                <div>
                    <DatePicker name='formEndDate' selected={formEndDate} onChange={(date) => setFormEndDate(date)} />
                </div>

                <label>Picture?:</label>
                <input
                    type="text"
                    value={formPicture}
                    onChange={handleInputChange}
                    name="formPicture"
                />
                <input
                    type="submit"
                    value="Submit"
                    onClick={handleFormSubmit}
                />
            </form>
        </>
    )
}

export default NewChallenge;
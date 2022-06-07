import React, { useState, useEffect, Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';
import dateFormat from "dateformat";
import './NewChallenge.css'
import ImageUpload from '../imageUpload/ImageUpload';
import {getBaseUrl} from '../../../utils/API'


function NewChallenge() {
    const [token, setToken] = useState();
    const navigate = useNavigate();
    const [formTitle, setTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [formType, setFormType] = useState('Run');
    const [unit, setUnit] = useState("Mile")
    const [formStartDate, setFormStartDate] = useState(new Date());
    const [formEndDate, setFormEndDate] = useState(new Date());
    const [formPicture, setFormPicture] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [imagepath, setImagepath] = useState(`https://topnaija.ng/wp-content/uploads/2017/12/challenges.png`);
    
    
    useEffect(() => {
        setImagepath(imagepath);
    }, [])
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
        e.preventDefault();
        const t = localStorage.getItem('SavedToken');
        
        const challengeObj = {
            Challenge_name: formTitle,
            description: formDescription,
            Challenge_type: formType,
            start_time: dateFormat(formStartDate, "isoUtcDateTime"),
            end_time: dateFormat(formEndDate, "isoUtcDateTime"),
            picture_path: imagepath,
            unit: unit,
            user_name: jwt(t).user_name,
            creator_id: jwt(t).id
        }
        
        fetch(`${getBaseUrl()}/api/challenges/new`, {
            method: "POST",
            body: JSON.stringify(challengeObj),
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + t
            }
        }).then(res => {
            if (res.ok) {
                insertToDB(jwt(t).id,formTitle)
                alert("new challenge created!!")
                navigate(`/profile/`, { state: { id: jwt(t).id, name: jwt(t).user_name } });
                // return res.json();
                
                
            } else {
                throw res.json
            }
        })


        setTitle('');
        setFormDescription('');
        setFormType('')
        setUnit('')
        setFormStartDate('')
        setFormEndDate('')
        setFormPicture('')
    };
    function insertToDB(userId,challenge_name) {
        // get the new challenge id
        fetch(`${getBaseUrl()}/challenges/score/id/${challenge_name}`, {
            headers: {
                "Content-Type": "application/json",
                // authorization: "Bearer " + localStorage.getItem("SavedToken")
            }
        }).then(res => res.json()).then(newChallengesId => {
           const  addToScore = {
                challenge_id: newChallengesId.id,
                user_id: userId,
                distance: "0",
                join :true
            }
            // save the new challge and user to the score
        fetch(`${getBaseUrl()}/api/scores/new`, {
            method: "POST",
            body: JSON.stringify(addToScore),
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("SavedToken")
            }
        })
            
        })
    }

    return (
        <div className="newchallenge-form">
        <div className = 'challengeform-container'>
            <form className="form" onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    value={formTitle}
                    onChange={handleInputChange}
                    name="formTitle"
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    value={formDescription}
                    onChange={handleInputChange}
                    name="formDescription"
                />

                <label>Type:</label>
                <select name="type" value={formType} onChange={(e) => { setFormType(e.target.value) }}>
                    <option value="Run">Run</option>
                    <option value="Bike">Bike</option>
                    <option value="Hike">Hike</option>
                    <option value="Walk">Walk</option>
                    <option value="Swim">Swim</option>
                    <option value="Weights">Weights</option>
                    <option value="Row">Row</option>
                </select>

                <label>Unit:</label>
                <select name="unit" value={unit} onChange={(e) => { setUnit(e.target.value) }}>
                    <option value="mile">Mile</option>
                    <option value="km">km</option>
                    <option value="feet">Feet</option>
                    <option value="meter">Meter</option>
                    <option value="rep">Rep</option>
                </select>

                <label>Start:</label>
                <div>
                    <DatePicker name='formStartDate' selected={formStartDate} onChange={(date) => setFormStartDate(date)} />
                </div>

                <label>End:</label>
                <div>
                    <DatePicker name='formEndDate' selected={formEndDate} onChange={(date) => setFormEndDate(date)} />
                </div>

                <label>Picture:</label>
                <ImageUpload setImagepath={setImagepath}></ImageUpload>
                <img src={imagepath}/>
                
                <button
                    type="submit"
                    value="Submit"
                    className="challenge-submit-btn">
                        Submit
                </button>
                <div id="challenge-confirmation"></div>

            </form>
        </div>
        </div>
    )
}

export default NewChallenge;
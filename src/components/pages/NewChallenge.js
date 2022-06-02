import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import jwt from 'jwt-decode';


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
        const {name, value} = e.target;

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
        console.log(jwt(t).user_name)

        const challengeObj = {
          Challenge_name: formTitle,
          description: formDescription,
          Challenge_type: formType,
          start_time: formStartDate,
          end_time: formEndDate,
          picture_path: formPicture,
          unit: unit,
          creator_id: jwt(t).user_name
        }
        console.log('challengeObj', challengeObj)
    

        fetch("http://localhost:3001/api/challenges/new", {
        method: "POST",
        body: JSON.stringify(challengeObj),
        headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("SavedToken")
        }
        }).then(res => {
            if (res.ok){
                console.log(res.json)
                return res.json();
            } else{
                throw res.json
            }})
            

        setTitle('');
        setFormDescription('');
        setFormType('')
        setUnit('')
        setFormStartDate('')
        setFormEndDate('')
        setFormPicture('')
        e.preventDefault();
    };

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
            <option value="KM">km</option>
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
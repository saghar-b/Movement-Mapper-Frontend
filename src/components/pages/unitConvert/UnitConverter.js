
import React, {  useState } from 'react';
const converter = require('length-distance-converter')

export default function UnitConverter(props) {
  
  const [unit, setUnit] = useState("Mile")
  const [originalValue, setOriginalValue] = useState("Mile")
  

  const handleFormSubmit = e => {
    e.preventDefault();
    if(unit==="mile")
    {
     props.setScore( converter.kmToMiles(originalValue))
    }
    else if(unit==="km"){
      props.setScore(converter.milesToKm(originalValue))
 
    }
    else if(unit==="feet"){
      props.setScore( converter.metersToFeet(originalValue))
 
    }
    else if(unit==="meter"){
      props.setScore( converter.feetToMeter(originalValue))
 
    }
   
  }
  return (
    <>

      <h1>Unit Conventor</h1>
      <form className="Form" onSubmit={handleFormSubmit}>
        <input placeholder="0" name="originalalue" type="number" value={originalValue} onChange={(e) => { setOriginalValue(e.target.value) }} />
       {/* <label>{props.challenge.unit}</label> */}
        <select name="unit" value={unit} onChange={(e) => { setUnit(e.target.value) }}>
          <option value="mile">km to mile</option>
          <option value="km">mile to km</option>
          <option value="feet">meter to feet</option>
          <option value="meter">feet to meter</option>

        </select>
        <button>Convert!</button>
      </form>

    </>
  );
}

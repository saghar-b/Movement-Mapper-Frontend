
import React, {  useState } from 'react';


export default function UnitConverter(props) {
  
  const [unit, setUnit] = useState("Mile")
  const [originalValue, setOriginalValue] = useState("Mile")
  

  const handleFormSubmit = e => {
    e.preventDefault();
    if(unit==="Mile")
    {
     props.setScore( originalValue*1.60934)
    }
    else{
      props.setScore( originalValue*0.621371)
 
    }
   
  }
  return (
    <>

      <h1>Unit Conventor</h1>
      <form className="Form" onSubmit={handleFormSubmit}>
        <input placeholder="0" name="originalalue" type="number" value={originalValue} onChange={(e) => { setOriginalValue(e.target.value) }} />
       {/* <label>{props.challenge.unit}</label> */}
        <select name="unit" value={unit} onChange={(e) => { setUnit(e.target.value) }}>
          <option value="Mile">Mile</option>
          <option value="KM">km</option>

        </select>
        <button>Convert!</button>
      </form>

    </>
  );
}

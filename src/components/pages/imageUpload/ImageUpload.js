import React, { useState, useEffect, Component } from 'react';
// const [imagepath, setImagepath] = useState('');

function ImageUpload (props) {
 
  useEffect(() => {
    let widget = window.cloudinary.createUploadWidget({ 
      cloud_name: `dsnhj09ev`,
      upload_preset: `zwk7ryyh`}, 
   (error, result) => {
     if (!error && result) { 
       props.setImagepath(result[0].secure_url)
     console.log("result.secure_url"); 
     console.log(result[0].secure_url); 
   
   }});
   document.getElementById("upload_widget").addEventListener(
     "click",
     function () {
       widget.open();
     },
     false
   );
}, [])


 
    return (
      <button id="upload_widget" className="cloudinary-button" type='button'>
        Upload
      </button>
    );
  }

export default ImageUpload;
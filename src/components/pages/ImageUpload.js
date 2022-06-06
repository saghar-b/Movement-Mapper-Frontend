import React, { useState, useEffect, Component } from 'react';
// const [imagepath, setImagepath] = useState('');

function ImageUpload (props) {
  // constructor(props){
  //    super(props);
  //    this.state = {
  //     name:"saghar",
  //     props.setIm
  //    };
  //  }
  //  setname(name){
  //    this.state.name=name
  //  }
 
  useEffect(() => {
    let widget = window.cloudinary.createUploadWidget({ 
      cloud_name: `dsnhj09ev`,
      upload_preset: `zwk7ryyh`}, 
   (error, result) => {
     if (!error && result) { 
       props.setImagepath(result[0].secure_url)
     console.log("result.secure_url"); 
     console.log(result[0].secure_url); 
    //  props.set(result[0].secure_url)
    //  this.state.setname(result[0].secure_url)
    //  console.log(this.state.name); 
     // res.json({securena_url:result.secure_url})
     // console.log("secure url", result.secure_url)
    //  console.log("result", result)
   }});
   document.getElementById("upload_widget").addEventListener(
     "click",
     function () {
       widget.open();
     },
     false
   );
}, [])

//     componentDidMount(){
//     let widget = window.cloudinary.createUploadWidget({ 
//        cloud_name: `dsnhj09ev`,
//        upload_preset: `zwk7ryyh`}, 
//     (error, result) => {
// console.log(result)
//       if (!error && result) { 
//         // this.props.setImagepath(result[0].secure_url)
//       console.log("result.secure_url"); 
//       console.log(result[0].secure_url); 
//       this.props.getUrl(result[0].secure_url)
//       this.state.setname(result[0].secure_url)
//       console.log(this.state.name); 
//       // res.json({securena_url:result.secure_url})
//       // console.log("secure url", result.secure_url)
//       console.log("result", result)
//     }});
//     document.getElementById("upload_widget").addEventListener(
//       "click",
//       function () {
//         widget.open();
//       },
//       false
//     );
//   }

  // render() {
    return (
      <button id="upload_widget" className="cloudinary-button" type='button'>
        Upload
      </button>
    );
  }
// }
export default ImageUpload;
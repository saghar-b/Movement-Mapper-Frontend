// import React from 'react';
import './Styles/Score.css';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Log from './Log';
import jwt from 'jwt-decode'
// import Canvas from './Canvas'
// import CanvasJSReact from './canvasjs.react';
import CanvasJSReact from '../../assets/canvasjs.react';
//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({scores}) {

  
  console.log("scores")
  // console.log(scores)
let data =[];
scores.forEach(element => {
  data.push({label: element.user_name,  y: parseInt(element.score.distance)})
});
console.log(data)
  const options = {
    title: {
      text: "Leaderboard Chart"
    },
    data: [{				
              type: "column",
              dataPoints: data
     }]
 }
 
  return (
    <>
     <div>
        <CanvasJSChart options = {options}
        />
      </div>
    
    </>
  );
}

<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

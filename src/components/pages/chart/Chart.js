

import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../../../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({ scores }) {
  let data = [];
  scores.forEach(element => {
    data.push({ label: element.user_name, y: parseInt(element.score.distance) })
  });
  const options = {
    title: {
      text: "."
    },
    data: [{
      type: "column",
      dataPoints: data
    }]
  }

  return (
    <>
      <div>
        <CanvasJSChart options={options}
        />
      </div>

    </>
  );
}

<script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

import React, { Component, useRef } from "react";
import Chart from "chart.js/auto";
import { useState, useEffect } from "react";




const BarChart = ({ data, options }) => {
  const canvasRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  

  useEffect(() => {
    const chartInstance = new Chart(canvasRef.current, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      
      chartInstance.destroy();
    };
  }, [data, options]);

  return (
    
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default BarChart;

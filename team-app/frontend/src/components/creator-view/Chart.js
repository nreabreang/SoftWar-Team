import React, { useRef } from "react";
import Chart from "chart.js/auto";
import { useEffect } from "react";

Chart.defaults.font.size = 14;
Chart.defaults.color = '#263159';
Chart.defaults.font.family = 'Metro-B';

const BarChart = ({ data, options }) => {
    const canvasRef = useRef(null);

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
        <canvas ref={canvasRef} />
    );
};

export default BarChart;

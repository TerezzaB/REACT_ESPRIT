import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

export default function MeteoView (){
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Replace with desired coordinates
    const lat = 52.2330224;
    const lon = 20.9911552;
    
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post('https://devmgramapi.meteo.pl/meteorograms/um4_60', {
          lat,
          lon,
        });
        console.log(response);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };
    fetchWeatherData();
  }, []);

  // Example function to format data for ECharts (you need to adjust based on actual API response structure)
  const processDataForChart = () => {
    if (!weatherData) return {};

    const times = weatherData.times; // Replace with actual time data from API
    const temperatures = weatherData.temperatures; // Replace with actual temperature data

    return {
      xAxis: {
        type: 'category',
        data: times,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: temperatures,
          type: 'line',
        },
      ],
    };
  };

  return (
    <div>
      <h2>Meteo Information</h2>
      {weatherData ? (
        <ReactECharts option={processDataForChart()} />
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};


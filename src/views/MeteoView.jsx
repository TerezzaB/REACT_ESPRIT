import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";

export default function MeteoView() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [todayDate, setToday] = useState('');

    const fetchWeatherData = async () => {
        try {
            // const timestamp = Math.floor(Date.now() / 1000);  // idk why not working - gonna find out later

            const requestBody = {
                date: 1738562400,
                point: {
                    lat: "60.1674881",
                    lon: "24.9427473",
                },
            };

            const response = await axios.post("/api/meteorograms/um4_60", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("API Response:", response.data);  // DELETE later
            setWeatherData(response.data);
            const formattedDate = new Date(response.data.fstart).toLocaleDateString("sk-SK", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
            setToday(formattedDate);
            console.log(todayDate);
        } catch (err) {
            console.error("Error fetching weather data", err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    const getChartOptions = () => {
        if (!weatherData || !weatherData.data || !weatherData.data.airtmp_point) {
          return {};
        }
      
        const tempData = weatherData.data.airtmp_point.data;
        const firstTimestamp = parseInt(weatherData.data.airtmp_point.first_timestamp, 10);
        const interval = parseInt(weatherData.data.airtmp_point.interval, 10);
      
        // X axis
        const timeData = tempData.map((_, index) => {
          const timestamp = firstTimestamp + index * interval; // timestamp countig here
          return new Date(timestamp * 1000).toLocaleTimeString("sk-SK", {
            hour: "2-digit",
            minute: "2-digit",
          });
        });
      
        return {
          title: { text: `Temperatures: ${todayDate}` },
          tooltip: {
            trigger: "axis",
            formatter: (params) => {
              const dataIndex = params[0].dataIndex;
              const dateTime = timeData[dataIndex];
              const temp = params[0].value;
      
              return `Time: <b>${dateTime}</b><br>Temperature: <b>${temp}°C</b>`;
            },
          },
          xAxis: {
            type: "category",
            data: timeData,
            axisLabel: { rotate: 45 },
          },
          yAxis: {
            type: "value",
            name: "Temperature (°C)",
          },
          series: [
            {
              name: "Temperature",
              type: "line",
              data: tempData,
              smooth: true,
              itemStyle: { color: "pink" },
            },
          ],
        };
      };
      

    return (
        <div className="mt-5">
            {error && <p style={{ color: "red" }}>Loading Error</p>}
            {weatherData ? <ReactECharts option={getChartOptions()} /> : <p>Loading data...</p>}
        </div>
    );
};

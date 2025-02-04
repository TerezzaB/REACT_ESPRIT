import React, { useState, useEffect } from "react";
import axios from "axios";
import TemperatureChart from "../components/charts/TemperatureChart";
import RainfallChart from "../components/charts/RainfallChart";

export default function MeteoView() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [todayDate, setToday] = useState('');

    const fetchWeatherData = async () => {
        try {
            // Create a new Date object representing the current date and time.
            const now = new Date();

            // Create a new Date object set to UTC midnight of the current date.
            const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));

            // Calculate the timestamp in seconds since Unix epoch for UTC midnight.
            const midnightTimestamp = Math.floor(utcMidnight.getTime() / 1000);

            const requestBody = {
                date: midnightTimestamp,
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

            setWeatherData(response.data);

            const formattedDate = new Date(response.data.fstart);
            if (isNaN(formattedDate.getTime())) {
                console.error("Invalid date:", response.data.fstart);
            } else {
                const formattedDateString = formattedDate.toLocaleDateString("sk-SK", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                });
                setToday(formattedDateString);
            }
            
        } catch (err) {
            console.error("Error fetching weather data", err);
            setError(err);
        }
    };




    useEffect(() => {
        fetchWeatherData();
    }, []);

    return (
        <div className="mt-5">
            <h3 className="text-left">Weather forecast: {todayDate}</h3>
            {error && <p style={{ color: "red" }}>Loading Error</p>}
            {weatherData ? (
                <>
                    <TemperatureChart weatherData={weatherData} todayDate={todayDate} />
                    <RainfallChart weatherData={weatherData} todayDate={todayDate} />
                </>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
};

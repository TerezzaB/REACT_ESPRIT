import axios from "axios";
import React, { useState, useEffect } from "react";

export default function MeteoView() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeatherData = async () => {
        try {
            //const timestamp = Math.floor(Date.now() / 1000); //toto teraz nie

            const requestBody = {
                date: 1738562400,
                point: {
                    lat: "52.1674881",
                    lon: "20.9427473"
                }
            };

            const response = await axios.post("/api/meteorograms/um4_60", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setWeatherData(response.data);
        } catch (err) {
            console.error("Error fetching weather data", err);
            setError(err);
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, []);

    return (
        <div>
            <h2>Meteorologické údaje</h2>
            {error && <p style={{ color: "red" }}>Chyba pri načítaní údajov.</p>}
            {weatherData ? (
                <pre>{JSON.stringify(weatherData, null, 2)}</pre>
            ) : (
                <p>Načítavam dáta...</p>
            )}
        </div>
    );
};



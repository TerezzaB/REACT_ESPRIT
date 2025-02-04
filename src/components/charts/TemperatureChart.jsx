import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

export default function TemperatureChart({ weatherData }) {
    const [maxCoord, setMaxCoord] = useState(null);
    const [minCoord, setMinCoord] = useState(null);

    useEffect(() => {
        if (!weatherData || !weatherData.data || !weatherData.data.airtmp_point) {
            return;
        }

        const tempData = weatherData.data.airtmp_point.data;
        const firstTimestamp = parseInt(weatherData.data.airtmp_point.first_timestamp, 10);
        const interval = parseInt(weatherData.data.airtmp_point.interval, 10);

        // Find the max and min temperatures and their indexes
        const maxTemp = Math.max(...tempData);
        const minTemp = Math.min(...tempData);
        const maxIndex = tempData.indexOf(maxTemp);
        const minIndex = tempData.indexOf(minTemp);

        // X axis time data with date (DD.MM)
        const timeData = tempData.map((_, index) => {
            const timestamp = firstTimestamp + index * interval;
            const date = new Date(timestamp * 1000);
            const time = date.toLocaleTimeString("sk-SK", {
                hour: "2-digit",
                minute: "2-digit",
            });
            const dateString = date.toLocaleDateString("sk-SK", {
                day: "2-digit",
                month: "2-digit",
            });
            return `${time} ${dateString}`;  // Time + Day.Month
        });

        // Set the coordinates for max and min values with date
        const maxCoord = [timeData[maxIndex], maxTemp];
        const minCoord = [timeData[minIndex], minTemp];

        setMaxCoord(maxCoord);
        setMinCoord(minCoord);

    }, [weatherData]); // Runs only when `weatherData` is updated

    if (!weatherData || !weatherData.data || !weatherData.data.airtmp_point) {
        return <p>No data available</p>;
    }

    const tempData = weatherData.data.airtmp_point.data;
    const firstTimestamp = parseInt(weatherData.data.airtmp_point.first_timestamp, 10);
    const interval = parseInt(weatherData.data.airtmp_point.interval, 10);

    // X axis time data with date (DD.MM)
    const timeData = tempData.map((_, index) => {
        const timestamp = firstTimestamp + index * interval;
        const date = new Date(timestamp * 1000);
        const time = date.toLocaleTimeString("sk-SK", {
            hour: "2-digit",
            minute: "2-digit",
        });
        const dateString = date.toLocaleDateString("sk-SK", {
            day: "2-digit",
            month: "2-digit",
        });
        return `${time} ${dateString}`;  // Time + Day.Month
    });

    // Date for tooltip (DD.MM.YYYY)
    const dateData = tempData.map((_, index) => {
        const timestamp = firstTimestamp + index * interval;
        return new Date(timestamp * 1000).toLocaleDateString("sk-SK", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    });

    const chartOptions = {
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                const dataIndex = params[0].dataIndex;
                const dateTime = timeData[dataIndex];
                const date = dateData[dataIndex];
                const temp = params[0].value;

                return `Date: <b>${date}</b><br>Time: <b>${dateTime}</b><br>Temperature: <b>${temp}°C</b>`;
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
                itemStyle: { color: "magenta" },
                markPoint: {
                    data: [
                        maxCoord && {
                            type: 'max', 
                            name: 'Max Temperature', 
                            coord: maxCoord, 
                            itemStyle: { color: 'red' } 
                        },
                        minCoord && {
                            type: 'min', 
                            name: 'Min Temperature', 
                            coord: minCoord, 
                            itemStyle: { color: 'blue' } 
                        }
                    ].filter(Boolean), // Remove null/undefined values
                    symbol: 'circle',  
                    symbolSize: 10,
                },
            },
        ],
    };

    return <ReactECharts option={chartOptions} />;
}

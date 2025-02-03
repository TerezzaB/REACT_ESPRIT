import React from "react";
import ReactECharts from "echarts-for-react";

export default function TemperatureChart({ weatherData }) {
    if (!weatherData || !weatherData.data || !weatherData.data.airtmp_point) {
        return <p>No data available</p>;
    }

    const tempData = weatherData.data.airtmp_point.data;
    const firstTimestamp = parseInt(weatherData.data.airtmp_point.first_timestamp, 10);
    const interval = parseInt(weatherData.data.airtmp_point.interval, 10);

    // X axis
    const timeData = tempData.map((_, index) => {
        const timestamp = firstTimestamp + index * interval;
        return new Date(timestamp * 1000).toLocaleTimeString("sk-SK", {
            hour: "2-digit",
            minute: "2-digit",
        });
    });

    const chartOptions = {
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

    return <ReactECharts option={chartOptions} />;
}

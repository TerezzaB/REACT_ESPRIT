import React from "react";
import ReactECharts from "echarts-for-react";

export default function RainfallChart({ weatherData }) {
    if (!weatherData || !weatherData.data || !weatherData.data.pcpttl_aver) {
        return <p>No data available</p>;
    }

    const rainData = weatherData.data.pcpttl_aver.data;
    const rainProbData = weatherData.data.pcpttlprob_point.data; 
    console.log( weatherData.data);
    const firstTimestamp = parseInt(weatherData.data.pcpttl_aver.first_timestamp, 10);
    const interval = parseInt(weatherData.data.pcpttl_aver.interval, 10);

    // X axis
    const timeData = rainData.map((_, index) => {
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
                const rain = params[0].value;
                const rainProb = rainProbData[dataIndex];

                return `Time: <b>${dateTime}</b><br>Rainfall: <b>${rain} mm</b><br>Rain probability: <b>${rainProb} %</b>`;
            },
        },
        xAxis: {
            type: "category",
            data: timeData,
            axisLabel: { rotate: 45 },
        },
        yAxis: {
            type: "value",
            name: "Rainfall (mm)",
        },
        series: [
            {
                name: "Rainfall",
                type: "bar",
                data: rainData,
                itemStyle: { color: "cyan" },
            },
        ],
    };

    return <ReactECharts option={chartOptions} />;
}

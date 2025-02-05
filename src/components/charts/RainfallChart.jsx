import React from "react";
import ReactECharts from "echarts-for-react";

export default function RainfallChart({ weatherData }) {
    if (!weatherData || !weatherData.data || !weatherData.data.pcpttl_aver) {
        return <p>No data available</p>;
    }

    const rainData = weatherData.data.pcpttl_aver.data;
    const rainProbData = weatherData.data.pcpttlprob_point.data;
    const maxRainData = weatherData.data.pcpttl_max.data; // Maximálne zrážky

    const firstTimestamp = parseInt(weatherData.data.pcpttl_aver.first_timestamp, 10);
    const interval = parseInt(weatherData.data.pcpttl_aver.interval, 10);

    // X axis
   // X axis - najprv čas, potom dátum
const timeData = rainData.map((_, index) => {
    const timestamp = firstTimestamp + index * interval;
    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString("sk-SK", {
        hour: "2-digit",
        minute: "2-digit",
    });
});


    // Date for tooltip (DD.MM.YYYY)
    const dateData = rainData.map((_, index) => {
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
                const rain = params[0].value;
                const rainProb = rainProbData[dataIndex];
                const maxRain = maxRainData[dataIndex];

                return `Date: <b>${date}</b><br>Time: <b>${dateTime}</b><br>Rainfall: <b>${rain} mm</b><br>Max Rainfall: <b>${maxRain} mm</b><br>Rain probability: <b>${rainProb} %</b>`;
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
                barWidth: 10,
            },
            {
                name: "Max Rainfall",
                type: "bar",
                data: maxRainData,
                itemStyle: { color: "magenta" },
                barWidth: 3,
                symbol: "none",
                label: {
                    show: false,
                }
            },
        ],
    };

    return <ReactECharts option={chartOptions} />;
}

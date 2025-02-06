import React from "react";
import ReactECharts from "echarts-for-react";

export default function WeatherChart({ weatherData }) {
    if (!weatherData || !weatherData.data) {
        return <p>No data available</p>;
    }

    // Temperature data
    const tempData = weatherData.data.airtmp_point?.data || [];
    const tempFirstTimestamp = parseInt(weatherData.data.airtmp_point?.first_timestamp || 0, 10);
    const tempInterval = parseInt(weatherData.data.airtmp_point?.interval || 1, 10);
    const tempMax = Math.max(...tempData);
    const tempMin = Math.min(...tempData);

    // Rainfall data
    const rainData = weatherData.data.pcpttl_aver?.data || [];
    const maxRainData = weatherData.data.pcpttl_max?.data || [];

    // Generate X-axis time labels
    const maxLength = Math.max(tempData.length, rainData.length);
    const timeData = Array.from({ length: maxLength }, (_, index) => {
        const timestamp = tempFirstTimestamp + index * tempInterval;
        return new Date(timestamp * 1000).toLocaleTimeString("sk-SK", {
            hour: "2-digit",
            minute: "2-digit",
        });
    });

    const dateData = Array.from({ length: maxLength }, (_, index) => {
        const timestamp = tempFirstTimestamp + index * tempInterval;
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
                return `Date: <b>${dateData[dataIndex]}</b><br>Time: <b>${timeData[dataIndex]}</b><br>
                ${params.map(p => `${p.seriesName}: <b>${p.value}${p.seriesName === "Temperature" ? "°C" : " mm"}</b>`).join("<br>")}`;
            },
        },
        grid: [
            { left: "10%", right: "10%", top: "5%", height: "35%" }, // Grid for temperature
            { left: "10%", right: "10%", top: "50%", height: "35%" }, // Grid for rainfall
        ],
        xAxis: [
            {
                type: "category",
                data: timeData,
                axisLabel: { rotate: 45 },
                position: "top",
                gridIndex: 0, // X-axis for temperature chart
            },
            {
                type: "category",
                data: timeData,
                axisLabel: { show: false }, // Skryť dolnú os, aby nebola duplikovaná
                gridIndex: 1, // X-axis for rainfall chart (táto je skrytá)
            },
        ],
        yAxis: [
            { type: "value", name: "Temperature (°C)", gridIndex: 0 },
            { type: "value", name: "Rainfall (mm)", gridIndex: 1 },
        ],
        series: [
            {
                name: "Temperature",
                type: "line",
                data: tempData,
                smooth: true,
                xAxisIndex: 0,
                yAxisIndex: 0,
                itemStyle: { color: "magenta" },
                markPoint: {
                    data: [
                        { type: "max", name: "Max Temperature" },
                        { type: "min", name: "Min Temperature" },
                    ],
                    symbol: "circle",
                    symbolSize: 15,
                    label: { show: false },
                },
            },
            {
                name: "Rainfall",
                type: "bar",
                data: rainData,
                xAxisIndex: 1, // Musí používať správny xAxisIndex
                yAxisIndex: 1,
                itemStyle: { color: "cyan" },
                barWidth: 10,
            },
            {
                name: "Max Rainfall",
                type: "bar",
                data: maxRainData,
                xAxisIndex: 1,
                yAxisIndex: 1,
                itemStyle: { color: "magenta" },
                barWidth: 3,
            },
        ],
    };

    return <ReactECharts option={chartOptions} style={{ height: "700px", marginTop: "50px" }} />;
}

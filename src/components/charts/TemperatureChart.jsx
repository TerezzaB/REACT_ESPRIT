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
    const rainProbData = weatherData.data.pcpttlprob_point?.data || [];
    const rainFirstTimestamp = parseInt(weatherData.data.pcpttl_aver?.first_timestamp || 0, 10);
    const rainInterval = parseInt(weatherData.data.pcpttl_aver?.interval || 1, 10);

    // Generate X-axis time labels
    const maxLength = Math.max(tempData.length, rainData.length);
    const timeData = Array.from({ length: maxLength }, (_, index) => {
        const timestamp = tempFirstTimestamp + index * tempInterval;
        return new Date(timestamp * 1000).toLocaleTimeString("sk-SK", {
            hour: "2-digit",
            minute: "2-digit",
        });
    });

    // Date for tooltip (DD.MM.YYYY)
    const dateData = Array.from({ length: maxLength }, (_, index) => {
        const timestamp = tempFirstTimestamp + index * tempInterval;
        return new Date(timestamp * 1000).toLocaleDateString("sk-SK", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    });

    const tempChartOptions = {
        title: { text: "Temperature Chart" },
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                const dataIndex = params[0].dataIndex;
                return `Date: <b>${dateData[dataIndex]}</b><br>Time: <b>${timeData[dataIndex]}</b><br>Temperature: <b>${params[0].value}°C</b><br>Min Temperature: <b>${tempMin}°C</b><br>Max Temperature: <b>${tempMax}°C</b>`;
            },
        },
        xAxis: { type: "category", data: timeData, axisLabel: { rotate: 45 } },
        yAxis: { type: "value", name: "Temperature (°C)" },
        series: [
            {
                name: "Temperature",
                type: "line",
                data: tempData,
                smooth: true,
                itemStyle: { color: "magenta" },
                markPoint: {
                    label: { show: false },
                    tooltip: { show: false },
                    data: [
                        { type: "max", name: "Max Temperature", itemStyle: { color: "cyan", borderColor: "magenta" } },
                        { type: "min", name: "Min Temperature", itemStyle: { color: "cyan", borderColor: "magenta" } },
                    ],
                    symbol: "circle",
                    symbolSize: 15,
                },
            },
        ],
    };

    const rainChartOptions = {
        title: { text: "Rainfall Chart" },
        tooltip: {
            trigger: "axis",
            formatter: (params) => {
                const dataIndex = params[0].dataIndex;
                return `Date: <b>${dateData[dataIndex]}</b><br>Time: <b>${timeData[dataIndex]}</b><br>Rainfall: <b>${rainData[dataIndex]} mm</b><br>Max Rainfall: <b>${maxRainData[dataIndex]} mm</b><br>Rain probability: <b>${rainProbData[dataIndex]} %</b>`;
            },
        },
        xAxis: { type: "category", data: timeData, axisLabel: { rotate: 45 } },
        yAxis: { type: "value", name: "Rainfall (mm)" },
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

    return (
        <div>
            <ReactECharts option={tempChartOptions} />
            <ReactECharts option={rainChartOptions} />
        </div>
    );
}

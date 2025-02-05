import React from "react";
import ReactECharts from "echarts-for-react";

export default function TemperatureChart({ weatherData }) {
    if (!weatherData || !weatherData.data || !weatherData.data.airtmp_point) {
        return <p>No data available</p>;
    }

    const tempData = weatherData.data.airtmp_point.data;
    const firstTimestamp = parseInt(weatherData.data.airtmp_point.first_timestamp, 10);
    const interval = parseInt(weatherData.data.airtmp_point.interval, 10);

    // X axis time data - update: Only Time (HH:MM)
    const timeData = tempData.map((_, index) => {
        const timestamp = firstTimestamp + index * interval;
        return new Date(timestamp * 1000).toLocaleTimeString("sk-SK", {
            hour: "2-digit",
            minute: "2-digit",
        });
    });

    // Date for tooltip here (DD.MM.YYYY)
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

    return <ReactECharts option={chartOptions} />;
}

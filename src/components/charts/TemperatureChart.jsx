import React from "react";
import ReactECharts from "echarts-for-react";

export default function WeatherChart({ weatherData }) {
    if (!weatherData || !weatherData.data) {
        return <p>No data available</p>;
    }

    const tempData = weatherData.data.airtmp_point?.data || [];
    const tempFirstTimestamp = parseInt(weatherData.data.airtmp_point?.first_timestamp || 0, 10);
    const tempInterval = parseInt(weatherData.data.airtmp_point?.interval || 1, 10);

    const rainData = weatherData.data.pcpttl_aver?.data || [];
    const maxRainData = weatherData.data.pcpttl_max?.data || [];
    const rainProbability = weatherData.data.pcpttlprob_point?.data || [];

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

    // Logika pre správne vyfarbenie dní
    const markAreas = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    let currentDay = null;
    let startIndex = 0;

    dateData.forEach((date, index) => {
        const parsedDate = new Date(date.split(".").reverse().join("-")); // Konverzia formátu dd.mm.yyyy na Date objekt
        parsedDate.setHours(0, 0, 0, 0);

        if (currentDay === null) {
            currentDay = parsedDate;
            startIndex = index;
        }

        if (parsedDate.getTime() !== currentDay.getTime()) {
            let backgroundColor = "rgba(255, 255, 255, 0.5)"; // Defaultne biela
            if (currentDay.getTime() === tomorrow.getTime()) {
                backgroundColor = "rgba(240, 240, 240, 0.5)"; // Sivá pre zajtrajšok
            }

            markAreas.push([
                { xAxis: startIndex, itemStyle: { color: backgroundColor } },
                { xAxis: index }
            ]);

            currentDay = parsedDate;
            startIndex = index;
        }
    });

    let finalBackgroundColor = "rgba(255, 255, 255, 0.5)";
    if (currentDay.getTime() === tomorrow.getTime()) {
        finalBackgroundColor = "rgba(255, 253, 253, 0.5)";
    }

    markAreas.push([
        { xAxis: startIndex, itemStyle: { color: finalBackgroundColor } },
        { xAxis: dateData.length - 1 }
    ]);

    const chartOptions = {
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross" }
        },
        axisPointer: {
            link: [{ xAxisIndex: [0, 1] }],
            label: { backgroundColor: "#777" },
        },
        grid: [
            { left: "10%", right: "10%", top: "5%", height: "35%" },
            { left: "10%", right: "10%", top: "50%", height: "35%" },
        ],
        xAxis: [
            { type: "category", data: timeData, position: "top", gridIndex: 0 },
            { type: "category", data: timeData, gridIndex: 1 },
        ],
        yAxis: [
            { type: "value", name: "Temperature (°C)", gridIndex: 0 },
            { type: "value", name: "Rainfall (mm)", gridIndex: 1 },
        ],
        series: [
            { name: "Temperature", type: "line", data: tempData, xAxisIndex: 0, yAxisIndex: 0, itemStyle: { color: "magenta" }, markArea: { silent: true, data: markAreas }, markPoint: { data: [{ type: "max" }, { type: "min" }], symbol: "circle", symbolSize: 15, label: { show: false } } },
            { name: "Rainfall", type: "bar", data: rainData, xAxisIndex: 1, yAxisIndex: 1, itemStyle: { color: "cyan" }, barWidth: 10, markArea: { silent: true, data: markAreas } },
            { name: "Max Rainfall", type: "bar", data: maxRainData, xAxisIndex: 1, yAxisIndex: 1, itemStyle: { color: "magenta" }, barWidth: 3, markArea: { silent: true, data: markAreas } },
        ],
    };

    return <ReactECharts option={chartOptions} style={{ height: "700px", marginTop: "50px" }} />;
}

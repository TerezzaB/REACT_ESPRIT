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

    const dailyRainSum = {};
    dateData.forEach((date, index) => {
        if (!dailyRainSum[date]) {
            dailyRainSum[date] = 0;
        }
        dailyRainSum[date] += rainData[index] || 0;
    });

    const alignedDailyRainData = Object.keys(dailyRainSum).map(date => {
        const index = dateData.findIndex(d => d === date) + Math.floor(12 * 3600 / tempInterval);
        return [index, dailyRainSum[date].toFixed(2)];
    });

    const dateColorMap = Array.from({ length: maxLength }, (_, index) => {
        const timestamp = tempFirstTimestamp + index * tempInterval;
        const dateObj = new Date(timestamp * 1000);
        const dayMidnight = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
        const dayIndex = Math.floor(dayMidnight.getTime() / (1000 * 60 * 60 * 24));
        return dayIndex % 2 === 0 ? "#f1f1f1" : "#fff";
    });

    const chartOptions = {
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross" },
            formatter: (params) => {
                const dataIndex = params[0].dataIndex;
                let tooltipText = `Date: <b>${dateData[dataIndex]}</b><br>Time: <b>${timeData[dataIndex]}</b><br>`;

                params.forEach(p => {
                    if (p.seriesName === "Temperature") {
                        tooltipText += `Temperature: <b>${p.value.toFixed(1)}°C</b><br>`;
                    } else if (p.seriesName === "Rainfall") {
                        tooltipText += `<span style="display:inline-block;width:10px;height:10px;background-color:cyan;margin-right:5px;border-radius:50%;"></span> Rainfall: <b>${p.value} mm</b><br>`;
                    } else if (p.seriesName === "Max Rainfall") {
                        tooltipText += `<span style="display:inline-block;width:10px;height:10px;background-color:magenta;margin-right:5px;border-radius:50%;"></span> Max Rainfall: <b>${p.value} mm</b><br>`;
                    }
                });

                if (rainProbability[dataIndex] !== undefined) {
                    tooltipText += `Rain Probability: <b>${rainProbability[dataIndex]}%</b>`;
                }

                return tooltipText;
            },
        },
        axisPointer: {
            link: [{ xAxisIndex: [0, 1, 2, 3] }],
            label: { backgroundColor: "#777" },
        },
        grid: [
            { left: "10%", right: "10%", top: "5%", height: "3%" },
            { left: "10%", right: "10%", top: "12%", height: "30%" },
            { left: "10%", right: "10%", top: "50%", height: "30%" },
            { left: "10%", right: "10%", top: "80%", height: "5%" }
        ],
        xAxis: [
            {
                type: "category",
                data: timeData,
                gridIndex: 0,
                position: "top",
                axisLabel: { inside: true, margin: 8, fontWeight: "bold" },
                axisTick: { inside: true, alignWithLabel: true },
                axisLine: { lineStyle: { color: "#000", width: 3 } },
                splitArea: { show: true, interval: 0, areaStyle: { color: dateColorMap } },
            },
            {
                type: "category",
                data: timeData,
                gridIndex: 1,
                splitArea: { show: true, interval: 0, areaStyle: { color: dateColorMap } },
                axisLabel: { show: false },
                axisTick: { show: false },
                axisLine: { lineStyle: { color: "#000" } },
            },
            {
                type: "category",
                data: timeData,
                gridIndex: 2,
                splitArea: { show: true, interval: 0, areaStyle: { color: dateColorMap } },
                axisLabel: { show: false },
                axisTick: { show: false },
                axisLine: { lineStyle: { color: "#000" } },
            },
            {
                type: "category",
                data: timeData,
                gridIndex: 3,
                axisLabel: { fontWeight: "bold" },
                axisTick: { inside: true, alignWithLabel: true },
                axisLine: { lineStyle: { color: "#000", width: 3 } },
                splitArea: { show: true, interval: 0, areaStyle: { color: dateColorMap } },
            }
        ],
        yAxis: [
            { type: "value", show: false, gridIndex: 0 },
            { 
                type: "value", 
                name: "Temperature (°C)", 
                gridIndex: 1,
            },
            { 
                type: "value", 
                name: "Rainfall (mm)", 
                gridIndex: 2,
            },
            { 
                type: "value", 
                show: false, 
                gridIndex: 3
            },
        ],
        series: [
            {
                name: "Temperature",
                type: "line",
                data: tempData,
                xAxisIndex: 1,
                yAxisIndex: 1,
                itemStyle: { color: "magenta" }
            },
            {
                name: "Max Temperature",
                type: "scatter",
                data: tempData.map((value, index) => [index, value === Math.max(...tempData) ? value : null]),
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 16,
                itemStyle: { color: "red" }
            },
            {
                name: "Min Temperature",
                type: "scatter",
                data: tempData.map((value, index) => [index, value === Math.min(...tempData) ? value : null]),
                xAxisIndex: 1,
                yAxisIndex: 1,
                symbolSize: 16,
                itemStyle: { color: "blue" }
            },
            {
                name: "Rainfall",
                type: "bar",
                data: rainData,
                xAxisIndex: 2,
                yAxisIndex: 2,
                itemStyle: { color: "cyan" },
                barWidth: 10
            },
            {
                name: "Max Rainfall",
                type: "bar",
                data: maxRainData.map(v => v.toFixed(2)),
                xAxisIndex: 2,
                yAxisIndex: 2,
                itemStyle: { color: "magenta" },
                barWidth: 3
            },
            {
                name: "Daily Rain Sum",
                type: "custom",
                renderItem: (params, api) => {
                    const value = api.value(1);
                    return {
                        type: 'text',
                        style: {
                            text: value,
                            fill: 'black',
                            fontSize: 14,
                            textAlign: 'center',
                            textVerticalAlign: 'middle'
                        },
                        position: [
                            api.coord([api.value(0), 0])[0],  
                            api.coord([api.value(0), 0])[1] - 15
                        ]
                    };
                },
                data: alignedDailyRainData,
                xAxisIndex: 3,
                yAxisIndex: 3
            }
        ],
    };

    return <ReactECharts option={chartOptions} style={{ height: "850px", marginTop: "50px" }} />;
}
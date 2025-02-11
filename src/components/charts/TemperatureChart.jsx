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

    // Vypočítanie max a min teploty
    const maxTempData = tempData.map((value, index) => ({ value, index }))
        .filter(item => item.value === Math.max(...tempData))
        .map(item => [item.index, item.value]);

    const minTempData = tempData.map((value, index) => ({ value, index }))
        .filter(item => item.value === Math.min(...tempData))
        .map(item => [item.index, item.value]);

    const dailyRainSum = {};
    dateData.forEach((date, index) => {
        if (!dailyRainSum[date]) {
            dailyRainSum[date] = 0;
        }
        dailyRainSum[date] += rainData[index] || 0;
    });

    const dailyRainDates = Object.keys(dailyRainSum);
    const alignedDailyRainData = dailyRainDates.map(date => {
        const index = dateData.findIndex(d => d === date) + Math.floor(12 * 3600 / tempInterval);
        return [index, dailyRainSum[date].toFixed(2)];
    });

    const chartOptions = {
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "cross" },
            formatter: (params) => {
                const dataIndex = params[0].dataIndex;
                let tooltipText = `Date: <b>${dateData[dataIndex]}</b><br>Time: <b>${timeData[dataIndex]}</b><br>`;
                tooltipText += params.map(p => {
                    let value = p.seriesName === "Temperature" ? p.value.toFixed(1) : p.value;
                    let seriesText = `${p.seriesName}: <b>${value}${p.seriesName === "Temperature" ? "°C" : " mm"}</b>`;
                    if (p.seriesName === "Rainfall") {
                        const rainfallProb = rainProbability[dataIndex];
                        seriesText += `<br>Rainfall Probability: <b>${rainfallProb}%</b>`;
                    }
                    return seriesText;
                }).join("<br>");
                return tooltipText;
            },
        },
        axisPointer: {
            link: [{ xAxisIndex: [0, 1, 2] }],
            label: { backgroundColor: "#777" },
        },
        grid: [
            { left: "10%", right: "10%", top: "5%", height: "30%" },
            { left: "10%", right: "10%", top: "45%", height: "30%" },
            { left: "10%", right: "10%", top: "77%", height: "5%" }
        ],
        xAxis: [
            { type: "category", data: timeData, position: "top", gridIndex: 0 },
            { type: "category", data: timeData, gridIndex: 1 },
            { 
                type: "category", 
                data: timeData,
                gridIndex: 2,
                axisLabel: {
                    formatter: (value, index) => dateData[index]
                }
            }
        ],
        yAxis: [
            { type: "value", name: "Temperature (°C)", gridIndex: 0 },
            { type: "value", name: "Rainfall (mm)", gridIndex: 1 },
            { type: "value", show: false, gridIndex: 2 }
        ],
        series: [
            { name: "Temperature", type: "line", data: tempData, xAxisIndex: 0, yAxisIndex: 0, itemStyle: { color: "magenta" } },
            { name: "Rainfall", type: "bar", data: rainData, xAxisIndex: 1, yAxisIndex: 1, itemStyle: { color: "cyan" }, barWidth: 10 },
            { name: "Max Rainfall", type: "bar", data: maxRainData.map(v => v.toFixed(2)), xAxisIndex: 1, yAxisIndex: 1, itemStyle: { color: "magenta" }, barWidth: 3 },
            { 
                name: "Max Temperature", 
                type: "scatter", 
                data: maxTempData, 
                xAxisIndex: 0, 
                yAxisIndex: 0, 
                symbolSize: 15, 
                itemStyle: { color: "red" } 
            },
            { 
                name: "Min Temperature", 
                type: "scatter", 
                data: minTempData, 
                xAxisIndex: 0, 
                yAxisIndex: 0, 
                symbolSize: 15, 
                itemStyle: { color: "blue" } 
            },
            { name: "Daily Rain Sum", type: "custom", renderItem: (params, api) => {
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
                    position: [api.coord([api.value(0), 0])[0], api.coord([api.value(0), 0])[1] - 15],
                };
            }, data: alignedDailyRainData, xAxisIndex: 2, yAxisIndex: 2 }
        ],
    };

    return <ReactECharts option={chartOptions} style={{ height: "850px", marginTop: "50px" }} />;
}

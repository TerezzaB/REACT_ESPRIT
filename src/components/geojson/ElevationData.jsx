import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function ElevationData({ elevationData }) {
    // Transformácia dát pre graf
    const chartData = elevationData.map(item => {
        const [min, max] = item.category.match(/[\d.]+/g).map(Number); // Extrahovanie čísel z category z json fileu
        return {
            x: max - min, // Rozdiel medzi max a min (dufam, ze to ma byt rozdiel LOL)
            y: item.count
        };
    });

    // Konfigurácia grafu
    const options = {
        title: {
            text: 'Elevation Histogram',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        xAxis: {
            type: 'category',
            data: chartData.map(data => data.x),
            name: 'Category (Difference)',
            axisTick: {
                alignWithLabel: true,
            },
        },
        yAxis: {
            type: 'value',
            name: 'Count',
        },
        series: [
            {
                name: 'Count',
                type: 'bar',
                barWidth: '80%', // Šírka stĺpcov
                data: chartData.map(data => data.y), // Hodnoty pre os Y
            },
        ],
    };

    return (
        <div className='mb-5'>
            <ReactECharts option={options} style={{ height: '500px', width: '100%' }} />
        </div>
    );
}

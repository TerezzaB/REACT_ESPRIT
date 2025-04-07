import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function HypsoCurve({ hypsoCurveData }) {
    // Transformácia dát pre graf
    const chartData = hypsoCurveData.map(item => ({
        x: item.kategoria, // Kategoria pre os X
        y: item.kumulativ, // Kumulativ pre os Y
    }));

    // Konfigurácia grafu
    const options = {
        title: {
            text: 'Hypsometric Curve',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line',
            },
        },
        xAxis: {
            type: 'category',
            data: chartData.map(data => data.x), // Hodnoty pre os X
            name: 'Category',
        },
        yAxis: {
            type: 'value',
            name: 'Cumulative (%)',
        },
        series: [
            {
                name: 'Cumulative',
                type: 'line',
                areaStyle: {},
                data: chartData.map(data => data.y), 
                itemStyle: {
                    color: '#0c56a2', 
                },
            },
        ],
    };

    return (
        <div className='mb-5'>
            <ReactECharts option={options} style={{ height: '500px', width: '100%' }} />
        </div>
    );
}

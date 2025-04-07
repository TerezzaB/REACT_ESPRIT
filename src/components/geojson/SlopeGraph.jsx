import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function SlopeGraph({ slopeData }) {
    // Transformácia dát pre graf
    const chartData = slopeData.map(item => ({
        x: item.kategoria, // Kategoria pre os X
        y: item.percento, // Percento pre os Y
    }));

    // Konfigurácia grafu
    const options = {
        title: {
            text: 'Slope Graph',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow', // Zvýraznenie stĺpca
            },
        },
        xAxis: {
            type: 'category',
            data: chartData.map(data => data.x), // Hodnoty pre os X
            name: 'Category',
            axisTick: {
                alignWithLabel: true, // Zarovnanie značiek s popiskami
            },
        },
        yAxis: {
            type: 'value',
            name: 'Percentage (%)',
        },
        series: [
            {
                name: 'Percentage',
                type: 'bar',
                barWidth: '60%', // Šírka stĺpcov
                data: chartData.map(data => data.y), // Hodnoty pre os Y
                itemStyle: {
                    color: '#0c56a2',
                },
            },
        ],
    };

    return (
        <div className='pb-5'>
            <ReactECharts option={options} style={{ height: '500px', width: '100%' }} />
        </div>
    );
}

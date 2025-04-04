import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function LandUse({ landUseData }) {
    // Transformácia dát pre graf
    const chartData = landUseData.map(item => ({
        value: item.percent, // Percento pre pie chart
        name: item.name, // Názov pre legendu
        tooltipInfo: `${item.areakm2} km²`, // Informácia pre tooltip
    }));

    // Konfigurácia grafu
    const options = {
        title: {
            text: 'Land Use',
            left: 'center',
            top: '0%',
        },
        tooltip: {
            trigger: 'item',
            formatter: params => {
                const { data, percent } = params;
                return `Area: ${data.tooltipInfo}<br />Percent: ${percent}%`;
            },
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            height: '300px',
            left: 'left',
            top: '4%', // Posunutie legendy nižšie
        },
        series: [
            {
                name: 'Land Use',
                type: 'pie',
                radius: ['25%', '50%'],
                center: ['50%', '63%'], // Posunutie grafu nižšie
                startAngle: 180,
                data: chartData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return (
        <div className='mb-5'>
            <ReactECharts 
                option={options} 
                style={{ height: '1300px', width: '100%' }} // Zvýšenie výšky kontajnera
            />
        </div>
    );
}

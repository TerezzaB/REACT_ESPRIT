import React from 'react';
import ReactECharts from 'echarts-for-react';

export default function GeologySubstrate({ geologySubstrateData }) {
    // Transformácia dát pre graf
    const chartData = geologySubstrateData.map(item => ({
        value: item.percent, // Percento pre pie chart
        name: item.name, // Názov pre legendu
        tooltipInfo: `${item.areakm2} km²`, // Informácia pre tooltip
    }));

    // Konfigurácia grafu
    const options = {
        title: {
            text: 'Geology Substrate',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
            formatter: params => {
                const { data, percent } = params;
                return `Area: ${data.tooltipInfo}<br />Percent: ${percent}%`;
            }, // Tooltip bez názvu
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: '10%',
        },
        series: [
            {
                name: 'Geology Substrate',
                type: 'pie',
                radius: ['30%', '50%'], 
                center: ['50%', '65%'], 
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
            <ReactECharts option={options} style={{ height: '700px', width: '100%' }} />
        </div>
    );
}

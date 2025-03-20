import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import geojson from '../../assets/geojson.json'; // Import geojson súboru

export default function SoilSpecies() {
    const [soilSpeciesData, setSoilSpeciesData] = useState([]);

    useEffect(() => {
        // Načítanie údajov zo súboru geojson
        if (geojson.podne_typy && geojson.podne_typy.podne_typy) {
            const data = geojson.podne_typy.podne_typy.map(item => ({
                name: item.podny_typ,
                percent: item.percento,
                areakm2: item.areakm2,
            }));
            setSoilSpeciesData(data);
        }
    }, []);

    if (!soilSpeciesData || soilSpeciesData.length === 0) {
        return <div>No data available for Soil Species</div>; // Správa pre prázdne dáta
    }

    // Transformácia dát pre graf
    const chartData = soilSpeciesData.map(item => ({
        value: item.percent, // Percento pre pie chart
        name: item.name, // Názov pre legendu
        tooltipInfo: `${item.areakm2} km²`, // Informácia pre tooltip
    }));

    // Konfigurácia grafu
    const options = {
        title: {
            text: 'Soil Species',
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
            orient: 'vertical',
            left: 'left',
            top: '4%', // Posunutie legendy nižšie
        },
        series: [
            {
                name: 'Soil Species',
                type: 'pie',
                radius: ['25%', '45%'],
                center: ['50%', '50%'], // Posunutie grafu nižšie
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
                style={{ height: '500px', width: '100%' }} // Zvýšenie výšky kontajnera
            />
        </div>
    );
}

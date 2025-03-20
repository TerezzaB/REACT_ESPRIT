import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import geojson from '../../assets/geojson.json'; // Import geojson súboru
import DataTable from './DataTable';

export default function SoilTypes() {
    const [soilTypesData, setSoilTypesData] = useState([]);

    useEffect(() => {
        // Načítanie údajov zo súboru geojson
        if (geojson.podne_typy && geojson.podne_typy.podne_typy) {
            const data = geojson.podne_typy.podne_typy.map(item => ({
                name: `${item.podny_typ} (${item.podny_typ_kod})`, // Kombinácia názvu a kódu
                value: item.areakm2, // Hodnota pre graf
                percent: item.percento, // Percento pre tooltip
            }));
            setSoilTypesData(data);
        }
    }, []);

    if (!soilTypesData || soilTypesData.length === 0) {
        return <div>No data available for Soil Types</div>; // Správa pre prázdne dáta
    }

    // Konfigurácia grafu
    const options = {
        title: {
            text: 'Soil Types',
            left: 'center',
            top: '0%', // Pridanie popisu na vrch
        },
        tooltip: {
            trigger: 'item',
            formatter: params => {
                const { data } = params;
                return `${data.name}<br />Area: ${data.value} km²<br />Percent: ${data.percent}%`;
            },
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: '4%', // Posunutie legendy nižšie
        },
        series: [
            {
                name: 'Soil Types',
                type: 'pie',
                radius: ['40%', '70%'], // Doughnut štýl
                startAngle: 180,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                    },
                },
                data: soilTypesData,
            },
        ],
    };

    return (
        <div className='mb-5'>
            <ReactECharts 
                option={options} 
                style={{ height: '500px', width: '100%' }} 
            />

        <DataTable data={soilTypesData} />
        </div>
    );
}

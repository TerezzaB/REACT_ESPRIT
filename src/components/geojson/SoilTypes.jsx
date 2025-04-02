import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import geojson from '../../assets/geojson.json'; // Import geojson súboru
import DataTable from './universal/DataTable';

export default function SoilTypes() {
    const [soilTypesData, setSoilTypesData] = useState([]);

    useEffect(() => {
        // Prepare data for the table, including podne_subtypy
        if (geojson.podne_typy && geojson.podne_typy.podne_typy) {
            const data = geojson.podne_typy.podne_typy.map(item => ({
                'Soil Type': item.podny_typ,
                'Soil Type Code': item.podny_typ_kod,
                'Area km2': item.areakm2,
                'Percento': item.percento,
                'Soil Subtypes': item.podne_subtypy.map(subtyp => 
                    `${subtyp.podny_subtyp} (${subtyp.podny_subtyp_kod})`
                ).join(', '), // Combine subtypes into a single string
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
            top: '0%', 
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
            top: '4%', 
        },
        series: [
            {
                name: 'Soil Types',
                type: 'pie',
                radius: ['40%', '70%'], 
                startAngle: 180,
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                    },
                },
                data: geojson.podne_typy.podne_typy.map(item => ({
                    name: `${item.podny_typ} (${item.podny_typ_kod})`,
                    value: item.areakm2,
                    percent: item.percento,
                })),
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

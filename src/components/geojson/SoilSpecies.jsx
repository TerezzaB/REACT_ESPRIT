import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function SoilSpecies({ soilSpeciesData }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (soilSpeciesData && soilSpeciesData.length > 0) {
      // Transform soilSpeciesData to use podne_druhy for pie chart
      const transformedData = soilSpeciesData.map(item => ({
        name: item.zrnitost, // Use zrnitost as the label
        value: item.percento, // Use percento as the value
      }));
      setChartData(transformedData);
    }
  }, [soilSpeciesData]);

  // Configure the pie chart
  const options = {
    title: {
      text: 'Soil Species',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%', // Display name, value, and percentage
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Soil Species',
        type: 'pie',
        radius: ['40%', '70%'], 
        startAngle: 180,
        data: chartData, // Use transformed data
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
          },
        }
      },
    ],
  };

  if (!soilSpeciesData || soilSpeciesData.length === 0) {
    return <div>No data available for Soil Species</div>;
  }

  return (
    <div className='mt-5 mb-5'>
      <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />
    </div>
  );
}

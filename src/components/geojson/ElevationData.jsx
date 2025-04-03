import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function ElevationData({ elevationData }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (elevationData && elevationData.length > 0) {
      const transformedData = elevationData.map(item => {
        const [min, max] = item.elev_range.split(' - ').map(Number);
        return {
          x: max - min,
          y: item.percent, 
        };
      });
      setChartData(transformedData);
    }
  }, [elevationData]);




  // Configure the chart
  const options = {
    title: {
      text: 'Elevation Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      formatter: params => {
        const { data } = params[0];
        return `Elevation Range: ${data.x} km<br />Area: ${data.y} km²`;
      },
    },
    xAxis: {
      type: 'category',
      name: 'Elevation Range',
      data: chartData.map(item => item.x),
    },
    yAxis: {
      type: 'value',
      name: 'Percent',
    },
    series: [
      {
        data: chartData.map(item => item.y),
        type: 'bar',
        name: 'Area',
        itemStyle: {
            color: '#3aff16',
        },
      },
    ],
  };

  if (!elevationData || elevationData.length === 0) {
    return <div>No data available for Elevation</div>;
  }

  return (
    <div className='mt-5 mb-5'>
      <ReactECharts option={options} style={{ height: '400px', width: '100%' }} />
    </div>
  );
}

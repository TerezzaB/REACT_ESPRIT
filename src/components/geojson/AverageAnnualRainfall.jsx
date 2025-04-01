import React from 'react';
import DataTable from './universal/DataTable';

export default function AverageAnnualRainfall({ averageAnnualRainfallData }) {
  if (!averageAnnualRainfallData || Object.keys(averageAnnualRainfallData).length === 0) {
    return <div>No data available for Average Annual Rainfall</div>;
  }

  // Transform averageAnnualRainfallData into an array of objects for DataTable
  const transformedData = [averageAnnualRainfallData].map(item => ({
    max_rainfall: item.precip_yr_sum_poly_max,
    min_rainfall: item.precip_yr_sum_poly_min,
    avg_rainfall: item.precip_yr_sum_poly_avg,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Average Annual Rainfall</h5>
      <DataTable data={transformedData} />
    </div>
  );
}

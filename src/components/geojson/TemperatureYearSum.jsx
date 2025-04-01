import React from 'react';
import DataTable from './universal/DataTable';

export default function TemperatureYearSum({ temperatureYearSumData }) {
  if (!temperatureYearSumData || Object.keys(temperatureYearSumData).length === 0) {
    return <div>No data available for Temperature Year Sum</div>;
  }

  // Transform temperatureYearSumData into an array of objects for DataTable
  const transformedData = [temperatureYearSumData].map(item => ({
    max_temp: item.temp_yr_avg_poly_max,
    min_temp: item.temp_yr_avg_poly_min,
    avg_temp: item.temp_yr_avg_poly_avg,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Temperature Year Summary</h5>
      <DataTable data={transformedData} />
    </div>
  );
}

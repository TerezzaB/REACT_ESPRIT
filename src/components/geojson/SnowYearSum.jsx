import React from 'react';
import DataTable from './universal/DataTable';

export default function SnowYearSum({ snowYearSumData }) {
  if (!snowYearSumData || Object.keys(snowYearSumData).length === 0) {
    return <div>No data available for Snow Year Sum</div>;
  }

  // Transform snowYearSumData into an array of objects for DataTable
  const transformedData = [snowYearSumData].map(item => ({
    Max: item.snow_yr_sum_poly_max,
    Min: item.snow_yr_sum_poly_min,
    Average: item.snow_yr_sum_poly_avg,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Yearly Snow Summary</h5>
      <DataTable data={transformedData} />
    </div>
  );
}

import React from 'react';
import DataTable from './universal/DataTable';

export default function SnowYearDays({ snowYearDaysData }) {
  if (!snowYearDaysData || Object.keys(snowYearDaysData).length === 0) {
    return <div>No data available for Snow Year Days</div>;
  }

  // Transform snowYearDaysData into an array of objects for DataTable
  const transformedData = [snowYearDaysData].map(item => ({
    max_days: item.snow_yr_days_poly_max,
    min_days: item.snow_yr_days_poly_min,
    avg_days: item.snow_yr_days_poly_avg,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Yearly Snow Days Summary</h5>
      <DataTable data={transformedData} />
    </div>
  );
}

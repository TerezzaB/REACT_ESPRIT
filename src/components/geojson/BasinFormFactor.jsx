import React from 'react';
import DataTable from './universal/DataTable';

export default function BasinFormFactor({ basinFormFactorData }) {
  if (!basinFormFactorData || basinFormFactorData.length === 0) {
    return <div>No data available for Basin Form Factor</div>;
  }

  // Transform basinFormFactorData into a flat array of objects for DataTable
  const transformedData = basinFormFactorData.map(item => ({
    'Max River Length': item.ff_max_river_length,
    'Polygon Area km2': item.polygon_area_km2,
    'Form Factor Num': item.form_factor_num,
    'Form Factor Code': item.form_factor_code,
    'Full text SK': item.form_factor_txt_sk,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Basin Form Factor</h5>
      <DataTable data={transformedData} />
    </div>
  );
}

import React from 'react';
import DataTable from './universal/DataTable';

export default function BasinFormFactor({ basinFormFactorData }) {
  if (!basinFormFactorData || basinFormFactorData.length === 0) {
    return <div>No data available for Basin Form Factor</div>;
  }

  // Transform basinFormFactorData into a flat array of objects for DataTable
  const transformedData = basinFormFactorData.map(item => ({
    ff_max_river_length: item.ff_max_river_length,
    polygon_area_km2: item.polygon_area_km2,
    form_factor_num: item.form_factor_num,
    form_factor_code: item.form_factor_code,
    form_factor_txt_sk: item.form_factor_txt_sk,
  }));

  return (
    <div className='mt-5 mb-5'>
      <DataTable data={transformedData} />
    </div>
  );
}

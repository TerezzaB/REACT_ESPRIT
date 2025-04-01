import React from 'react';
import DataTable from './universal/DataTable';

export default function RiverNetworkDensity({ riverNetworkDensityData }) {
  if (!riverNetworkDensityData || riverNetworkDensityData.length === 0) {
    return <div>No data available for River Network Density</div>;
  }

  // Transform riverNetworkDensityData into a flat array of objects for DataTable
  const transformedData = riverNetworkDensityData.map(item => ({
    length_sum_km: item.length_sum_km,
    areakm2: item.areakm2,
    density_km_km2: item.density_km_km2,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">River Network Density Data</h5>
        <DataTable data={transformedData} />
    </div>
  );
}

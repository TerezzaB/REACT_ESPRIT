import React from 'react';
import DataTable from './universal/DataTable';

export default function SlopeTable({ slopeData }) {
  if (!slopeData || Object.keys(slopeData).length === 0) {
    return <div>No data available for Slope</div>;
  }

  // Transform slopeData into an array of objects for DataTable
  const transformedData = Object.entries(slopeData).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <div className='mt-5 mb-5'>
      <DataTable data={transformedData} />
    </div>
  );
}

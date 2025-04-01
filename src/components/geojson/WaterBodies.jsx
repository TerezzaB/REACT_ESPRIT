import React from 'react';
import DataTable from './universal/DataTable';// Corrected import path

export default function WaterBodies({ waterBodiesData }) {
  if (!waterBodiesData || waterBodiesData.length === 0) {
    return <div>No data available for Water Bodies</div>;
  }

  // Transform waterBodiesData into a flat array of objects for DataTable
  const transformedData = waterBodiesData.map(body => ({
    name: body.name,
    category: body.category,
    areakm2: body.areakm2,
    percent: body.percent,
  }));

  return (
    <div className='mt-5 mb-5'>
      <h5 className="mb-4">Water Bodies Data</h5>
      <DataTable data={transformedData} />
    </div>
  );
}


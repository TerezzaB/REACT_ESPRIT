import React from 'react';
import DataTable from './universal/DataTable';

export default function BasinOutletStream({ basinOutletStreamData }) {
  if (!basinOutletStreamData || basinOutletStreamData.length === 0) {
    return <div>No data available for Basin Outlet Stream</div>;
  }

  // Transform basinOutletStreamData into a flat array of objects for DataTable
  const transformedData = basinOutletStreamData.map(item => ({
    stream_name: item.stream_name,
    stream_order_strahler: item.stream_order_strahler,
    stream_order_shreve: item.stream_order_shreve,
    stream_order_hack: item.stream_order_hack,
  }));

  return (
    <div className='mt-5 mb-5'>
      <DataTable data={transformedData} />
    </div>
  );
}

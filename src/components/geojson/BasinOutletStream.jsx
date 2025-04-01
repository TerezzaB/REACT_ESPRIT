import React from 'react';
import DataTable from './universal/DataTable';

export default function BasinOutletStream({ basinOutletStreamData }) {
  if (!basinOutletStreamData || basinOutletStreamData.length === 0) {
    return <div>No data available for Basin Outlet Stream</div>;
  }

  // Transform basinOutletStreamData into a flat array of objects for DataTable
  const transformedData = basinOutletStreamData.map(item => ({
    'Stream Name': item.stream_name,
    'Stream Order Strahler': item.stream_order_strahler,
    'Stream Order Shreve': item.stream_order_shreve,
    'Stream Order Hack': item.stream_order_hack,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Basin Outlet Stream</h5>
        {/* Add any additional information or styling here */}
      <DataTable data={transformedData} />
    </div>
  );
}

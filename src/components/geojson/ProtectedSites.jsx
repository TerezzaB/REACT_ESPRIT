import React from 'react';
import DataTable from './universal/DataTable'; 

export default function ProtectedSites({ protectedSitesData }) {
  if (!protectedSitesData || protectedSitesData.length === 0) {
    return <div>No data available for Protected Sites</div>;
  }

  // Transform protectedSitesData into a flat array of objects for DataTable
  const transformedData = protectedSitesData.map(site => ({
    Name: site.name,
    Category: site.category,
    'Area km2': site.areakm2,
    'Percent': site.percent,
  }));

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Protected Sites Data</h5>
      <DataTable data={transformedData} />
    </div>
  );
}

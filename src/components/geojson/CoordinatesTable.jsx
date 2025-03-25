import React from 'react';
import DataTable from './DataTable';

export default function CoordinatesTable({ coordinatesData }) {
  if (!coordinatesData || Object.keys(coordinatesData).length === 0) {
    return <div>No data available for Coordinates</div>;
  }

  // Transform coordinatesData into an array of objects for DataTable
  const transformedData = Object.entries(coordinatesData).map(([key, value]) => ({
    key,
    value,
  }));

  return (
    <div>
      <DataTable data={transformedData} />
    </div>
  );
}

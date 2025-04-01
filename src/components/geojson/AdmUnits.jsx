import React from 'react';
import DataTable from './universal/DataTable';

export default function AdmUnits({ admUnitsData }) {
  if (!admUnitsData || Object.keys(admUnitsData).length === 0) {
    return <div>No data available for Administrative Units</div>;
  }

  // Transform admUnitsData into an array of objects for DataTable
  const transformedData = admUnitsData.kraje.flatMap(kraj =>
    kraj.okresy.flatMap(okres =>
      okres.obce.map(obec => ({
        kraj: kraj.kraj,
        okres: okres.okres,
        obec: obec.obec,
        areakm2: obec.areakm2,
        percento: obec.percento,
      }))
    )
  );

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Administrative Units</h5>
        <DataTable data={transformedData} />
    </div>
  );
}

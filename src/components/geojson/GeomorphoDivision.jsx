import React from 'react';
import DataTable from './universal/DataTable';

export default function GeomorphoDivision({ geomorphoDivisionData }) {
  if (!geomorphoDivisionData || Object.keys(geomorphoDivisionData).length === 0) {
    return <div>No data available for Geomorpho Division</div>;
  }

  // Transform geomorphoDivisionData into a flat array of objects for DataTable
  const transformedData = geomorphoDivisionData.sustavy.flatMap(sustava =>
    sustava.podsustavy.flatMap(podsustava =>
      podsustava.provincie.flatMap(provincia =>
        provincia.subprovincie.flatMap(subprovincia =>
          subprovincia.oblasti.flatMap(oblast =>
            oblast.celky.flatMap(celok =>
              celok.podcelky.flatMap(podcelok =>
                podcelok.casti.map(cast => ({
                  System: sustava.sustava,
                  Subsystem: podsustava.podsustava,
                  Province: provincia.provincia,
                  Subprovince: subprovincia.subprovincia,
                  Area: oblast.oblast,
                  Cell: celok.celok,
                  Subcell: podcelok.podcelok,
                  Cast: cast.cast,
                  'Area km2': cast.areakm2 || podcelok.areakm2 || celok.areakm2 || oblast.areakm2 || subprovincia.areakm2 || provincia.areakm2 || podsustava.areakm2 || sustava.areakm2,
                  Percent: cast.percento || podcelok.percento || celok.percento || oblast.percento || subprovincia.percento || provincia.percento || podsustava.percento || sustava.percento,
                }))
              )
            )
          )
        )
      )
    )
  );

  return (
    <div className='mt-5 mb-5'>
        <h5 className="mb-4">Geomorpho Division Data</h5>
        <DataTable data={transformedData} />
    </div>
  );
}

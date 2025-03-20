import React, { useState, useEffect } from 'react';
import geojson from '../assets/geojson.json';
import ElevationData from '../components/geojson/ElevationData';
import HypsoCurve from '../components/geojson/HypsoCurve';
import SlopeGraph from '../components/geojson/SlopeGraph';
import GeologySubstrate from '../components/geojson/GeologySubstrate';
import LandUse from '../components/geojson/LandUse';
import SoilSpecies from '../components/geojson/SoilSpecies';

export default function GeojsonView() {
  const [elevationData, setElevationData] = useState([]);
  const [hypsoCurveData, setHypsoCurveData] = useState([]);
  const [slopeData, setSlopeData] = useState([]);
  const [geologySubstrateData, setGeologySubstrateData] = useState([]);
  const [landUseData, setLandUseData] = useState([]);
  const [soilSpeciesData, setSoilSpecietData] = useState([]);

  useEffect(() => {
    setElevationData(geojson.elevation_histogram || []);
    setHypsoCurveData(geojson.hypso_curve || []);
    setSlopeData(geojson.slope_graph || []);
    setGeologySubstrateData(geojson.geology_substrate || []);
    setLandUseData(geojson.land_use || []);
    setSoilSpecietData(geojson.podne_druhy || []);
  }, []);

  return (
    <div className='mt-5'>
      <ElevationData elevationData={elevationData} />
      <HypsoCurve hypsoCurveData={hypsoCurveData}/>
      <SlopeGraph slopeData={slopeData}/>
      <GeologySubstrate geologySubstrateData={geologySubstrateData}/>
      <LandUse landUseData={landUseData}/>
      <SoilSpecies soilSpeciesData={soilSpeciesData}/>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import geojson from '../assets/geojson.json';
import ElevationData from '../components/geojson/ElevationData';
import HypsoCurve from '../components/geojson/HypsoCurve';
import SlopeGraph from '../components/geojson/SlopeGraph';
import GeologySubstrate from '../components/geojson/GeologySubstrate';
import LandUse from '../components/geojson/LandUse';
import SoilSpecies from '../components/geojson/SoilSpecies';
import SoilTypes from '../components/geojson/SoilTypes';  
import Coordinates from '../components/geojson/CoordinatesTable';  
import SlopeTable from '../components/geojson/SlopeTable';

export default function GeojsonView() {
  const [elevationData, setElevationData] = useState([]);
  const [hypsoCurveData, setHypsoCurveData] = useState([]);
  const [slopeData, setSlopeData] = useState([]);
  const [slopeTableData, setSlopeTableData] = useState([]);
  const [geologySubstrateData, setGeologySubstrateData] = useState([]);
  const [landUseData, setLandUseData] = useState([]);
  const [soilSpeciesData, setSoilSpeciesData] = useState([]);
  const [soilTypesData, setSoilTypesData] = useState([]);
  const [coordinatesData, setCoordinatesData] = useState([]);

  useEffect(() => {
    setElevationData(geojson.elevation_histogram || []);
    setHypsoCurveData(geojson.hypso_curve || []);
    setSlopeData(geojson.slope_graph || []);
    setSlopeTableData(geojson.slope || []);
    setGeologySubstrateData(geojson.geology_substrate || []);
    setLandUseData(geojson.land_use || []);
    setSoilSpeciesData(geojson.podne_druhy || []);
    setSoilTypesData(geojson.podne_typy || []);
    setCoordinatesData(geojson.coordinates || []);
  }, []);

  return (
    <div className='mt-5'>
      <ElevationData elevationData={elevationData} />
      <HypsoCurve hypsoCurveData={hypsoCurveData}/>
      <SlopeGraph slopeData={slopeData}/>
      <SlopeTable slopeData={slopeTableData}/>
      <GeologySubstrate geologySubstrateData={geologySubstrateData}/>
      <LandUse landUseData={landUseData}/>
      <SoilSpecies soilSpeciesData={soilSpeciesData}/>
      <Coordinates coordinatesData={coordinatesData}/>
    </div>
  );
}


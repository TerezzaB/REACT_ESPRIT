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
import AdmUnits from '../components/geojson/AdmUnits';
import GeomorphoDivision from '../components/geojson/GeomorphoDivision';
import WaterBodies from '../components/geojson/WaterBodies';
import ProtectedSites from '../components/geojson/ProtectedSites';
import BasinFormFactor from '../components/geojson/BasinFormFactor';
import RiverNetworkDensity from '../components/geojson/RiverNetworkDensity';
import BasinOutletStream from '../components/geojson/BasinOutletStream';
import AverageAnnualRainfall from '../components/geojson/AverageAnnualRainfall';
import TemperatureYearSum from '../components/geojson/TemperatureYearSum';
import SnowYearSum from '../components/geojson/SnowYearSum';
import SnowYearDays from '../components/geojson/SnowYearDays';

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
  const [admUnitsData, setAdmUnitsData] = useState([]);
  const [geomorphoDivisionData, setGeomorphoDivisionData] = useState([]);
  const [waterBodiesData, setWaterBodiesData] = useState([]);
  const [protectedSitesData, setProtectedSitesData] = useState([]);
  const [basinFormFactorData, setBasinFormFactorData] = useState([]);
  const [riverNetworkDensityData, setRiverNetworkDensityData] = useState([]);
  const [basinOutletStreamData, setBasinOutletStreamData] = useState([]);
  const [averageAnnualRainfallData, setAverageAnnualRainfallData] = useState([]);
  const [temperatureYearSumData, setTemperatureYearSumData] = useState([]);
  const [snowYearSumData, setSnowYearSumData] = useState([]);
  const [snowYearDaysData, setSnowYearDaysData] = useState([]);

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
    setAdmUnitsData(geojson.adm_units || []);
    setGeomorphoDivisionData(geojson.geomorpho_division || []);
    setWaterBodiesData(geojson.water_bodies || []);
    setProtectedSitesData(geojson.protected_sites || []);
    setBasinFormFactorData(geojson.basin_form_factor || []);
    setRiverNetworkDensityData(geojson.river_network_density || []);
    setBasinOutletStreamData(geojson.basin_outlet_stream || []);
    setAverageAnnualRainfallData(geojson.precip_yr_sum || []);
    setTemperatureYearSumData(geojson.temp_yr_avg || []);
    setSnowYearSumData(geojson.snow_yr_sum || []);
    setSnowYearDaysData(geojson.snow_yr_days || []);
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
      <SoilTypes soilTypesData={soilTypesData}/>
      <Coordinates coordinatesData={coordinatesData}/>
      <AdmUnits admUnitsData={admUnitsData}/>
      <GeomorphoDivision geomorphoDivisionData={geomorphoDivisionData}/>
      <WaterBodies waterBodiesData={waterBodiesData}/>
      <ProtectedSites protectedSitesData={protectedSitesData}/>
      <BasinFormFactor basinFormFactorData={basinFormFactorData}/>
      <RiverNetworkDensity riverNetworkDensityData={riverNetworkDensityData}/>
      <BasinOutletStream basinOutletStreamData={basinOutletStreamData}/>
      <AverageAnnualRainfall averageAnnualRainfallData={averageAnnualRainfallData}/>
      <TemperatureYearSum temperatureYearSumData={temperatureYearSumData}/>
      <SnowYearSum snowYearSumData={snowYearSumData}/>
      <SnowYearDays snowYearDaysData={snowYearDaysData}/>
    </div>
  );
}


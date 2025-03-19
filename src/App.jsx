import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import HomeView from './views/HomeView';
import MeteoView from './views/MeteoView';
import GeojsonView from './views/GeojsonView';
import modalContent from './assets/modal.json';
import InfoModal from './components/InfoModal';


export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoContent, setInfoContent] = useState('');

  useEffect(() => {
    setInfoContent(modalContent.infoText);
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Router>
      <div>
        <div className="sticky-top p-2 _nav">
          <div className="d-flex justify-content-center align-items-center space-x-4">
            <NavLink to="/" className={({ isActive }) => `nav-link p-2 ${isActive ? 'text-primary font-weight-bold text-decoration-underline' : 'text-secondary'}`}>
              Home
            </NavLink>
            <NavLink to="/meteo" className={({ isActive }) => `nav-link p-2 ${isActive ? 'text-primary font-weight-bold text-decoration-underline' : 'text-secondary'}`}>
              Meteo
            </NavLink>
            <NavLink to="/geojson" className={({ isActive }) => `nav-link p-2 ${isActive ? 'text-primary font-weight-bold text-decoration-underline' : 'text-secondary'}`}>
              GeoJSON
            </NavLink>
            <div className="p-2">
              <i className="bi bi-info-circle text-secondary hover:text-primary cursor-pointer" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/meteo" element={<MeteoView />} />
          <Route path="/geojson" element={<GeojsonView />} />
        </Routes>
        <InfoModal isOpen={isModalOpen} onClose={handleCloseModal} content={infoContent} />
      </div>
    </Router>

  );
}
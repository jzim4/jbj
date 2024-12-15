// index.js
import HomePage from './homePage.jsx';
import SimulationPage from './simulationPage.jsx'
import { HashRouter, Routes, Route } from 'react-router-dom';
import * as data from '../simulations.json'
import React from 'react';
import ReactDOM from 'react-dom/client';
 
const root = ReactDOM.createRoot(document.getElementById('mainContent'));

root.render(
   <React.StrictMode>
      <HashRouter>
      <Routes>
         <Route index element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/igl" element={<SimulationPage sim={data.igl}/>} />
        <Route path="/orbital" element={<SimulationPage sim={data.orbital}/>} />
        <Route path="/coulomb" element={<SimulationPage sim={data.coulomb}/>} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      </HashRouter>
   </React.StrictMode>
);
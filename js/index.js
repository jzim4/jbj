// index.js
import HomePage from './homePage.jsx';
import SimulationPage from './simulationPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as data from './simulations.json'
import React from 'react';
import ReactDOM from 'react-dom/client';
 
const root = ReactDOM.createRoot(document.getElementById('mainContent'));

root.render(
   <React.StrictMode>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/igl" element={<SimulationPage sim={data.igl}/>} />
        <Route path="/orbital" element={<SimulationPage sim={data.orbital}/>} />
      </Routes>
      </BrowserRouter>
   </React.StrictMode>
);
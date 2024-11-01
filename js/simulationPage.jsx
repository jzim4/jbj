import React, { useRef, useEffect } from 'react';
import Orbitals from './orbitals.js';
import { Link } from 'react-router-dom';

function Header(sim) {
    sim = sim.sim;
    return <div id="simulationHeader"><h2 id="simulationTitle">{sim.name}</h2><div id="simulationStreak"></div></div>
}

function HomeButton() {
    return <Link id="homeButton" to="/">Home</Link>
}

function Help(sim) {
    sim = sim.sim;
    return <div id="helpContent">{sim.moreInfo}</div>
}

function ErrorMessage() {
    return <div id="errorMessage">Please view simulation on computer with window at full screen. If simulation is still not opening, try zooming out with cmd + minus/ctrl + minus.</div>
}

function AllSimulationContent(sim) {
    sim = sim.sim;
    return <div id="simulationContentContainer">
            <div id="simIconContainer"><img className="simIcon" src="./assets/other/icon1.png"></img><img className="simIcon" src="./assets/other/icon2.png"></img></div>
            <div id="iframeContainer">
                <div id="simulationSubheader">{sim.instructions}</div>
                <SimulationContent sim={sim}/>
                
            </div>
            <Help sim={sim}/>
            </div>
}

function IGL(sim) {
    sim = sim.sim;
    return <>
    <iframe src={sim.p5js} width="922" height="525"></iframe>
    
    </>
}

function SimulationContent(sim) {
    sim = sim.sim;
    if (sim.short == "igl") {
        return <IGL sim={sim}/>
    }
    else if (sim.short == "orbital") {
        return <>
        <canvas id="p5Canvas"></canvas>
        <Orbitals/>
        </>
    }
}

export default function SimulationPage(sim) {
    sim = sim.sim;
    return <>
        <Header sim={sim}/>
        <HomeButton/>
        <AllSimulationContent sim={sim}/>
        <ErrorMessage/>
    </>
}
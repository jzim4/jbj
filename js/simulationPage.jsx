import React, { useRef, useEffect } from 'react';
import orbitals from './orbitals.js';
import { Link } from 'react-router-dom';

function Header(sim) {
    console.log(sim.sim.name);
    return <div id="simulationHeader"><h2 id="simulationTitle">{sim.sim.name}</h2><div id="simulationStreak"></div></div>
}

function HomeButton() {
    return <Link id="homeButton" to="/">Home</Link>
}

function Help(sim) {
    return <div id="helpContent">{sim.sim.instructions}</div>
}

function ErrorMessage() {
    return <div id="errorMessage">Please view simulation on computer with window at full screen. If simulation is still not opening, try zooming out with cmd + minus/ctrl + minus.</div>
}

function AllSimulationContent(sim) {
    console.log(sim);
    return <div id="simulationContentContainer">
            <div id="simIconContainer"><img className="simIcon" src="./img/icon1.png"></img><img className="simIcon" src="./img/icon2.png"></img></div>
            <div id="iframeContainer">
                <SimulationContent sim={sim.sim}/>
            </div>
            <Help sim={sim.sim}/>
            </div>
}

function IGL(sim) {
    return <iframe src={sim.sim.p5js} width="1225" height="700"></iframe>
}

function Orbitals() {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext("2d");
        orbitals(canvas, context);
    });
    return (
        <canvas ref={canvasRef} id="canvas"/>
    );
}

function SimulationContent(sim) {
    console.log(sim.sim.short);
    if (sim.sim.short == "igl") {
        return <IGL sim={sim.sim}/>
    }
    else if (sim.sim.short == "orbital") {
        return <Orbitals/>
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
import React, { useRef, useEffect } from 'react';
import Orbitals from '../sims/orbitals.js';
import Coulomb from '../sims/coulomb.js';
import IGL from '../sims/igl.js';
import Microstates from '../sims/micro.js';
import { Link } from 'react-router-dom';
import InstructionWindow from './instructionWindow.jsx';

function Header(sim) {
    sim = sim.sim;
    return <>
    <HomeButton/>
    <h2 id="simulationTitle">{sim.name}</h2>
    <div id="simulationStreak"></div>
    <InstructionButton/>
    </>
}

function HomeButton() {
    return <Link id="homeButton" to="/">Home</Link>
}

function Help(sim) {
    sim = sim.sim;
    return <div id="helpContent">{sim.moreInfo}</div>
}

function InstructionButton() {
    useEffect(() => {
        
        const button = document.getElementById("instructionsButton");
        const background = document.getElementById("instructionsContainer");

        if (button && background) {
            const showWindow = () => {
                console.log("hi")
                background.style.visibility = "visible";
            };

            button.addEventListener("click", showWindow);
        }
    }, []);
    return <button id="instructionsButton">Show Instructions</button>
}

function ErrorMessage() {
    return <div id="errorMessage">Please view simulation on computer with window at full screen. If simulation is still not opening, try zooming out with cmd + minus/ctrl + minus.</div>
}

function AllSimulationContent(sim) {
    sim = sim.sim;
    return <div id="simulationContentContainer">
            <div id="simIconContainer"><img className="simIcon" src="./assets/other/icon1.png"></img><img className="simIcon" src="./assets/other/icon2.png"></img></div>
            <div id="simCenterContainer">
                <div id="simHeaderContainer">
                    <Header sim={sim}/>
                    <HomeButton/>
                </div>
                <div id="simulationSubheader">{sim.instructions}</div>
                <SimulationContent sim={sim}/>
            </div>
            <Help sim={sim}/>
            </div>
}

function SimulationContent(sim) {
    sim = sim.sim;
    if (sim.short == "igl") {
        return <IGL/>
    }
    else if (sim.short == "orbital") {
        return <Orbitals/>
    }
    else if (sim.short == "coulomb") {
        return <>
        <canvas id="p5Canvas"></canvas>
        <Coulomb/>
        </>
    }
    else if (sim.short == "ms") {
        return <>
        <canvas id="msCanvas"></canvas>
        <Microstates/>
        </>
    }
}

export default function SimulationPage(sim) {
    sim = sim.sim;
    return <>
        <InstructionWindow sim={sim}/>
        <AllSimulationContent sim={sim}/>
        <ErrorMessage/>
    </>
}
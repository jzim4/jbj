import * as React from 'react';
import { Link } from 'react-router-dom';

function Header(sim) {
    console.log(sim.sim.name);
    return <div id="simulationHeader"><h2 id="simulationTitle">{sim.sim.name}</h2><div id="simulationStreak"></div></div>
}

function HomeButton() {
    return <Link id="homeButton" to="/">Home</Link>
}

function Help(sim) {
    console.log(sim.sim.instruction);
    return <div id="helpContent">{sim.sim.instructions}</div>
}

function IFrame(sim) {
    console.log(sim.sim.p5js);
    return <div id="simulationContentContainer">
            <div id="simIconContainer"><img className="simIcon" src="./img/icon1.png"></img><img className="simIcon" src="./img/icon2.png"></img></div>
            <div id="iframeContainer">
                <iframe src={sim.sim.p5js} width="1225" height="700"></iframe>
            </div>
            <Help sim={sim.sim}/>
            </div>
}

export default function SimulationPage(sim) {
    sim = sim.sim;
    return <>
        <Header sim={sim}/>
        <HomeButton/>
        <IFrame sim={sim}/>
    </>
}
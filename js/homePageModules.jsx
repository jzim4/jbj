import React from 'react';
import simData from './simulations.json'

class Simulation {
    constructor(name, short, html, p5js, homePageDescr, instructions) {
        this.name = name;
        this.short = short;
        this.html = html;
        this.p5js = p5js;
        this.homePageDescr = homePageDescr;
        this.instructions = this.instructions;
    }
};

let simulations = [];

for (const i in simData) {
    let s = simData[i];
    let newSim = new Simulation(s.name, s.short, s.html, s.p5js, s.homePageDescr, s.instructions);
    console.log(newSim)
    simulations.push(newSim);
}

function SimulationModule (s) {
    let imgId = s.short.concat("NavImg");
    let key = s.short.concat("Module");
    return (<div key={key} className="homePageNavContainer">
        <a className="homePageNavLink" href={s.html}>
            <div className="homePageNavImg" id={imgId}>
                <div className="homePageNavLabel">{s.name}</div>
            </div>
            <div className="homePageNavDescr">{s.homePageDescr}</div>
        </a>
    </div>)
}

export default function LandingPage () {
    return (<div id="homePageAllNavs">
        {simulations.map(SimulationModule)}
    </div>);
}
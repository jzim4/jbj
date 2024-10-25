import * as React from 'react';
import * as simData from './simulations.json';
import { Link } from 'react-router-dom';

function SimulationNav (sim) {
    sim = sim.sim;

    let key = sim.short.concat("Nav");
    let link = '/'.concat(sim.short);
    return (<div key={key} className="homePageNavContainer">
        <Link to={link} className="homePageNavLink">
            <img className="homePageNavImg" src={sim.navImg}>
            </img>
            <div className="homePageNavDescr"><div class="navStreak"></div><div class="navName">{sim.name}</div></div>
        </Link>
    </div>)
}

export default function LandingPage() {
    let sims = [];
    for (const obj in simData.default) {
        sims.push(simData.default[obj]);
    };
    return (<div id="homePageAllNavs">
        {sims.map((item, index) => (
            <SimulationNav key={index} sim={item} />
        ))}
        
    </div>);
}
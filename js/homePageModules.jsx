import * as React from 'react';
import * as simData from './simulations.json';
import { Link } from 'react-router-dom';

function SimulationNav (sim) {
    console.log(sim.sim);
    sim = sim.sim;
    
    let imgId = sim.short.concat("NavImg");
    let key = sim.short.concat("Nav");
    let link = '/'.concat(sim.short);
    return (<div key={key} className="homePageNavContainer">
        <Link to={link} className="homePageNavLink">
            <div className="homePageNavImg" id={imgId}>
                <div className="homePageNavLabel">{sim.name}</div>
            </div>
            <div className="homePageNavDescr">{sim.homePageDescr}</div>
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
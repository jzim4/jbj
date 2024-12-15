import * as React from 'react';
import * as simData from '../simulations.json';
import { Link, useNavigate } from 'react-router-dom';

function SimulationNav (sim) {
    sim = sim.sim;

    let key = sim.short.concat("Nav");
    let link = '/'.concat(sim.short);
    let clickFunction = () => {};
    
    // due to simulation needing p5 to reload, force page to reload when opening coulomb
    if (sim.short == "coulomb") {
        const navigate = useNavigate();
        clickFunction = () => {
            navigate('/coulomb');
            window.location.reload();
        }
    }

    return (<div key={key} className="homePageNavContainer">
        <Link to={link} onClick={clickFunction} className="homePageNavLink">
            <img className="homePageNavImg" src={sim.navImg}>
            </img>
            <div className="homePageNavDescr"><div className="navStreak"></div><div className="navName">{sim.name}</div></div>
        </Link>
    </div>)
}

// all thumbnails and links for home page
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
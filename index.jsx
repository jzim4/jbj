import React from 'react';

class Simulation {
    name;
    shortName;
    link;
    p5js;
    description;

    constructor(name, shortName, link, p5js, description) {
        this.name = name;
        this.shortName = shortName;
        this.link = link;
        this.p5js = p5js;
        this.description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse illo earum, recusandae est fuga harum ipsa nisi cupiditate reprehenderit perspiciatis voluptatum velit impedit aliquam deleniti sapiente in dicta sit molestiae!";
    }
};

const igl = new Simulation("Ideal Gas Law", "igl", "igl.html", "https://editor.p5js.org/bresypedraza/full/51SPYMqzt", "");
const orbital = new Simulation("Orbital Combinations", "orbital", "orbital.html", "", "");
let simulations = [igl, orbital];

function SimulationModule (s) {
    let imgId = s.shortName.concat("NavImg");
    let key = s.shortName.concat("Module");
    return (<div key={key} className="homePageNavContainer">
        <a className="homePageNavLink" href={s.link}>
            <div className="homePageNavImg" id={imgId}>
                <div className="homePageNavLabel">{s.name}</div>
            </div>
            <div className="homePageNavDescr">{s.description}</div>
        </a>
    </div>);
}

export default function LandingPage () {
    console.log(simulations.map(SimulationModule));
    return simulations.map(SimulationModule);
}
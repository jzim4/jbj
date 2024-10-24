import React from 'react';
import LandingPage from './homePageModules.jsx';

function Title() {
    return <div id="landingPageTitle"><h1 id="titleText">ChemBox</h1><div id="titleStreak"></div></div>
};

function Subtitle() {
    return <div id="landingPageSubtitle"><h2 id="subTitleText">Simulations and learning tools for Macalester's General Chemistry students</h2></div>
}

function Icons() {
    return <>
    <div className="icon" id="icon1"></div>
    <div className="icon" id="icon2"></div>
    <div className="icon" id="icon3"></div>
    <div className="icon" id="icon4"></div>
    </>
};

export default function HomePage() {
    return <>
        <Title/>
        <Subtitle/>
        <Icons/>
        <LandingPage/>
    </>
};
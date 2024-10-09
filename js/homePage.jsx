import React from 'react'
import LandingPage from './homePageModules.jsx'

function Title() {
    return <div id="landingPageTitle"><h1 id="titleText">ChemBox</h1><div id="titleStreak"></div></div>
};

function Icons() {
    return <>
    <div className="icon" id="icon1"></div>
    <div className="icon" id="icon2"></div>
    <div className="icon" id="icon3"></div>
    <div className="icon" id="icon4"></div>
    </>
}

export default function HomePage() {
    return <>
        <Title/>
        <Icons/>
        <LandingPage/>
    </>
};
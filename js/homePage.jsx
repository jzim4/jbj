import React from 'react'
import LandingPage from './homePageModules.jsx'

function Title() {
    return <h1 id="landingPageTitle"><div id="titleText">ChemBox</div><div id="titleStreak"></div></h1>
};

function Icons() {
    return <>
    
    </>
}

export default function HomePage() {
    return <>
        <Title/>
        <Icons/>
        <LandingPage/>
    </>
};
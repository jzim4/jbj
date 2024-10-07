import React from 'react'
import LandingPage from './homePageModules.jsx'

function Title() {
    return <h1 id="landingPageTitle">ChemBox</h1>
};

export default function HomePage() {
    return <>
        <Title/>
        <LandingPage/>
    </>
};
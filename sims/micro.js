import {useEffect} from 'react'

export default function Microstates() {
    useEffect(() => {
        const canvas = document.getElementById("msCanvas");

        const ctx = canvas.getContext("2d");
        ctx.font = "50px Arial";
        ctx.fillText("Hello World",10,80);
    }, []);
    
}
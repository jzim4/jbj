import React, {useEffect} from 'react';

function InstructionWindowContent({sim}) {
    return <div id="instructionsContainer">
            <div id="greyBackground"></div>
            <img src={sim.instructionImg} id="instructionImg"></img>
            <button id="simInstructionExitButton">Got it, lets go!</button>
    </div>
}

export default function InstructionWindow({sim}) {
    useEffect(() => {
        const button = document.getElementById("simInstructionExitButton");
        const background = document.getElementById("instructionsContainer");

        // Check if the elements exist before adding event listeners
        if (button && background) {
            const hideWindow = () => {
                background.style.visibility = "hidden";
            };

            button.addEventListener("click", hideWindow);

            return () => button.removeEventListener("click", hideWindow);
        }
    }, []); // Empty dependency array to run only once on mount

    return <InstructionWindowContent sim={sim} />;
}
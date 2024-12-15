import React from 'react';
import Sketch from 'react-p5';
function IGL() {

    let canvasWidth = 922;
    let canvasHeight = 525;

    // Container and sliders
    let container;
    let temperatureSlider, volumeSlider, molesSlider;
    let sliderContainer;

    // Ideal gas constants
    let pressure;

    // Atom-related variables
    const atomRadius = 7;
    let atoms = [];
    const numOfAtoms = 150;
    let volume = 5;
    let previousVolume = volume;
    
    function setup(p5) {
        // placing canvas for simulation onto the webpage
        let canvas = document.getElementById('simCenterContainer');
        let p5Canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvas);
        p5Canvas.position(0,0,'relative');
        
       
        sliderContainer = document.getElementById('simCenterContainer');
        
        //creating container where all atom movements will happen
        container = new Container(p5);
        
        if (p5Canvas.canvas.id == "defaultCanvas0") {
            initializeSliders(p5);
        }
        initializeAtoms();

        //font stlye for simulation 
        let font = p5.loadFont('./assets/fonts/Oswald-Medium.ttf');
        p5.textFont(font)
        p5.textSize(19);
    }

    // p5 draw function which is continously looping
    function draw(p5) {
        p5.rect(50,50,container.maxWidth, container.maxHeight,5);
        p5.background(220);

        //create visuals around sliders that 
        drawControlPanel(p5);
        container.draw(p5);

        //drawing atoms of the canvas that match user input
        let moles = molesSlider.sliderValue;
        let temperature = temperatureSlider.sliderValue;
        drawAtoms(moles,temperature, p5);
        updateUI(p5);
        
        //drawing container to match user input
        volume = volumeSlider.sliderValue;
        container.updateCoordinates(volume);
        if (previousVolume !== volume) {
            initializeAtoms(p5);
            previousVolume = volume;
        }
        drawDottedRectangle(p5);
    }

    //draw a static dotted rectanlge around the max volume for the container
    //only serves as a visual
    function drawDottedRectangle(p5){
        p5.noFill();
        p5.stroke(0); // Black stroke for visibility
        p5.strokeWeight(2); // Ensure the stroke is thick enough
        p5.drawingContext.setLineDash([5, 5]);
        p5.rect(canvasWidth * 0.05, canvasHeight * 0.085,canvasWidth * 0.4,canvasHeight * 0.8,5);
        p5.drawingContext.setLineDash([]); 
    }

    //visuals that surround the control sliders
    function drawControlPanel(p5) {
        // Set the panel's position and dimensions
        let panelX = canvasWidth * 0.5;
        let panelY = canvasHeight * 0.06;
        let panelWidth = canvasWidth * 0.45;
        let panelHeight = canvasHeight * 0.85;
      
        // Draw the panel background
        p5.fill(180); // Light gray background
        p5.stroke(0); // Black border
        p5.strokeWeight(2); // Border thickness
        p5.rect(panelX, panelY, panelWidth, panelHeight, 10); // Rounded corners
        
        // Add a title for the control panel
        p5.fill(0);
        p5.noStroke();
        p5.textSize(20);
        p5.textAlign(p5.CENTER);
        p5.text("Control Panel", panelX + panelWidth / 2, 10);
      }

    //initializing the control slides for each variable (volume, tempature, and moles)
    // R is a constant so no slider
    function initializeSliders(p5) {
        const initialX = canvasWidth*0.55;
        const sliderSpacing = canvasWidth * 0.10; 

        volumeSlider = createControlSlider(1, 10, initialX, 5, p5);
        molesSlider = createControlSlider(0, 10, volumeSlider.sliderXPosition + sliderSpacing, 5, p5);
        temperatureSlider = createControlSlider(0, 300, molesSlider.sliderXPosition + sliderSpacing, 100, p5);
    }

    //calling the slider class to create sliders
    function createControlSlider(lowerBound, upperBound, xPosition, defaultValue, p5) {
        let slider = new ControlSlider(lowerBound, upperBound, xPosition, defaultValue, p5);
        return slider;
    }

    //initalizing all of the atoms that will be created in the simulation
    function initializeAtoms() {
        atoms = [];
        for (let i = 0; i < numOfAtoms; i++) {
            atoms.push(new Atom(atomRadius, p5));
        }
    }

    //drawing all the initialized atoms, while taking into consideration the number of moles the user has inputed
    //excess atoms are drawn to match the background color of the container
    // only needed atoms are drawn yellow
    function drawAtoms(moles, temperature, p5) {
        let displayedAtoms = Math.floor(moles * 15);
        for (let i = 0; i < numOfAtoms; i++) {
            atoms[i].update(atomRadius, temperature, p5);
            if (i > numOfAtoms - displayedAtoms){
                atoms[i].draw(atomRadius, 255, 206, 109, p5);
            }
            else{
                atoms[i].draw(atomRadius, 98, 130, 184, p5);
            }
        }
    }

    //changing the variable and pressure values to match the slider values
    function updateUI(p5) {
        drawSliderLabel(volumeSlider, "Volume", "cm^3", p5);
        drawSliderLabel(molesSlider, "Moles", "moles", p5);
        drawSliderLabel(temperatureSlider, "Temperature", "K", p5);

        calculatePressure();
        drawPressureBar(p5);
    }

    //calculating the presssure 
    // R is the J/mol*k
    function calculatePressure() {
        const R = 8.31;
        pressure = (temperatureSlider.sliderValue * molesSlider.sliderValue * R) / volumeSlider.sliderValue;
    }

    //creating the visual for the pressure bar
    function drawPressureBar(p5) {
        let barHeight = p5.map(pressure, 0, 26000, 0, canvasHeight * 0.8);
        p5.fill(237, 91, 45);
        p5.rect(canvasWidth * 0.55, canvasHeight * 0.9, canvasWidth * 0.02, -barHeight);
        
        p5.fill(0);
        p5.text("Pressure", canvasWidth * 0.565, canvasHeight * 0.9 + 20);
        p5.text(pressure.toFixed(2) + " atm", canvasWidth * 0.565, canvasHeight * 0.97);
    }

    //drawing the variable values specifically, since their positions are relative to each other
    function drawSliderLabel(slider, label, units, p5) {
        p5.fill(0);
        p5.noStroke();
        p5.textSize(16);
        p5.textAlign(p5.CENTER, p5.CENTER); // Center align horizontally and vertically
      
        // Center the label relative to the slider's position
        let xPosition = slider.sliderXPosition + 140; 
        let yPosition = slider.sliderYPosition + 175;
      
        // Draw the label
        p5.text(label, xPosition, yPosition - 30); 
        p5.text(`${slider.sliderValue} ${units}`, xPosition, yPosition-10);

    }

    //class to make the control sliders
    class ControlSlider {
        //setting value restriction for the sliders
        constructor(lowerBound, upperBound, xPosition, defaultValue, p5) {
            this.sliderLowerBound = lowerBound;
            this.sliderUpperBound = upperBound;
            this.sliderXPosition = xPosition;
            this.sliderYPosition = canvasHeight * 0.65;
            this.barMaxHeight = canvasHeight * 0.45;

            this.defaultValue = defaultValue;
    
            this.createVariableSlider(p5);
        }
    
        //overriding some of the default slider properties
        //css file contains code for overriding slider properties
        createVariableSlider(p5) {
            this.slider = p5.createSlider(this.sliderLowerBound, this.sliderUpperBound, this.defaultValue).parent(sliderContainer);
            this.slider.position(this.sliderXPosition - 60, this.sliderYPosition + 35);
            this.slider.style('transform', 'rotate(270deg)');
            this.slider.class('mySliders');
        }
    
        get sliderValue() {
            return this.slider.value();
        }
    }

    //container class that will update the bounds for atom movement and visual apperance of the container
    class Container {
        constructor(p5) {
            this.centerX = canvasWidth * 0.25;
            this.centerY = canvasHeight * 0.485;
            this.maxWidth = canvasWidth * 0.4;
            this.maxHeight = canvasHeight * 0.8;
            this.updateCoordinates(volume);
        }
    
        draw(p5) {
            p5.fill(98, 130, 184);
            p5.stroke(0);
            p5.rect(this.x, this.y, this.width, this.height, 5);
        }
    
        //updating the rectanlge coordinates 
        updateCoordinates(volume) {
            let scale = volume * 0.1;
            this.x = this.centerX - (scale * this.maxWidth) / 2;
            this.y = this.centerY - (scale * this.maxHeight) / 2;
            this.width = scale * this.maxWidth;
            this.height = scale * this.maxHeight;
        }

        //getter function for all of the containers bounds
        get bounds() {
            return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height,
            };
        }
        }

    //atom class that is updating atoms position and speed and enforcing containers bounds
    class Atom {
        constructor(radius, p5) {
            //setting the bounds for the atoms movements 
            let bounds = container.bounds;
            let xMin = bounds.left + radius;
            let xMax = bounds.right - radius;
            let yMin = bounds.top + radius;
            let yMax = bounds.bottom - radius;

            //random intial position for the atoms
            this.x = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
            this.y = Math.floor(Math.random() * (yMax - yMin + 1)) + yMin;
            
            // Randomize initial speed directions while keeping magnitude constant
            this.angle = Math.floor(Math.random() * 2 * 3.14); // Random angle in radians
            this.speed = 3; 
            this.xSpeed = this.speed * Math.cos(this.angle);
            this.ySpeed = this.speed * Math.sin(this.angle);
            
        }

        update(radius, temperature, p5) {
            // Update speed based on temperature
            this.speed = temperature * 0.1; // Zero speed is valid
        
            // Update velocities
            this.xSpeed = this.speed * Math.cos(this.angle);
            this.ySpeed = this.speed * Math.sin(this.angle);
        
            // Update position
            this.x += this.xSpeed;
            this.y += this.ySpeed;
        
            let bounds = container.bounds;
        
            // Handle boundary collisions
            if (this.x >= bounds.right - radius || this.x <= bounds.left + radius) {
                this.xSpeed *= -1; // Reverse horizontal direction
                this.angle = p5.PI - this.angle; // Adjust angle
                this.x = p5.constrain(this.x, bounds.left + radius + 1, bounds.right - radius - 1); // Move inside bounds
            }
        
            if (this.y >= bounds.bottom - radius || this.y <= bounds.top + radius) {
                this.ySpeed *= -1; // Reverse vertical direction
                this.angle = -this.angle; // Adjust angle
                this.y = p5.constrain(this.y, bounds.top + radius + 1, bounds.bottom - radius - 1); // Move inside bounds
            }
        
            // Normalize velocity
            let magnitude = Math.sqrt(this.xSpeed ** 2 + this.ySpeed ** 2);
            if (magnitude > 0) {
                this.xSpeed = (this.xSpeed / magnitude) * this.speed;
                this.ySpeed = (this.ySpeed / magnitude) * this.speed;
            }
        }
    
        draw(radius, r, g, b, p5) {
            p5.fill(r, g, b);
            p5.stroke(r, g, b);
            p5.ellipse(this.x, this.y, radius, radius);
        }
    }

    return (
        <Sketch setup={setup} draw={draw}/>
    )
}

export default IGL;
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
        let canvas = document.getElementById('simCenterContainer');
        let p5Canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvas);
        p5Canvas.position(0,0,'relative');
        
        sliderContainer = document.getElementById('simCenterContainer');
        
        container = new Container(p5);
        
        if (p5Canvas.canvas.id == "defaultCanvas0") {
            initializeSliders(p5);
        }
        initializeAtoms();

        let font = p5.loadFont('./assets/fonts/Oswald-Medium.ttf');
        p5.textFont(font)
        p5.textSize(19);
    }

    function draw(p5) {
        p5.rect(50,50,container.maxWidth, container.maxHeight,5);
        p5.background(220);

        drawControlPanel(p5);
        container.draw(p5);
        
        let moles = molesSlider.sliderValue;
        let temperature = temperatureSlider.sliderValue;
        drawAtoms(moles,temperature, p5);
        updateUI(p5);
        
        volume = volumeSlider.sliderValue;
        container.updateCoordinates(volume);

        if (previousVolume !== volume) {
            initializeAtoms(p5);
            previousVolume = volume;
        }
        drawDottedRectangle(p5);
    }

    function drawDottedRectangle(p5){
        p5.noFill();
        p5.stroke(0); // Black stroke for visibility
        p5.strokeWeight(2); // Ensure the stroke is thick enough
        p5.drawingContext.setLineDash([5, 5]);
        p5.rect(canvasWidth * 0.05, canvasHeight * 0.085,canvasWidth * 0.4,canvasHeight * 0.8,5);
        p5.drawingContext.setLineDash([]); 
    }

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

    function initializeSliders(p5) {
        const initialX = canvasWidth*0.55;
        const sliderSpacing = canvasWidth * 0.10; 

        volumeSlider = createControlSlider(1, 10, initialX, p5);
        molesSlider = createControlSlider(0, 10, volumeSlider.sliderXPosition + sliderSpacing, p5);
        temperatureSlider = createControlSlider(0, 300, molesSlider.sliderXPosition + sliderSpacing, p5);
    }

    function createControlSlider(lowerBound, upperBound, xPosition, p5) {
        let slider = new ControlSlider(lowerBound, upperBound, xPosition, p5);
        return slider;
    }

    function initializeAtoms() {
        atoms = [];
        for (let i = 0; i < numOfAtoms; i++) {
            atoms.push(new Atom(atomRadius, p5));
        }
    }

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

    function updateUI(p5) {
        drawSliderLabel(volumeSlider, "Volume", "cm^3", p5);
        drawSliderLabel(molesSlider, "Moles", "moles", p5);
        drawSliderLabel(temperatureSlider, "Temperature", "K", p5);

        calculatePressure();
        drawPressureBar(p5);
    }

    function calculatePressure() {
        const R = 8.31;
        pressure = (temperatureSlider.sliderValue * molesSlider.sliderValue * R) / volumeSlider.sliderValue;
    }

    function drawPressureBar(p5) {
        let barHeight = p5.map(pressure, 0, 26000, 0, canvasHeight * 0.8);
        p5.fill(237, 91, 45);
        p5.rect(canvasWidth * 0.55, canvasHeight * 0.9, canvasWidth * 0.02, -barHeight);
        
        p5.fill(0);
        p5.text("Pressure", canvasWidth * 0.565, canvasHeight * 0.9 + 20);
        p5.text(pressure.toFixed(2) + " atm", canvasWidth * 0.565, canvasHeight * 0.97);
    }

    function drawSliderLabel(slider, label, units, p5) {
        p5.fill(0);
        p5.noStroke();
        p5.textSize(16);
        p5.textAlign(p5.CENTER, p5.CENTER); // Center align horizontally and vertically
      
        // Center the label relative to the slider's position
        let xPosition = slider.sliderXPosition + 140; // Centered above the slider
        let yPosition = slider.sliderYPosition + 175; // Adjust for label position
      
        // Draw the label
        p5.text(label, xPosition, yPosition - 30); 
        p5.text(`${slider.sliderValue} ${units}`, xPosition, yPosition-10);

    }

    class ControlSlider {
        constructor(lowerBound, upperBound, xPosition, p5) {
            this.sliderLowerBound = lowerBound;
            this.sliderUpperBound = upperBound;
            this.sliderXPosition = xPosition;
            this.sliderYPosition = canvasHeight * 0.65;
            this.barMaxHeight = canvasHeight * 0.45;
    
            this.createVariableSlider(p5);
        }
    
        createVariableSlider(p5) {
            this.slider = p5.createSlider(this.sliderLowerBound, this.sliderUpperBound, 5).parent(sliderContainer);
            this.slider.position(this.sliderXPosition - 60, this.sliderYPosition + 35);
            this.slider.style('transform', 'rotate(270deg)');
            this.slider.class('mySliders');
        }
    
        get sliderValue() {
            return this.slider.value();
        }
    }

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
    
        updateCoordinates(volume) {
            let scale = volume * 0.1;
            this.x = this.centerX - (scale * this.maxWidth) / 2;
            this.y = this.centerY - (scale * this.maxHeight) / 2;
            this.width = scale * this.maxWidth;
            this.height = scale * this.maxHeight;
        }
    
        get bounds() {
            return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height,
            };
        }
        }
    
    class Atom {
        constructor(radius, p5) {
            let bounds = container.bounds;
            let xMin = bounds.left + radius;
            let xMax = bounds.right - radius;
            this.x = Math.floor(Math.random() * (xMax - xMin + 1)) + xMin;
            let yMin = bounds.top + radius;
            let yMax = bounds.bottom - radius;
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
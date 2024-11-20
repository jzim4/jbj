import React, { useEffect } from 'react';
import Sketch from 'react-p5';
function IGL() {

    let canvasWidth = 922;
    let canvasHeight = 525;

    // Container and sliders
    let container;
    let pressureSlider, temperatureSlider, volumeSlider, molesSlider;
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
        initializeSliders(p5);
        initializeAtoms();

        let font = p5.loadFont('./assets/fonts/Oswald-Medium.ttf');
        p5.textFont(font)
        p5.textSize(19);
    }

    function draw(p5) {
        p5.rect(50,50,container.maxWidth, container.maxHeight,5);
        p5.background(220);
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
            atoms[i].updateSpeed(temperature);
            atoms[i].update(atomRadius, p5);
            if (i > displayedAtoms - 1){
            atoms[i].draw(atomRadius,  98, 130, 184, p5);
            }
            else{
            atoms[i].draw(atomRadius, 255, 206, 109, p5);
            }
        
        }
    }

    function updateUI(p5) {
        drawSliderLabel(volumeSlider, "Volume", "cm", p5);
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
        let barHeight = p5.map(pressure, 0, 5000, 0, canvasHeight * 0.8);
        p5.fill(237, 91, 45);
        p5.rect(canvasWidth * 0.55, canvasHeight * 0.9, canvasWidth * 0.02, -barHeight);
        
        p5.fill(0);
        p5.text("Pressure", canvasWidth * 0.53, canvasHeight * 0.9 + 20);
        p5.text(pressure.toFixed(2), canvasWidth * 0.535, canvasHeight * 0.97);
    }

    function drawSliderLabel(slider, label, units, p5) {
        p5.fill(0);
        p5.stroke(0);
        let xPosition = slider.sliderXPosition+115
        p5.text(label, xPosition, canvasHeight * 0.935);
        p5.text(slider.sliderValue, xPosition + 10, canvasHeight * 0.97);
        p5.text(units, xPosition+ 30, canvasHeight * 0.97);
    }

    class ControlSlider {
        constructor(lowerBound, upperBound, xPosition, p5) {
            this.sliderLowerBound = lowerBound;
            this.sliderUpperBound = upperBound;
            this.sliderXPosition = xPosition;
            this.sliderYPosition = canvasHeight * 0.6;
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
            this.centerY = canvasHeight * 0.5;
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
            this.x = Math.random(bounds.left + radius, bounds.right - radius);
            this.y = Math.random(bounds.top + radius, bounds.bottom - radius);
            
            // Randomize initial speed directions while keeping magnitude constant
            this.angle = Math.random(p5.TWO_PI); // Random angle in radians
            this.speed = 3; 
            this.xSpeed = this.speed * Math.cos(this.angle);
            this.ySpeed = this.speed * Math.sin(this.angle);
            
        }
        
        updateSpeed(tempature){
            let R = 8.31;
            this.speed = Math.sqrt(3*R*tempature)*0.1;
            this.xSpeed = this.speed * Math.cos(this.angle);
            this.ySpeed = this.speed * Math.sin(this.angle);
        }
    
        update(radius) {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            
            let bounds = container.bounds;
            if (this.x > bounds.right - radius || this.x < bounds.left + radius) this.xSpeed *= -1;
            if (this.y > bounds.bottom - radius || this.y < bounds.top + radius) this.ySpeed *= -1;
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
import React from 'react';
import Sketch from 'react-p5';

function Orbitals() {
  
  class Orbital {
    constructor(imgName, name, xpos, ypos, width, height) {
        this.imgName = imgName;
        this.name = name;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;
      }
  }
  
  const width = 922;
  const height = 525;
  const left = makeLeftOrbitals();
  const right = makeRightOrbitals();
  
  let selectedL = null;
  let selectedR = null;

  let pxN;
  let pxP;
  let pzN;
  let pzP;
  let pconst;
  let pcombconst;
  let pcombdest;
  let font;

  function preload(p5) {
    pxN = p5.loadImage('./assets/orbitals/Px-.png');
    pxP = p5.loadImage('./assets/orbitals/Px+.png');
    pzN = p5.loadImage('./assets/orbitals/Pz-.png');
    pzP = p5.loadImage('./assets/orbitals/Pz+.png');
    pconst = p5.loadImage('./assets/orbitals/constructivePx.png');
    pcombconst = p5.loadImage('./assets/orbitals/Pcombconst.png');
    pcombdest = p5.loadImage('./assets/orbitals/Pcombdest.png');
    font = p5.loadFont('./assets/fonts/Oswald-Medium.ttf');
  }

  function setup(p5) {
    let canvas = document.getElementById('p5Canvas');
    console.log(canvas);
    let p5Canvas = p5.createCanvas(width, height, canvas);
    p5Canvas.position(0,0,'relative');
    resetCanvas(p5);
  }
 
  function mousePressed (p5) {
    if (detectResetClick(p5.mouseX, p5.mouseY, p5)) {
        selectedL = null;
        selectedR = null;
    } else if (p5.mouseX < 400) {
        selectedL = detectLeftOrbitalClick(p5.mouseX, p5.mouseY);
    }
    else {
        selectedR = detectRightOrbitalClick(p5.mouseX, p5.mouseY);
    }
    highlightSelections(p5);
    drawCombination(p5);
  }
  
  function mouseMoved(p5) {
    changeCursor(p5.mouseX, p5.mouseY);
  }
  
  function resetCanvas(p5) {
    p5.background(255);
    drawOrbitals(p5);
    drawResetButton(p5);
    drawInstructions(p5);
    drawCenterBox(p5);
  }
  
  function drawImg(img, p5) {
    p5.image(eval(img.imgName), img.xpos, img.ypos, img.width, img.height);
  }
  
  function changeCursor(x, y) {
    let mouseX = x;
    let mouseY = y;
  
    let pointer = false;
  
    for (let orb in left) {
        let o = left[orb];
        if (o.xpos <= mouseX && o.xpos+o.width >= mouseX && o.ypos<=mouseY && o.ypos+o.height>=mouseY) {
            pointer = true;
        }
    }
    for (let orb in right) {
        let o = right[orb];
        if (o.xpos <= mouseX && o.xpos+o.width >= mouseX && o.ypos<=mouseY && o.ypos+o.height>=mouseY) {
            pointer = true;
        }
    }
    //reset button
    if (419<=mouseX && 504>=mouseX && 440<=mouseY && 480>=mouseY) {
        pointer = true;
    }
    if (pointer) {
        document.body.style.cursor = "pointer";
    }
    else {
        document.body.style.cursor = "default";
    }   
  }
  
  function makeLeftOrbitals() {
    let pxNegL = new Orbital("pxN", "Px", 140, 120, 100, 50);
    let pxPosL = new Orbital("pxP", "Px", 140, 190, 100, 50);
    let pzNegL = new Orbital("pzP", "Pz", 165, 260, 50, 100);
    let pzPosL = new Orbital("pzN", "Pz", 165, 400, 50, 100);
    
    let left = [pxNegL, pxPosL, pzNegL, pzPosL];
    return left;
  }
  
  function makeRightOrbitals() {
    let pxNegR = new Orbital("pxN", "Px", 650,120, 100, 50);
    let pxPosR = new Orbital("pxP", "Px", 650, 190, 100, 50);
    let pzNegR = new Orbital("pzP", "Pz", 675, 260, 50, 100);
    let pzPosR = new Orbital("pzN", "Pz", 675, 400, 50, 100);
  
    let right = [pxNegR, pxPosR, pzNegR, pzPosR];
    return right;
  }
  
  function drawOrbitals(p5) {
    p5.textFont(font, 20);
    for (let img in left) {
        drawImg(left[img], p5);
        drawOrbLabel(left[img].name, true, left[img].ypos + left[img].height/2 + 5, p5);
    }
    for(let img in right) {
        drawImg(right[img], p5);
        drawOrbLabel(right[img].name, false, right[img].ypos + right[img].height/2 + 5, p5);
    }
  }
  
  function drawOrbLabel(label, left, ypos, p5) {
    let xpos = 780;
    if (left) {
        xpos = 85;
    }
    p5.textFont(font, 20);
    p5.text(label, xpos, ypos);
  }
  
  function drawCenterBox(p5) {
    p5.strokeWeight(4);
    p5.noFill();
    p5.rect(361, 150, 200, 200);
    p5.fill('black');
  }
  
  function drawRect (i, p5) {
    p5.strokeWeight(4);
    p5.noFill();
    p5.rect(i.xpos-3, i.ypos - 3, i.width + 3, i.height + 3);
    p5.fill('black');
  }
  
  function instructions(left, words, p5) {
    let xpos = 650;
    if (left) {
        xpos = 140;
    }
    p5.textFont(font, 30);
    p5.text(words, xpos, 60);
  }
  
  function drawInstructions(p5) {
    p5.textFont(font, 20);
    if (!selectedL) {
        instructions(true, "Select an orbital", p5);
    }
    else {
        instructions(true, selectedL.name, p5);
    }
    if (!selectedR) {
        instructions(false, "Select an orbital", p5);
    }
    else {
        instructions(false, selectedR.name, p5);
    }
  }
  
  function highlightSelections(p5) {
    if (selectedL != null || selectedR != null) {
        resetCanvas(p5);
        if (selectedL) {
            drawRect(selectedL, p5);
        }
        if (selectedR) {
            drawRect(selectedR, p5);
        }
    }
  }
  
  function drawCombLabel(label, xpos, p5) {
    p5.textFont(font, 30);
    p5.text(label, 350, 130);
  }
  
  function drawCombination(p5) {
    let constructivePx = new Orbital('pconst', 'constructivePx', 361, 200, 200, 100);
    let pcombconst = new Orbital('pcombconst', 'Pcombconst', 386, 170, 150, 150);
    if (selectedL && selectedR) {
        if (selectedL.imgName == 'pxP' && selectedR.imgName == 'pxN') {
            drawImg(constructivePx, p5);
            drawCombLabel(constructivePx.name, 400, p5);
        }
        if (selectedL.imgName == 'pzP' && selectedR.imgName == 'pzP') {
            drawImg(pcombconst, p5);
            drawCombLabel(pcombconst.name, 350, p5);
        }
    }
  }
  
  function drawResetButton(p5) {
    p5.textFont(font, 30);
    p5.noFill();
    p5.strokeWeight(4);
    p5.rect(419, 440, 85, 40);
    p5.fill('black');
    p5.text("Reset", 429, 470);
  }
  
  function detectResetClick(mouseX, mouseY, p5) {
    if (mouseX >= 400 && mouseX <= 485 && mouseY >= 440 && mouseY <= 480) {
        resetCanvas(p5);
        return true;
    }
  }
  
  function detectLeftOrbitalClick (mouseX, mouseY) {
    let prev = selectedL;
    for (let img in left) {
        let i = left[img];
        if (mouseX >= i.xpos && mouseX <= i.xpos + i.width && mouseY >= i.ypos && mouseY <= i.ypos + i.height) {
            return i;
        }
    } 
    return prev;
  }
  function detectRightOrbitalClick (mouseX, mouseY) {
    let prev = selectedR;
    for (let img in right) {
        let i = right[img];
        if (mouseX >= i.xpos && mouseX <= i.xpos + i.width && mouseY >= i.ypos && mouseY <= i.ypos + i.height) {
            return i;
        }
    }
    return prev;
  }

  console.log('run');
  return (
      <Sketch preload={preload} mousePressed={mousePressed} mouseMoved={mouseMoved} setup={setup} />
  )
}

export default Orbitals;
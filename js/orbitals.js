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

  let px;
  let pxAlt;
  let constructivePx;
  let constructivePxAlt;
  let destructivePx;
  let destructivePxAlt;

  let pz;
  let pzAlt;
  let constructivePz;
  let constructivePzAlt;
  let destructivePz;
  let destructivePzAlt;

  let s;
  let sAlt;
  let constructiveS;
  let constructiveSAlt;
  let destructiveS;
  let destructiveSAlt;


  let spx;
  let spxAlt;
  let spz;
  let spzAlt;
  let sAltpx;
  let sAltpxAlt;
  let sAltpz;
  let sAltpzAlt;

  let font;

  function preload(p5) {
    px = p5.loadImage('./assets/orbitals/px/Px.png');
    pxAlt = p5.loadImage('./assets/orbitals/px/PxAlt.png');
    constructivePx = p5.loadImage('./assets/orbitals/px/constructivePx.png');
    constructivePxAlt = p5.loadImage('./assets/orbitals/px/constructivePxAlt.png');
    destructivePx = p5.loadImage('./assets/orbitals/px/destructivePx.png');
    destructivePxAlt = p5.loadImage('./assets/orbitals/px/destructivePxAlt.png');

    pz = p5.loadImage('./assets/orbitals/pz/Pz.png');
    pzAlt = p5.loadImage('./assets/orbitals/pz/PzAlt.png');
    constructivePz = ('./assets/orbitals/pz/constructivePz.png');
    constructivePzAlt = ('./assets/orbitals/pz/constructivePAlt.png');
    destructivePz = p5.loadImage('./assets/orbitals/pz/destructivePz.png');
    destructivePzAlt = p5.loadImage('./assets/orbitals/pz/destructivePzAlt.png');

    s = p5.loadImage('./assets/orbitals/s/s.png');
    sAlt = p5.loadImage('./assets/orbitals/s/IMCONFUSED.PNG');
    constructiveS = ('./assets/orbitals/s/constructiveS.png');
    constructiveSAlt = ('./assets/orbitals/s/constructiveSAlt.png');
    destructiveS = ('./assets/orbitals/s/destructiveS.png');
    destructiveSAlt = ('./assets/orbitals/s/destructiveSAlt.png');

    spx = p5.loadImage('./assets/orbitals/s-p/spx.png');
    spxAlt = p5.loadImage('./assets/orbitals/s-p/spxAlt.png');
    spz = p5.loadImage('./assets/orbitals/s-p/spz.png');
    spzAlt = p5.loadImage('./assets/orbitals/s-p/spzAlt.png');
    sAltpx = p5.loadImage('./assets/orbitals/s-p/sAltpx.png');
    sAltpxAlt = p5.loadImage('./assets/orbitals/s-p/sAltpxAlt.png');
    sAltpz = p5.loadImage('./assets/orbitals/s-p/sAltpz.png');
    sAltpzAlt = p5.loadImage('./assets/orbitals/s-p/sAltpzAlt.png');


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
    let s = new Orbital("s", "S", 200, 100, 40, 40);
    let sAlt = new Orbital("sAlt", "S", 200, 155, 40, 40);
    let px = new Orbital("px", "Px", 180, 270, 80, 40);
    let pxAlt = new Orbital("pxAlt", "Px", 180, 215, 80, 40);
    let pz = new Orbital("pz", "Pz", 200, 330, 40, 80);
    let pzAlt = new Orbital("pzAlt", "Pz", 200, 425, 40, 80);
    
    let left = [s, sAlt, px, pxAlt, pz, pzAlt];
    return left;
  }
  
  function makeRightOrbitals() {
    let s = new Orbital("s", "S", 670,100, 40, 40);
    let sAlt = new Orbital("sAlt", "S", 670, 155, 40, 40);
    let px = new Orbital("px", "Px", 650, 270, 80, 40);
    let pxAlt = new Orbital("pxAlt", "Px", 650, 215, 80, 40);
    let pz = new Orbital("pz", "Pz", 670, 339, 40, 80);
    let pzAlt = new Orbital("pzAlt", "Pz", 670, 425, 40, 80);
  
    let right = [s, sAlt, px, pxAlt, pz, pzAlt];
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
    p5.rect(i.xpos-3, i.ypos - 3, i.width + 6, i.height + 6);
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
    let constructivePx = new Orbital('constructivePx', 'Constructive Px', 361, 200, 200, 100);
    let constructivePxAlt = new Orbital('constructivePxAlt', 'Constructive Px', 361, 200, 200, 100);
    let destructivePx = new Orbital('destructivePx', 'Destructive Px', 361, 200, 200, 100);
    let destructivePxAlt = new Orbital('destructivePxAlt', 'Destructive Px', 361, 200, 200, 100);

    let constructivePz = new Orbital('constructivePz', 'Constructive Pz', 361, 200, 200, 100);
    let constructivePzAlt = new Orbital('constructivePzAlt', 'Constructive Pz', 361, 200, 200, 100);
    let destructivePz = new Orbital('destructivePz', 'Destructive Pz', 361, 200, 200, 100);
    let destructivePzAlt = new Orbital('destructivePzAlt', 'Destructive Pz', 361, 200, 200, 100);

    let constructiveS = new Orbital('constructiveS', 'Constructive S', 361, 200, 200, 100);
    let constructiveSAlt = new Orbital('constructiveSAlt', 'Constructive S', 361, 200, 200, 100);
    let destructiveS = new Orbital('destructiveS', 'Destructive S', 361, 200, 200, 100);
    let destructiveSAlt = new Orbital('destructiveSAlt', 'Destructive S', 361, 200, 200, 100);

    let spx = new Orbital('spx', 'I DON\'T KNOW', 361, 200, 200, 100);
    let spxAlt = new Orbital('spxAlt', 'I DON\'T KNOW', 361, 200, 200, 100);
    let spz = new Orbital('spz', 'I DON\'T KNOW', 361, 200, 200, 100);
    let spzAlt = new Orbital('spzAlt', 'I DON\'T KNOW', 361, 200, 200, 100);
    let sAltpx = new Orbital('sAltpx', 'I DON\'T KNOW', 361, 200, 200, 100);
    let sAltpxAlt = new Orbital('sAltpxAlt', 'I DON\'T KNOW', 361, 200, 200, 100);
    let sAltpz = new Orbital('sAltpz', 'I DON\'T KNOW', 361, 200, 200, 100);
    let sAltpzAlt = new Orbital('sAltpzAlt', 'I DON\'T KNOW', 361, 200, 200, 100);
     
    if (selectedL && selectedR) {
        if (selectedL.imgName == 'px' && selectedR.imgName == 'pxAlt') {
            drawImg(constructivePx, p5);
            drawCombLabel(constructivePx.name, 400, p5);
        }

        // TODO: WRITE IN ALL THE COMBINATIONS... FML




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
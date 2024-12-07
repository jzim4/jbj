import React, {useEffect} from 'react';
import Sketch from 'react-p5';

function Orbitals() {
  let run = true;

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
  
  const canvasWidth = 922;
  const canvasHeight = 525;
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
    constructivePz = p5.loadImage('./assets/orbitals/pz/constructivePz.png');
    constructivePzAlt = p5.loadImage('./assets/orbitals/pz/constructivePzAlt.png');
    destructivePz = p5.loadImage('./assets/orbitals/pz/destructivePz.png');
    destructivePzAlt = p5.loadImage('./assets/orbitals/pz/destructivePzAlt.png');

    s = p5.loadImage('./assets/orbitals/s/s.png');
    sAlt = p5.loadImage('./assets/orbitals/s/sAlt.png');
    constructiveS = p5.loadImage('./assets/orbitals/s/constructiveS.png');
    constructiveSAlt = p5.loadImage('./assets/orbitals/s/constructiveSAlt.png');
    destructiveS = p5.loadImage('./assets/orbitals/s/destructiveS.png');
    destructiveSAlt = p5.loadImage('./assets/orbitals/s/destructiveSAlt.png');

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
    let canvas = document.getElementById('simCenterContainer');
    let p5Canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvas);
    p5Canvas.position(0,0,'relative');
    resetCanvas(p5);
  }

  function keyPressed(p5) {
    if (run) {
      let key = p5.key.toLowerCase();
      let newSelection = false;
      if (key == '1') {
        selectedL = left[0];
        newSelection = true;
      }
      if (key == '2') {
        selectedL = left[1];
        newSelection = true;
      }
      if (key == '3') {
        selectedL = left[2];
        newSelection = true;
      }
      if (key == '4') {
        selectedL = left[3];
        newSelection = true;
      }
      if (key == '5') {
        selectedL = left[4];
        newSelection = true;
      }
      if (key == '6') {
        selectedL = left[5];
        newSelection = true;
      }
      if (key == 'a') {
        selectedR = right[0];
        newSelection = true;
      }
      if (key == 'b') {
        selectedR = right[1];
        newSelection = true;
      }
      if (key == 'c') {
        selectedR = right[2];
        newSelection = true;
      }
      if (key == 'd') {
        selectedR = right[3];
        newSelection = true;
      }
      if (key == 'e') {
        selectedR = right[4];
        newSelection = true;
      }
      if (key == 'f') {
        selectedR = right[5];
        newSelection = true;
      }
      if (newSelection) {
        highlightSelections(p5);
        drawRedSubmitButton(p5);
      }
      if (p5.keyCode == p5.ENTER) {
        highlightSelections(p5);
        drawCombination(p5);
      }
      if (p5.keyCode == p5.BACKSPACE) {
        selectedL = null;
        selectedR = null;
        resetCanvas(p5);
      }
    }
  }
 
  function mousePressed (p5) {
    if (run) {
      if (detectResetClick(p5.mouseX, p5.mouseY, p5)) {
          selectedL = null;
          selectedR = null;
          resetCanvas(p5);
      }
      else {
        if (detectSubmitClick(p5.mouseX, p5.mouseY)) {
          highlightSelections(p5);
          drawCombination(p5);
        } 
        else if (p5.mouseX < 400) {
            selectedL = detectLeftOrbitalClick(p5.mouseX, p5.mouseY);
            highlightSelections(p5);
            drawRedSubmitButton(p5);
        }
        else {
            selectedR = detectRightOrbitalClick(p5.mouseX, p5.mouseY);
            highlightSelections(p5);
            drawRedSubmitButton(p5);
        }
      }
    }
  }

  function mouseMoved(p5) {
    if (run) {
      changeCursor(p5.mouseX, p5.mouseY);
    }
  }
  
  function resetCanvas(p5) {
    p5.background(238);
    drawOrbitals(p5);
    drawResetButton(p5);
    drawSubmitButton(p5);
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
    // submit button
    if (401<=mouseX && 521>=mouseX && 400<=mouseY && 440>=mouseY) {
      pointer = true;
    }
    //reset button
    if (426<=mouseX && 496>=mouseX && 460<=mouseY && 490>=mouseY) {
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
    let s = new Orbital("s", "(1) S", 200, 100, 40, 40);
    let sAlt = new Orbital("sAlt", "(2) S", 200, 155, 40, 40);
    let px = new Orbital("px", "(3) Px", 180, 215, 80, 40);
    let pxAlt = new Orbital("pxAlt", "(4) Px", 180, 270, 80, 40);
    let pz = new Orbital("pz", "(5) Pz", 200, 330, 40, 80);
    let pzAlt = new Orbital("pzAlt", "(6) Pz", 200, 425, 40, 80);
    
    let left = [s, sAlt, px, pxAlt, pz, pzAlt];
    return left;
  }
  
  function makeRightOrbitals() {
    let s = new Orbital("s", "(a) S", 670,100, 40, 40);
    let sAlt = new Orbital("sAlt", "(b) S", 670, 155, 40, 40);
    let px = new Orbital("px", "(c) Px", 650, 215, 80, 40);
    let pxAlt = new Orbital("pxAlt", "(d) Px", 650, 270, 80, 40);
    let pz = new Orbital("pz", "(e) Pz", 670, 339, 40, 80);
    let pzAlt = new Orbital("pzAlt", "(f) Pz", 670, 425, 40, 80);
  
    let right = [s, sAlt, px, pxAlt, pz, pzAlt];
    return right;
  }
  
  function drawOrbitals(p5) {
    p5.textFont(font, 20);
    for (let img in left) {
        drawImg(left[img], p5);
        p5.fill(0);
        drawOrbLabel(left[img].name, true, left[img].ypos + left[img].height/2 + 5, p5);
    }
    for(let img in right) {
        drawImg(right[img], p5);
        drawOrbLabel(right[img].name, false, right[img].ypos + right[img].height/2 + 5, p5);
    }
  }
  
  function drawOrbLabel(label, left, ypos, p5) {
    p5.textAlign(p5.CENTER);
    p5.noStroke();
    let xpos = 800;
    if (left) {
      xpos = 85;
    }
    p5.textFont(font, 20);
    p5.fill(0);
    p5.text(label, xpos, ypos);
  }
  
  function drawCenterBox(p5) {
    p5.strokeWeight(4);
    p5.stroke(0);
    p5.noFill();
    p5.rect(361, 150, 200, 200);
    p5.fill(0);
  }
  
  function drawRect (i, p5) {
    p5.strokeWeight(4);
    p5.noFill();
    p5.rect(i.xpos-3, i.ypos - 3, i.width + 6, i.height + 6);
    p5.fill(0);
  }
  
  function instructions(left, words, p5) {
    p5.textAlign(p5.CENTER);
    let xpos = 690;
    if (left) {
        xpos = 220;
    }
    if (words == "Select an orbital") {
      p5.fill(237, 91, 45);
    }
    else {
      p5.fill(98, 130, 184);
    }
    p5.textFont(font, 30);
    p5.text(words, xpos, 60);
    p5.fill(0);
  }
  
  function drawInstructions(p5) {
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
  
  function drawCombLabel(label, p5) {
    p5.textAlign(p5.CENTER);
    p5.textFont(font, 30);
    p5.fill(98, 130, 184);
    p5.noStroke();
    p5.text(label, 461, 130);
  }

  function drawCombError(p5) {
    p5.textAlign(p5.CENTER);
    p5.fill(237, 91, 45);
    p5.textFont(font, 25);
    p5.noStroke();
    p5.text("These orbitals \ndo not mix", 461, 250);
  }
  
  function drawCombination(p5) {
    let maxSize = 180;
    let left = 361 + (200 - maxSize)/2;
    let top = 150 + (200 - maxSize)/2;

    let constructivePxOrb = new Orbital('constructivePx', 'Constructive Px', left, top + maxSize * 0.69/2, maxSize, maxSize*0.31);
    let constructivePxAltOrb = new Orbital('constructivePxAlt', 'Constructive Px', left, top + maxSize*0.69/2, maxSize, maxSize*0.31);
    let destructivePxOrb = new Orbital('destructivePx', 'Destructive Px', left, top + maxSize*0.76/2, maxSize, maxSize*0.24);
    let destructivePxAltOrb = new Orbital('destructivePxAlt', 'Destructive Px', left, top + maxSize*0.76/2, maxSize, maxSize*0.24);

    let constructivePzOrb = new Orbital('constructivePz', 'Constructive Pz', left, top, maxSize, maxSize);
    let constructivePzAltOrb = new Orbital('constructivePzAlt', 'Constructive Pz', left, top, maxSize, maxSize);
    let destructivePzOrb = new Orbital('destructivePz', 'Destructive Pz', left, top, maxSize, maxSize);
    let destructivePzAltOrb = new Orbital('destructivePzAlt', 'Destructive Pz', left, top, maxSize, maxSize);

    let constructiveSOrb = new Orbital('constructiveS', 'Constructive S', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let constructiveSAltOrb = new Orbital('constructiveSAlt', 'Constructive S', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let destructiveSOrb = new Orbital('destructiveS', 'Destructive S', left, top + maxSize*0.54/2, maxSize, maxSize*0.46);
    let destructiveSAltOrb = new Orbital('destructiveSAlt', 'Destructive S', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);

    let spxOrb = new Orbital('spx', 'S Px Hybrid', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let spxAltOrb = new Orbital('spxAlt', 'S Px Hybrid', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let spzOrb = new Orbital('spz', 'S Pz Hybrid', left + maxSize*0.5/2, top, maxSize*0.5, maxSize);
    let spzAltOrb = new Orbital('spzAlt', 'S Pz Hybrid', left + maxSize*0.5/2, top, maxSize*0.5, maxSize);
    let sAltpxOrb = new Orbital('sAltpx', 'S Px Hybrid', left, top + maxSize*0.52/2, maxSize, maxSize*0.48);
    let sAltpxAltOrb = new Orbital('sAltpxAlt', 'S Px Hybrid', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let sAltpzOrb = new Orbital('sAltpz', 'S Pz Hybrid', left + maxSize*0.52/2, top, maxSize*0.48, maxSize);
    let sAltpzAltOrb = new Orbital('sAltpzAlt', 'S Pz Hybrid', left + maxSize*0.52/2, top, maxSize*0.48, maxSize);
    

    let combOrbital = null;
    if (selectedL.imgName == 'px') {
      if (selectedR.imgName == 'px') {
        combOrbital = destructivePxOrb;
      }
      else if (selectedR.imgName == 'pxAlt') {
        combOrbital = constructivePxOrb;
      }
      else if (selectedR.imgName == 'pz') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 'pzAlt') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 's') {
        combOrbital = spxOrb;
      }
      else if (selectedR.imgName == 'sAlt') {
        // TODO
        combOrbital = sAltpxOrb;
      }
    }
    else if (selectedL.imgName == 'pxAlt') {
      if (selectedR.imgName == 'px') {
        combOrbital = constructivePxAltOrb;
      }
      else if (selectedR.imgName == 'pxAlt') {
        combOrbital = destructivePxAltOrb;
      }
      else if (selectedR.imgName == 'pz') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 'pzAlt') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 's') {
        combOrbital = spxAltOrb;
      }
      else if (selectedR.imgName == 'sAlt') {
        combOrbital = sAltpxAltOrb;
      }
    }
    else if (selectedL.imgName == 'pz') {
      if (selectedR.imgName == 'px') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 'pxAlt') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 'pz') {
        combOrbital = constructivePzOrb;
      }
      else if (selectedR.imgName == 'pzAlt') {
        combOrbital = destructivePzOrb;
      }
      else if (selectedR.imgName == 's') {
        combOrbital = spzOrb;
      }
      else if (selectedR.imgName == 'sAlt') {
        combOrbital = sAltpzOrb;
      }
    }
    else if (selectedL.imgName == 'pzAlt') {
      if (selectedR.imgName == 'px') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 'pxAlt') {
        // TODO
        combOrbital = null;
      }
      else if (selectedR.imgName == 'pz') {
        combOrbital = destructivePzAltOrb;
      }
      else if (selectedR.imgName == 'pzAlt') {
        combOrbital = constructivePzAltOrb;
      }
      else if (selectedR.imgName == 's') {
        combOrbital = spzAltOrb;
      }
      else if (selectedR.imgName == 'sAlt') {
        combOrbital = sAltpzAltOrb;
      }
    }
    else if (selectedL.imgName == 's') {
      if (selectedR.imgName == 'px') {
        combOrbital = spxOrb;
      }
      else if (selectedR.imgName == 'pxAlt') {
        combOrbital = spxAltOrb;
      }
      else if (selectedR.imgName == 'pz') {
        combOrbital = spzOrb;
      }
      else if (selectedR.imgName == 'pzAlt') {
        combOrbital = spzAltOrb;
      }
      else if (selectedR.imgName == 's') {
        combOrbital = constructiveSOrb;
      }
      else if (selectedR.imgName == 'sAlt') {
        combOrbital = destructiveSOrb;
      }
    }
    else if (selectedL.imgName == 'sAlt') {
      if (selectedR.imgName == 'px') {
        combOrbital = sAltpxOrb;
      }
      else if (selectedR.imgName == 'pxAlt') {

        combOrbital = sAltpxAltOrb;
      }
      else if (selectedR.imgName == 'pz') {
        combOrbital = sAltpzOrb;
      }
      else if (selectedR.imgName == 'pzAlt') {
        combOrbital = sAltpzAltOrb;
      }
      else if (selectedR.imgName == 's') {
        combOrbital = destructiveSAltOrb;
      }
      else if (selectedR.imgName == 'sAlt') {
        combOrbital = constructiveSAltOrb;
      }
    }

    if (combOrbital) {
      drawImg(combOrbital, p5);
      drawCombLabel(combOrbital.name, p5);
    }
    else {
      drawCombError(p5);
    }
    drawResetButton(p5);
  }

  function drawSubmitButton(p5) {
    p5.textFont(font, 30);
    p5.noFill();
    p5.strokeWeight(4);
    p5.rect(401, 400, 120, 40);
    p5.stroke(0);
    p5.fill(0);
    p5.noStroke();
    p5.text("Combine", 461, 430);
  }

  function drawRedSubmitButton(p5) {
    if (selectedL && selectedR) {
      p5.textFont(font, 30);
      p5.noFill();
      p5.strokeWeight(4);
      p5.stroke(237, 91, 45);
      p5.rect(401, 400, 120, 40);
      p5.fill(237, 91, 45);
      p5.noStroke();
      p5.text("Combine", 461, 430);
    }
    p5.fill(0);
  }

  function detectSubmitClick(mouseX, mouseY) {
    // mouse location
    if (401<=mouseX && 521>=mouseX && 400<=mouseY && 440>=mouseY) {
        if (selectedL && selectedR) {
          return true;
        }
    }
    return false;
  }
  
  function drawResetButton(p5) {
    p5.textFont(font, 20);
    p5.noFill();
    p5.strokeWeight(4);
    p5.stroke(0);
    p5.rect(426, 460, 70, 30);
    p5.noStroke();
    p5.fill(0);
    p5.text("Reset", 461, 482);
    p5.stroke(0);
  }
  
  function detectResetClick(mouseX, mouseY, p5) {
    if (mouseX >= 426 && mouseX <= 496 && mouseY >= 460 && mouseY <= 490) {
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

  return (
      <Sketch keyPressed={keyPressed} preload={preload} mousePressed={mousePressed} mouseMoved={mouseMoved} setup={setup} />
  )
}

export default Orbitals;
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
  let selectedL;
  let selectedR;
  
  let font;

  let a;
  let b;
  let c;
  let d;
  let e;
  let f;
  
  let aaImg;
  let abImg;
  let acImg;
  let adImg;
  let aeImg;
  let afImg;
  
  let baImg;
  let bbImg;
  let bcImg;
  let bdImg;
  let beImg;
  let bfImg;

  let ccImg;
  let cdImg;

  let dcImg;
  let ddImg;

  let eeImg;
  let efImg;

  let feImg;
  let ffImg;

  function preload(p5) {
    font = p5.loadFont('./assets/fonts/Oswald-Medium.ttf');

    selectedL = null;
    selectedR = null;

    console.log("preloading");
    a = p5.loadImage('./assets/orbitals/orb/a.png');
    b = p5.loadImage('./assets/orbitals/orb/b.png');
    c = p5.loadImage('./assets/orbitals/orb/c.png');
    d = p5.loadImage('./assets/orbitals/orb/d.png');
    e = p5.loadImage('./assets/orbitals/orb/e.png');
    f = p5.loadImage('./assets/orbitals/orb/f.png');

    aaImg = p5.loadImage('./assets/orbitals/hybrid/aa.png');
    abImg = p5.loadImage('./assets/orbitals/hybrid/ab.png');
    acImg = p5.loadImage('./assets/orbitals/hybrid/ac.png');
    adImg = p5.loadImage('./assets/orbitals/hybrid/ad.png');
    aeImg = p5.loadImage('./assets/orbitals/hybrid/ae.png');
    afImg = p5.loadImage('./assets/orbitals/hybrid/af.png');

    baImg = p5.loadImage('./assets/orbitals/hybrid/ba.png');
    bbImg = p5.loadImage('./assets/orbitals/hybrid/bb.png');
    bcImg = p5.loadImage('./assets/orbitals/hybrid/bc.png');
    bdImg = p5.loadImage('./assets/orbitals/hybrid/bd.png');
    beImg = p5.loadImage('./assets/orbitals/hybrid/be.png');
    bfImg = p5.loadImage('./assets/orbitals/hybrid/bf.png');

    ccImg = p5.loadImage('./assets/orbitals/hybrid/cc.png');
    cdImg = p5.loadImage('./assets/orbitals/hybrid/cd.png');

    dcImg = p5.loadImage('./assets/orbitals/hybrid/dc.png');
    ddImg = p5.loadImage('./assets/orbitals/hybrid/dd.png');

    eeImg = p5.loadImage('./assets/orbitals/hybrid/ee.png');
    efImg = p5.loadImage('./assets/orbitals/hybrid/ef.png');

    feImg = p5.loadImage('./assets/orbitals/hybrid/fe.png');
    ffImg = p5.loadImage('./assets/orbitals/hybrid/ff.png');
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
      if (parseInt(key) && key <= 6) {
        selectedL = left[parseInt(key) - 1];
        newSelection = true;
      }
      else {
        let keys = {'a':0, 'b':1, 'c':2, 'd':3, 'e':4, 'f':5};
        if (keys.keys().contains(key.toLowerCase())) {
          selectedR = right[keys.get(key)];
          newSelection = true;
        }
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
    let a = new Orbital("a", "(1) S", 200, 100, 40, 40);
    let b = new Orbital("b", "(2) S", 200, 155, 40, 40);
    let c = new Orbital("c", "(3) Px", 180, 215, 80, 40);
    let d = new Orbital("d", "(4) Px", 180, 270, 80, 40);
    let e = new Orbital("e", "(5) Pz", 200, 330, 40, 80);
    let f = new Orbital("f", "(6) Pz", 200, 425, 40, 80);
    
    let left = [a, b, c, d, e, f];
    return left;
  }
  
  function makeRightOrbitals() {
    let a = new Orbital("a", "S (a)", 670,100, 40, 40);
    let b = new Orbital("b", "S (b)", 670, 155, 40, 40);
    let c = new Orbital("c", "Px (c)", 650, 215, 80, 40);
    let d = new Orbital("d", "Px (d)", 650, 270, 80, 40);
    let e = new Orbital("e", "Pz (e)", 670, 339, 40, 80);
    let f = new Orbital("f", "Pz (f)", 670, 425, 40, 80);
  
    let right = [a, b, c, d, e, f];
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

    let aa = new Orbital('aaImg', 'Constructive S', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let ab = new Orbital('abImg', 'Destructive S', left, top + maxSize*0.54/2, maxSize, maxSize*0.46);
    let ac = new Orbital('acImg', 'S Px Hybrid', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let ad = new Orbital('adImg', 'S Px Hybrid', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let ae = new Orbital('aeImg', 'S Pz Hybrid', left + maxSize*0.5/2, top, maxSize*0.5, maxSize);
    let af = new Orbital('afImg', 'S Pz Hybrid', left + maxSize*0.5/2, top, maxSize*0.5, maxSize);
    
    let ba = new Orbital('baImg', 'Destructive S', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let bb = new Orbital('bbImg', 'Constructive S', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let bc = new Orbital('bcImg', 'S Px Hybrid', left, top + maxSize*0.52/2, maxSize, maxSize*0.48);
    let bd = new Orbital('bdImg', 'S Px Hybrid', left, top + maxSize*0.5/2, maxSize, maxSize*0.5);
    let be = new Orbital('beImg', 'S Pz Hybrid', left + maxSize*0.52/2, top, maxSize*0.48, maxSize);
    let bf = new Orbital('bfImg', 'S Pz Hybrid', left + maxSize*0.52/2, top, maxSize*0.48, maxSize);

    let ca = ac;
    let cb = bc;
    let cc = new Orbital('ccImg', 'Destructive Px', left, top + maxSize*0.76/2, maxSize, maxSize*0.24);
    let cd = new Orbital('cdImg', 'Constructive Px', left, top + maxSize * 0.69/2, maxSize, maxSize*0.31);
    let ce = null;
    let cf = null;

    let da = ad;
    let db = bd;
    let dc = new Orbital('dcImg', 'Constructive Px', left, top + maxSize*0.69/2, maxSize, maxSize*0.31);
    let dd = new Orbital('ddImg', 'Destructive Px', left, top + maxSize*0.76/2, maxSize, maxSize*0.24);
    let de = null;
    let df = null;

    let ea = ae;
    let eb = be;
    let ec = null;
    let ed = null;
    let ee = new Orbital('eeImg', 'Constructive Pz', left, top, maxSize, maxSize);
    let ef = new Orbital('efImg', 'Destructive Pz', left, top, maxSize, maxSize);

    let fa = af;
    let fb = bf;
    let fc = null;
    let fd = null;
    let fe = new Orbital('feImg', 'Destructive Pz', left, top, maxSize, maxSize);
    let ff = new Orbital('ffImg', 'Constructive Pz', left, top, maxSize, maxSize);
    
    let combOrbital = null;

    if (selectedL && selectedR) {
      combOrbital = eval(selectedL.imgName + selectedR.imgName);
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
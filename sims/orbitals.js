import React, { useEffect } from 'react';
import Sketch from 'react-p5';

function Orbitals() {
  // class that stores image, name and position of each orbital - both default and hybrids
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

  // global list of orbitals that stay on each side of the screen
  const left = makeLeftOrbitals();
  const right = makeRightOrbitals();
  const hybrid = makeHybridOrbitals();

  // global variables that store the currently selected orbitals or null
  let selectedL, selectedR;

  let font;

  // global variables that store default orbitals
  let a, b, c, d, e, f;
  // global variables that store hybrid orbitals;
  let aaImg, abImg, acImg, adImg, aeImg, afImg, baImg, bbImg, bcImg, bdImg, beImg, bfImg, ccImg, cdImg, dcImg, ddImg, eeImg, efImg, feImg, ffImg;

  // p5 function, all images loaded before the rest of the code runs
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
    p5Canvas.position(0, 0, 'relative');
    resetCanvas(p5);
  }

  // create a list of Orbital objects that stay on the default screen
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

  // create a list of Orbital objects that stay on the default screen
  function makeRightOrbitals() {
    let a = new Orbital("a", "S (a)", 670, 100, 40, 40);
    let b = new Orbital("b", "S (b)", 670, 155, 40, 40);
    let c = new Orbital("c", "Px (c)", 650, 215, 80, 40);
    let d = new Orbital("d", "Px (d)", 650, 270, 80, 40);
    let e = new Orbital("e", "Pz (e)", 670, 339, 40, 80);
    let f = new Orbital("f", "Pz (f)", 670, 425, 40, 80);

    let right = [a, b, c, d, e, f];
    return right;
  }

  // creates dictionary that matches default two character strings with their Orbital object
  function makeHybridOrbitals() {
    let maxSize = 180;
    let left = 361 + (200 - maxSize) / 2;
    let top = 150 + (200 - maxSize) / 2;

    let aa = new Orbital('aaImg', 'Constructive S', left, top + maxSize * 0.5 / 2, maxSize, maxSize * 0.5);
    let ab = new Orbital('abImg', 'Destructive S', left, top + maxSize * 0.54 / 2, maxSize, maxSize * 0.46);
    let ac = new Orbital('acImg', 'S Px Hybrid', left, top + maxSize * 0.5 / 2, maxSize, maxSize * 0.5);
    let ad = new Orbital('adImg', 'S Px Hybrid', left, top + maxSize * 0.5 / 2, maxSize, maxSize * 0.5);
    let ae = new Orbital('aeImg', 'S Pz Hybrid', left + maxSize * 0.5 / 2, top, maxSize * 0.5, maxSize);
    let af = new Orbital('afImg', 'S Pz Hybrid', left + maxSize * 0.5 / 2, top, maxSize * 0.5, maxSize);

    let ba = new Orbital('baImg', 'Destructive S', left, top + maxSize * 0.5 / 2, maxSize, maxSize * 0.5);
    let bb = new Orbital('bbImg', 'Constructive S', left, top + maxSize * 0.5 / 2, maxSize, maxSize * 0.5);
    let bc = new Orbital('bcImg', 'S Px Hybrid', left, top + maxSize * 0.52 / 2, maxSize, maxSize * 0.48);
    let bd = new Orbital('bdImg', 'S Px Hybrid', left, top + maxSize * 0.5 / 2, maxSize, maxSize * 0.5);
    let be = new Orbital('beImg', 'S Pz Hybrid', left + maxSize * 0.52 / 2, top, maxSize * 0.48, maxSize);
    let bf = new Orbital('bfImg', 'S Pz Hybrid', left + maxSize * 0.52 / 2, top, maxSize * 0.48, maxSize);

    let ca = ac;
    let cb = bc;
    let cc = new Orbital('ccImg', 'Destructive Px', left, top + maxSize * 0.76 / 2, maxSize, maxSize * 0.24);
    let cd = new Orbital('cdImg', 'Constructive Px', left, top + maxSize * 0.69 / 2, maxSize, maxSize * 0.31);
    let ce = null;
    let cf = null;

    let da = ad;
    let db = bd;
    let dc = new Orbital('dcImg', 'Constructive Px', left, top + maxSize * 0.69 / 2, maxSize, maxSize * 0.31);
    let dd = new Orbital('ddImg', 'Destructive Px', left, top + maxSize * 0.76 / 2, maxSize, maxSize * 0.24);
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

    return {
      "aa": aa, "ab": ab, "ac": ac, "ad": ad, "ae": ae, "af": af, "ba": ba, "bb": bb, "bc": bc, "bd": bd, "be": be, "bf": bf, "ca": ca, "cb": cb, "cc": cc, "cd": cd, "ce": ce, "cf": cf, "da": da, "db": db, "dc": dc, "dd": dd, "de": de, "df": df, "ea": ea, "eb": eb, "ec": ec, "ed": ed, "ee": ee, "ef": ef, "fa": fa, "fb": fb, "fc": fc, "fd": fd, "fe": fe, "ff": ff
    }
  }

  // draw an image using the Orbital class as a parameter
  function drawImg(img, p5) {
    p5.image(eval(img.imgName), img.xpos, img.ypos, img.width, img.height);
  }

  // draw all default orbitals
  function drawOrbitals(p5) {
    p5.textFont(font, 20);
    for (let img in left) {
      drawImg(left[img], p5);
      p5.fill(0);
      drawOrbLabel(left[img].name, true, left[img].ypos + left[img].height / 2 + 5, p5);
    }
    for (let img in right) {
      drawImg(right[img], p5);
      drawOrbLabel(right[img].name, false, right[img].ypos + right[img].height / 2 + 5, p5);
    }
  }

  // draw label that coincides with default orbital
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

  // draws center box that holds combination
  function drawCenterBox(p5) {
    p5.strokeWeight(4);
    p5.stroke(0);
    p5.noFill();
    p5.rect(361, 150, 200, 200);
    p5.fill(0);
  }

  // clear canvas, then draw default content with no selections
  function resetCanvas(p5) {
    p5.background(238);
    drawOrbitals(p5);
    drawResetButton(p5);
    drawSubmitButton(p5);
    chooseColumnLabel(p5);
    drawCenterBox(p5);
  }

  // draws label above each column, determines column according to left parameter
  function drawColumnLabel(left, words, p5) {
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

  // determines which column label to put where - either instructions or the currently selected orbital
  function chooseColumnLabel(p5) {
    if (!selectedL) {
      drawColumnLabel(true, "Select an orbital", p5);
    }
    else {
      drawColumnLabel(true, selectedL.name, p5);
    }
    if (!selectedR) {
      drawColumnLabel(false, "Select an orbital", p5);
    }
    else {
      drawColumnLabel(false, selectedR.name, p5);
    }
  }
  // draws the default black submit button
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

  // draws the red submit button, used when two orbitals are selected and no hybrid is shown
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

  // draw rectangle around selected orbitals
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

  // draws rectangle that indicates selected orbital
  function drawRect(i, p5) {
    p5.strokeWeight(4);
    p5.noFill();
    p5.rect(i.xpos - 3, i.ypos - 3, i.width + 6, i.height + 6);
    p5.fill(0);
  }

  function drawHybridOrbitals(p5) {
    let combOrbital = null;

    if (selectedL && selectedR) {
      combOrbital = hybrid[selectedL.imgName + selectedR.imgName];
    }

    if (combOrbital) {
      drawImg(combOrbital, p5);
      drawHybridLabel(combOrbital.name, p5);
    }
    else {
      drawHybridError(p5);
    }
    drawResetButton(p5);
  }

  // draw label of the hybrid above the center box
  function drawHybridLabel(label, p5) {
    p5.textAlign(p5.CENTER);
    p5.textFont(font, 30);
    p5.fill(98, 130, 184);
    p5.noStroke();
    p5.text(label, 461, 130);
  }

  // writes an error message in center box, used if the combination produces an invalid hybrid
  function drawHybridError(p5) {
    p5.textAlign(p5.CENTER);
    p5.fill(237, 91, 45);
    p5.textFont(font, 25);
    p5.noStroke();
    p5.text("These orbitals \ndo not \ninteract", 461, 230);
  }

  // draws reset button on canvas
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

  // p5 keyboard event listener
  function keyPressed(p5) {
    let key = p5.key.toLowerCase();

    // if the key pressed coincides with an orbital, change the graphics
    if (detectOrbKey(key)) {
      highlightSelections(p5);
      drawRedSubmitButton(p5);
    }
    // handle if enter or backspace was pressed
    handleSpecialKeys(p5, key);
  }

  // function to determine if the key pressed coincides with an orbital and assign it to either selectedL or selectedR
  function detectOrbKey(key) {
    if (parseInt(key) && parseInt(key) <= 6) {
      selectedL = left[parseInt(key) - 1];
      return true;
    }
    else {
      let keys = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5 };
      if (key in keys) {
        selectedR = right[keys[key]];
        return true;
      }
    }
    return false;
  }

  // handle if enter or backspace was pressed
  function handleSpecialKeys(p5) {
    // show combination if enter pressed
    if (p5.keyCode == p5.ENTER) {
      highlightSelections(p5);
      drawHybridOrbitals(p5);
    }
    // clear selections if backspace pressed
    if (p5.keyCode == p5.BACKSPACE) {
      selectedL = null;
      selectedR = null;
      resetCanvas(p5);
    }
  }

  // p5 event listener for mouse click
  function mousePressed(p5) {
    // handle if click is on reset
    if (detectResetClick(p5.mouseX, p5.mouseY, p5)) {
      selectedL = null;
      selectedR = null;
      resetCanvas(p5);
    }
    // handle if click is on submit
    else if (detectSubmitClick(p5.mouseX, p5.mouseY)) {
      highlightSelections(p5);
      drawHybridOrbitals(p5);
    }
    // otherwise check if clicking a left orbital
    else if (p5.mouseX < 400) {
      selectedL = detectLeftOrbitalClick(p5.mouseX, p5.mouseY);
      highlightSelections(p5);
      drawRedSubmitButton(p5);
    }
    // otherwise check if clicking a right orbital
    else {
      selectedR = detectRightOrbitalClick(p5.mouseX, p5.mouseY);
      highlightSelections(p5);
      drawRedSubmitButton(p5);
    }
  }

  // detects if reset button is clicked
  function detectResetClick(mouseX, mouseY, p5) {
    if (mouseX >= 426 && mouseX <= 496 && mouseY >= 460 && mouseY <= 490) {
      return true;
    }
  }
  // determines if mouse position is over submit button
  function detectSubmitClick(mouseX, mouseY) {
    // mouse location
    if (401 <= mouseX && 521 >= mouseX && 400 <= mouseY && 440 >= mouseY) {
      if (selectedL && selectedR) {
        return true;
      }
    }
    return false;
  }

  // detects if left orbital is clicked, returns an orbital that is either new or keeps the selected global variable the same
  function detectLeftOrbitalClick(mouseX, mouseY) {
    let prev = selectedL;
    for (let img in left) {
      let i = left[img];
      if (mouseX >= i.xpos && mouseX <= i.xpos + i.width && mouseY >= i.ypos && mouseY <= i.ypos + i.height) {
        return i;
      }
    }
    return prev;
  }
  function detectRightOrbitalClick(mouseX, mouseY) {
    let prev = selectedR;
    for (let img in right) {
      let i = right[img];
      if (mouseX >= i.xpos && mouseX <= i.xpos + i.width && mouseY >= i.ypos && mouseY <= i.ypos + i.height) {
        return i;
      }
    }
    return prev;
  }

  // p5 event listener for mouse movement
  function mouseMoved(p5) {
    changeCursor(p5.mouseX, p5.mouseY);
  }

  // update the cursor icon depending on mouse location
  function changeCursor(x, y) {
    let mouseX = x;
    let mouseY = y;

    let pointer = false;

    // check if mouse is over a left orbital
    for (let orb in left) {
      let o = left[orb];
      if (o.xpos <= mouseX && o.xpos + o.width >= mouseX && o.ypos <= mouseY && o.ypos + o.height >= mouseY) {
        pointer = true;
      }
    }
    // check if mouse if over a right orbital
    for (let orb in right) {
      let o = right[orb];
      if (o.xpos <= mouseX && o.xpos + o.width >= mouseX && o.ypos <= mouseY && o.ypos + o.height >= mouseY) {
        pointer = true;
      }
    }
    // check if mouse if over submit button
    if (401 <= mouseX && 521 >= mouseX && 400 <= mouseY && 440 >= mouseY) {
      pointer = true;
    }
    // check if mouse if over reset button
    if (426 <= mouseX && 496 >= mouseX && 460 <= mouseY && 490 >= mouseY) {
      pointer = true;
    }
    // change mouse style
    if (pointer) {
      document.body.style.cursor = "pointer";
    }
    else {
      document.body.style.cursor = "default";
    }
  }


  return (
    <Sketch keyPressed={keyPressed} preload={preload} mousePressed={mousePressed} mouseMoved={mouseMoved} setup={setup} />
  )
}

export default Orbitals;
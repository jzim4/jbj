import React from 'react';
import Sketch from 'react-p5';

function Coulomb() {

  //global canvas variables
  let canvasWidth = 922;
  let canvasHeight = 525;

  //global atoms variables
  let magMax = 90;
  let magMin = 0;
  let diameter = 50;

  // class to store the atom's location in the box and their sign and magnitude
  class Atom {
    constructor(sign, mag, posX, posY) {
      this.sign = sign;
      this.mag = mag;
      this.posX = posX;
      this.posY = posY;
    }
  }

  let q1 = new Atom(1, 20, 150, 130);
  let q2 = new Atom(1, 10, 800, 130);

  // class to store the draggable box's position and size
  class AtomSim {
    constructor(posX, posY, width, height) {
      this.posX = posX;
      this.posY = posY;
      this.width = width;
      this.height = height;
    }
  }
  const atomSim = new AtomSim(60, 20, 802, 200);

// global variable to determine whether/which atom is being dragged
let moving = null;

// p5 function that runs before rest of code
function setup(p5) {
  let canvas = document.getElementById('p5Canvas');
  let p5Canvas = p5.createCanvas(canvasWidth, canvasHeight, canvas);
  p5Canvas.position(0,0,'relative');
}

// global font variables
let oswaldMedium;
let oswaldBold;
// p5 function that imports dependencies before running rest of code
function preload(p5) {
  oswaldMedium = p5.loadFont('./assets/fonts/Oswald-Medium.ttf');
  oswaldBold = p5.loadFont('./assets/fonts/Oswald-Bold.ttf');
}

//p5 function that runs on loop, used to create animation effects
function draw(p5) {
  p5.textFont(oswaldMedium, 15);
  p5.background(238);

  atomsSim(p5);

  equations(p5);

  leftControlCenter(p5);
  rightControlCenter(p5);
}

// p5 event handler for mouse click
function mousePressed(p5) {
  handleAtomsClick(p5.mouseX, p5.mouseY);

  handleSignClick(p5.mouseX, p5.mouseY);

  handleMagnitudeClick(p5.mouseX, p5.mouseY);
}

function handleAtomsClick(mouseX, mouseY) {
  //if q1 is clicked
  if (Math.hypot(mouseX - q1.posX, mouseY - q1.posY) <= diameter/2) {
    moving = 'q1';
    changeCursor(mouseX, mouseY);
  }
  // if q2 is clicked
  else if (Math.hypot(mouseX - q2.posX, mouseY - q2.posY) <= diameter/2) {
    moving = 'q2';
    changeCursor(mouseX, mouseY);
  }
  else {
    moving = null;
  }
}

function handleSignClick(mouseX, mouseY) {
  // if q1 positive is clicked
  if (Math.hypot(mouseX - 200, mouseY - 455) <= 20) {
    q1.sign = 1;
  }
  // if q1 negative is clicked
  if (Math.hypot(mouseX - 260, mouseY - 455) <= 20) {
    q1.sign = -1;
  }
  // if q2 positive is clicked
  if (Math.hypot(mouseX - 622, mouseY - 455) <= 20) {
    q2.sign = 1;
  }
  // if q2 negative is clicked
  if (Math.hypot(mouseX - 682, mouseY - 455) <= 20) {
    q2.sign = -1;
  }
}

function handleMagnitudeClick(mouseX, mouseY) {
  // if click x-position is in q1 range
  if (mouseX >= 385 && mouseX <=405) {
    // if click y-position is in positive button range
    if (mouseY >= 435 && mouseY <= 445) {
      // if the magnitude will stay in the designated range
      if (q1.mag < magMax) {
        q1.mag += 5;
      }
    }
    // if click y-postiion is in negative button range
    if (mouseY >= 465 && mouseY <= 475) {
      // if the magnitude will stay in the designated range
      if (q1.mag > magMin) {
        q1.mag -= 5;
      }
    }
  }
  
  // if click x-position is in q2 range
  if (mouseX >= 812 && mouseX <=832) {
    // if click y-position is in positive button range
    if (mouseY >= 435 && mouseY <= 445) {
      // if the magnitude will stay in the designated range
      if (q2.mag < magMax) {
        q2.mag += 5;
      }
    }
    // if click y-position is in negative button range
    if (mouseY >= 465 && mouseY <= 475) {
      // if the magnitude will stay in the designated range
      if (q2.mag > magMin) {
        q2.mag -= 5;
      }
    }
  }
}

// p5 event handler
function mouseReleased(p5) {
  moving = null;
  changeCursor(p5.mouseX, p5.mouseY);
}

// p5 event handler
function mouseMoved(p5) {
  changeCursor(p5.mouseX, p5.mouseY);
}

// p5 event handler
function mouseDragged(p5) { 
  handleAtomDrag(p5);
}

function handleAtomDrag(p5) {
  // identify which atom is moving (if any)
  let still = null;
  let oldPosX;
  let oldPosY;
  if (moving == 'q1') {
    still = q2;
    oldPosX = q1.posX;
    oldPosY = q1.posY;
  }
  else if (moving == 'q2') {
    still = q1;
    oldPosX = q2.posX;
    oldPosY = q2.posY;
  }
  else {
    return;
  }

  // ensure atom stays in bounds
  let newXPos = xInBounds(p5.mouseX);
  let newYPos = yInBounds(p5.mouseY);

  // determine if atoms overlap
  let overlapping = Math.hypot(still.posX - newXPos, still.posY - newYPos) <= diameter;

  // if atoms overlap, force recalculate the closest possible location that doesn't overlap
  if (overlapping) {
    let angle = Math.atan2(newYPos - still.posY, newXPos - still.posX);
    newXPos = still.posX + Math.cos(angle) * diameter;
    newYPos = still.posY + Math.sin(angle) * diameter;
  }

  // if forcing them to not overlap made it go out of bounds, don't move at all
  let move = false;
  if (newXPos == xInBounds(newXPos) && newYPos == yInBounds(newYPos)) {
    move = true;
  }

  // if atom should move, update its coordinates
  if (move) {
    if (moving == 'q1') {
      q1.posX = newXPos;
      q1.posY = newYPos;
    }
    else {
      q2.posX = newXPos;
      q2.posY = newYPos;
    }
  } else {
    if (moving == 'q1') {
      q1.posX = oldPosX;
      q1.posY = oldPosY;
    }
    else {
      q2.posX = oldPosX;
      q2.posY = oldPosY;
    }
  }
}

// helper method to move x in bounds; if x is already in bounds, return x
function xInBounds(x) {
  if (x < atomSim.posX + diameter/2) {
    return atomSim.posX + diameter/2;
  }
  if (x > atomSim.posX + atomSim.width - diameter/2) {
    return atomSim.posX + atomSim.width - diameter/2;
  }
  else {
    return x;
  }
}

// helper method to move y in bounds; if y is already in bounds, return y
function yInBounds(y) {
  if (y < atomSim.posY + diameter/2 + 36) {
    return atomSim.posY + diameter/2 + 36;
  }
  if (y > atomSim.posY + atomSim.height - diameter/2) {
    return atomSim.posY + atomSim.height - diameter/2;
  }
  else {
    return y;
  }
}

// changes cursor according to mouseX, mouseY, and moving global variable
function changeCursor(mouseX, mouseY) {
  let pointer = false;
  let grab = false;

  // while over any of the atoms, use grabber
  if (Math.hypot(mouseX-q1.posX, mouseY-q1.posY) <= diameter/2) {
    grab = true;
  }
  if (Math.hypot(mouseX-q2.posX, mouseY-q2.posY) <= diameter/2) {
    grab = true;
  }

  //while over any of the signs, use pointer
  if (Math.hypot(mouseX-200, mouseY-455) <= 20) {
    pointer = true;
  }
  if (Math.hypot(mouseX-260, mouseY-455) <= 20) {
    pointer = true;
  }
  if (Math.hypot(mouseX-622, mouseY-455) <= 20) {
    pointer = true;
  }
  if (Math.hypot(mouseX-682, mouseY-455) <= 20) {
    pointer = true;
  }

  //while over any of the magnitude buttons, use pointer
  if (mouseX >= 385 && mouseX <= 405){
    if (mouseY >= 435 && mouseY <= 445 && q1.mag<magMax) {
      pointer = true;
    }
    if (mouseY >= 465 && mouseY <= 475 && q1.mag>magMin) {
      pointer = true;
    }
  }
  if (mouseX >= 812 && mouseX <= 832) {
    if (mouseY >= 435 && mouseY <= 445 && q2.mag<magMax) {
      pointer = true;
    }
    if (mouseY >= 465 && mouseY <= 475 && q2.mag>magMin) {
      pointer = true;
    }
  }

  if (pointer) {
      document.body.style.cursor = "pointer";
  }
  // if hovering over atom but not moving it
  else if (grab && !moving) {
    document.body.style.cursor = "grab";
  }
  // if hovering over atom and moving it
  else if (grab && moving) {
    document.body.style.cursor = "grabbing";
  }
  else {
      document.body.style.cursor = "default";
  }   
}


// ATOMS - draggable box and its containing atoms

function atomsSim(p5) {
  p5.strokeWeight(3);
  p5.fill(255);
  p5.rect(atomSim.posX, atomSim.posY, atomSim.width, atomSim.height, 5);
  atomsLabel(p5);
  q1Circle(p5);
  q2Circle(p5);
  r(p5);
}
// title at top of atoms sim
function atomsLabel(p5) {
  p5.fill(98, 130, 184);
  p5.textFont(oswaldMedium, 30);
  p5.strokeWeight(2);
  p5.line(atomSim.posX, 55, atomSim.posX + atomSim.width, 55);
  p5.strokeWeight(3);
  p5.noStroke();
  let val = Math.trunc(Math.hypot(q1.posX-q2.posX, q1.posY-q2.posY)/3);
  p5.textAlign(p5.CENTER);
  p5.text("Distance (r): " + val + "m", 461, 50);
  p5.textAlign(p5.LEFT);
}
// orange draggable circle
function q1Circle(p5) {
  p5.fill(237, 91, 45);
  p5.stroke(0);
  p5.strokeWeight(3);
  p5.circle(q1.posX, q1.posY, diameter);
  p5.fill(98, 130, 184);
  p5.noStroke();
  p5.circle(q1.posX, q1.posY, 6);
}
// yellow draggable cirlce
function q2Circle(p5) {
  p5.fill(255, 181, 33);
  p5.strokeWeight(3);
  p5.stroke(0);
  p5.circle(q2.posX, q2.posY, diameter);
  p5.fill(98, 130, 184);
  p5.noStroke();
  p5.circle(q2.posX, q2.posY, 6);
}
// line that shows distance between atoms
function r(p5) {
  p5.strokeWeight(3);
  p5.stroke(98, 130, 184);
  p5.drawingContext.setLineDash([4,12]);
  p5.line(q1.posX, q1.posY, q2.posX, q2.posY);
  p5.drawingContext.setLineDash([]);
}

// EQUATION - equation in center that shows force

// constant that serves as a reference point for all equation content
const leftMostX = 260;

function equations(p5) {
  constantEquation(p5);
  p5.textFont(oswaldBold, 35);
  // show force, using returned q1, q2 and distance
  force(p5, q1Val(p5), q2Val(p5), distVal(p5));
}
// equation content that doesn't change: "F", "=", "k" and fraction lines
function constantEquation(p5) {
  p5.textFont(oswaldBold, 50);
  p5.fill(0);
  p5.stroke(0);
  p5.line(leftMostX+70, 300, leftMostX + 250, 300);
  p5.noStroke();
  p5.text("F =", leftMostX, 320);
  p5.text("=", leftMostX + 260, 320);
  p5.textFont(oswaldBold, 45);
  p5.text("k", leftMostX + 80, 282);
}
// displays q1 value and retuns that value to be used in force calculation
function q1Val(p5) {
  let val = q1.mag * q1.sign;
  p5.fill(237, 91, 45);
  p5.noStroke();
  p5.text("("+val+")", leftMostX + 113, 282);
  return val;
}
// displays q2 value and retuns that value to be used in force calculation
function q2Val(p5) {
  let val = q2.mag * q2.sign;
  p5.fill(255, 181, 33);
  p5.noStroke();
  if ((q1.sign == 1 && q1.mag < 10) || (q1.sign == -1 && q1.mag == 0)) {
    p5.text("("+val+")", leftMostX + 163, 282);
  }
  else if ((q1.sign == 1 && q1.mag >= 10) || (q1.sign == -1 && q1.mag < 10)) {
    p5.text("("+val+")", leftMostX + 173, 282);
  }
  else {
    p5.text("("+val+")", leftMostX + 182, 282);
  }
  return val;
}
// displays r (distance) value and retuns that value to be used in force calucation
function distVal(p5) {
  let val = Math.trunc(Math.hypot(q1.posX-q2.posX, q1.posY-q2.posY)/3);
  p5.fill(98, 130, 184);
  p5.noStroke();
  p5.text("("+val+")", leftMostX + 119, 342);
  p5.textFont(oswaldBold, 25);
  if (val < 100) {
    p5.text("2", leftMostX + 183, 332);
  }
  else {
    p5.text("2", leftMostX + 194, 332);
  }
  return val;
}
// calculates and displays force calucation
function force(p5, q1, q2, r) {
  let f = (q1 * q2 / (r*r)).toFixed(5) + " N";
  p5.textFont(oswaldMedium, 40);
  p5.fill(0);
  p5.noStroke();
  p5.text(f, leftMostX + 310, 300);
  p5.textFont(oswaldMedium, 30);
  if (q1*q2<0) {  
    p5.text("Attraction", leftMostX + 350, 340);
  } else {
    p5.text("Repulsion", leftMostX + 335, 340);
  }
}

// CONTROLS
function leftControlCenter(p5) {
  p5.strokeWeight(2);
  p5.fill(237, 91, 45);
  p5.stroke(0);
  p5.rect(60, 375, 380, 125, 5);
  separationLine(60, p5);
  label("q1", 60, p5);
  signButtons(200, q1.sign, p5);
  magnitudeButtons(325, true, p5);
}

function rightControlCenter(p5) {
  p5.strokeWeight(2);
  p5.stroke(0);
  p5.fill(255, 181, 33);
  p5.rect(482, 375, 380, 125, 5);
  separationLine(482, p5);
  label("q2", 482, p5);
  signButtons(622, q2.sign, p5);
  magnitudeButtons(752, false, p5);
}
// draws line between control center label and buttons, uses xpos to determine which panel
function separationLine(xpos, p5) {
  let adjust = 80;
  p5.line(xpos + adjust, 375, xpos + adjust, 500);
}
// draws label in left of control panel, either "q1" or "q2", uses xpos to determine which panel
function label(text, xpos, p5) {
  p5.textFont(oswaldBold, 30);
  p5.noStroke();
  let adjust = 30;
  p5.fill(0);
  p5.text(text, xpos+adjust, 450);
  p5.stroke(0);
}
// draws sign buttons in control panel, uses xpos to determine which panel
function signButtons(xpos, sign, p5) {
  let circleYpos = 455;
  p5.strokeWeight(2);

  //drop shadow
  p5.fill(200);
  p5.strokeWeight(0);
  if (sign == 1) {
    p5.circle(xpos, circleYpos, 60);
  } else {
    p5.circle(xpos + 60, circleYpos, 60);
  }
  
  p5.fill(255);
  p5.strokeWeight(3);
  p5.circle(xpos, circleYpos, 40);
  p5.circle(xpos + 60, circleYpos, 40);

  p5.textFont(oswaldMedium, 25);
  p5.fill(0);
  p5.noStroke();
  p5.text("Sign", xpos + 10, 405);
  p5.textFont(oswaldMedium, 50);
  p5.text("+", xpos-10, circleYpos + 20);
  p5.text("-", xpos+53, circleYpos + 15);

  p5.textFont(oswaldMedium, 20);
}
// draws magnitude buttons in control panel, uses xpos to determine which panel
function magnitudeButtons(xpos, left, p5) {
  p5.textFont(oswaldMedium, 25);
  p5.noStroke();
  p5.text("Magnitude", xpos-5, 405);
  if (left) {
    p5.text(q1.mag + " C", xpos, 460);
  } else {
    p5.text(q2.mag + " C", xpos, 460);
  }
  p5.stroke(0);
  p5.strokeWeight(5);

  if ((left && q1.mag < magMax) || (!left && q2.mag < magMax)) {
      p5.line(xpos+60, 445, xpos+70, 435);
      p5.line(xpos+70, 435, xpos+80, 445);
  }
  if ((left && q1.mag > magMin) || (!left && q2.mag > magMin)) {
      p5.line(xpos+60, 465, xpos+70, 475);
      p5.line(xpos+70, 475, xpos+80, 465);
  }
}
return (
    <Sketch setup={setup} preload={preload} draw={draw} mouseMoved={mouseMoved} mousePressed={mousePressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} />
)
}

export default Coulomb;
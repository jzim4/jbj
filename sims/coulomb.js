import React from 'react';
import Sketch from 'react-p5';

function Coulomb() {

  let canvasWidth = 922;
  let canvasHeight = 525;

  let magMax = 90;
  let magMin = 0;
  let diameter = 50;

  // class to store the atom's location in the box and sign and magnitude
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

  // // class to store the simulation's position and size
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

function setup(p5) {
  let canvas = document.getElementById('p5Canvas');
  let p5Canvas = p5.createCanvas(canvasWidth, canvasHeight, canvas);
  p5Canvas.position(0,0,'relative');
}

let oswaldMedium;
let oswaldBold;
function preload(p5) {
  oswaldMedium = p5.loadFont('./assets/fonts/Oswald-Medium.ttf');
  oswaldBold = p5.loadFont('./assets/fonts/Oswald-Bold.ttf');
}

function draw(p5) {
  p5.textFont(oswaldMedium, 15);
  p5.background(238);

  atomsSim(p5);

  equations(p5);

  leftControlCenter(p5);
  rightControlCenter(p5);
}

function mousePressed(p5) {
  // click atoms
  if (Math.hypot(p5.mouseX - q1.posX, p5.mouseY - q1.posY) <= diameter/2) {
    moving = 'q1';
    document.body.style.cursor = "grabbing";
  }
  else if (Math.hypot(p5.mouseX - q2.posX, p5.mouseY - q2.posY) <= diameter/2) {
    moving = 'q2';
    document.body.style.cursor = "grabbing";
  }
  else {
    moving = null;
  }

  // click sign
  if (Math.hypot(p5.mouseX - 200, p5.mouseY - 455) <= 20) {
    q1.sign = 1;
  }
  if (Math.hypot(p5.mouseX - 260, p5.mouseY - 455) <= 20) {
    q1.sign = -1;
  }
  if (Math.hypot(p5.mouseX - 622, p5.mouseY - 455) <= 20) {
    q2.sign = 1;
  }
  if (Math.hypot(p5.mouseX - 682, p5.mouseY - 455) <= 20) {
    q2.sign = -1;
  }

  // click magnitude
  if (p5.mouseX >= 385 && p5.mouseX <=405) {
    if (p5.mouseY >= 435 && p5.mouseY <= 445) {
      if (q1.mag < magMax) {
        q1.mag += 5;
      }
    }
    if (p5.mouseY >= 465 && p5.mouseY <= 475) {
      if (q1.mag > magMin) {
        q1.mag -= 5;
      }
    }
  }
  
  if (p5.mouseX >= 812 && p5.mouseX <=832) {
    if (p5.mouseY >= 435 && p5.mouseY <= 445) {
      if (q2.mag < magMax) {
        q2.mag += 5;
      }
    }
    if (p5.mouseY >= 465 && p5.mouseY <= 475) {
      if (q2.mag > magMin) {
        q2.mag -= 5;
      }
    }
  }
}

function mouseReleased(p5) {
  moving = null;
  changeCursor(p5.mouseX, p5.mouseY);
}

function mouseMoved(p5) {
  changeCursor(p5.mouseX, p5.mouseY);
}

function mouseDragged(p5) { 
  handleAtomDrag();
}

function handleAtomDrag() {
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

  let newXPos = xInBounds(p5.mouseX);
  let newYPos = yInBounds(p5.mouseY);

  let overlapping = Math.hypot(still.posX - newXPos, still.posY - newYPos) <= diameter;

  if (overlapping) {
    let angle = Math.atan2(newYPos - still.posY, newXPos - still.posX);
    newXPos = still.posX + Math.cos(angle) * diameter;
    newYPos = still.posY + Math.sin(angle) * diameter;
  }

  let move = false;
  if (newXPos == xInBounds(newXPos) && newYPos == yInBounds(newYPos)) {
    move = true;
  }

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

function dragAtom() {

}

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

function changeCursor(mouseX, mouseY) {

  let pointer = false;
  let grab = false;

  // atoms
  if (Math.hypot(mouseX-q1.posX, mouseY-q1.posY) <= diameter/2) {
    grab = true;
  }
  if (Math.hypot(mouseX-q2.posX, mouseY-q2.posY) <= diameter/2) {
    grab = true;
  }

  //signs
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

  // magnitude
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
  else if (grab && !moving) {
    document.body.style.cursor = "grab";
  }
  else {
      document.body.style.cursor = "default";
  }   
}


// ATOMS

function atomsSim(p5) {
  p5.strokeWeight(3);
  p5.fill(255);
  p5.rect(atomSim.posX, atomSim.posY, atomSim.width, atomSim.height, 5);
  atomsLabel(p5);
  q1Circle(p5);
  q2Circle(p5);
  r(p5);
}

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

function q1Circle(p5) {
  p5.fill(237, 91, 45);
  p5.stroke(0);
  p5.strokeWeight(3);
  p5.circle(q1.posX, q1.posY, diameter);
  p5.fill(98, 130, 184);
  p5.noStroke();
  p5.circle(q1.posX, q1.posY, 6);
}
function q2Circle(p5) {
  p5.fill(255, 181, 33);
  p5.strokeWeight(3);
  p5.stroke(0);
  p5.circle(q2.posX, q2.posY, diameter);
  p5.fill(98, 130, 184);
  p5.noStroke();
  p5.circle(q2.posX, q2.posY, 6);
}
function r(p5) {
  p5.strokeWeight(3);
  p5.stroke(98, 130, 184);
  p5.drawingContext.setLineDash([4,12]);
  p5.line(q1.posX, q1.posY, q2.posX, q2.posY);
  p5.drawingContext.setLineDash([]);
}

// EQUATION

let leftMostX = 260;

function equations(p5) {
  constantEquation(p5);
  p5.textFont(oswaldBold, 35);
  force(p5, q1Val(p5), q2Val(p5), distVal(p5));
}

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

function q1Val(p5) {
  let val = q1.mag * q1.sign;
  p5.fill(237, 91, 45);
  p5.noStroke();
  p5.text("("+val+")", leftMostX + 113, 282);
  return val;
}

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

function separationLine(xpos, p5) {
  let adjust = 80;
  p5.line(xpos + adjust, 375, xpos + adjust, 500);
}

function label(text, xpos, p5) {
  p5.textFont(oswaldBold, 30);
  p5.noStroke();
  let adjust = 30;
  p5.fill(0);
  p5.text(text, xpos+adjust, 450);
  p5.stroke(0);
}

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
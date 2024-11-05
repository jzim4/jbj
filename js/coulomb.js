import React from 'react';
import Sketch from 'react-p5';

function Coulomb() {

let width = 922;
let height = 525;

let magMax = 30;
let magMin = 10;
let q1Sign = 1;
let q1Mag = 20;
let q2Sign = true;
let q2Mag = 10;

let diameter = 50;
let q1PosX = 800;
let q1PosY = 130;
let q2PosX = 150;
let q2PosY = 130;

let atomsSimPosX = 60;
let atomsSimPosY = 20;
let atomsSimWidth = 802;
let atomsSimHeight = 200;

let moving = null;



function setup(p5) {
    let canvas = document.getElementById('p5Canvas');
    let p5Canvas = p5.createCanvas(width, height, canvas);
    p5Canvas.position(0,0,'relative');
}

let varEqImg;
function preload(p5) {
  varEqImg = p5.loadImage('./assets/coulomb/coulombsLaw.png');
}

function draw(p5) {
  p5.textFont('Oswald', 15);
  p5.background(255);

  atomsSim(p5);

  equations(p5);

  leftControlCenter(p5);
  rightControlCenter(p5);
}

function mousePressed(p5) {
  // click atoms
  if (Math.hypot(p5.mouseX - q1PosX, p5.mouseY - q1PosY) <= diameter) {
    moving = 'q1';
  }
  if (Math.hypot(p5.mouseX - q2PosX, p5.mouseY - q2PosY) <= diameter) {
    moving = 'q2';
  }

  // click sign
  if (Math.hypot(p5.mouseX - 140, p5.mouseY - 475) <= diameter) {
    q1Sign = 1;
  }
  if (Math.hypot(p5.mouseX - 200, p5.mouseY - 475) <= diameter) {
    q1Sign = -1;
  }
  if (Math.hypot(p5.mouseX - 642, p5.mouseY - 475) <= diameter) {
    q2Sign = 1;
  }
  if (Math.hypot(p5.mouseX - 702, p5.mouseY - 475) <= diameter) {
    q2Sign = -1;
  }

  // click magnitude
  if (p5.mouseX >= 305 && p5.mouseX <=325) {
    if (p5.mouseY >= 435 && p5.mouseY <= 445) {
      if (q1Mag < magMax) {
        q1Mag += 0.5;
      }
    }
    if (p5.mouseY >= 465 && p5.mouseY <= 475) {
      if (q1Mag > magMin) {
        q1Mag -= 0.5;
      }
    }
  }
  
  if (p5.mouseX >= 812 && p5.mouseX <=832) {
    if (p5.mouseY >= 435 && p5.mouseY <= 445) {
      if (q2Mag < magMax) {
        q2Mag += 0.5;
      }
    }
    if (p5.mouseY >= 465 && p5.mouseY <= 475) {
      if (q2Mag > magMin) {
        q2Mag -= 0.5;
      }
    }
  }
}

function mouseReleased(p5) {
  moving = null;
}

function mouseDragged(p5) {
  let overlapped = false;
  let newXPos = null;
  let newYPos = null;
  
  let still = 'q2';
  if (moving == 'q2') {
    still = 'q1';
  }

  let mouseX = p5.mouseX;
  let mouseY = p5.mouseY;

  if (mouseX < atomsSimPosX + diameter/2) {
    mouseX =  atomsSimPosX + diameter/2;
  }
  if (mouseX > atomsSimPosX + atomsSimWidth - diameter/2) {
    mouseX = atomsSimPosX + atomsSimWidth - diameter/2;
  }
  if (mouseY < atomsSimPosY + diameter/2) {
    mouseY =  atomsSimPosY + diameter/2;
  }
  if (mouseY > atomsSimPosY + atomsSimHeight - diameter/2) {
    mouseY = atomsSimPosY + atomsSimHeight - diameter/2;
  }

  if (Math.hypot(eval(still + "PosX") - mouseX, eval(still + "PosY") - mouseY) <= diameter) {
    overlapped = true;
    let mousePos = p5.createVector(mouseX, mouseY);
    let stillPos = p5.createVector(eval(still + "PosX"), eval(still + "PosY"));
    let angle = Math.atan2(mousePos.y - stillPos.y, mousePos.x - stillPos.x);

    newXPos = eval(still + "PosX") + Math.cos(angle) * diameter;
    newYPos = eval(still + "PosY") + Math.sin(angle) * diameter;
  } else {
    newXPos = mouseX;
    newYPos = mouseY;
  }

  let inYBounds = newYPos + diameter/2 <= atomsSimHeight + atomsSimPosY && newYPos - diameter/2 >= atomsSimPosY + 35;
  let inXBounds = newXPos + diameter/2 <= atomsSimWidth + atomsSimPosX && newXPos - diameter/2 >= atomsSimPosX;

  let moveX = false;
  let moveY = false;
  if (overlapped && inXBounds && inYBounds) {
    moveX = true;
    moveY = true;
  }
  if (!overlapped && inXBounds) {
    moveX = true;
  }
  if (!overlapped && inYBounds) {
    moveY = true;
  }

  if (moveX) {
    if (moving == 'q1') {
      q1PosX = newXPos;
    }
    else {
      q2PosX = newXPos;
    }
  }
  if (moveY) {
    if (moving == 'q1') {
      q1PosY = newYPos;
    }
    else {
      q2PosY = newYPos;
    }
  }
  

}


// ATOMS

function atomsSim(p5) {
  p5.strokeWeight(3);
  p5.fill(98, 130, 184);
  p5.rect(atomsSimPosX, atomsSimPosY, atomsSimWidth, atomsSimHeight, 5);
  atomsLabel(p5);
  q1(p5);
  q2(p5);
  r(p5);
}

function atomsLabel(p5) {
  p5.fill(0);
  p5.textFont('Oswald', 30);
  p5.strokeWeight(2);
  p5.line(atomsSimPosX, 55, atomsSimPosX + atomsSimWidth, 55);
  p5.strokeWeight(3);
  p5.text("Distance", 425, 50);
}

function q1(p5) {
  p5.fill(237, 91, 45);
  p5.strokeWeight(3);
  p5.circle(q1PosX, q1PosY, diameter);
  p5.fill(0);
  p5.circle(q1PosX, q1PosY, 2);
}
function q2(p5) {
  p5.fill(255, 206, 109);
  p5.strokeWeight(3);
  p5.circle(q2PosX, q2PosY, diameter);
  p5.fill(0);
  p5.circle(q2PosX, q2PosY, 2);
}
function r(p5) {
  p5.strokeWeight(2);
  p5.line(q1PosX, q1PosY, q2PosX, q2PosY);
}

// EQUATION

function equations(p5) {
  constantEquation(p5);
  force(p5, q1Val(p5), q2Val(p5), distVal(p5));
}

function constantEquation(p5) {
  p5.image(varEqImg, 190, 225);
}

function q1Val(p5) {
  let val = q1Mag * q1Sign;
  p5.fill(237, 91, 45);
  p5.text("("+val+")", 550, 280);
  return val;
}

function q2Val(p5) {
  let val = q2Mag * q2Sign;
  p5.fill(255, 206, 109);
  p5.text("("+val+")", 600, 280);
  return val;
}
function distVal(p5) {
  let val = Math.trunc(Math.hypot(q1PosX-q2PosX, q1PosY-q2PosY)/3);
  p5.fill(98, 130, 184);
  p5.text("("+val+")", 540, 340);
  p5.text("2", 600, 330);
  return val;
}

function force(p5, q1, q2, r) {
  let f = (q1 * q2 / (r*r)).toFixed(5);
  p5.textFont('Oswald', 30);
  p5.fill(0);
  p5.text(f, 750, 300);
}

// CONTROLS
function leftControlCenter(p5) {
  p5.strokeWeight(2);
  p5.fill(237, 91, 45);
  p5.rect(60, 375, 300, 125, 5);
  signButtons(120, q1Sign, p5);
  magnitudeButtons(245, true, p5);
}

function rightControlCenter(p5) {
  p5.strokeWeight(2);
  p5.fill(255, 206, 109);
  p5.rect(562, 375, 300, 125, 5);
  signButtons(622, q2Sign, p5);
  magnitudeButtons(752, false, p5);
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

  p5.textFont('Oswald', 25);
  p5.fill(0);
  p5.text("Sign", xpos + 10, 405);
  p5.textFont('Oswald', 50);
  p5.text("+", xpos-10, circleYpos + 20);
  p5.text("-", xpos+53, circleYpos + 15);

  p5.textFont('Oswald', 20);
}

function magnitudeButtons(xpos, q1, p5) {
  p5.textFont('Oswald', 25);
  p5.text("Magnitude", xpos-5, 405);
  if (q1) {
    p5.text(q1Mag + " C", xpos, 460);
  } else {
    p5.text(q2Mag + " C", xpos, 460);
  }
  p5.strokeWeight(5);

  if ((q1 && q1Mag < magMax) || (!q1 && q2Mag < magMax)) {
      p5.line(xpos+60, 445, xpos+70, 435);
      p5.line(xpos+70, 435, xpos+80, 445);
  }
  if ((q1 && q1Mag > magMin) || (!q1 && q2Mag > magMin)) {
      p5.line(xpos+60, 465, xpos+70, 475);
      p5.line(xpos+70, 475, xpos+80, 465);
  }
}

return (
    <Sketch setup={setup} preload={preload} draw={draw} mousePressed={mousePressed} mouseReleased={mouseReleased} mouseDragged={mouseDragged} />
)
}

export default Coulomb;
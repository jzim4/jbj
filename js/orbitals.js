let orbitals = function(canvas, context) {
    
    canvas.style.width = "922px";
    canvas.style.height = "525px";
    canvas.style.border = "dotted black 2px";
    canvas.width = 922;
    canvas.height = 525;
    let left = makeLeftOrbitals();
    let right = makeRightOrbitals();
    let selectedL = null;
    let selectedR = null;

    resetCanvas(left, right, context, null, null);

    const rect = canvas.getBoundingClientRect();

    canvas.addEventListener("click", (event) => {
        let clickX = event.clientX - rect.left;
        let clickY = event.clientY - rect.top;
    
        if (detectResetClick(clickX, clickY, context, left, right)) {
            selectedL = null;
            selectedR = null;
        } else if (clickX < 400) {
            selectedL = detectLeftOrbitalClick(selectedL, clickX, clickY, left);
        }
        else {
            selectedR = detectRightOrbitalClick(selectedR, clickX, clickY, right);
        }
        
        highlightSelections(selectedL, selectedR, left, right, context);
        drawCombination(selectedL, selectedR, context);
    });

    canvas.addEventListener('mousemove', (event) => {
        changeCursor(event.clientX, event.clientY, left, right);
    });
}
export default orbitals;

class Orbital {
    constructor(imgPath, name, xpos, ypos, width, height) {
        this.imgPath = imgPath;
        this.name = name;
        this.xpos = xpos;
        this.ypos = ypos;
        this.width = width;
        this.height = height;

        this.selected = false;
    }
}

let drawImg = function(img, context){
    let newImg = document.createElement('img');
    newImg.src = img.imgPath;
    newImg.onload = function() {
        context.drawImage(newImg, img.xpos, img.ypos, img.width, img.height);
    }
}

let changeCursor = function(x, y, left, right) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = x - rect.left;
    const mouseY = y - rect.top;

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
    if (400<=mouseX && 485>=mouseX && 440<=mouseY && 480>=mouseY) {
        pointer = true;
    }
    if (pointer) {
        document.body.style.cursor = "pointer";
    }
    else {
        document.body.style.cursor = "default";
    }

      
}

let makeLeftOrbitals = function () {
    let pxNegL = new Orbital('./assets/orbitals/Px-.png', "Px, negative", 140, 120, 100, 50);
    let pxPosL = new Orbital('./assets/orbitals/Px+.png', "Px, positive", 140, 190, 100, 50);
    let pzNegL = new Orbital('./assets/orbitals/Pz+.png', "Pz", 165, 260, 50, 100);
    let pzPosL = new Orbital('./assets/orbitals/Pz-.png', "Pz", 165, 400, 50, 100);
    
    let left = [pxNegL, pxPosL, pzNegL, pzPosL];
    return left;
}

let makeRightOrbitals = function () {
    let pxNegR = new Orbital('./assets/orbitals/Px-.png', "Px, postive", 650,120, 100, 50);
    let pxPosR = new Orbital('./assets/orbitals/Px+.png', "Px, negative", 650, 190, 100, 50);
    let pzNegR = new Orbital('./assets/orbitals/Pz+.png', "Pz", 675, 260, 50, 100);
    let pzPosR = new Orbital('./assets/orbitals/Pz-.png', "Pz", 675, 400, 50, 100);

    let right = [pxNegR, pxPosR, pzNegR, pzPosR];
    return right;
}

let resetCanvas = function(left, right, context, selectedL, selectedR) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawOrbitals(left, right, context);
    drawResetButton(context);
    drawInstructions(selectedL, selectedR, context);
}
let drawOrbitals = function(left, right, context) {
    for (let img in left) {
        drawImg(left[img], context);
    }
    for(let img in right) {
        drawImg(right[img], context);
    }
}

let drawRect = function (i, context) {
    context.beginPath();
    context.rect(i.xpos-3, i.ypos - 3, i.width + 3, i.height + 3);
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.stroke(); 
    context.closePath();
}

let instructions = function(left, words, context) {
    let xpos = 650;
    if (left) {
        xpos = 140;
    }
    context.font = "30px Oswald";
    context.beginPath();
    context.strokeStyle = 'black';
    context.fillText(words, xpos, 60);
    context.stroke();
    context.closePath();

}

let drawInstructions = function(drawLeft, drawRight, context) {
    if (!drawLeft) {
        instructions(true, "Select an orbital", context);
    }
    else {
        instructions(true, drawLeft.name, context);
    }
    if (!drawRight) {
        instructions(false, "Select an orbital", context);
    }
    else {
        instructions(false, drawRight.name, context);
    }
}

let highlightSelections = function(selectedL, selectedR, left, right, context) {
    if (selectedL != null || selectedR != null) {
        resetCanvas(left, right, context, selectedL, selectedR);
        if (selectedL) {
            drawRect(selectedL, context);
        }
        if (selectedR) {
            drawRect(selectedR, context);
        }
    }
}

let drawCombination = function(selectedL, selectedR, context) {
    let constructivePx = new Orbital('./assets/orbitals/constructivePx.png', 'constructivePx', 361, 200, 200, 100);
    let pcombconst = new Orbital('./assets/orbitals/Pcombconst.png', 'Pcombconst', 386, 200, 150, 150);
    if (selectedL && selectedR) {
        if (selectedL.imgPath == './assets/orbitals/Px+.png' && selectedR.imgPath == './assets/orbitals/Px-.png') {
            console.log('constructive');
            drawImg(constructivePx, context);
        }
        if (selectedL.imgPath == './assets/orbitals/Pz+.png' && selectedR.imgPath == './assets/orbitals/Pz+.png') {
            console.log('pcombconst');
            drawImg(pcombconst, context);
        }
    }
}

let drawResetButton = function(context) {
    context.font = "30px Oswald";
    context.beginPath();
    context.lineWidth = 3;
    context.rect(400, 440, 85, 40);
    context.fillText("Reset", 410, 470);
    context.stroke();
    context.closePath();
}

let detectResetClick = function(clickX, clickY, context, left, right) {
    if (clickX >= 400 && clickX <= 485 && clickY >= 440 && clickY <= 480) {
        resetCanvas(left, right, context, null, null);
        return true;
    }
}

let detectLeftOrbitalClick = function (selectedL, clickX, clickY, left) {
    let prev = selectedL;
    for (let img in left) {
        let i = left[img];
        if (clickX >= i.xpos && clickX <= i.xpos + i.width && clickY >= i.ypos && clickY <= i.ypos + i.height) {
            return i;
        }
    } 
    return prev;
}
let detectRightOrbitalClick = function (selectedR, clickX, clickY, right) {
    let prev = selectedR;
    for (let img in right) {
        let i = right[img];
        if (clickX >= i.xpos && clickX <= i.xpos + i.width && clickY >= i.ypos && clickY <= i.ypos + i.height) {
            return i;
        }
    }
    return prev;
}
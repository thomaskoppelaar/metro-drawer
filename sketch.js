// Shape used to draw point grid onto canvas
class GridPoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 5;
        this.color = color('black');
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, this.w);
    }
}

class Star {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.color = color('black');
        this.npoints = 4;

    }

    // Star function copied and modified from p5.js reference
    show() {
        strokeWeight(2);
        stroke(this.color);
        let angle = (TWO_PI)/ this.npoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
        let sx = this.x + cos(a) * this.w;
        let sy = this.y + sin(a) * this.w;
        vertex(sx, sy);
        sx = this.x + cos(a + halfAngle) * (this.w/7 * 3);
        sy = this.y + sin(a + halfAngle) * (this.w/7 * 3);
        vertex(sx, sy);
        }
        endShape(CLOSE);

    }
}


// Global vars
var canvasWidth = 800;
var canvasHeight = 800;

// No. of gridpoints on canvas
var GridWidth = 10;
var GridHeight = 10;

function drawGrid() {
    // +1 for padding sides
    let gridSpacingW = canvasWidth / (GridWidth + 1);
    let gridSpacingH = canvasWidth / (GridHeight + 1);
    for (let a = 1; a < GridWidth+1; a++) {
        for (let b = 1; b < GridHeight+1; b++) {
            new GridPoint(a * gridSpacingW, b * gridSpacingH).show();
        }
    }
}

function debugLines() {
    strokeWeight(4);
    stroke(199, 36, 177);
    line(0, 0, canvasWidth, canvasHeight);
    line(0, canvasHeight, canvasWidth, 0);
}     
function setup() {
    let cnv = createCanvas(canvasWidth, canvasHeight);
    // add listener for debug
    cnv.mouseClicked(debugMouseClick);
    background(220);
    // debugLines();
    drawGrid();
    
    
    
    
}

// get the closest gridpoint based on given X and Y coordinates 
function getClosestGridPoint(x, y) {
    // +1 for padding sides
    let gridSpacingW = canvasWidth / (GridWidth + 1);
    let gridSpacingH = canvasWidth / (GridHeight + 1);

    let closestGridPointX = Math.round(x / gridSpacingW);

    // Clamp closestGridPointX to be an actual gridpoint
    closestGridPointX = (closestGridPointX <= 0) ? 1 : closestGridPointX;
    closestGridPointX = (closestGridPointX >= GridWidth) ? GridWidth : closestGridPointX;

    let closestGridPointY = Math.round(y / gridSpacingH);

    // Clamp closestGridPointY to be an actual gridpoint
    closestGridPointY = (closestGridPointY <= 0) ? 1 : closestGridPointY;
    closestGridPointY = (closestGridPointY >= GridHeight) ? GridHeight : closestGridPointY;

    return [closestGridPointX * gridSpacingW, closestGridPointY * gridSpacingH];
}

// main event loop
function draw() {

}

function debugMouseClick() {
    stroke(199, 36, 177);
    fill('white');
    strokeWeight(5);
    let gridX = getClosestGridPoint(mouseX, mouseY)[0];
    let gridY = getClosestGridPoint(mouseX, mouseY)[1];
    new Star(gridX, gridY, 20).show();
    noStroke();
}

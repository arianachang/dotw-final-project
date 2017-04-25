function preload() {
  //load all images & sound
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  
}

function mousePressed() {
  
}

function Head(type, xPos, yPos) {
  this.xPos = xPos;
  this.yPos = yPos;
  
  this.display = function() {
    image(type, this.xPos, this.yPos, 50, 50);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
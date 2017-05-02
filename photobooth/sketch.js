var theCanvas;
var ears, whiskers, fish, fishBone;
var fishes = [];
var chomp, shutter;
var mouthX, mouthY;

function preload() {
  whiskers = loadImage("images/nose.png");
  ears = loadImage("images/catears.png");
  fish = loadImage("images/fish.png");
  chomp = loadSound("images/chomp.wav");
  fishBone = loadImage("images/fishbone.png");
  shutter = loadSound("images/camera-shutter-click-03.mp3");
}

function setup() {
  theCanvas = createCanvas(640, 480);
  theCanvas.parent("#game");
  
  smooth();
  noStroke();

  // create a video capture object
	capture = createCapture(VIDEO);
	capture.size(640, 480);
  capture.hide();
  
  startTrackerFromProcessing(capture);

  // create our fish
  for (var i = 0; i < 10; i++) {
    fishes.push(new Fish());
  }
}

function draw() {
  var filter;
  var photoEffect = selectAll('input');
  for(var i=0; i<photoEffect.length; i++) {
    if(photoEffect[i].elt.checked) {
      filter = photoEffect[i].elt.value;
    }
  }
  switch(filter) {
    case 'pointillism':
      Pointillism();
      break;
    case 'popart':
      PopArt();
      break;
    case 'cat':
      CatFilter();
      break;
    case 'invert':
      InvertColors();
      break;
  }
}

function keyTyped() {
  if(key === 's') {
    //save the drawing to the user's computer
    shutter.play();
    saveCanvas('photobooth-picture', 'jpg');
  }
}

function Fish() {
  this.x = random(width);
  this.y = random(-100, 0);
  this.ySpeed = random(1, 4);
  this.noiseOffset = random(1000);

  this.moveAndDisplay = function() {
    this.y += this.ySpeed;
    this.x += map(noise(this.noiseOffset), 0, 1, -2, 2);
    this.noiseOffset += 0.01;
    if (this.y > height) {
      this.y = random(-100, 0);
    }
    if (dist(this.x, this.y, mouthX, mouthY) < 50) {
      chomp.play();
      this.y = -100;
      this.ySpeed = 0;
    }
    image(fish, this.x, this.y, 50, 60);
  }
}

function CatFilter() {
  imageMode(CORNER);
  capture.loadPixels();
  image(capture, 0, 0, 640, 480);

  var faceArray = getFaceArray();
  
  if (faceArray != false)
  {
    // now draw it! the vertices in the face array describe features
    // of the face.  A full map of these vertices can be found here:
    // https://github.com/auduno/clmtrackr
    
    // each element of the faceArray contains two sub-elements - the x
    // position and the y position

    // compute the distance between the eyes
    var eyeSize = dist(faceArray[23][0], faceArray[23][1], faceArray[25][0], faceArray[25][1]) * 2;     
    
    imageMode(CENTER);
    noStroke();

    //whiskers & nose
    image(whiskers, faceArray[62][0], faceArray[62][1], 150, 54);
    
    //cat ears
    image(ears, faceArray[33][0], faceArray[33][1]-70, 200, 51);

    // compute the distance between the top of the upper lip and the bottom of lower lip
    var lipDistance = dist(faceArray[47][0], faceArray[47][1], faceArray[53][0], faceArray[53][1]);

    // compute the distance between the lips (mouth opening)
    var openDistance = dist(faceArray[60][0], faceArray[60][1], faceArray[57][0], faceArray[57][1]);

    // compute the distance between the edges of the mouth
    var mouthWidth = dist(faceArray[44][0], faceArray[44][1], faceArray[50][0], faceArray[50][1]);

    // does the mouth opening take up at least 40% of this space?
    if (openDistance / lipDistance > 0.4) {
      //dog bone in mouth
      image(fishBone, faceArray[57][0], faceArray[57][1]-20, mouthWidth-20, 40);
    }

    mouthX = faceArray[57][0];
    mouthY = faceArray[57][1];
  }

  // display our bones
  for (var i = 0; i < fishes.length; i++) {
    fishes[i].moveAndDisplay();
  }
}

function InvertColors() {
  imageMode(CORNER);
  capture.loadPixels();
  image(capture, 0, 0, 640, 480);
  filter(INVERT);
}

function PopArt() {
  // first make sure the video is actually loaded and ready to go
  imageMode(CORNER);
  capture.loadPixels();
  tint(0, 0, 255);
  image(capture, 0, 0, 320, 240);
  tint(0, 255, 0);
  image(capture, 320, 0, 320, 240);
  tint(255, 0, 0);
  image(capture, 0, 240, 320, 240);
  tint(255, 255, 0);
  image(capture, 320, 240, 320, 240);
  noTint();
}

function Pointillism() {
    capture.loadPixels();
    if (capture.pixels.length > 0) {
    
    // pick 500 random pixels
    for (var i = 0; i < 500; i++) {
      // pick a random x & y position
      var x = int(random(0,width));
      var y = int(random(0,height));
      
      // now convert these values into pixel array locations
      var location = (x + y * capture.width) * 4;
      
      // use the color here to draw an ellipse
      fill(capture.pixels[location], capture.pixels[location+1], capture.pixels[location+2]);
      ellipse(x, y, 10, 10);
    }
  }
}
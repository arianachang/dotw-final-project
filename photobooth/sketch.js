var theCanvas;

function setup() {
  theCanvas = createCanvas(640, 480);
  theCanvas.parent("#game");
  
  // create a video capture object
	capture = createCapture(VIDEO);
	capture.size(640, 480);
  capture.hide();
  
  startTrackerFromProcessing(capture);
}

function draw() {
  imageMode(CORNER);
	image(capture, 0, 0, 640, 480);

	var faceArray = getFaceArray();
	
}

function keyTyped() {
  if(key === 's') {
    //save the drawing to the user's computer
    saveCanvas('photobooth-picture', 'jpg');
  }
}
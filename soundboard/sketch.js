var heads = [];
var mouse, logo;
var schoolboy, desiigner, metro, uzi, pusha, ross;
var horn, drum, hey;

function preload() {
  //load all images & sound
  mouse = loadImage("images/pointer.png");
  logo = loadImage("images/hhh.png");
  
  desiigner = loadImage("images/desiigner.png");
  desiignerSound = loadSound("sounds/desiigner.mp3");
  
  schoolboy = loadImage("images/schoolboy.png");
  
  metro = loadImage("images/metro.png");
  metroSound = loadSound("sounds/metro_boomin.mp3");
  
  uzi = loadImage("images/liluzi.png");
  
  pusha = loadImage("images/pusha.png");
  pushaSound = loadSound("sounds/pusha_t.mp3");
  
  ross = loadImage("images/rick_ross.png");
  rossSound = loadSound("sounds/rick_ross.wav");

  keef = loadImage("images/keef.png");
  keefSound = loadSound("sounds/Chief Keef Bang Bang Sound Effect.mp3");

  drum = loadImage("images/drum.png");
  horn = loadImage("images/horn.png");
  hornSound = loadSound("sounds/airhorn.mp3");
  //hey = loadImage("images/hey.png");
  //sound = loadSound("sounds/sound.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  imageMode(CENTER);
  
  heads.push(new Head(metro, 100, 120, metroSound));
  heads.push(new Head(desiigner, 210, 120, desiignerSound));
  heads.push(new Head(pusha, 320, 120, pushaSound));
  heads.push(new Head(ross, 430, 120, rossSound));
  heads.push(new Head(keef, 540, 120, keefSound));
}

function draw() {
  background(207, 255, 186);
  image(logo, width/2, 40, 300, 61);
  
  for(var i=0; i<heads.length; i++) {
    //display heads
    heads[i].display();
  }
  
  image(horn, 50, 50, 40, 20);
  image(drum, 800, 50, 50, 50);
  //image(desiigner, 100, 120, 80, 100);
  //image(schoolboy, 200, 120, 80, 100);

  for(var i=0; i<heads.length; i++) {
    if(dist(mouseX, mouseY, heads[i].xPos, heads[i].yPos) < 30) {
      heads[i].onHover();
    }
  }

  image(mouse, mouseX, mouseY, 30, 37);
}

function mousePressed() {
  for(var i=0; i<heads.length; i++) {
    if(dist(mouseX, mouseY, heads[i].xPos, heads[i].yPos) < 30) {
      heads[i].play();
    }
  }
}

function Head(type, xPos, yPos, sound) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.sound = sound;
  
  this.display = function() {
    image(type, this.xPos, this.yPos, 100, 119);
  }
  
  this.onHover = function() {
    //translate(windowWidth/2, windowHeight/2);
    //rotate(PI/2);
    this.display();
  }
  
  this.play = function() {
    sound.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
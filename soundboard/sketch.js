var heads = [];
var mouse, logo;
var desiigner, metro, pusha, ross;
var uzi, keef, gucci, savage;
var esco, jayz, migos1, migos2;
var horn, beat, hey, woof;

function preload() {
  //load all images & sound
  mouse = loadImage("images/pointer.png");
  logo = loadImage("images/hhh.png");
  
  desiigner = loadImage("images/desiigner.png");
  desiignerSound = loadSound("sounds/desiigner.mp3");
    
  metro = loadImage("images/metro.png");
  metroSound = loadSound("sounds/Young Metro gun shoot.mp3");
  
  uzi = loadImage("images/liluzi.png");
  uziSound = loadSound("sounds/Uzi Yeahs.mp3");

  pusha = loadImage("images/pusha.png");
  pushaSound = loadSound("sounds/pusha_t.mp3");
  
  ross = loadImage("images/rick_ross.png");
  rossSound = loadSound("sounds/rick_ross.wav");

  keef = loadImage("images/keef.png");
  keefSound = loadSound("sounds/Chief Keef Bang Bang Sound Effect.mp3");

  gucci = loadImage("images/gucci.png");
  gucciSound = loadSound("sounds/Gucci.mp3");

  savage = loadImage("images/savage.png");
  savageSound = loadSound("sounds/21.mp3");

  esco = loadImage("images/esco.png");
  escoSound = loadSound("sounds/DJ Esco.mp3");

  jayz = loadImage("images/hov.png");
  jayzSound = loadSound("sounds/jay_z.wav");

  migos1 = loadImage("images/offset.png");
  migosSound = loadSound("sounds/Offset Woof.mp3");

  migos2 = loadImage("images/quavo.png");
  migos2Sound = loadSound("sounds/Migo Grah.mp3");

  beat = loadImage("images/drum.png");
  beatSound = loadSound("sounds/badnboujee.mp3");

  horn = loadImage("images/horn.png");
  hornSound = loadSound("sounds/airhorn.mp3");

  hey = loadImage("images/hey.png");
  heySound = loadSound("sounds/hey.wav");

  woof = loadImage("images/woof.png");
  woofSound = loadSound("sounds/!Chant 2.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  imageMode(CENTER);
  
  //first row
  heads.push(new Head(desiigner, windowWidth/3, windowHeight/4, desiignerSound));
  heads.push(new Head(pusha, windowWidth/2, windowHeight/4, pushaSound));
  heads.push(new Head(ross, 2*windowWidth/3, windowHeight/4, rossSound));
  //second row
  heads.push(new Head(metro, windowWidth/3, windowHeight/4+130, metroSound));
  heads.push(new Head(esco, windowWidth/2, windowHeight/4+130, escoSound));
  heads.push(new Head(uzi, 2*windowWidth/3, windowHeight/4+130, uziSound));
  //third row
  heads.push(new Head(keef, windowWidth/3, windowHeight/4+260, keefSound));
  heads.push(new Head(savage, windowWidth/2, windowHeight/4+260, savageSound));
  heads.push(new Head(gucci, 2*windowWidth/3, windowHeight/4+260, gucciSound));
  //fourth row
  heads.push(new Head(jayz, windowWidth/3, windowHeight/4+390, jayzSound));
  heads.push(new Head(migos1, windowWidth/2, windowHeight/4+390, migosSound));
  heads.push(new Head(migos2, 2*windowWidth/3, windowHeight/4+390, migos2Sound));

  //other sound bites
  heads.push(new Sticker(horn, 100, windowHeight/2-100, hornSound, 80, 40));
  heads.push(new Sticker(beat, 100, windowHeight/2, beatSound, 80, 80));
  heads.push(new Sticker(hey, windowWidth-100, windowHeight/2-100, heySound, 100, 61));
  heads.push(new Sticker(woof, windowWidth-150, windowHeight/2, woofSound, 100, 61));

}

function draw() {
  setGradient(0, 0, width, height, color(164, 183, 188), color(221, 248, 241));

  image(logo, width/2, 40, 300, 61);
  
  tint(255, 200);
  for(var i=0; i<heads.length; i++) {
    //display heads
    heads[i].display();
  }
  noTint();
  
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
    this.display();
  }
  
  this.play = function() {
    sound.play();
  }
}

function Sticker(type, xPos, yPos, sound, w, h) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.sound = sound;
  
  this.display = function() {
    image(type, this.xPos, this.yPos, w, h);
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

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  for (var i = y; i <= y+h; i++) {
    var inter = map(i, y, y+h, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x+w, i);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
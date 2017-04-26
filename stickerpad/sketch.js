var randColor1, randColor2;
var emojis = [];
var octopus, tears, moon, onehundred, shoe, pray, angel, thinking, eyeroll;
var stickers = [];
var currentIndex = 0;

function preload() {
  octopus = loadImage("images/Octopus_Emoji.png");
  tears = loadImage("images/Tears_Of_Joy.png");
  moon = loadImage("images/Dark_Blue_Moon_Emoji.png");
  onehundred = loadImage("images/100_Emoji.png");
  shoe = loadImage("images/Athletic_Shoe_Emoji.png");
  pray = loadImage("images/Praying_Emoji.png");
  angel = loadImage("images/White_Baby_Angel_Emoji.png");
  thinking = loadImage("images/Thinking_Face_Emoji.png");
  eyeroll = loadImage("images/Face_With_Rolling_Eyes_Emoji.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  
  randColor1 = color(random(255), random(255), random(255));
  randColor2 = color(random(150), random(150), random(150));
  setGradient(0, 0, width, height, randColor1, randColor2);
  
  imageMode(CENTER);

  emojis.push(octopus);
  emojis.push(tears);
  emojis.push(moon);
  emojis.push(onehundred);
  emojis.push(shoe);
  emojis.push(pray);
  emojis.push(angel);
  emojis.push(thinking);
  emojis.push(eyeroll);
}

function draw() {
  setGradient(0, 0, width, height, randColor1, randColor2);

  for(var i=0; i<stickers.length; i++) {
    stickers[i].display();
  }
  
  image(emojis[currentIndex], mouseX, mouseY, 30, 30);
}

function Sticker(type, xPos, yPos) {
  this.xPos = xPos;
  this.yPos = yPos;
  
  this.display = function() {
    image(type, this.xPos, this.yPos, 30, 30);
  }
}

function mouseDragged() {
    var sticker = new Sticker(emojis[currentIndex], mouseX, mouseY);
    stickers.push(sticker);
}

function mousePressed() {
    var sticker = new Sticker(emojis[currentIndex], mouseX, mouseY);
    stickers.push(sticker);
}

function keyTyped() {
  if(key === 's') {
    //save the drawing to the user's computer
    saveCanvas('sticker-drawing', 'jpg');
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW && currentIndex !== 0) {
    console.log('left arrow pressed');
    currentIndex -= 1;
  }
  else if(keyCode === RIGHT_ARROW && currentIndex !== emojis.length-1) {
    console.log('right arrow pressed');
    currentIndex += 1;
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  for (var i = x; i <= x+w; i++) {
    var inter = map(i, x, x+w, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(i, y, i, y+h);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
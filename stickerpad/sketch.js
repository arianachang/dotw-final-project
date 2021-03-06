var randColor1, randColor2;
var emojis = [];
var octopus, tears, moon, onehundred, shoe, pray, angel, thinking, eyeroll;
var lips, eyes, highfive, peace, poop, peach, jeans;
var pillar, fire, hat, tshirt, crown;
var glasses, cat, heart, shroom;
var alien, flex, dog, bee, sun, banana, womansShirt;
var stickers = [];
var currentIndex = 0;
var brush;
var shutter;

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
  lips = loadImage("images/Lips_Emoji.png");
  eyes = loadImage("images/Eyes_Emoji.png");
  highfive = loadImage("images/High_Five_Emoji.png");
  peace = loadImage("images/Victory_Hand_Emoji.png");
  poop = loadImage("images/Poop_Emoji.png");
  peach = loadImage("images/Peach_Emoji.png");
  jeans = loadImage("images/Jeans_Emoji.png");
  pillar = loadImage("images/Caterpie_Bug_Emoji.png");
  fire = loadImage("images/Fire_Emoji.png");
  hat = loadImage("images/Top_Magic_Hat_Emoji.png");
  tshirt = loadImage("images/T-Shirt_Emoji.png");
  crown = loadImage("images/Queen_s_Crown_Emoji.png");
  cat = loadImage("images/CAT_emoji_icon_png.png");
  heart = loadImage("images/Sparkling_Pink_Heart_Emoji.png");
  shroom = loadImage("images/Mushroom_emoji_icon_png.png");
  glasses = loadImage("images/Glasses_Emoji.png");
  alien = loadImage("images/Alien_Emoji.png");
  flex = loadImage("images/Flexing_Muscles_Emoji.png");
  dog = loadImage("images/Dog_Emoji.png");
  bee = loadImage("images/honeybee_emoji_icon_png.png");
  sun = loadImage("images/The_Sun_Face_Emoji.png");
  banana = loadImage("images/Banana_Emoji.png");
  womansShirt = loadImage("images/Womans_Clothes_Emoji.png");
  shutter = loadSound("images/camera-shutter-click-03.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  smooth();

  randColor1 = color(random(255), random(255), random(255));
  randColor2 = color(random(150), random(150), random(150));
  setGradient(0, 0, width, height, randColor1, randColor2);
  
  imageMode(CENTER);

  //faces
  emojis.push(tears);
  emojis.push(thinking);
  emojis.push(eyeroll);
  emojis.push(angel);
  emojis.push(moon);
  emojis.push(sun);
  emojis.push(poop);
  emojis.push(alien);

  //body parts
  emojis.push(pray);
  emojis.push(flex);
  emojis.push(peace);
  emojis.push(highfive);
  emojis.push(lips);
  emojis.push(eyes);

  //clothing
  emojis.push(shoe);
  emojis.push(glasses);
  emojis.push(jeans);
  emojis.push(hat);
  emojis.push(crown);
  emojis.push(tshirt);
  emojis.push(womansShirt);

  //animals & food
  emojis.push(octopus);
  emojis.push(pillar);
  emojis.push(cat);
  emojis.push(shroom);
  emojis.push(peach);
  emojis.push(banana);
  emojis.push(dog);
  emojis.push(bee);

  //misc
  emojis.push(onehundred);
  emojis.push(fire);
  emojis.push(heart);

  brush = new Cursor();
}

function draw() {
  setGradient(0, 0, width, height, randColor1, randColor2);

  for(var i=0; i<stickers.length; i++) {
    stickers[i].display();
  }
  
  brush.display();
}

function Cursor() {
  this.size = 40;
  this.type = emojis[0];

  this.display = function() {
      image(this.type, mouseX, mouseY, this.size, this.size);
  }
}

function Sticker(type, xPos, yPos, size) {
  this.xPos = xPos;
  this.yPos = yPos;
  this.size = size;

  this.display = function() {
    image(type, this.xPos, this.yPos, this.size, this.size);
  }
}

function mouseDragged() {
    var sticker = new Sticker(emojis[currentIndex], mouseX, mouseY, brush.size);
    stickers.push(sticker);
}

function mousePressed() {
    var sticker = new Sticker(emojis[currentIndex], mouseX, mouseY, brush.size);
    stickers.push(sticker);
}

function keyTyped() {
  if(key === 's') {
    shutter.play();
    //save the drawing to the user's computer
    saveCanvas('sticker-drawing', 'jpg');
  }
  else if(key === 'r') {
    //regenerate background gradient
    randColor1 = color(random(100), random(100), random(100));
    randColor2 = color(random(155,255), random(155,255), random(155,255));
    setGradient(0, 0, width, height, randColor1, randColor2);
    stickers = []; //clear stickers
  }
  else if(key === 'z') {
    //make cursor img smaller
    brush.size -= 5;

  }
  else if(key === 'x') {
    //make cursor img larger
    brush.size += 5;
  }
}

function keyPressed() {
  if(keyCode === LEFT_ARROW && currentIndex !== 0) {
    currentIndex -= 1;
    brush.type = emojis[currentIndex];
  }
  else if(keyCode === RIGHT_ARROW && currentIndex !== emojis.length-1) {
    currentIndex += 1;
    brush.type = emojis[currentIndex];
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
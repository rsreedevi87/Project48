var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var person,boy,girl;

var track, boy_img,girl_img;

function preload(){
  track = loadImage("../images/track.jpg");
  boy_img = loadAnimation("../images/b1.png","../images/b2.png");
  girl_img = loadImage("../images/b1.png","../images/b2.png");

  ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  background("pink");
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}

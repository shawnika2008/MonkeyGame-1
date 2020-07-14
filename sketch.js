//Global Variables
var bananaImage,obstacleImage, obstacleGroup, back, backImage;
var monkey, monkeyImage, ground, groundImage, bananaGroup;

var score=0

var gameOver, gameOverImage, restart, restartImage;

function preload(){
  
backImage = loadImage("jungle.jpg");
  
monkeyImage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
   groundImage = loadImage("ground.jpg");
  
  bananaImage = loadImage("Banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(600,300);
  
  back = createSprite(0,0,400,400);
  back.addImage("back",backImage);
  back.x = back.width /2;
  back.velocityX=-2;
  
  ground = createSprite(580,280,400,10);
  ground.visible=false;
  
  monkey = createSprite(100,250,10,10);
  monkey.addAnimation("monkey",monkeyImage);
  monkey.scale = 0.2;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw(){
 background(0); 
  

    
    //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -10 ;
    }
    
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.3;
    
    if (ground.x > 400){
    ground.x = ground.width/2;
  }
  
    if (back.x < 200){
    back.x = back.width/2;
    }
    
    var rand = Math.round(random(1,6));
  switch (score){
    case 10 : monkey.scale=0.12;
      break;
    case 20 : monkey.scale=0.14;
      break;
    case 30 : monkey.scale=0.16;
      break;
    case 40 :  monkey.scale=0.18;
      break; 
      default:break;
  }
  

  spawnObstacles();
  
  spawnBanana();
  
  monkey.collide(ground);
  
  increaseScore();
  
  drawSprites();
  
    //score count and display
  textSize(25);
  textFont("georgia");
  fill("black");
  text("score:" + score,50,60);
}

function spawnBanana(){
 if(frameCount % 280 ===0){
   var banana = createSprite(600,100,10,10);
   banana.addAnimation("banana",bananaImage);
   banana.scale=0.09;
   banana.velocityX=-3;
   banana.lifeTime=200;
   bananaGroup.add(banana);
   }
  
}

function spawnObstacles(){
if(frameCount % 180===0){
   var obstacle = createSprite(600,250,10,10);
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.2;
   obstacle.velocityX=-3;
   obstacle.lifeTime=200;
  obstacleGroup.add(obstacle);
 }
  

}

function increaseScore(){
if(bananaGroup.isTouching(monkey)){
    score=score+1;
  }

if(obstacleGroup.isTouching(monkey)){
    score=score-3;
  }
}
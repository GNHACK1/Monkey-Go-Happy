
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacle
var score , survivalTime
var ground;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(560,560);
  monkey = createSprite(50,420,30,50);
  monkey.addAnimation("monkey run",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(200,535,1900,50);
  
  survivalTime = 0;
  score = 0;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();

  
}


function draw() {
  background("white");    
  
  textSize(20);
  text("Survival Time: "+ survivalTime, 100,50);
  survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  textSize(20);
  text("Score: "+ score, 300,50);
  if(monkey.isTouching(bananaGroup)){
    score = score+1; 
    bananaGroup.destroyEach();
  }
  
  if(keyDown("space")) {
      monkey.velocityY = -12;
  }    
  monkey.velocityY = monkey.velocityY + 2;
  
  ground.velocityX = -4
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  ground.lifetime = 300;
  
  if(obstacleGroup.isTouching(monkey)){
    score = 0;
    survivalTime = 0;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    monkey.velocityY = 0;
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  
  SpwanObstacle();
  SpwanBanana();
  monkey.collide(ground);
  drawSprites();
}
function SpwanBanana(){
 if (frameCount % 60 === 0) {
    var banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(40,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 250;
    bananaGroup.add(banana);
   
 }}
function SpwanObstacle(){
 if (frameCount % 190 === 0) {
    var obstacle = createSprite(600,480,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.4;
    obstacle.velocityX = -4;
    
     //assign lifetime to the variable
    obstacle.lifetime = 250;
    obstacleGroup.add(obstacle);
   
   obstacle.depth = ground.depth;
   ground.depth = ground.depth + 1;
   
 }}

     
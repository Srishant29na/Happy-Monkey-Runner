
var monkey , monkeyImage
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var ground, groundImage, backdrop;


function preload(){
  
  
  monkeyImage =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("BackDrop.jpg")

 
}



function setup() 
{
  createCanvas(600, 400);
  
   backdrop = createSprite(300, 200, 20, 20);
  backdrop.addImage(groundImage);
  backdrop.scale = 5
  
  monkey = createSprite(120, 315, 20, 20);
  monkey.addAnimation("running", monkeyImage);
  monkey.scale = 0.08
 
  ground = createSprite(300, 370, 600, 60);
  ground.shapeColor = "lightgreen"
  ground.visible = false
  
 
  
  bananaGroup = createGroup()
  obstacleGroup = createGroup()
}


function draw() 
{

  
  //console.log(monkey.y);
  
  backdrop.velocityX = -3;
  if(backdrop.x < 200)
    {
      backdrop.x = 300
    }
  
  score = score + Math.round(frameCount % 60 === 0)
  
  if (monkey.isTouching(bananaGroup))
    {
      banana.destroy();
      monkey.scale = monkey.scale + 0.002
    }
  
  monkey.collide(ground)
  
  if (keyDown("space") && monkey.y >= 309.2)
    {
      monkey.velocityY = -20;
    }
  monkey.velocityY = monkey.velocityY + 0.9

  spawnBananas()
  spawnObstacle()
  drawSprites();
  
    fill("white")
  text("Survival Time = " + score, 50, 50)
 
  
    
  if (monkey.isTouching(obstacleGroup))
    {
      
      backdrop.velocityX = 0;
      
      background("lightgreen")
      
      monkey.velocityX = 0;
      monkey.visible = false
      banana.velocityX = 0;
      banana.visible = false
      obstacle.velocityX = 0;
      obstacle.visible = false
      ground.visible = false;
      
      textSize(20)
      stroke("white")
      fill("blue")
      text("GAME OVER, The monkey has been caught!!!", 150, 200)
    }

}


function spawnObstacle()
{
  if (frameCount % 125 === 0)
    {
  obstacle = createSprite(600, 315, 20, 10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -8;
  obstacleGroup.add(obstacle)
    }
}

function spawnBananas()
{
  if (frameCount % 125 === 0)
    { 
  banana = createSprite(600, 98, 50, 50);
  banana.velocityX = -8;
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  bananaGroup.add(banana)
    }
}
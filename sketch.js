var PLAY=1
var END=0
var gameState=PLAY

var dog, dog_running, dog_jumping, dog_collided;
var ground, invisibleGround, groundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score=0;
var gameOver, restart;
localStorage["HighScore"]=0

function preload(){
dog_running= loadAnimation("dog running_1.png", "dog running_2.png", "dog running_3.png", "dog running_4.png")
dog_jumping= loadAnimation("dog jumping_1.png", "dog jumping_2.png", "dog jumping_3.png", "dog jumping_4.png", "dog jumping_5.png", "dog jumping_6.png", "dog jumping_7.png", "dog jumping_8.png", "dog jumping _9.png")
groundImage=loadImage("ground.png")
obstacle1=loadImage("obstacle1.png")
obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
obstacle4=loadImage("obstacle4.png")
obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
gameOver=loadImage("game over.jpg")
restart=loadImage("retry.png")
dog_collided=loadImage("dog get hit.png")

}

function setup(){
    createCanvas(600,200);
    dog=createSprite(50,180,50,50);
    dog.addAnimation("running", dog_running);
    dog.addAnimation("collided", dog_collided);
    dog.addAnimation("jumping", dog_jumping);
    dog.scale=0.5;

    ground=createSprite(200,180,400,20)
    ground.addImage("ground", groundImage);
    ground.x=ground.width/2;
    ground.velocity.x=-(6+3*score/100)

    gameOver=createSprite(300,140)
    gameOver.addImage(gameOver)

    restart=createSprite(300,140)
    restart.addImage(restart)

    gameOver.scale=0.5
    restart.scale=0.5

    gameOver.visible=false
    restart.visible=false

    invisibleGround=createSprite(200,190,400,20)
    invisibleGround.visible=false

    obstaclesGroup=newGroup();

    score=0;
}

function draW (){
  background(255)
  Text("score:"+score,500,50)

  if (gameState===PLAY){
      score=score+Math.round(getFrameRate/60);
      ground.velocityX-(6+3*score/100)

  if (keyDown("space")&& dog.y>=159){
      dog.velocityY=-12
  }
  dog.velocityY=dog.velocity+8
  if (ground.x<0){
      ground.x=ground.x/2;

  }
  dog.collided(invisibleGround)
  spawnObstacles();
  if(obstaclesGroup.isTouching(dog)){
      gameState=END;

  }
  }
    else if(gameState===End){
        gameOver.visible=true
        restart.visible=true

    }
    ground.velocityx=0
    dog.velocityX=0
    obstaclesGroup.setVelocityXEach(0)

    dog.changeAnimation("collided",dog_collided)

    obstaclesGroup.setlifetimeEach(-1)

    if (mousePressedOver(restart)){
        reset();
    }   
}
function spawnObstacles(){
    if (frameCount%=60===0){
        var obstacle=createSprite(600,165,50,25)
        obstacle.velocityX=-(6+3*score/100)

        var rand= math.round(random(1,6));
        switch(rand){
            case 1 :obstacle.addImage(obstacle1)
                   break;
            case 2 :obstacle.addImage(obstacle2)
                   break;
            case 3 :obstacle.addImage(obstacle3)
                   break;
            case 4 :obstacle.addImage(obstacle4)
                   break;
            case 5 :obstacle.addImage(obstacle5)
                   break;
            case 6 :obstacle.addImage(obstacle6) 
                   break;
            default : break                                       
        }
        obstacle.scale=0.5
        obstacle.lifetime=300
        obstaclesGroup.add(obstacle)
    }
}
        function reset(){
            gameState = PLAY;
            gameOver.visible = false;
            restart.visible = false;
          
            obstaclesGroup.destroyEach();
            cloudsGroup.destroyEach();
          
            tdog.changeAnimation("running",dog_running);
          
            if(localStorage["HighestScore"]<score){
              localStorage["HighestScore"] = score;
            }
            console.log(localStorage["HighestScore"]);
          
            score = 0;
          
          }
    


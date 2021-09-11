var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost=createSprite(300,100,20,20)
  ghost.addImage(ghostImg)
  ghost.scale=0.5
  doorsGroup=new Group()
  climbersGroup=new Group() 
  invisibleBlockGroup=new Group()
}

function draw() {
  background(200);
  
  
 // spookySound.play()
  drawSprites()
  if (climbersGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  if (invisibleBlockGroup.isTouching(ghost) || ghost.y>600){
ghost.destroy()
gameState="end"
  }
  if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors()
    if (keyDown("SPACE")){
      ghost.velocityY=-5
    }
    ghost.velocityY+=0.3
    if (keyDown("LEFT_ARROW")){
      ghost.x-=3
    }
    if (keyDown("RIGHT_ARROW")){
      ghost.x+=3
    }
if (gameState==='end'){
  textSize(30)
  fill('RED')
  text("GAME OVER",230,250)
  tower.velocityY=0
  climbersGroup.destroyEach()
  doorsGroup.destroyEach()
  invisibleBlock.destroyEach()
  
}
}
function spawnDoors(){
  if (frameCount%200===0){
    door=createSprite(Math.round(random(100,450)),-50)
    door.addImage(doorImg)
    climber=createSprite(200,10)
    climber.addImage(climberImg)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    climber.lifetime=800
    climber.velocityY=1
    climber.x=door.x
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1
    ghost.depth=door.depth
    ghost.depth+=1
    climbersGroup.add(climber)
    door.scale=0.9
    door.velocityY=1
    door.lifetime=800
invisibleBlock.lifetime=800
invisibleBlockGroup.add(invisibleBlock)
doorsGroup.add(door)
invisibleBlock.debug=true
invisibleBlock.setCollider("circle",0,0,20)
  }
  
}
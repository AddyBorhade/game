  var STORY = 0  
  var PLAY = 1
  var END = 2
  var  gameState = STORY
  var score = 0, lives = 3
  

 function  preload(){

    copImage = loadImage("CarBgCop.png");
    robberImage = loadImage("VanBgCar.png");
    bgImage = loadImage("Bg.png")
    ob1 = loadImage("BrokenBottle.png")

    ob2 = loadImage("ChipBag.png")

    ob3 = loadImage("Banana.png")

    ob4 = loadImage("CrushedCan.png")
    moneyImg = loadImage("MoneyBag.png")



 }



  function setup() {
    createCanvas(displayWidth,displayHeight/1.5);
    cop = createSprite(100, 200, 50, 50);
    cop.addAnimation("copAni", copImage)
    cop.scale = 0.5
    border = createSprite(displayWidth/2,60,displayWidth,50)
    border.visible = false

    
    robber = createSprite(displayWidth - 200, 200, 50, 50);
    robber.addAnimation("vanAni", robberImage)
    robber.scale = 0.5

    obstaclesGroup = createGroup()
    moneyGroup = createGroup()
  
  }

  function draw() {
    if(gameState === STORY){
      background("green");
      textSize(20)
      fill("white")
      text("COP AND ROBBER CHASE:", displayWidth/2 - 120, 50 )

      textSize(15)
      fill("white")
      text("Steve has run out of money and decides to rob a bank! *Poor life choices*, It is up to you to stop Steve from getting away! ", 10, 150 )

      textSize(15)
      fill("white")
      text("HOW TO PLAY: Press the UP and DOWN arrow keys to control your police car! Collect the money bags to move on to the next level.", 10, 200)

      textSize(15)
      fill("white")
      text("Steve is crazy so remember to watch out for the obstcales he throws out of his car to stop you! Don't get hit three times or your done! ", 10, 250 )

      textSize(15)
      fill("white")
      text("PRESS SPACEBAR TO START", 10, 300)

      if(keyDown("space")){
        gameState = PLAY
      }
    }

    else if(gameState === PLAY){
      background(bgImage);  
      drawSprites();
      textSize(15)
      fill("green")
      text("Money Bags Collected:" + score, displayWidth/2-600, 50)
      textSize(15)
      fill("red")
      text("Lives Remaining:" + lives + "/3", displayWidth/2-600, 70)

      
    edges = createEdgeSprites();
    for (var i = 0; i<obstaclesGroup.length; i = i+1){
    if(obstaclesGroup.get(i).isTouching(edges[0])){
      obstaclesGroup.get(i).remove()
    
    }

    if(obstaclesGroup.get(i).isTouching(cop)){
      lives = lives - 1
      obstaclesGroup.get(i).remove()

    }


    }

    for (var i = 0; i<moneyGroup.length; i = i+1){
      if(moneyGroup.get(i).isTouching(edges[0])){
        moneyGroup.get(i).remove()
      }

      if(moneyGroup.get(i).isTouching(cop)){
        score = score + 1
        moneyGroup.get(i).remove()
      }

      

      }
    
    obstaclesGroup.bounceOff(edges)
    obstaclesGroup.bounceOff(border)

    moneyGroup.bounceOff(edges)

      if(keyDown("UP_ARROW")){
        cop.y = cop.y-10
      }
    
      if(keyDown("DOWN_ARROW")){
        cop.y = cop.y+10
      }
      spawnObstacles()
      spawnMoneyBags()

      if(lives === 0){
        gameState = END
      }
    }
    
    else if(gameState === END){
background("yellow")

    }
  

    
  }

  function spawnObstacles(){
    if (frameCount%100 === 0){
      obstacles = createSprite(robber.x, robber.y, 20,20)
      obstaclesGroup.add(obstacles)
      obstacles.velocityX = random(-7, -5 )
      obstacles.velocityY = random(-2,2)
      obstacles.lifetime = 1000
obstacles.scale = 0.1
obstacles.rotationSpeed = 2
      var r = Math.round(random(1,4))
      switch(r){
        case 1: obstacles.addImage("ob1", ob1)
        break;
        case 2: obstacles.addImage("ob2", ob2)
        break;
        case 3: obstacles.addImage("ob3", ob3)
        break;
        case 4: obstacles.addImage("ob4", ob4)
        break;

      }
    }
  }

  function spawnMoneyBags(){
    if (frameCount%500 === 0){
      money = createSprite(robber.x, robber.y, 20,20)
      money.addImage("money", moneyImg )
      money.shapeColor = "green"
      moneyGroup.add(money)
      money.velocityX = random(-7, -1 )
      money.velocityY = random(-2,2)
      money.lifetime = 1000
      money.scale = 0.3
    }
  }
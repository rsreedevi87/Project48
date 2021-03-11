class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    boy = createSprite(100,200);
    boy.addAnimation("boy1",boy_img);
  
    girl = createSprite(500,200);
    girl.addAnimation("boy1",boy_img);
  
    
    person = [boy,girl];
  }

  play(){

    form.hide();
    
    Player.getPlayerInfo();
    player.getPersonAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 400;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        person[index-1].x = x;
        person[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("blue");
          ellipse(x,y,70,70);
          person[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = person[index-1].y;
        }
       
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 4200){
      gameState = 2;
      player.rank +=1
    
   
   Player.updatePersonAtEnd(player.rank);
    fill("Red");
    textSize(120);
    text("Your Rank: "+ player.rank, displayWidth/2-50, y-120);
    }


    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}

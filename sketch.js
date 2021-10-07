var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var fedTime 
var lastFed
var foodObj
var feedDog
var feed,addFood


function preload(){
   dogImg=loadImage("images/dogimg.png");
   happydog=loadImage("images/dogimg1.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  foodObj=new Food()

  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  textSize(20); 

  feed=createButton("Feed The Dog")
  feed.position(700,99)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(700,99)
  addFood.mousePressed(addFood)
}

// function to display UI
function draw() {
  background(46,139,87);

  foodObj.display()
  fedTime=database.ref("FeedTime")
  fedTime.on("value", function(data){
    lastFed=data.val()
  })

    fill (255,255,254)
    textSize(15)
    if(lastFed>=12){

      text("Last Feed : "+ lastFed%12 + " PM", 350,30);
    }

    else if(lastFed===0){
      text("Last Feed : 12 AM",350,30);
    }

    else{
      text("Last Feed : "+ lastFed + " AM", 350,30);
    }
  drawSprites();
  
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock('foods')
}

//Function to write values in DB
function addFood(){
  foods++
  database.ref('/').update({
    food:foods
  })

  function feedDog(){

    dog.addImage(happydog)
    if(foodObj.getFoodStock()<=0){
      foodObj.updateFoodStock(foodObj.getFoodStock()*0)
    }
    else{
      foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    }

    database.ref("/").update({
      food:foodObj.getFoodStock(),
      FeedTime:hour()
    })



  }
}
//Create variables here
var dog;
var happyDog;
var foodS;
var foodStock;
var database;
var feed;
var addFood;
var foodObj;
var lastFed;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 400);

  foodObj = new Foods();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(450,200,80,80);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46, 138, 87);

  foodObj.display();

  //add styles here
  //textSize(20);
  //fill(0);
 // text("Food Stock: "+ foodS, 150,100);
  

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  });

  fill(255, 255, 254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + " PM", 300, 30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM", 350, 30);
  }else{
    text("Last Feed: " + lastFed + " AM", 300, 30);
  }

  drawSprites();

}
function readStock(data){
  foodS = data.val();
  foodObj.updateStock(foodS);

}

/*
function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x= x-1;
  }
  database.ref('/').update({
    Food:x
  })
}*/

function feedDog(){
  dog.addImage(happyDogImg);

  foodObj.updateStock(foodObj.getFoodStock()-1);
  //foods.deductFood();
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}





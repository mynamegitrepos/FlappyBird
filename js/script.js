var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d"); 
canvas.height = 512;
canvas.width = 288;


// load images

var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

// constants and variables animatables

var fv = false;
var speedPipes = 0;

const birdImages = {};
birdImages.player = new Image();
birdImages.player.src = 'images/birdAnim.png';

const birdImages1 = {};
birdImages1.player = new Image();
birdImages1.player.src = 'images/birdAnim1.png';

 const birdImagesX = birdImages.width / 2,
        birdImagesY = birdImages.height / 2;

const playerWidth = 40;
const playerHeight = 28; 
const playerSpeed = 6;
let playerFrameX = 0; // index do array
let playerFrameY = 0;
let playerX = 50; // position in canvas
let playerY = 250;

let timer = 0;

var speedVar = 1000/30;
var low = speedVar / 2;
var live = 3;

bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//some variables. gap = vão entre os postes
var gap = 80; 
var constant = pipeNorth.height + gap;

var gravity = 2.5;
var score = 0;

var fly = new Audio();
var scor = new Audio();
var punch = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";
punch.src = "sounds/punch.mp3";

document.addEventListener("keydown", moveUp);
function moveUp(){
	playerY -= 25;
	fly.play();
}

var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}

/*
function gameOver(){
document.getElementById("start-screen").style.display = "block";

}
*/
function startGame(){
  location.reload();
}

function Live(){
	live --;
	return;
}


function draw(){
 fv = true;
	ctx.drawImage(bg, 0, 0);
	for(var i = 0; i < pipe.length; i++){

  	ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
	ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
	pipe[i].x -= 2;
    
	if(pipe[i].x == 80){
		pipe.push({
			x : cvs.width,
			y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
		});
	}
    // detect collision
	if(playerX + 35 >= pipe[i].x 
		&& 
		playerX <= pipe[i].x + pipeNorth.width 
		&&
		(playerY <= pipe[i].y + pipeNorth.height || playerY + (28 - 6) >= pipe[i].y + constant)
		
		){ 
		//playerX = pipe[i].x;
        fv = false;
		punch.play();
		//fall();
	    document.removeEventListener("keydown", moveUp);
	    console.log(speedPipes);
	    
		score += 0;
		pipe[i].x += 6;
		scor.muted = true;
        playerY += gravity * 3;
        if(pipe[i].x == playerX){
		score ++;
		pipe[i].x += 6;
		scor.muted = true;
	}	

       

	/*
        window.clearInterval(myTimer); 

        document.removeEventListener("keydown", moveUp);
	    fly.muted = true;
		//punch.play();

	    const sT = setTimeout(collision, 1500);
       // fall();
       //window.clearInterval(sT); 
       */
	}

  
if(playerX >= pipe[i].x - pipeNorth.width
   && 
   fv == false 
   &&
   playerX <= 50
	 ){
      console.log("pipe collision");
      playerX = pipe[i].x;
      pipe[i].x += 2;
      playerY += gravity * 3;
      fv = false;
	}
	
	if(playerY + 28 >= cvs.height - fg.height){
		punch.play();
      window.clearInterval(myTimer); 
     const sT = setTimeout(collision, 1500);
	}
	
	if(pipe[i].x == playerX && fv == true){
		score ++;
		pipe[i].x -= 35;
		scor.play();
	}

	}
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	playerY += gravity;
	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : " + score, 10, cvs.height - 20);
    ctx.fillText("Score : " + live, 10, cvs.height - 50);

  
}


function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){// s = surce image. d = destination canvas
	draw();
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

}


function animate(){ 
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if(fv == true){
		speedPipes = 2;
      drawSprite(birdImages.player, playerWidth * playerFrameX,
               playerHeight * playerFrameY, playerWidth, playerHeight,
               playerX, playerY, playerWidth, playerHeight);
	if(playerFrameX < 2) playerFrameX ++;
	else playerFrameX = 0;
	}else{
		speedPipes = -2;
		drawSprite(birdImages1.player, playerWidth * playerFrameX,
               playerHeight * playerFrameY, playerWidth, playerHeight,
               playerX, playerY, playerWidth, playerHeight);
	if(playerFrameX < 2) playerFrameX ++;
	else playerFrameX = 0;
	}



}



window.addEventListener('resize', function(){
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
});


var myTimer = window.setInterval(animate, speedVar);

function collision(){
	
  console.log("teste");
  fly.muted = true;
  const list = document.getElementById("remove");
  list.removeChild(list.firstElementChild);
  document.getElementById("start-screen").style.display = "block";
 
  return;
}

function interval() {
   const list = document.getElementById("remove");
  list.removeChild(list.firstElementChild);

  //myGameArea.start();
}
function fall(){

	//var myTimer2 = window.setInterval(fall, speedVar);
     playerY += gravity * 6;
}














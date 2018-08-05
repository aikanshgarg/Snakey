const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32; // px by default

// load the images
const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png"

// load the audio
let dead = new Audio();
dead.src = "dead.mp3"

 let up = new Audio();
 up.src = "up.mp3"

let down = new Audio();
down.src = "down.mp3"

let right = new Audio();
right.src = "right.mp3"

let left = new Audio();
left.src = "left.mp3"

let eat = new Audio();
eat.src = "eat.mp3"


// create the snake
let snake = [];
snake[0] = { // initialise the snake
	x : 9*box ,
	y : 10*box 
}

// create the food
let food = {
	x : Math.floor( Math.random()*17 + 1 ) * box ,
	y : Math.floor( Math.random()*15 + 3 ) * box
}

// create the score var
let score = 0;

// control the snake
document.addEventListener("keydown", direction);

var d;
function direction(event) {
	if (event.keyCode == 37 && d != "RIGHT"){
		d = "LEFT";
		left.play();
	}
	if (event.keyCode == 38 && d != "DOWN"){
		d = "TOP";
	    up.play();
	}
	if (event.keyCode == 39 && d != "LEFT"){
		d = "RIGHT";
		right.play();
	}
	if (event.keyCode == 40 && d != "TOP"){
		d = "DOWN";
		down.play();
	}
}

function collision(head, array) { // checks if snake collides with itself
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i].x == head.x && array[i].y == head.y)
			return true;
	}
	return false;
}

//------------------------------------------------------------------------------------------------
// draw everything on canvas
function draw() {

	ctx.drawImage(ground, 0, 0); // draw ground (image, x, y)

	for (var i = 0; i < snake.length; i++) { // draw the snake
		
		ctx.fillStyle = (i === 0) ? "green" : "white";
		ctx.fillRect(snake[i].x, snake[i].y, box, box); // x-pos, y-pos, width, height

		ctx.strokeStyle = "maroon";
		ctx.strokeRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.drawImage(foodImg, food.x, food.y); // draw the food

	// old head position
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// moving the snake
	if(d === "LEFT") snakeX -= box;
	if(d === "TOP") snakeY -= box;
	if(d === "RIGHT") snakeX += box;
	if(d === "DOWN") snakeY += box;

	// if snake eats the food, increment array size
	if (snakeY === food.y && snakeX === food.x) {
		score++;
		eat.play();
		food = {
	x : Math.floor( Math.random()*17 + 1 ) * box ,
	y : Math.floor( Math.random()*15 + 3 ) * box
}
	} else {
	// remove the tail
	snake.pop();
	}

	// add new head 
	var newHead = {
		x : snakeX,
		y : snakeY
	}

	// checking game over conditions, just before adding new head
	if (snakeX < 1*box || snakeX > 17*box || snakeY > 17*box || snakeY < 3*box || collision(newHead, snake)) {
		dead.play();
		clearInterval(game);
		document.querySelector("#restart").style.display = "block";
	}

	// unshift the head(add box element at 0th index of snake array)
	snake.unshift(newHead);

   // updating score
	ctx.font = '45px "Changa one"';
	ctx.fillStyle = "white";
	ctx.fillText(score, 2*box, 1.6*box);
	
}

//------------------------------------------------------------------------------------------------

let game = setInterval(draw, 100); // function called every 100 ms

function restart(){
	location.reload();
}
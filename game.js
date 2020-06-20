CELLS = 20;
window.addEventListener("load", function() {
	game.init();
});

var game =  {
	init:function()
	{
		game.canvas = document.getElementById("canvas");
		game.context = game.canvas.getContext("2d");
		game.score = 0;
		game.snake = [ {x: parseInt(CELLS / 2),
						y: parseInt(CELLS / 2)}
					 ];
		keyboard.init();
		game.lives = 3;
		game.animate();
		game.size = game.canvas.width / CELLS;
		game.speed = 60;
		game.time = new Date().getTime();
		game.dt = 0;
		game.pressed = true;
		game.reset();
	},
	reset:function()
	{
		let score = document.getElementsByClassName("innerScoreText")[0];
		game.dir = 1;
		game.snake = [];
		game.snake = [{
			x: parseInt(CELLS / 2),
			y: parseInt(CELLS / 2)
		}];
		game.setFood();
		score.textContent = 0;
	},
	setFood:function() 
	{
		game.food = undefined;
		while (game.food == undefined)
		{
			flag = false;
			var x = parseInt(Math.random() * CELLS);
			var y = parseInt(Math.random() * CELLS);
			for(let n = 0; n < game.snake.length; n++)
			{
				if (game.snake[n].x == x && game.snake[n].y == y)
				{
					flag = true;
					break;
				}
			}
			if (flag == true)
				continue;
			game.food = {posX:x, posY: y}
		}
	},
	gameGetTime:function()
	{
		var t = new Date().getTime();
		game.dt = game.dt + t - game.time;
		game.time = t;

	},

	animate:function()
	{
		animateId = requestAnimationFrame(game.animate);
		game.gameGetTime();
		if (game.dt > game.speed)
		{	
			game.update();
			game.render();
			game.dt = 0;
			game.pressed = false;
		}
	},

	update:function()
	{
		var head = game.snake[0];

		for (let i = game.snake.length - 1; i > 0; i--)
		{
			game.snake[i].x = game.snake[i - 1].x;
			game.snake[i].y = game.snake[i - 1].y;
		}
		if (game.dir == 1)
			head.y -= 1;
		if (game.dir == 2)
			head.x += 1;
		if (game.dir == 3)
			head.y += 1;
		if (game.dir == 4)
			head.x -= 1;

		if (head.x > CELLS - 1)
			head.x = 0;
		if (head.x < 0)
			head.x = CELLS - 1;
		if (head.y > CELLS - 1)
			head.y = 0;
		if (head.y < 0)
			head.y = CELLS - 1;

		for (let n = 1; n < game.snake.length; n++)
		{
			if (head.x == game.snake[n].x && head.y == game.snake[n].y)
			{
				console.log("hola");
				game.reset();
			}
		}

		if (head.x == game.food.posX && head.y == game.food.posY)
		{
			let score = document.getElementsByClassName("innerScoreText")[0];
			game.setFood();
			game.snake.push({x:game.snake[game.snake.length - 1].x, y:game.snake[game.snake.length - 1]});
			score.textContent = game.snake.length - 1;
			console.log(game.snake.length);
		}
	},
	render:function()
	{
		var x = 0, y = 0;
		game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
		for (let n = 0; n <= CELLS * CELLS; n++)
		{
			drawSquare(game.context, x, y, game.size);
			x += game.size;
				if (x >= game.canvas.width)
			{	x = 0;
				y += game.size; }
			if (y >= game.canvas.height)
				y = 0;
		}
		for (let n = 0; n < game.snake.length; n++)
			fillSquare(game.context, parseInt(game.snake[n].x) * game.size, parseInt(game.snake[n].y) * game.size, game.size, "#EE0045");
		fillSquare(game.context, game.food.posX * game.size, game.food.posY * game.size, game.size, "#232E21");
	}
}

function drawSquare(context, x, y, size) {
	game.context.beginPath();
	game.context.rect(x, y, game.size, game.size);
	game.context.strokeStyle = "#F4F1BB";
	game.context.stroke();

}
function fillSquare(context, x, y, size, color) {
	game.context.beginPath();
	game.context.rect(x, y, game.size, game.size);
	game.context.fillStyle = color;
	game.context.fill();

}

function clear_canvas(){
	var objects = document.getElementsByClassName("b");
	var myCanvas = document.getElementById("canvas");
	var subCont = document.getElementById("sub-cont");
	var scoreCont = document.getElementsByClassName("score-cont");
	scoreCont[0].style.display = "block";
	subCont.style.display = "none";
	myCanvas.style.display = "block";
	objects[0].style.display = "none";
}
var keyboard = {
	
	init: function(){
		window.addEventListener('keydown', keyboard.keydownhandler);
	},
	
	keydownhandler: function(ev){
		if(ev.keyCode == 37 && game.dir != 2 && !game.pressed)
		{
			game.dir = 4;
			game.pressed = true;
		}
		else if(ev.keyCode == 38 && game.dir != 3 && !game.pressed)
		{
			game.dir = 1;
			game.pressed = true;
		}
		else if(ev.keyCode == 39 && game.dir != 4 && !game.pressed)
		{
			game.dir = 2;
			game.pressed = true;
		}
		else if(ev.keyCode == 40 && game.dir != 1 && !game.pressed)
		{
			game.dir = 3;
			game.pressed = true;
		}
	},	
}
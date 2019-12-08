var trumpW, trumpH, sourceX = 0, sourceY = 0;
var canvas;
var context;
var image;
var trump_s;
var x, y;
var dt = 0, time;
function pageLoaded()
{	
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	image = document.getElementById("air");
	trumpS = document.getElementById("trump_sprite");
	y = canvas.height / 2;
	x = 0;
	time = new Date().getTime();

	trumpW = trumpS.width, trumpH = trumpS.height;
	drawingLoop();
}
function drawingLoop(now)
{
	var t = new Date().getTime();
	dt += (t - time);
	var gameLoop = requestAnimationFrame(drawingLoop);
	time = t;
	console.log(dt);
	if (dt > 60)
	{
		dt = 0;
		context.clearRect(0, 0, canvas.width, canvas.height);
		if (sourceX >= trumpW - trumpW / 6)
		{
			sourceX = 0;
			sourceY += trumpH / 4;
			if (sourceY >= trumpH)
				sourceY = 0, sourceX = 0;
		}
		context.drawImage(trumpS, sourceX, sourceY, trumpW / 6, trumpH / 4, x, y, 100, 100);
		sourceX = sourceX + trumpW / 6;
	}
	if (x >= canvas.width)
		x = - (trumpW / 6) - 3;
	x += 1;	
}
function rotation(context, image, x, y)
{
	context.translate(x, y);
	context.rotate(Math.PI / 2);
	context.drawImage(image, 0, 0, 100, 100);
	context.rotate(-(Math.PI / 2));
	context.translate(-x, -y);
}

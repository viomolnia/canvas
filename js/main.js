var canvWidth = 700;
var canvHeight = 500;

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var clickColor = new Array();
var paint;

var colorPurple = "#cb3594";
var colorGreen = "#659b41";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";

var curColor = colorYellow;

var outlineImage = new Image();
outlineImage.src = "pics/cat.png";

var outlineImage1 = new Image();
outlineImage1.src = "pics/1.png";

var outlineImage2 = new Image();
outlineImage2.src = "pics/2.png";

var outlineImage3 = new Image();
outlineImage3.src = "pics/3.png";

var outlineImage4 = new Image();
outlineImage4.src = "pics/4.png";

context = document.getElementById('canvas').getContext("2d");
var curImage = outlineImage;

window.onload = function() {
  context.drawImage(curImage, 0, 0, canvWidth, canvHeight);
  context.strokeStyle = colorYellow;
  context.stroke();
}

$('#canvas').mousedown(function(e){
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e){
  if(paint){
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e){
  paint = false;
});

$('#canvas').mouseleave(function(e){
  paint = false;
});

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  /*context.strokeStyle = "#df4b26";*/
  context.lineJoin = "round";
  context.lineWidth = 5;

  for(var i=0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i], clickY[i]-1);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
	 context.strokeStyle = clickColor[i];
     context.stroke();
  }

  context.drawImage(curImage, 0, 0, canvWidth, canvHeight);
  console.log("current img" + curImage.src);
}

function clear() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.drawImage(curImage, 0, 0, canvWidth, canvHeight);
  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
}

$('#clear').click(function(e){
  clear();
});

$('#yellow').click(function(e){
  curColor = colorYellow;
});

$('#green').click(function(e){
  curColor = colorGreen;
});

$('#purple').click(function(e){
  curColor = colorPurple;
});

$('#brown').click(function(e){
  curColor = colorBrown;
});

$('#cat').click(function(e){
  clear();
  curImage = outlineImage;
  setImage(outlineImage);
});

$('#pic1').click(function(e){
  clear();
  curImage = outlineImage1;
  setImage(outlineImage1);
});

$('#pic2').click(function(e){
  clear();
  curImage = outlineImage2;
  setImage(outlineImage2);
});

$('#pic3').click(function(e){
  clear();
  curImage = outlineImage3;
  setImage(outlineImage3);
});

$('#pic4').click(function(e){
  clear();
  curImage = outlineImage4;
  setImage(outlineImage4);
});

function setImage(img) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  context.drawImage(img, 0, 0, canvWidth, canvHeight);
}

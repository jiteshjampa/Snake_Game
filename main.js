

function init()
{
    w=document.getElementById("mycanvas");
W=w.width=1000;
H=w.height=1000;
pen=w.getContext('2d');
cs=67;
game_over=false;
food_img=new Image();
trophy=new Image();
trophy.src="trophy.png";
food_img.src="apple.png";
score=5;
food=getRandomFood();
snake={
    init_len:5,
    color:"blue",
    cells:[],
    direction:"right",
    createSnake:function()
    {
        for(var i=this.init_len;i>0;i--)
        {
            this.cells.push({x:i,y:0});
        }
    },
    drawSnake:function()
    {
        for(var i=0;i<this.cells.length;i++)
        {
            pen.fillStyle=this.color;
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
        }
    },
    updateSnake:function(){

var headX=this.cells[0].x;
var headY=this.cells[0].y;
if(headX==food.x && headY==food.y)
{
    food=getRandomFood();
    score++;
}
else{
    this.cells.pop();
}
var nextx,nexty;
if(this.direction=="right")
{
    nextx=headX+1;
    nexty=headY;
}
else if(this.direction=="left")
{
    nextx=headX-1;
    nexty=headY;
}
else if(this.direction=="down")
{
    nextx=headX;
    nexty=headY+1;
}
else if(this.direction=="up")
{
    nextx=headX;
    nexty=headY-1;
}
this.cells.unshift({x:nextx,y:nexty});
var last_x=Math.round(W/cs);
var last_y=Math.round(H/cs);
if(this.cells[0].x<0|| this.cells[0].y<0 || this.cells[0].x>last_x || this.cells[0].y>last_y)
{
    game_over=true;
}
    }
};

snake.createSnake();
function keyPressed(e)
{
if(e.key=="ArrowRight")
{
snake.direction="right";
}
else if(e.key=="ArrowLeft")
{
    snake.direction="left";
}
else if(e.key=="ArrowDown")
{
    snake.direction="down";
}
else{
    snake.direction="up";
}
console.log(snake.direction);
}
document.addEventListener('keydown',keyPressed);
}
function draw()
{    
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=food.color;
    pen.drawImage(trophy,18,20,cs,cs);
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle="blue";
    pen.font="20px Roboto ";
    pen.fillText(score,50,50);
}
function update()
{
    snake.updateSnake();
}
function getRandomFood()
{
    var foodx=Math.round(Math.random()*(W-cs)/cs);
    var foody=Math.round(Math.random()*(H-cs)/cs);
    var food={
        x:foodx,
        y:foody,
        color:'red',

    }
    return food;
}
function gameloop()
{
    if(game_over==true)
    {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}
init();
var f=setInterval(gameloop,100);

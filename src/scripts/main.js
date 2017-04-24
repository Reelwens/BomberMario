var bomber = {};
bomber.board = new Array();
bomber.player = {};
bomber.game = {};
bomber.bombes = [];

for(var i = 0; i < 10; i++)
{
	bomber.board[i] = new Array();
	for(var j = 0; j < 10; j++)
	{
		bomber.board[i][j] = 0;
	}
}

console.log(bomber.board);

function display_array()
{
	var tab = document.createElement("table");
	for(var i = 0; i < 10; i++)
	{
		var tr = document.createElement("tr");
		for(var j = 0; j < 10; j++)
		{
			var td = document.createElement("td");
			td.classList.add("case-" + i + "-" + j);
			tr.appendChild(td);
		}
		tab.appendChild(tr);
	}
	document.body.appendChild(tab);
	bomber.game = tab;
}

display_array();	

var player = function()
{
	this.posX = 3;
	this.posY = 5;
	this.bombe_type = 1;
	this.speed = 100;
	this.personnage = {};
	this.cross = [122, 115, 113, 100]; //z, s, q, d

	this.display = function()
	{
		this.personnage = document.createElement("p");
		this.personnage.classList.add("player");
		var text = document.createTextNode("8");
		this.personnage.appendChild(text);
		document.body.querySelector(".case-" + this.posX + "-" + this.posY).appendChild(this.personnage);
	}

	this.remove_player = function()
	{
		this.personnage.remove();	
	}

	this.move = function()
	{
		var that = this;
		window.addEventListener("keypress", function(e){
			pressKey = e.keyCode;
			if(pressKey == 122) //Z
			{
				if(that.posX != 0) that.posX--;
			}
			else if(pressKey == 115) //S
			{
				if(that.posX != 9) that.posX++;
			}
			else if(pressKey == 113) //Q
			{
				if(that.posY != 0) that.posY--;
			}
			else if(pressKey == 100) //D
			{
				if(that.posY != 9) that.posY++;
			}
			else if(pressKey == 98) //B
			{
				that.pose_bombe();
			}
			that.remove_player();
			that.display();
		});
	}

	this.pose_bombe = function()
	{
		var newBombe = new bombe(this.posX, this.posY, this.bombe_type);
		bomber.bombes.push(newBombe);
		newBombe.display();
		newBombe.remove_bombe();
		console.log(bomber.bombes);
		console.log(this);
	}
}

var bombe = function(posX, posY, type)
{
	this.posX = posX;
	this.posY = posY;
	this.type = type;
	this.porte = 2;
	this.bombe_dis = {};
	this.explosion = [];

	this.display = function()
	{
		this.bombe_dis = document.createElement("div");
		var text = document.createTextNode("[B]");
		this.bombe_dis.appendChild(text);
		document.body.querySelector(".case-" + this.posX + "-" + this.posY).appendChild(this.bombe_dis);
	}

	this.remove_bombe = function(){
		var that = this;
		setTimeout(function(){
			that.bombe_dis.remove();
			if(that.posX == 0 && that.posY == 0) // top right border
			{
				for(var i = 1; i <= that.porte; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX+i) + "-0").appendChild(fire);
					that.explosion.push(fire);
				}
				for(var j = 1; j <= that.porte; j++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("-");
					fire.appendChild(text);
					document.body.querySelector(".case-0-"+ (that.posY+j)).appendChild(fire);
					that.explosion.push(fire);
				}
			} else if(that.posX == 0 && that.posY == bomber.board.length-1) // Top left border
			{
				for(var i = 1; i <= that.porte; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX+i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}
				for(var j = 1; j <= that.porte; j++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("-");
					fire.appendChild(text);
					document.body.querySelector(".case-0-"+ (that.posY-j)).appendChild(fire);
					that.explosion.push(fire);
				}
			}
		}, 1000);
	}
}

var test = new player();
test.display();
test.move();
//console.log(test.personnage);
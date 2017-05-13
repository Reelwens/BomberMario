var bomber = {}; //object
bomber.board = new Array(); //valeur de chaque case
bomber.player = {}; //joueur
bomber.game = {}; // grille
bomber.bombes = []; //bombes

// insertion des valeurs 0 dans le tableau (grille)
for(var i = 0; i < 10; i++)
{
	bomber.board[i] = new Array();
	for(var j = 0; j < 10; j++)
	{
		bomber.board[i][j] = 0;
	}
}

console.log(bomber.board);

//création de la grille de jeu
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

//création de la classe player
var player = function()
{
	this.posX = 3;
	this.posY = 5;
	this.bombe_type = 1;
	this.speed = 100;
	this.personnage = {};
	this.cross = [122, 115, 113, 100]; //z, s, q, d (permet le déplacement du perso)

    //création du perso et position sur la grille
	this.display = function()
	{
		this.personnage = document.createElement("p");
		this.personnage.classList.add("player");
		var text = document.createTextNode("8");
		this.personnage.appendChild(text);
		document.body.querySelector(".case-" + this.posX + "-" + this.posY).appendChild(this.personnage);
	}

    // supprimer le perso
	this.remove_player = function()
	{
		this.personnage.remove();	
	}

    // déplacement du perso suivant les touches Z, S, Q, D et pose de bombe avec la touche B
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
            //réinitialisation de la position du perso
			that.remove_player();
			that.display();
		});
	}

    
	this.pose_bombe = function()
	{
        
		var newBombe = new bombe(this.posX, this.posY, this.bombe_type);
        // création d'une bombe supplémentaire dans le tableau
		bomber.bombes.push(newBombe);
		newBombe.display();
		newBombe.remove_bombe();
		console.log(bomber.bombes);
		console.log(this);
	}
}

// création de la classe bombe
var bombe = function(posX, posY, type)
{
	this.posX = posX;
	this.posY = posY;
	this.type = type;
	this.porte = 2; //portée de l'explosion de la bombe
	this.bombe_dis = {};
	this.explosion = [];

    //création de la bombe dans le DOM
	this.display = function()
	{
		this.bombe_dis = document.createElement("div");
		var text = document.createTextNode("[B]");
		this.bombe_dis.appendChild(text);
		document.body.querySelector(".case-" + this.posX + "-" + this.posY).appendChild(this.bombe_dis);
	}

    // mise en place de l'explosion de la bombe
	this.remove_bombe = function(){
		var that = this;
        
        // durée de l'explosion et forme de la flamme suivant l'emplacement de la bombe
		setTimeout(function(){
			that.bombe_dis.remove();
            
            // si la bombe n'est sur aucun bord
            if (that.posX != 0 && that.posX != bomber.board.length-1 && that.posY != 0 && that.posY != bomber.board.length-1)
            {
                for(var i = 1; i <= that.porte; i++)
                {
                    var fireTop = document.createElement("div");
                    var textTop = document.createTextNode("|");
                    fireTop.appendChild(textTop);
                    document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fireTop);
                    that.explosion.push(fireTop);

                    var fireBottom = document.createElement("div");
                    var textBottom = document.createTextNode("|");

                    fireBottom.appendChild(textBottom);
                    document.body.querySelector(".case-" + (that.posX+i) + "-" + that.posY).appendChild(fireBottom);
                    that.explosion.push(fireBottom);
                }

                for(var j = 1; j <= that.porte; j++)
                {
                    var fireRight = document.createElement("div");
                    var textRight = document.createTextNode("-");
                    fireRight.appendChild(textRight);
                    document.body.querySelector(".case-"+that.posX+"-"+ (that.posY+j)).appendChild(fireRight);
                    that.explosion.push(fireRight);

                    var fireLeft = document.createElement("div");
                    var textLeft = document.createTextNode("-");
                    fireLeft.appendChild(textLeft);
                    document.body.querySelector(".case-"+that.posX+"-"+ (that.posY-j)).appendChild(fireLeft);
                    that.explosion.push(fireLeft);
                }   
            }
            
            // étude de l'explosion de la bombe pour le bord haut
            else if(that.posX == 0 && that.posY != 0 && that.posY != bomber.board.length-1) // Top border
			{
                console.log('top');
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
					var fireRight = document.createElement("div");
                    var textRight = document.createTextNode("-");
                    fireRight.appendChild(textRight);
                    document.body.querySelector(".case-"+ that.posX +"-"+ (that.posY+j)).appendChild(fireRight);
                    that.explosion.push(fireRight);

                    var fireLeft = document.createElement("div");
                    var textLeft = document.createTextNode("-");
                    fireLeft.appendChild(textLeft);
                    document.body.querySelector(".case-"+ that.posX +"-"+ (that.posY-j)).appendChild(fireLeft);
                    that.explosion.push(fireLeft);
				}
			}
            
            //étude de l'explosion de la bombe pour le coin haut gauche
			else if(that.posX == 0 && that.posY == 0) // top left border
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
					document.body.querySelector(".case-" + that.posX + "-"+ (that.posY+j)).appendChild(fire);
					that.explosion.push(fire);
				}
			} 
            
            // étude de l'explosion de la bombe pour le coin haut droite
            else if(that.posX == 0 && that.posY == bomber.board.length-1) // Top right border
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
					document.body.querySelector(".case-" + that.posX + "-"+ (that.posY-j)).appendChild(fire);
					that.explosion.push(fire);
				}
			}
            
            // étude de l'explosion de la bombe pour le bord droite
            else if(that.posY == bomber.board.length-1 && that.posX != 0 && that.posX != bomber.board.length-1) // Right border
			{
				for(var i = 1; i <= that.porte; i++)
				{
					var fireTop = document.createElement("div");
                    var textTop = document.createTextNode("|");
                    fireTop.appendChild(textTop);
                    document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fireTop);
                    that.explosion.push(fireTop);

                    var fireBottom = document.createElement("div");
                    var textBottom = document.createTextNode("|");

                    fireBottom.appendChild(textBottom);
                    document.body.querySelector(".case-" + (that.posX+i) + "-" + that.posY).appendChild(fireBottom);
                    that.explosion.push(fireBottom);
				}
                
                for(var j = 1; j <= that.porte; j++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("-");
					fire.appendChild(text);
					document.body.querySelector(".case-" + that.posX + "-"+ (that.posY-j)).appendChild(fire);
					that.explosion.push(fire);
				}
			}
            
            // étude de l'explosion de la bombe pour le coin bas droite
            else if(that.posX == bomber.board.length-1 && that.posY == bomber.board.length-1) // Bottom right border
			{
                console.log('bas droite');
				for(var i = 1; i <= that.porte; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}
				for(var j = 1; j <= that.porte; j++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("-");
					fire.appendChild(text);
					document.body.querySelector(".case-" + that.posX + "-"+ (that.posY-j)).appendChild(fire);
					that.explosion.push(fire);
				}
			}
            
            // étude de l'explosion de la bombe pour le coin bas gauche
            else if(that.posX == bomber.board.length-1 && that.posY == 0) // Bottom right border
			{
                console.log('bas droite');
				for(var i = 1; i <= that.porte; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}
				for(var j = 1; j <= that.porte; j++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("-");
					fire.appendChild(text);
					document.body.querySelector(".case-" + that.posX + "-"+ (that.posY+j)).appendChild(fire);
					that.explosion.push(fire);
				}
			}
            
            // étude de l'explosion de la bombe pour le bord haut
            else if(that.posX == bomber.board.length-1) // Bottom border
			{
                console.log('top');
				for(var i = 1; i <= that.porte; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}
                for(var j = 1; j <= that.porte; j++)
				{
					var fireRight = document.createElement("div");
                    var textRight = document.createTextNode("-");
                    fireRight.appendChild(textRight);
                    document.body.querySelector(".case-"+that.posX+"-"+ (that.posY+j)).appendChild(fireRight);
                    that.explosion.push(fireRight);

                    var fireLeft = document.createElement("div");
                    var textLeft = document.createTextNode("-");
                    fireLeft.appendChild(textLeft);
                    document.body.querySelector(".case-"+that.posX+"-"+ (that.posY-j)).appendChild(fireLeft);
                    that.explosion.push(fireLeft);
				}
			}
            
            // étude de l'explosion de la bombe pour le bord droite
            else if(that.posY == 0) // Right border
			{
				for(var i = 1; i <= that.porte; i++)
				{
					var fireTop = document.createElement("div");
                    var textTop = document.createTextNode("|");
                    fireTop.appendChild(textTop);
                    document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fireTop);
                    that.explosion.push(fireTop);

                    var fireBottom = document.createElement("div");
                    var textBottom = document.createTextNode("|");

                    fireBottom.appendChild(textBottom);
                    document.body.querySelector(".case-" + (that.posX+i) + "-" + that.posY).appendChild(fireBottom);
                    that.explosion.push(fireBottom);
				}
                
                for(var j = 1; j <= that.porte; j++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("-");
					fire.appendChild(text);
					document.body.querySelector(".case-" + that.posX + "-"+ (that.posY+j)).appendChild(fire);
					that.explosion.push(fire);
				}
			}
            
		}, 2000);
	}
}

var test = new player();
test.display();
test.move();
//console.log(test.personnage);
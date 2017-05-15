// classe player


bomber.player = function()
{
	this.posX = 1;
	this.posY = 1;
	this.bombe_type = 1;
	this.speed = 100;
	this.personnage = {};
	this.dirrection = 0;
	this.cross = [122, 115, 113, 100, 98]; //z, s, q, d (permet le déplacement du perso)

	//création du perso et position sur la grille
	this.display = function()
	{
		this.personnage = document.createElement("div");
		this.personnage.classList.add("player");
		var text = document.createTextNode("8");
		this.personnage.appendChild(text);
		document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.personnage);
	}

	// supprimer le perso
	this.remove_player = function()
	{
		this.personnage.remove();
	}

	//Check if it's possible to move in this dirrection
	this.get_possibility = function()
	{
		if(this.dirrection == 0) // go Top
		{
			if(parseInt(this.posX-1) != 0)
			{
				if(new_map.game[ parseInt(this.posX-1)][ parseInt(this.posY)] == 1)
				{
					this.posX--;
				}
			}
		}
		else if(this.dirrection == 1) // go Bottom
		{
			if(parseInt(this.posX+1) != new_map.length_array-1)
			{
				if(new_map.game[ parseInt(this.posX+1)][ parseInt(this.posY)] == 1)
				{
					this.posX++;
				}
			}
		}
		else if(this.dirrection == 2) // go Left
		{
			console.log("posY - 1= " + parseInt(this.posY-1));
			if(parseInt(this.posY-1) != 0)
			{
				console.log("value = " + new_map.game[parseInt(this.posX)][parseInt(this.posY-1)]);
				if(new_map.game[ parseInt(this.posX)][ parseInt(this.posY-1)] == 1)
				{
					this.posY--;
				}
			}
		}
		else if(this.dirrection == 3) // go Right
		{
			if(parseInt(this.posY+1) != new_map.length_array-1)
			{
				if(new_map.game[ parseInt(this.posX)][ parseInt(this.posY+1)] == 1)
				{
					this.posY++;
				}
			}
		}
	}

	// déplacement du perso suivant les touches Z, S, Q, D et pose de bombe avec la touche B
	this.move = function()
	{
		var that = this;
		window.addEventListener("keypress", function(e){
			pressKey = e.keyCode;
			if(pressKey == that.cross[0]) //Z
			{
				that.dirrection = 0;
				that.get_possibility();
			}
			else if(pressKey == that.cross[1]) //S
			{
				that.dirrection = 1;
				that.get_possibility();
			}
			else if(pressKey == that.cross[2]) //Q
			{
				that.dirrection = 2;
				that.get_possibility();
			}
			else if(pressKey == that.cross[3]) //D
			{
				that.dirrection = 3;
				that.get_possibility();
			}
			else if(pressKey == that.cross[4]) //B
			{
				that.pose_bombe();
			}
			//réinitialisation de la position du perso
			that.remove_player();
			that.display();
		});
	}

	//
		this.pose_bombe = function()
		{
	
			var newBombe = new bomber.bombe(this.posX, this.posY, this.bombe_type);
	        // création d'une bombe supplémentaire dans le tableau
			bomber.all_bombs.push(newBombe);
			newBombe.display();
//			newBombe.remove_bombe();
			console.log(bomber.all_bombs);
			console.log(this);
		}
}

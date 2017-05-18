// classe player


bomber.player = function(id, posX=1, posY=1)
{
	this.id = id; // possition of the player in new player array
	this.type = "player";
	this.posX = posX; // Indice in Vertical
	this.posY = posY; // Indice in Horrizontal
	this.is_alive = true; // Player Status
	this.personnage = {}; //Html element of the player
	this.dirrection = 0; //Current dirrection of the player 
	this.cross = [122, 115, 113, 100, 98]; //z, s, q, d (Permit player to move)

	this.bombe_reach = 1; // Reach of the bomb
	this.bombe_timer = 1; // Timer of the bomb
	this.bomb_limit = 1; // Limit of the bomb the player can pose

	//création du perso et position sur la grille
	this.display = function()
	{
		this.personnage = document.createElement("div");
		this.personnage.classList.add("player");
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
			if(this.posX-1 != 0)
			{
				if(new_map.game[this.posX-1][this.posY] == 1)
				{
					if(this.check_bomb()) this.posX--;
				}
			}
		}
		else if(this.dirrection == 1) // go Bottom
		{
			if(this.posX+1 != new_map.length_array-1)
			{
				if(new_map.game[this.posX+1][this.posY] == 1)
				{
					if(this.check_bomb()) this.posX++;
				}
			}
		}
		else if(this.dirrection == 2) // go Left
		{
			if(this.posY-1 != 0)
			{
				if(new_map.game[this.posX][this.posY-1] == 1)
				{
					if(this.check_bomb()) this.posY--;
				}
			}
		}
		else if(this.dirrection == 3) // go Right
		{
			if(this.posY+1 != new_map.length_array-1)
			{
				if(new_map.game[this.posX][this.posY+1] == 1)
				{
					if(this.check_bomb()) this.posY++;
				}
			}
		}
	}

	// déplacement du perso suivant les touches Z, S, Q, D et pose de bombe avec la touche B
	this.move = function()
	{
		var that = this;
		window.addEventListener("keypress", function(e){
			if(that.is_alive)
			{
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
			}
		});
	}

	this.check_bomb = function(){
		if(new_bomb.length == 0) return true;
		else if(this.dirrection == 0)
		{
			for(var i = 0; i < new_bomb.length; i++)
			{
				if((this.posX-1 != new_bomb[i].posX) || (this.posY != new_bomb[i].posY)) return true;
			}
		}
		else if(this.dirrection == 1)
		{
			for(var i = 0; i < new_bomb.length; i++)
			{
				if((this.posX+1 != new_bomb[i].posX) || (this.posY != new_bomb[i].posY)) return true;
			}
		}
		else if(this.dirrection == 2)
		{
			for(var i = 0; i < new_bomb.length; i++)
			{
				if((this.posX != new_bomb[i].posX) || (this.posY-1 != new_bomb[i].posY)) return true;
			}
		}
		else if(this.dirrection == 3)
		{
			for(var i = 0; i < new_bomb.length; i++)
			{
				if((this.posX != new_bomb[i].posX) || (this.posY+1 != new_bomb[i].posY)) return true;
			}
		}
		else return false;
	}

	//
	this.pose_bombe = function()
	{

		if(this.bomb_limit > 0)
		{
			var length_array  = new_bomb.length;
			new_bomb[length_array] = new bomber.bombe(id, this.posX, this.posY, this.bombe_reach, 1, this.bombe_timer); //posX, posY, reach, power, timeOut
			this.bombe_x = this.posX;
			this.bombe_y = this.posY;
			new_bomb[length_array].display();
			new_bomb[length_array].remove_bombe();

			this.bomb_limit--;
			
			id++;

			var that = this;
			setTimeout(function(){
				that.bombe_x = 0;
				that.bombe_y = 0;
				that.bomb_limit++;
			}, this.bombe_timer*1000);
		}
	}
}

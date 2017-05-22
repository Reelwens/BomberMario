// classe player


bomber.bot = function(id, posX=1, posY=1)
{
	this.id = id; //position in new_player array
	this.type = "bot"; // Type of this object
	this.posX = posX; // Indice in Vertical
	this.posY = posY; // Indice in Horrizontal
	this.is_alive = true; // Player Status
	this.personnage = {}; //Html element of the player 
	this.dirrection = 0; //Current dirrection of the player
	this.t = 300; // number of millisecon for bot reaction
	this.safe_cases = [];
	this.safe_path = [];

	this.bomb_reach = 1; // Reach of the bomb
	this.bomb_timer = 1; // Timer of the bomb
	this.bomb_limit = 1; // Limit of the bomb the player can pose
	this.bomb_limit_max = this.bomb_limit;
	this.bomb_x;
	this.bomb_y;

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
					if(this.check_bomb()) {
						this.posX--;
						return false;
					}
				}
			}
		}
		else if(this.dirrection == 1) // go Bottom
		{
			if(this.posX+1 != new_map.length_array-1)
			{
				if(new_map.game[this.posX+1][this.posY] == 1)
				{
					if(this.check_bomb()) {
						this.posX++;
						return false;
					}
				}
			}
		}
		else if(this.dirrection == 2) // go Left
		{
			if(this.posY-1 != 0)
			{
				if(new_map.game[this.posX][this.posY-1] == 1)
				{
					if(this.check_bomb()) {
						this.posY--;
						return false;
					}
				}
			}
		}
		else if(this.dirrection == 3) // go Right
		{
			if(this.posY+1 != new_map.length_array-1)
			{
				if(new_map.game[this.posX][this.posY+1] == 1)
				{
					if(this.check_bomb()) {
						this.posY++;
						return false;
					}
				}
			}
		}
		else if(this.dirrection > 3) 
		{
			this.pose_bomb();
			return false;
		}
		return true;
	}

	// déplacement du perso suivant les touches Z, S, Q, D et pose de bomb avec la touche B
	this.move = function()
	{
		var that = this;
		if(this.is_alive == true)
		{
			if(this.bomb_limit < this.bomb_limit_max)
			{
				this.run_away();
			}
			else{
				do
				{
					this.dirrection = get_random(0, 5); // Choose his direction.
					//run away
				}
				while(this.get_possibility());
			}
			this.remove_player();
			that.display();
			that.check_bonus();
			setTimeout(function(){
				that.move();
			}, that.t);
		}
	}

	this.run_away = function()
	{
		if(this.safe_cases.length == 0)
		{
			var start_check_1 = this.bomb_reach+1;
			var start_check_2 = 0-(this.bomb_reach+1);
			var indice = 0;
			for(let i = start_check_2; i <= start_check_1; i++)
			{
				for(let j = start_check_2; j <= start_check_1; j++)
				{
					var x = parseInt(this.posX - i);
					var y = parseInt(this.posY - j);
					if((x >= 0) && (y >= 0))
					{
						if((x < (new_map.game.length-1)) && (y < (new_map.game.length-1)))
						{
							if((x != this.bomb_x) || (y != this.bomb_y))
							{
								if(new_map.game[x][y] == 1)
								{
									this.safe_cases[indice] = [x, y];
									indice++;
								}
							}
						}
					}
				}
			}
			this.choose_path();
			console.log(this.safe_cases);
		}
	}
	
	this.choose_path = function()
	{
		var all_possibility = [[(this.posX -1), this.posY], [this.posX, (this.posY -1)], [(this.posX +1), this.posY], [this.posX, (this.posY +1)]];
		for(let i = 0; i < 4; i++)
		{
			if() all_possibility.splice(i, 1);
		}
		console.log(all_possibility);
		var rand = get_random(0, all_possibility.length);
		this.posX = all_possibility[rand][0];
		this.posY = all_possibility[rand][1];
		this.remove_player();
		this.display();
	}

	// Check if there is a bomb in next case
	this.check_bomb = function(){
		if(new_bomb.length == 0) return true; // if no bomb on the map
		else if(this.dirrection == 0) //
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
		else if(this.dirrection == 4) this.pose_bomb();
		else return false;
	}

	//
	this.pose_bomb = function()
	{

		if(this.bomb_limit > 0)
		{
			var length_array  = new_bomb.length;
			new_bomb[length_array] = new bomber.bomb(id, this.posX, this.posY, this.bomb_reach, 1, this.bomb_timer); //posX, posY, reach, power, timeOut
			this.bomb_x = this.posX;
			this.bomb_y = this.posY;
			new_bomb[length_array].display();
			new_bomb[length_array].remove_bomb();

			this.bomb_limit--; 

			id++;

			var that = this;
			setTimeout(function(){
				that.bomb_x = 0;
				that.bomb_y = 0;
				that.bomb_limit++;
			}, this.bomb_timer*1000);
		}
	}

	this.check_bonus = function()
	{
		if(new_bonus.length == 0) return true;
		else
		{
			for(var i = 0; i < new_bonus.length; i++)
			{
				if((this.posX == new_bonus[i].posX) && (this.posY == new_bonus[i].posY)) 
				{
					this.check_bonus_type(i);
				}
			}
		}
	}

	this.check_bonus_type = function(i)
	{
		if(new_bonus[i].type == "timer") this.bomb_timer -= 0.2;
		else if(new_bonus[i].type == "reach") this.bomb_reach++;
		else if(new_bonus[i].type == "limit") 
		{
			this.bomb_limit++;
			this.bomb_limit_max ++;
		}
		new_bonus[i].remove_item();
	}
}

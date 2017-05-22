// classe bot

bomber.bot = function()
{
	this.posX = 1;
	this.posY = new_map.length_array-2;
	this.bomb_reach = 3;
	//	this.speed = 100;
	this.personnage = {};
	this.dirrection = 0;
	this.is_alive = true;
	this.next_dir; // prochaine possibilité
	this.t = 100; // propriété réactivité en milisecs : tous les combiens il va bouger, combien il va prendre des risques de s'approcher des bombs
	//this.cross = [122, 115, 113, 100, 98]; //z, s, q, d (déplacer le bot..

	//création du bot et position sur la grille
	this.display = function()
	{
		this.personnage = document.createElement("div");
		this.personnage.classList.add("player"); //..#############################################
		document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.personnage);
	}

	// supprimer le perso
	this.remove_player = function()
	{
		this.personnage.remove();
	}

	//Check if it's possible to move in this direction
	this.test = function()
	{
		var scoreM = 0; // score Max
		var moveM = ''; // move Max, au pire ce sera sur 'stay'
		var scoreA = 0; // score de la case Actuelle du forEach
		var cases = [4, 0, 1, 2, 3]; // 4stay – 0top – 1bottom – 2left – 3right

		for(var i = 0; i < cases.length; i++)
		{
			this.next_dir = cases[i];
			scoreA = 0
			scoreA += this.get_possibility(); // avec un return 0 ou 1
			// scoreA += isSafe(case) // avec return 0 ou 0.5
			// 	scoreA += isInteresting(case) // return 0.2 si on se dirige vers un objet ou un adversaire
			// 	  scoreA += isDirection() // return 0.1 si c'était la direction d'avant, pour éviter les aller retour si possible
			if (scoreA >= scoreM)		
				moveM = cases[i];
		}
	}

	// ######## get_posibility à récupérer, faire un return 0/1, pour les this.next_dir

	// ######## isSafe(case) check si il y a une bomb à prox à moins de 2t sec d'exploser

	this.live = function()
	{
		var that = this;
//		this.test();
		this.move();
		if(this.is_alive)  window.requestAnimationFrame(that.live);
	}

	//	déplacement du perso suivant les touches Z, S, Q, D et pose de bomb avec la touche B
	this.move = function()
	{
		console.log("ok");
		var that = this;
		pressKey = that.dirrection;
		if(pressKey == 0) //Z
		{
			that.dirrection = 0;
			that.get_possibility();
		}
		else if(pressKey == 1) //S
		{
			that.dirrection = 1;
			that.get_possibility();
		}
		else if(pressKey == 2) //Q
		{
			that.dirrection = 2;
			that.get_possibility();
		}
		else if(pressKey == 3) //D
		{
			that.dirrection = 3;
			that.get_possibility();
		}
		else if(pressKey == 4) //B
		{
			that.pose_bomb();
		}
		//réinitialisation de la position du perso
		that.remove_player();
		that.display();
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
					if((this.posX-1 != this.bomb_x) || (this.posY != this.bomb_y)) return 1;
				}
			}
		}
		else if(this.dirrection == 1) // go Bottom
		{
			if(this.posX+1 != new_map.length_array-1)
			{
				if(new_map.game[this.posX+1][this.posY] == 1)
				{
					if((this.posX+1 != this.bomb_x) || (this.posY != this.bomb_y)) return 1;
				}
			}
		}
		else if(this.dirrection == 2) // go Left
		{
			if(this.posY-1 != 0)
			{
				if(new_map.game[this.posX][this.posY-1] == 1)
				{
					if((this.posX != this.bomb_x) || (this.posY-1 != this.bomb_y)) return 1;
				}
			}
		}
		else if(this.dirrection == 3) // go Right
		{
			if(this.posY+1 != new_map.length_array-1)
			{
				if(new_map.game[this.posX][this.posY+1] == 1)
				{
					if((this.posX != this.bomb_x) || (this.posY+1 != this.bomb_y)) return 1;
				}
			}
		}
		return 0;
	}

	//
	this.pose_bomb = function()
	{

		var newbomb = new bomber.bomb(this.posX, this.posY, this.bomb_type);
		// création d'une bomb supplémentaire dans le tableau
		bomber.all_bombs.push(newbomb);
		newbomb.display();
		newbomb.remove_bomb();
		console.log(bomber.all_bombs);
	}
}

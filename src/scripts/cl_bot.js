// classe bot

bomber.bot = function()
{
	this.posX = 1;
	this.posY = new_map.length_array-2;
	this.bombe_reach = 3;
//	this.speed = 100;
	this.personnage = {};
	this.dirrection = 0;
	this.is_alive = true;
	this.next_dir; // prochaine possibilité
	this.t = 1000; // propriété réactivité en milisecs : tous les combiens il va bouger, combien il va prendre des risques de s'approcher des bombes
	//this.cross = [122, 115, 113, 100, 98]; //z, s, q, d (déplacer le bot..

	//création du bot et position sur la grille
	this.display = function()
	{
		this.personnage = document.createElement("div");
		this.personnage.classList.add("player"); //..#############################################
//		var text = document.createTextNode("8");
//		this.personnage.appendChild(text);
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
		moveM = cases.forEach( function(case)
		{
			this.next_dir = case;
			scoreA = 0
			scoreA += this.get_possibility(); // avec un return 0 ou 1
				// scoreA += isSafe(case) // avec return 0 ou 0.5
				// 	scoreA += isInteresting(case) // return 0.2 si on se dirige vers un objet ou un adversaire
				// 	  scoreA += isDirection() // return 0.1 si c'était la direction d'avant, pour éviter les aller retour si possible
			if (scoreA >= scoreM)
					moveM = case;
		});
	}

	// ######## get_posibility à récupérer, faire un return 0/1, pour les this.next_dir

	// ######## isSafe(case) check si il y a une bombe à prox à moins de 2t sec d'exploser

	this.live = function()
	{
		while (this.isAlive == true)
		{
			setTimeOut(this.choose, this.t); // attendre t (propriété réactivité en milisecs) et lancer le test des opportunités de mouvements
			this.move(); // bouger
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
			newBombe.remove_bombe();
			console.log(bomber.all_bombs);
		}
}

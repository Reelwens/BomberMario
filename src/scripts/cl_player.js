// classe player


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

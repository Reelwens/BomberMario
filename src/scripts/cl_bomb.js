// classe bombe



var bombe = function(posX, posY, type)
{
	this.posX = posX;
	this.posY = posY;
	this.type = type; // will set the levels of power, time, reach
	this.reach = 0; // portée de l'explosion de la bombe en nb de cases
	this.timeout = 0; // time before explosion
	this.power = 0; // life points cost for players when they explode
	this.bombe_dis = {}; // displayed representation of the bomb
	this.explosion = []; // gestion de l'explosion

	// setting of the bomb properties according to bomb type
	switch (type)
	{ // timeout  de la bombe à retardement en milisecondes
		// reach de l'explosion en nb de cases
		// power de l'explosion en nb points de vie enlevés
		case 1 : this.timeout = 10 000;
		 				 this.reach = 1;
						 this.power = 2;
						 break;
		case 2 : this.timeout = 8 000;
						 this.reach = 3;
						 this.power = 3;
						 break;
		case 3 : this.timeout = 6 000;
					 	 this.reach = 6;
						 this.power = 4;
						 break;
		default: this.timeout = 10 000;
						 this.reach = 1;
						 this.power = 1;
						 break;
	}


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
                for(var i = 1; i <= that.reach; i++)
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

                for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX+i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}

                for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX+i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}

				for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX+i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}

				for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
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

                for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}

				for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}

				for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
				{
					var fire = document.createElement("div");
					var text = document.createTextNode("|");
					fire.appendChild(text);
					document.body.querySelector(".case-" + (that.posX-i) + "-" + that.posY).appendChild(fire);
					that.explosion.push(fire);
				}

                for(var j = 1; j <= that.reach; j++)
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
				for(var i = 1; i <= that.reach; i++)
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

                for(var j = 1; j <= that.reach; j++)
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

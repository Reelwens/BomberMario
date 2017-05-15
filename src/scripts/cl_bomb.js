// classe bombe



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

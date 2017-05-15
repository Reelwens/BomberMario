// classe bombe



bomber.bombe = function(posX, posY, reach=1, power=1, timeOut=3)
{
	this.posX = posX;
	this.posY = posY;
	this.reach = reach; // portée de l'explosion de la bombe en nb de cases
	this.timeout = timeOut * 1000; // time before explosion
	this.power = power; // life points cost for players when they explode
	this.bombe_dis = {}; // displayed representation of the bomb

	// setting of the bomb properties according to bomb type
	//	switch (type)
	//	{ // timeout  de la bombe à retardement en milisecondes
	//		// reach de l'explosion en nb de cases
	//		// power de l'explosion en nb points de vie enlevés
	//		case 1 : this.timeout = 10000;
	//		 				 this.reach = 1;
	//						 this.power = 2;
	//						 break;
	//		case 2 : this.timeout = 8000;
	//						 this.reach = 3;
	//						 this.power = 3;
	//						 break;
	//		case 3 : this.timeout = 6000;
	//					 	 this.reach = 6;
	//						 this.power = 4;
	//						 break;
	//		default: this.timeout = 4000;
	//						 this.reach = 1;
	//						 this.power = 1;
	//						 break;
	//	}


	//création de la bombe dans le DOM
	this.display = function()
	{
		this.bombe_dis = document.createElement("div");
		this.bombe_dis.classList.add("bomb")
		var text = document.createTextNode("[B]");
		this.bombe_dis.appendChild(text);
		document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.bombe_dis);
	}

	// mise en place de l'explosion de la bombe
	this.remove_bombe = function(){
		var that = this;

		// durée de l'explosion et forme de la flamme suivant l'emplacement de la bombe
		setTimeout(function(){
			that.bombe_dis.remove();
			that.explosion();
		}, that.timeout);
	}

	this.explosion = function()
	{
		var start_fire_1 = new bomber.fire(posX-1, posY, 0, reach); // top
		var start_fire_2 = new bomber.fire(posX, posY-1, 1, reach); //bottom
		var start_fire_3 = new bomber.fire(posX, posY+1, 2, reach); //left	
		var start_fire_4 = new bomber.fire(posX+1, posY, 3, reach); // right
		start_fire_1.display();
		start_fire_2.display();
		start_fire_3.display();
		start_fire_4.display();
	}
}

// classe bombe



bomber.bombe = function(posX, posY, reach, power, timeOut)
{
	this.posX = posX;
	this.posY = posY;
	this.reach = reach; // portée de l'explosion de la bombe en nb de cases
	this.timeout = timeOut * 1000; // time before explosion
	this.power = power; // life points cost for players when they explode
	this.bombe_dis = {}; // displayed representation of the bomb

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
		var start_fire_1 = new bomber.fire(this.posX-1, this.posY, 0, this.reach); // top
		var start_fire_2 = new bomber.fire(this.posX+1, this.posY, 1, this.reach); //bottom
		var start_fire_3 = new bomber.fire(this.posX, this.posY-1, 2, this.reach); //left	
		var start_fire_4 = new bomber.fire(this.posX, this.posY+1, 3, this.reach); // right
		start_fire_1.display();
		start_fire_2.display();
		start_fire_3.display();
		start_fire_4.display();
	}
}

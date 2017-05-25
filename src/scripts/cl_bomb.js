// classe bomb



bomber.bomb = function(id, posX, posY, reach, power, timeOut)
{
	this.id = id;
	this.posX = posX;
	this.posY = posY;
	this.reach = reach; // portée de l'explosion de la bomb en nb de cases
	this.timeout = timeOut; // time before explosion
	this.power = power; // life points cost for players when they explode
	this.bomb_dis = {}; // displayed representation of the bomb

	//création de la bomb dans le DOM
	this.display = function()
	{
		this.bomb_dis = document.createElement("div");
		this.bomb_dis.classList.add("bomb");
		this.bomb_dis.setAttribute("data-key", this.id);
		document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.bomb_dis);
	}

	// mise en place de l'explosion de la bomb
	this.remove_bomb = function(){
		var that = this;

		// durée de l'explosion et forme de la flamme suivant l'emplacement de la bomb
		setTimeout(function(){
			that.bomb_dis.remove();
			that.explosion();
		}, this.timeout);

		this.explosion = function()
		{
			var start_fire_1 = new bomber.fire(this.posX-1, this.posY, 0, this.reach, this.id); // top
			var start_fire_2 = new bomber.fire(this.posX+1, this.posY, 1, this.reach, this.id); //bottom
			var start_fire_3 = new bomber.fire(this.posX, this.posY-1, 2, this.reach, this.id); //left
			var start_fire_4 = new bomber.fire(this.posX, this.posY+1, 3, this.reach, this.id); // right
			var start_fire_5 = new bomber.fire(this.posX, this.posY, 4, this.reach, this.id); // middle
			start_fire_1.display();
			start_fire_2.display();
			start_fire_3.display();
			start_fire_4.display();
			start_fire_5.display();

			for(var i = 0; i < new_bomb.length; i++)
			{
				if(this.id == new_bomb[i].id) new_bomb.splice(i, 1);
			}
		}
	}
}

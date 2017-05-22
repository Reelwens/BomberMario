//Class bonus

bomber.bonus = function(id, type, posX, posY){
	this.id = id;
	this.type = type;
	this.posX = posX;
	this.posY = posY;
	this.bonus = {};
	
	this.display = function()
	{
		this.bonus = document.createElement("div");
		this.bonus.classList.add("bonus");
		this.bonus.classList.add(this.type);
		document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.bonus);
	}
	
	this.remove_item = function()
	{
		this.bonus.remove();
		for(var i = 0; i < new_bonus.length; i++)
			{
				if(this.id == new_bonus[i].id) new_bonus.splice(i, 1);
			}
	}
	
}
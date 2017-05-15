bomber.fire = function(posX, posY, direction, remain)
{
	this.posX = posX;
	this.posY = posY;
	this.direction = direction; // direction of fire propagation -> 0 = top; 1 = bot; 2 = left; 3 = right
	this.remain = remain; // the remaining fire to creat
	this.fire_dis; // displayed representation of the fire

	this.display = function()
	{
		//		console.log(" x = " + this.posX + " et y = " + this.posY + " donc value = " + new_map.game[this.posX][this.posY]);
		if(new_map.game[this.posX][this.posY] == 1)
		{
			if((new_player.posX == this.posX) && (new_player.posY == this.posY))
			{
				alert("game over");
			}
			else
			{
				this.fire_dis = document.createElement("div");
				this.fire_dis.classList.add("fire")
				var text = document.createTextNode("*");
				this.fire_dis.appendChild(text);
				document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.fire_dis);
			}

			var that = this;
			setTimeout(function() {
				that.fire_remove();
				that.verify();
			}, 500);
		}
		else if(new_map.game[parseInt(this.posX)][parseInt(this.posY)] == 2)
		{
			new_map.game[parseInt(this.posX)][parseInt(this.posY)] = 1;
			var current_cell = document.body.querySelector(".cel-" + this.posX + "-" + this.posY);
			var cell_type = get_random(0, 2);

			current_cell.classList.remove("case-2");
			current_cell.classList.add("case-1");
			current_cell.classList.add("type-" + cell_type);
		}
	}

	this.fire_remove = function()
	{
		this.fire_dis.remove();
	}

	this.verify = function()
	{
		console.log("ok");
		if(this.remain > 0)
		{
			console.log(remain);
			this.remain--;
			if(this.direction == 0)
			{
				var start_fire = new bomber.fire(posX-1, posY, 0, this.remain);
				start_fire.display();
			}
			else if(this.direction == 1)
			{
				var start_fire = new bomber.fire(posX+1, posY, 1, this.remain);
				start_fire.display();
			}
			else if(this.direction == 2)
			{
				var start_fire = new bomber.fire(posX, posY-1, 2, this.remain);
				start_fire.display();
			}
			else if(this.direction == 3)
			{
				var start_fire = new bomber.fire(posX, posY+1, 3, this.remain);
				start_fire.display();
			}
		}
	}
}
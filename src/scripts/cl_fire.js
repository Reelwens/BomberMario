bomber.fire = function(posX, posY, direction, remain, bomb_id)
{
	this.posX = posX;
	this.posY = posY;
	this.direction = direction; // direction of fire propagation -> 0 = top; 1 = bot; 2 = left; 3 = right
	this.remain = remain-1; // the remaining fire to creat
	this.fire_dis; // displayed representation of the fire
	this.kill = false; // if it's kill a player set to true
	this.bomb_id = bomb_id;
	this.cell = document.body.querySelector(".cel-" + this.posX + "-" + this.posY); //Cell where fire is

	this.display = function()
	{
		if(new_map.game[this.posX][this.posY] == 1)
		{
			for(let i = 0; i < new_player.length; i++)
			{
				if((new_player[i].posX == this.posX) && (new_player[i].posY == this.posY))
				{
					new_player[i].remove_player();
					new_player[i].is_alive = false;
					this.kill = true;
				}
			}
			if(this.kill != true)
			{
				this.fire_dis = document.createElement("div");
				this.fire_dis.classList.add("fire")
				this.cell.appendChild(this.fire_dis);
				var there_a_bomb = document.body.querySelector(".cel-" + this.posX + "-" + this.posY + " .bomb");
				if(there_a_bomb != null)
				{
					var id = parseInt(there_a_bomb.getAttribute("data-key"));
					for(var i = 0; i < new_bomb.length; i++)
					{
						if(this.id == new_bomb[i].id)
						{
							new_bomb[i].explosion();
							break;
						}
					}
				}

				var that = this;
				that.verify();
				setTimeout(function(){
					that.fire_remove();
				}, 500);
			}
		}
		else if(new_map.game[parseInt(this.posX)][parseInt(this.posY)] == 2)
		{
			new_map.game[parseInt(this.posX)][parseInt(this.posY)] = 1;
			var current_cell = document.body.querySelector(".cel-" + this.posX + "-" + this.posY);
			var cell_type = get_random(0, 2);

			current_cell.classList.remove("case-2");
			current_cell.classList.add("case-1");
			current_cell.classList.add("type-" + cell_type);

			if(get_random(0, 5) < 3)
				var type = get_random(1, 3);
			if(type == 1 ) this.creat_bonus("timer");
			else if(type == 2 ) this.creat_bonus("reach");
			else if(type == 3 ) this.creat_bonus("limit");
		}
	}

	this.creat_bonus = function(type_bonus)
	{
		var lenght_array = new_bonus.length;
		new_bonus[lenght_array] = new bomber.bonus(lenght_array, type_bonus, this.posX, this.posY);
		new_bonus[lenght_array].display();
	}

	this.fire_remove = function()
	{
		this.fire_dis.remove();
	}

	this.verify = function()
	{
		if(this.remain > 0)
		{
			if(this.direction == 0)
			{
				var start_fire = new bomber.fire(this.posX-1, this.posY, 0, this.remain);
				start_fire.display();
			}
			else if(this.direction == 1)
			{
				var start_fire = new bomber.fire(this.posX+1, this.posY, 1, this.remain);
				start_fire.display();
			}
			else if(this.direction == 2)
			{
				var start_fire = new bomber.fire(this.posX, this.posY-1, 2, this.remain);
				start_fire.display();
			}
			else if(this.direction == 3)
			{
				var start_fire = new bomber.fire(this.posX, this.posY+1, 3, this.remain);
				start_fire.display();
			}
		}
	}
}

var bomber = {}; //object
bomber.game_elem = document.querySelector(".game");

// insertion des valeurs 0 dans le tableau (grille)
bomber.map = function()
{
	this.cell_height = 10;
	this.cell_width = 10;
	this.length_array = 23;
	this.elem_array = {};
	this.game = new Array(this.length_array);
	this.types = [0, 1, 2, 3];

	this.initiate_game = function()
	{
		for(var i = 0; i < this.length_array; i++)
		{
			this.game[i] = new Array(this.length_array);
			for(var j = 0; j < this.length_array; j++)
			{
				console.log();
				if(i == 0 || i == this.length_array-1) this.game[i][j] = 3;
				else if(j == 0 || j == this.length_array-1) this.game[i][j] = 3;
				else if((i % 2 == 0) && (j % 2 == 0)) this.game[i][j] = 3;
				else if((i == 1 && (j == 1 || j == 2)) || (i == 2 && j == 1)) this.game[i][j] = this.types[1];
				else if((i == 1 && (j == this.length_array-2 || j == this.length_array-3)) || (i == 2 && j == this.length_array-2)) this.game[i][j] = this.types[1];
				else if((i == (this.length_array-2) && (j == 1 || j == 2)) || (i == this.length_array-3 && j == 1)) this.game[i][j] = this.types[1];
				else if((i == (this.length_array-2) && (j == this.length_array-2 || j == this.length_array-3)) || (i == this.length_array-3 && j == this.length_array-2)) this.game[i][j] = this.types[1];
				else this.game[i][j] = this.types[get_random(1, 2)];
			}
		}
	}

	this.create_game = function()
	{
		var tab = "<table class='game'>";
		for(let i = 0; i < this.length_array; i++)
		{
			tab += "<tr>";
			for(let j = 0; j < this.length_array; j++)
			{
				if(this.game[i][j] == 1)
				{
					var cell_type = get_random(0, 2);
					tab += "<td class='case-" + this.game[i][j] + " type-" + cell_type + "'></td>";
				}
				else tab += "<td class='case-" + this.game[i][j] + "'></td>";
			}
			tab += "</tr>";
		}
		tab += "</table>";
		bomber.game_elem.innerHTML = tab;
	}

}

var new_map = new bomber.map();
new_map.initiate_game();
new_map.create_game();

console.log(new_map.game);

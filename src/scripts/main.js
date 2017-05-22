var start_button = document.querySelector(".start");
var new_map;
var new_player = [];
var new_bomb = [];
var new_bonus = [];
var id = 0;

start_button.addEventListener("click", function(e){
	e.preventDefault();
	start_game();

});

function start_game()
{
	//Creat a new map
	new_map = new bomber.map();
	new_map.initiate_game();
	new_map.create_game();
	
	if(new_player.length > 0)
	{
		for(let i = 0; i < new_player.length; i++)
		{
			new_player[i].remove_player();
			new_player[i].is_alive = false;
		}
		new_player = new Array();
	}

	/*
		Possible starting position

		top - left = 1, 1
		top - right = 1, new_map.length_array-2
		bottom - left = new_map.length_array-2, 1
		bottom - right = new_map.length_array-2, new_map.length_array-2
	*/

	new_player[0] = new bomber.player(0, 1, 1); 
	new_player[0].display();
	new_player[0].move();

	new_player[1] = new bomber.bot(0, 1, new_map.length_array-2); 
	new_player[1].display();
	new_player[1].move();
	
//	new_player[2] = new bomber.bot(0, new_map.length_array-2, 1); 
//	new_player[2].display();	
//	new_player[2].move();
//	
//	new_player[3] = new bomber.bot(0, new_map.length_array-2, new_map.length_array-2); 
//	new_player[3].display();
//	new_player[3].move();
}

start_game();
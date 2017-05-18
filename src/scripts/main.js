var start_button = document.querySelector(".start");
var new_map;
var new_player = [];

start_button.addEventListener("click", function(e){
	e.preventDefault();

	new_map = new bomber.map();
	new_map.initiate_game();
	new_map.create_game();

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
});
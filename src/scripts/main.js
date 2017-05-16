var start_button = document.querySelector(".start");
var new_map;
var new_player = [];

start_button.addEventListener("click", function(e){
	e.preventDefault();

	new_map = new bomber.map();
	new_map.initiate_game();
	new_map.create_game();

	new_player[0] = new bomber.player(1, 1);
	new_player[0].display();
	new_player[0].move();
});
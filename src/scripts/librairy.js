var start_button = document.querySelector(".start");
var new_map;
var new_player = [];
var new_bomb = [];
var new_bonus = [];
var id = 0;

function get_random(min=0, max=10)
{
	return parseInt(Math.random() * max + min);
}

start_button.addEventListener("click", function(e){
	e.preventDefault();
  remove_all();
	start_game();

});

function start_game()
{
	//Creat a new map
	new_map = new bomber.map();
	new_map.initiate_game();
	new_map.create_game();

  var popup = document.querySelector(".popup");
  if(popup != null) popup.remove()

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

	// new_player[2] = new bomber.bot(0, new_map.length_array-2, 1);
	// new_player[2].display();
	// new_player[2].move();

	// new_player[3] = new bomber.bot(0, new_map.length_array-2, new_map.length_array-2);
	// new_player[3].display();
	// new_player[3].move();
}

start_game();

function win()
{
  var left = document.querySelector("table").offsetLeft;
  var text = "<div class='popup'><p>Player Win yeah !!!</p></div>";
  bomber.game_elem.innerHTML += text;
  document.body.querySelector(".popup").style.width = new_map.length_array * 32 + "px";
  document.body.querySelector(".popup").style.left = left + "px";
  remove_all();
}

function loose()
{
  var left = document.querySelector("table").offsetLeft;
  var text = "<div class='popup'><p>Oh no, Player Loose !!!</p></div>";
  bomber.game_elem.innerHTML += text;
  document.body.querySelector(".popup").style.width = new_map.length_array * 32 + "px";
  document.body.querySelector(".popup").style.left = left + "px";
  remove_all();
}

function remove_all()
{
  for(let i = 0; i < new_player.length; i++)
  {
    new_player[i].remove_player();
    new_player[i].is_alive = false;
  }
  new_player = [];
}

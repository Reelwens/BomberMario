var new_map = new bomber.map();
new_map.initiate_game();
new_map.create_game();

var new_player = new bomber.player();
new_player.display();
new_player.move();

bomber.all_bombs = new Array();
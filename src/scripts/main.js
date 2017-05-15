// insertion des valeurs 0 dans le tableau (grille)
for(var i = 0; i < 10; i++)
{
	bomber.board[i] = new Array();
	for(var j = 0; j < 10; j++)
	{
		bomber.board[i][j] = 0;
	}
}

console.log(bomber.board);

//création de la grille de jeu
function display_array()
{
	var tab = document.createElement("table");
	for(var i = 0; i < 10; i++)
	{
		var tr = document.createElement("tr");
		for(var j = 0; j < 10; j++)
		{
			var td = document.createElement("td");
			td.classList.add("case-" + i + "-" + j);
			tr.appendChild(td);
		}
		tab.appendChild(tr);
	}
	document.body.appendChild(tab);
	bomber.game = tab;
}

display_array();


var test = new player();
test.display();
test.move();
//console.log(test.personnage);

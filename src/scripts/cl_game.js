// pour l'instant c'est un objet,
// il faut créer une classe game qui englobe tout
// qu'on pourra instancier au début du jeu, et
// éventuellement réinstancier en cas de nouvelle partie.

var bomber = {}; //object
bomber.board = new Array(); //valeur de chaque case
bomber.player = {}; //joueur
bomber.game = {}; // grille
bomber.bombes = []; //bombes

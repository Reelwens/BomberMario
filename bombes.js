// par Blaise : début de la fonction, peut être incomplète, sans doute bugée.. et il faut remplacer par les objets, props et classes




bomb = function()
{

  this.x = 1
  this.y = 1
  this.power = 1      // niveaux de bombes
  this.tLeft = 10 000 // temps restant / time left, fonction du niveau de bombe
  this.reach = 3      // taille de l'explosion, fonction du niveau de bombe

  init = function(power) // initialisation
  {
    this.x = bomber.x;
    this.y = bomber.y;
    cell [x,y].class = ".bombe"power; // je sais pas comment on fait pour
              // changer la classe de la case (x, y) du tableau.
    switch (power)
    {
      case 1 : this.tLeft = 10 000; break; // minuteur de la bombe à retardement
      case 2 : this.tLeft = 8 000; break;
      case 3 : this.tLeft = 5 000; break;
      default: this.tLeft = 10 000; break;
    }
    switch (power)
    {
      case 1 : this.reach = 1; break; // portée de l'explode
      case 2 : this.reach = 3; break;
      case 3 : this.reach = 6; break;
      default: this.reach = 100; break; // infinite
    }
  }

  explode = function() // explosion
  {
    cell [x, y].class = ".bexp"power; // texture bombe explosion
    var i=x+1;                                              // pour les cases à droite de la bombe
    while  (i<=x+this.reach && cell[i,y].class == ".floor") // tant que c'et pas un obstacle ou autre
      { cell[i,y] . class = ".explosion"; i++; }            // texture explosion
    var i=y+1;                                              // en haut
    while  (i<=y+this.reach && cell[x,i].class == ".floor")
      { cell[x,y] . class = ".explosion"; i++; }
    var i=x-1;                                              // à gauche
    while  (i>=x-this.reach && cell[i,y].class == ".floor")
      { cell[i,y] . class = ".explosion"; i--; }
    var i=y-1;                                              // en bas
    while  (i>=y-this.reach && cell[x,i].class == ".floor")
      { cell[x,i] . class = ".explosion"; i--; }
  }
}

if (bomb.tleft = 0)
{
  this.explode;
}

// classe player


bomber.bot = function(id, posX=1, posY=1)
{
  this.id = id; //position in new_player array
  this.type = "bot"; // Type of this object
  this.posX = posX; // Indice in Vertical
  this.posY = posY; // Indice in Horrizontal
  this.is_alive = true; // Player Status
  this.personnage = {}; //Html element of the player
  this.dirrection = 0; //Current dirrection of the player
  this.last_dirrection = -1; //last dirrection of the player
  this.t = 100; // number of millisecon for bot reaction

  this.bomb_reach = 1; // Reach of the bomb
  this.bomb_timer = 1; // Timer of the bomb
  this.bomb_limit = 1; // Limit of the bomb the player can pose
  this.bomb_limit_max = this.bomb_limit;
  this.bomb_x;
  this.bomb_y;

  this.wait = false;
  this.safe_cases = [];
  this.safe_path = [];
  this.danger_bomb_reach = 0;
  this.danger_finish = true;



  // fonction move et fonction decide à merge dans cl_bot2.js màj.

  // déplacement du bot
  // il faudra faire la fonction pour décider si on pose une bombe ou pas...
  this.move = function()
  {
    var that = this;
    if(this.is_alive == true)
    {

      // this.decide(); // ancienne fonction test : set la prochaine this.dirrection
      this.update_bot();
      this.remove_player();
      that.display();
      setTimeout(function(){
        that.move();
      }, that.t);
    }
  }

  /*
  danger() -> check if the bot is in danger
  move_to_player() -> go in the player dirrection
  get_safe_path() -> find the shortest safe pathe to avoid explosion
  move_to_safe_case() -> Move to a safe case
  */

  this.update_bot = function()
  {
    var breakable_block;
    this.danger_bomb_reach = this.danger();
    if(new_bomb.length == 0) this.wait = false;
    if((this.wait == false)||(this.danger_bomb_reach == 0))
    {
      if(this.check_block())
      {
        this.pose_bomb();
        this.wait = true;
      }
      else this.move_to_player();
    }
    else if(this.danger_bomb_reach > 0){
      if((this.safe_path.length == 0)&&(this.danger_finish)) this.get_safe_path();
      this.move_to_safe_case();
    }
  }

  // // decide la prochaine this.dirrection
  // this.decide = function()
  // {
  // 	var that = this;
  // 	var score_max = 0; // score Max
  // 	var move_max = 0; // conclusion du meilleur move
  // 	var move = 0;
  //   var opposite_dirrection = 0;
  //   this.last_dirrection = this.dirrection;
  //   if (this.last_dirrection == 0) opposite_dirrection = 1;
  //   else if (this.last_dirrection == 1) opposite_dirrection = 0;
  //   else if (this.last_dirrection == 2) opposite_dirrection = 3;
  //   else if (this.last_dirrection == 3) opposite_dirrection = 2;
  // 	for ( move = 0 ; move <= 3; move++)
  // 	{
  // 		var score_move = 0;
  // 		this.dirrection = move ;
  //     // console.log(this.dirrection + " - " + this.last_dirrection);
  // 		if (this.get_possibility() != true)
  // 			{
  //         score_move += 1;
  //         if(this.dirrection != this.last_dirrection) score_move += 1;
  //         else {
  //           score_move -= 99;
  //         }
  //       }
  //       else {
  //         score_move -= 99;
  //       }
  //
  //
  // 		if (score_move > score_max)
  // 		{
  // 			score_max = score_move;
  // 			move_max = move;
  // 		}
  // 	}
  // 	this.dirrection = move_max;
  //   if(this.dirrection == 0) // go Top
  // 	{
  // 		this.posX--;
  // 	}
  // 	else if(this.dirrection == 1) // go Bottom
  // 	{
  // 		this.posX++;
  // 	}
  // 	else if(this.dirrection == 2) // go Left
  // 	{
  // 		this.posY--;
  // 	}
  // 	else if(this.dirrection == 3) // go Right
  // 	{
  // 		this.posY++;
  // 	}

  // var scoreM = 0; // score Max
  // var moveM = ''; // move Max, au pire ce sera sur 'stay'
  // var scoreA = 0; // score de la case Actuelle du forEach
  // var cases = [4, 0, 1, 2, 3]; // 4stay – 0top – 1bottom – 2left – 3right
  //
  // for(var i = 0; i < cases.length; i++)
  // {
  // 	this.next_dir = cases[i];
  // 	scoreA = 0
  // 	scoreA += this.get_possibility() * 1; // avec un return 0 ou 1
  // 	// scoreA += isSafe(case) * 0.5// avec return 0 ou 1
  // 	// 	scoreA += isInteresting(case) * 0.2 // return 1 si on se dirige vers un objet ou un adversaire
  // 	// 	  scoreA += isDirection() * 0.1 // return 1 si c'était la direction d'avant, pour éviter les aller retour si possible
  // 	if (scoreA >= scoreM)
  // 		moveM = cases[i];
  // }
  // }

  // ######## get_posibility à récupérer, faire un return 0/1, pour les this.next_dir

  // ######## isSafe(case) check si il y a une bombe à prox à moins de 2t sec d'exploser

  //création du perso et position sur la grille
  this.display = function()
  {
    this.personnage = document.createElement("div");
    this.personnage.classList.add("player");
    document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.personnage);
  }

  // supprimer le perso
  this.remove_player = function()
  {
    this.personnage.remove();
  }

  //Check if it's possible to move in this dirrection
  this.get_possibility = function()
  {
    if(this.dirrection == 0) // go Top
    {
      if(this.posX-1 != 0)
      {
        if(new_map.game[this.posX-1][this.posY] == 1)
        {
          if(this.check_bomb()) {
            return true;
          }
          else return false;
        }
        else return false;
      }
    }
    else if(this.dirrection == 1) // go Bottom
    {
      if(this.posX+1 != new_map.length_array-1)
      {
        if(new_map.game[this.posX+1][this.posY] == 1)
        {
          if(this.check_bomb()) {
            return true;
          }
          else return false;
        }
        else return false;
      }
    }
    else if(this.dirrection == 2) // go Left
    {
      if(this.posY-1 != 0)
      {
        if(new_map.game[this.posX][this.posY-1] == 1)
        {
          if(this.check_bomb()) {
            return true;
          }
          else return false;
        }
        else return false;
      }
    }
    else if(this.dirrection == 3) // go Right
    {
      if(this.posY+1 != new_map.length_array-1)
      {
        if(new_map.game[this.posX][this.posY+1] == 1)
        {
          if(this.check_bomb()) {
            return true;
          }
          else return false;
        }
        else return false;
      }
    }
    return false;
  }

  // Check if there is a bomb in next case
  this.check_bomb = function(){
    if(new_bomb.length == 0) return true; // if no bomb on the map
    else if(this.dirrection == 0) //
    {
      for(var i = 0; i < new_bomb.length; i++)
      {
        if((this.posX-1 != new_bomb[i].posX) || (this.posY != new_bomb[i].posY)) return true;
      }
    }
    else if(this.dirrection == 1)
    {
      for(var i = 0; i < new_bomb.length; i++)
      {
        if((this.posX+1 != new_bomb[i].posX) || (this.posY != new_bomb[i].posY)) return true;
      }
    }
    else if(this.dirrection == 2)
    {
      for(var i = 0; i < new_bomb.length; i++)
      {
        if((this.posX != new_bomb[i].posX) || (this.posY-1 != new_bomb[i].posY)) return true;
      }
    }
    else if(this.dirrection == 3)
    {
      for(var i = 0; i < new_bomb.length; i++)
      {
        if((this.posX != new_bomb[i].posX) || (this.posY+1 != new_bomb[i].posY)) return true;
      }
    }
    else if(this.dirrection == 4)
    {
      return true;
    }
    else return false;
  }

  this.danger = function()
  {
    if(new_bomb.length == 0) return false;
    else {
      for(let i = 0; i < new_bomb.length; i++)
      {
        if(((new_bomb[i].posX - new_bomb[i].reach) <= this.posX)&&((new_bomb[i].posX + new_bomb[i].reach) >= this.posX)) return new_bomb[i].reach;
        else if (((new_bomb[i].posY - new_bomb[i].reach) <= this.posY)&&((new_bomb[i].posY + new_bomb[i].reach) >= this.posY)) return new_bomb[i].reach;
      }
      this.danger_finish = true;
      return 0;
    }
  }

  this.check_block = function()
  {
    if(this.dirrection == 0)
    {
      if(new_map.game[this.posX-1][this.posY] == 2)
      {
        if(new_map.game[this.posX][this.posY-1] == 1) return false;
        // else if(new_map.game[this.posX][this.posY+1] == 1) return false;
        this.danger_finish = true;
        return true;
      }
      else return false;
    }
    else if(this.dirrection == 1)
    {
      if(new_map.game[this.posX+1][this.posY] == 2)
      {
        if(new_map.game[this.posX][this.posY-1] == 1) return false;
        // else if(new_map.game[this.posX][this.posY+1] == 1) return false;
        this.danger_finish = true;
        return true;
      }
      else return false;
    }
    else if(this.dirrection == 2)
    {
      if(new_map.game[this.posX][this.posY-1] == 2)
      {
        if(new_map.game[this.posX-1][this.posY] == 1) return false;
        // else if(new_map.game[this.posX+1][this.posY] == 1) return false;
        this.danger_finish = true;
        return true;
      }
      else return false;
    }
    else if(this.dirrection == 3)
    {
      if(new_map.game[this.posX][this.posY+1] == 2)
      {
        if(new_map.game[this.posX-1][this.posY] == 1) return false;
        // else if(new_map.game[this.posX+1][this.posY] == 1) return false;
        this.danger_finish = true;
        return true;
      }
      else return false;
    }
  }

  this.get_safe_path = function()
  {
    var finish_safe_path = false;
    if(this.dirrection == 0)
    {
      for(let i = 1; i <= this.danger_bomb_reach; i++)
      {
        if(finish_safe_path == false)
        {
          this.safe_path.push([this.posX+i, this.posY]);
          if(new_map.game[this.posX+i][this.posY-1] == 1)
          {
            this.safe_path.push([this.posX+i, this.posY-1]);
            finish_safe_path = true;
          }
          else if (new_map.game[this.posX+i][this.posY+1] == 1) {
            this.safe_path.push([this.posX+i, this.posY+1]);
            finish_safe_path = true;
          }
        }
      }
    }
    else if(this.dirrection == 1)
    {
      for(let i = 1; i <= this.danger_bomb_reach; i++)
      {
        if(finish_safe_path == false)
        {
          this.safe_path.push([this.posX-i, this.posY]);
          if(new_map.game[this.posX-i][this.posY-1] == 1)
          {
            this.safe_path.push([this.posX-i, this.posY-1]);
            finish_safe_path = true;
          }
          else if (new_map.game[this.posX-i][this.posY+1] == 1) {
            this.safe_path.push([this.posX-i, this.posY+1]);
            finish_safe_path = true;
          }
        }
      }
    }
    else if(this.dirrection == 2)
    {
      for(let i = 1; i <= this.danger_bomb_reach; i++)
      {
        if(finish_safe_path == false)
        {
          this.safe_path.push([this.posX, this.posY+i]);
          if(new_map.game[this.posX-1][this.posY+i] == 1)
          {
            this.safe_path.push([this.posX-1, this.posY+i]);
            finish_safe_path = true;
          }
          else if (new_map.game[this.posX+1][this.posY+i] == 1) {
            this.safe_path.push([this.posX+1, this.posY+i]);
            finish_safe_path = true;
          }
        }
      }
    }
    else if(this.dirrection == 3)
    {
      for(let i = 1; i <= this.danger_bomb_reach; i++)
      {
        if(finish_safe_path == false)
        {
          this.safe_path.push([this.posX, this.posY-i]);
          if(new_map.game[this.posX-1][this.posY-i] == 1)
          {
            this.safe_path.push([this.posX-1, this.posY-i]);
            finish_safe_path = true;
          }
          else if (new_map.game[this.posX+1][this.posY-i] == 1) {
            this.safe_path.push([this.posX+1, this.posY-i]);
            finish_safe_path = true;
          }
        }
      }
    }
    this.danger_finish = false;
  }

  this.move_to_safe_case = function()
  {
    if(this.safe_path.length > 0)
    {
      this.posX = this.safe_path[0][0];
      this.posY = this.safe_path[0][1];
      this.safe_path.splice(0, 1);
    }
  }

  this.move_to_player = function()
  {
    var move_x = new_player[0].posX - this.posX;
    var move_y = new_player[0].posY - this.posY;
    var valide_dirrection = false;
    if(move_x <= 0)
    {
      this.dirrection = 0;
      if (this.get_possibility() == true) {
        this.posX -=1;
      }
      else {
        valide_dirrection = true;
      }
    }
    if(valide_dirrection)
    {
      if(move_x > 0)
      {
        this.dirrection = 1;
        if (this.get_possibility() == true) {
          this.posX +=1;
          valide_dirrection = false;
        }
        else {
          valide_dirrection = true;
        }
      }
    }
    if(valide_dirrection)
    {
      if(move_y <= 0)
      {
        this.dirrection = 2;
        if (this.get_possibility() == true) {
          this.posY -=1;
          valide_dirrection = false;
        }
      }
      if(valide_dirrection)
      {
        if(move_y > 0)
        {
          this.dirrection = 3;
          if (this.get_possibility() == true) {
            this.posY +=1;
          }
        }
      }
    }
  }

  // Create a new bomb objet
  this.pose_bomb = function()
  {

    if(this.bomb_limit > 0)
    {
      var length_array  = new_bomb.length;
      new_bomb[length_array] = new bomber.bomb(id, this.posX, this.posY, this.bomb_reach, 1, this.bomb_timer); //posX, posY, reach, power, timeOut
      this.bomb_x = this.posX;
      this.bomb_y = this.posY;
      new_bomb[length_array].display();
      new_bomb[length_array].remove_bomb();

      this.bomb_limit--;
      id++;

      var that = this;
      setTimeout(function(){
        that.bomb_x = 0;
        that.bomb_y = 0;
        that.bomb_limit++;
      }, this.bomb_timer*1000);
    }
  }

  this.check_bonus = function()
  {
    if(new_bonus.length == 0) return true;
    else
    {
      for(var i = 0; i < new_bonus.length; i++)
      {
        if((this.posX == new_bonus[i].posX) && (this.posY == new_bonus[i].posY))
        {
          this.check_bonus_type(i);
        }
      }
    }
  }

  this.check_bonus_type = function(i)
  {
    if(new_bonus[i].type == "timer") this.bomb_timer -= 0.2;
    else if(new_bonus[i].type == "reach") this.bomb_reach++;
    else if(new_bonus[i].type == "limit")
    {
      this.bomb_limit++;
      this.bomb_limit_max ++;
    }
    new_bonus[i].remove_item();
  }
}

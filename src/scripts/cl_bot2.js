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
      else {
        this.check_bonus();
        this.move_to_player();
      }
    }
    else if(this.danger_bomb_reach > 0){
      if((this.safe_path.length == 0)&&(this.danger_finish))
      {
        this.get_safe_path();
        this.danger_finish = false;
      }
      this.move_to_safe_case();
    }
  }

  //création du perso et position sur la grille
  this.display = function()
  {
    this.personnage = document.createElement("div");
    this.personnage.classList.add("bot");
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
      this.safe_path = new Array();
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
        this.danger_finish = true;
        return true;
      }
      else if(this.check_player())
      {
        this.danger_finish = true;
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(this.dirrection == 1)
    {
      if(new_map.game[this.posX+1][this.posY] == 2)
      {
        if(new_map.game[this.posX][this.posY-1] == 1) return false;
        this.danger_finish = true;
        return true;
      }
      else if(this.check_player())
      {
        this.danger_finish = true;
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(this.dirrection == 2)
    {
      if(new_map.game[this.posX][this.posY-1] == 2)
      {
        if(new_map.game[this.posX-1][this.posY] == 1) return false;
        this.danger_finish = true;
        return true;
      }
      else if(this.check_player())
      {
        this.danger_finish = true;
        return true;
      }
      else
      {
        return false;
      }
    }
    else if(this.dirrection == 3)
    {
      if(new_map.game[this.posX][this.posY+1] == 2)
      {
        if(new_map.game[this.posX-1][this.posY] == 1) return false;
        this.danger_finish = true;
        return true;
      }
      else if(this.check_player())
      {
        this.danger_finish = true;
        return true;
      }
      else
      {
        return false;
      }
    }
  }

  this.check_player = function()
  {
    if((new_player[0].posX == this.posX)&&(Math.abs(new_player[0].posY-this.posY) <= this.bomb_reach)) return true;
    else if((new_player[0].posY == this.posY)&&(Math.abs(new_player[0].posX-this.posX) <= this.bomb_reach)) return true;
    else return false;
  }

  this.get_safe_path = function()
  {
    var finish_safe_path = false;
    if(this.dirrection == 0)
    {
      for(let i = 1; i <= this.danger_bomb_reach+1; i++)
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
      for(let i = 1; i <= this.danger_bomb_reach+1; i++)
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
      for(let i = 1; i <= this.danger_bomb_reach+1; i++)
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
      for(let i = 1; i <= this.danger_bomb_reach+1; i++)
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
    if(Math.abs(move_x) > Math.abs(move_y))
    {
      valide_dirrection = this.move_to_player_x(move_x);
      if(valide_dirrection == false) valide_dirrection = this.move_to_player_y(move_y);
    }
    else {
      valide_dirrection = this.move_to_player_y(move_y);
      if(valide_dirrection == false) valide_dirrection = this.move_to_player_x(move_x);
    }
  }

this.move_to_player_x = function(x)
{
  if(x < 0)
  {
    this.dirrection = 0;
    if(this.get_possibility())
    {
      this.posX -= 1;
      return true;
    }
    else {
      this.dirrection = 1;
      if (this.get_possibility())
      {
        this.posX += 1;
        return true;
      }
      return false;
    }
  }
  else {
    this.dirrection = 1;
    if(this.get_possibility())
    {
      this.posX += 1;
      return true;
    }
    else {
      this.dirrection = 0;
      if (this.get_possibility())
      {
        this.posX -= 1;
        return true;
      }
      return false;
    }
  }
}

this.move_to_player_y = function(y)
{
  if(y < 0)
  {
    this.dirrection = 2;
    if(this.get_possibility())
    {
      this.posY -= 1;
      return true;
    }
    else {
      this.dirrection = 3;
      if (this.get_possibility())
      {
        this.posY += 1;
        return true;
      }
      return false;
    }
  }
  else {
    this.dirrection = 3;
    if(this.get_possibility())
    {
      this.posY += 1;
      return true;
    }
    else {
      this.dirrection = 2;
      if (this.get_possibility())
      {
        this.posY -= 1;
        return true;
      }
      return false;
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

// classe player


bomber.player = function(id, posX=1, posY=1)
{
  this.id = id; // possition of the player in new player array
  this.type = "player";
  this.posX = posX; // Indice in Vertical
  this.posY = posY; // Indice in Horrizontal
  this.is_alive = true; // Player Status
  this.personnage = {}; //Html element of the player
  this.dirrection = 0; //Current dirrection of the player
  this.cross = [122, 115, 113, 100, 98]; //z, s, q, d (Permit player to move)

  this.bomb_reach = 1; // Reach of the bomb
  this.bomb_timer = 900; // Timer of the bomb
  this.bomb_limit = 1; // Limit of the bomb the player can pose

  this.bonus_reach = 0;
  this.bonus_limit = 0;
  this.bonus_timer = 0;

  //création du perso et position sur la grille
  this.display = function()
  {
    this.personnage = document.createElement("div");
    this.personnage.classList.add("player");
    document.body.querySelector(".cel-" + this.posX + "-" + this.posY).appendChild(this.personnage);
  }

  this.display_bonus = function()
  {
    document.body.querySelector("span.limit").innerHTML = this.bonus_limit;
    document.body.querySelector("span.reach").innerHTML = this.bonus_reach;
    document.body.querySelector("span.timer").innerHTML = this.bonus_timer;
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
          if(this.check_bomb()) this.posX--;
        }
      }
    }
    else if(this.dirrection == 1) // go Bottom
    {
      if(this.posX+1 != new_map.length_array-1)
      {
        if(new_map.game[this.posX+1][this.posY] == 1)
        {
          if(this.check_bomb()) this.posX++;
        }
      }
    }
    else if(this.dirrection == 2) // go Left
    {
      if(this.posY-1 != 0)
      {
        if(new_map.game[this.posX][this.posY-1] == 1)
        {
          if(this.check_bomb()) this.posY--;
        }
      }
    }
    else if(this.dirrection == 3) // go Right
    {
      if(this.posY+1 != new_map.length_array-1)
      {
        if(new_map.game[this.posX][this.posY+1] == 1)
        {
          if(this.check_bomb()) this.posY++;
        }
      }
    }
  }

  // déplacement du perso suivant les touches Z, S, Q, D et pose de bomb avec la touche B
  this.move = function()
  {
    var that = this;
    window.addEventListener("keypress", function(e){
      if(that.is_alive)
      {
        pressKey = e.keyCode;
        if(pressKey == that.cross[0]) //Z
        {
          that.dirrection = 0;
          that.get_possibility();
        }
        else if(pressKey == that.cross[1]) //S
        {
          that.dirrection = 1;
          that.get_possibility();
        }
        else if(pressKey == that.cross[2]) //Q
        {
          that.dirrection = 2;
          that.get_possibility();
        }
        else if(pressKey == that.cross[3]) //D
        {
          that.dirrection = 3;
          that.get_possibility();
        }
        else if(pressKey == that.cross[4]) //B
        {
          that.pose_bomb();
        }
        //réinitialisation de la position du perso
        that.remove_player();
        that.display();
        that.check_bonus();
      }
    });
  }

  this.check_bomb = function(){
    if(new_bomb.length == 0) return true;
    else if(this.dirrection == 0)
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
    else return false;
  }

  // Pose bomb
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
      }, this.bomb_timer);
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
    if(new_bonus[i].type == "timer")
    {
       this.bomb_timer -= 0.2;
       this.bonus_timer++;
    }
    else if(new_bonus[i].type == "reach")
     {
      this.bomb_reach++;
      this.bonus_reach++;
    }
    else if(new_bonus[i].type == "limit")
    {
      this.bomb_limit++;
      this.bonus_limit++;
    }
    new_bonus[i].remove_item();
    this.display_bonus();
  }
}

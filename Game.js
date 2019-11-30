class Game{
  constructor(obj){
    this.players = obj.players;
    this.playerColors = ['blue', 'black', 'grey', 'green'];

    this.board = [];
    this.width = 20;
    this.height = 20;

    this.over = false;
    this.apple = [];

    for(let i = 0; i < this.height; i++){
      this.board.push([]);
      for(let j = 0; j < this.width; j++){
        this.board[i].push(0);
      }
    }
  }

  restart(){
    this.players.forEach((player, index) => {
      let positions;
      let dir;
      player.alive = true;
      player.score = 0;
      if(index == 0){
        positions = [[2, 1], [1, 1]];
        dir = [1, 0];
      }
      else if(index == 1){
        positions = [[this.width - 3, 1], [this.width - 2, 1]];
        dir = [-1, 0];
      }
      else if(index == 2){
        positions = [[2, this.height - 2], [1, this.height - 2]];
        dir = [1, 0];
      }
      else if(index == 3){
        positions = [[this.width - 3, this.height - 2], [this.width - 2, this.height - 2]];
        dir = [-1, 0];
      }
      player.positions = positions;
      player.dir = dir;
    });
    this.start();
  }

  start(){
    this.over = false;
    this.makeApple();


    const self = this;
    this.clock = setInterval(function(){self.tick(self)}, 1000/4);
  }

  tick(self){
    this.testCollisions();
    let alive = [];
    self.players.forEach(player => {
      player.go();
      if(player.alive) alive.push(player);
    });
    if(alive.length == 1){
      this.win(alive[0]);
    }
  }

  random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  makeApple(){
    let pos = [this.random(0, this.width -1), this.random(0, this.height -1)];
    let done = false;
    while(!done){
      this.players.forEach(player => {
        done = !player.hasPos(pos);
      });
    }
    this.apple = pos;
  }

  appleOn(pos){
    return pos[0] == this.apple[0] && pos[1] == this.apple[1];
  }

  eatApple(player){
    player.addLength(3);
    player.addScore(3);
    this.makeApple();
  }

  killPlayer(player){
    player.die();
  }

  testCollisionApple(player){
    return this.appleOn(player.getHead());
  }

  testCollisionPlayers(player){
    let done = false;
    this.players.forEach(user => {
      if(user == player) done = user.hasPos(player.getHead(), true);
      else if(user.hasPos(player.getHead()) && user.alive) done = true;
    });
    if(player.getHead()[0] >= this.width  || player.getHead()[0] < 0) done = true;
    if(player.getHead()[1] >= this.height || player.getHead()[1] < 0) done = true;
    return done;
  }

  testCollisions(){
    this.players.forEach(player => {
      if(this.testCollisionApple(player)) this.eatApple(player);
      if(this.testCollisionPlayers(player)) this.killPlayer(player);
    });
  }

  win(player){
    player.winner = true;
    this.winner = player;
    this.over = true;
    clearInterval(this.clock);
  }
}

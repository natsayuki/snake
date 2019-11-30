const player = new Player({name: 'nice'});
player.positions = [[1, 0], [0, 0]];
const player2 = new Player({name: 'player2'});
player2.positions = [[5, 1], [4, 1]];

const game = new Game({
  players: [player, player2],
  boardElem: document.getElementById('board'),
});

game.restart();

const data = {
  game: game,
}

const methods = {

}

const vm = new Vue({
  el: '#app',
  data: data,
  methods: methods,
});

document.addEventListener('keydown', e => {
  if(e.keyCode == 38) game.players[0].goUp();
  else if(e.keyCode == 37) game.players[0].goLeft();
  else if(e.keyCode == 40) game.players[0].goDown();
  else if(e.keyCode == 39) game.players[0].goRight();
  if(e.keyCode == 87) game.players[1].goUp();
  else if(e.keyCode == 65) game.players[1].goLeft();
  else if(e.keyCode == 83) game.players[1].goDown();
  else if(e.keyCode == 68) game.players[1].goRight();
});

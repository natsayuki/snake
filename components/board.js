Vue.component('board', {
  props: ['game'],
  mounted: function(){

  },
  methods: {

  },
  template: `
  <div class="boardWrapper">

    <table class="board">
      <div class="end-screen" v-if="game.over">
        <h1 class="end-text">Nice job '{{game.winner.name}}'</h1>
        <button @click="game.restart()">restart</button>
      </div>
      <tr class="row" v-for="row in game.height">
        <td class="cell" v-for="cell in game.width" :id="'row' + row + 'cell' + cell">
          <div v-if="game.appleOn([cell -1, row -1])" class="player" style="background-color: red"></div>
          <div
            v-for="(player, index) in game.players"
            v-if="player.hasPos([cell -1, row -1])"
            :class="'player ' + (!player.alive ? 'dying ' : ' ') + (player.winner ? 'winner ' : ' ')"
            :style="'background-color: ' + game.playerColors[index]">
          </div>
        </td>
      </tr>
    </table>
  </div>
  `
});

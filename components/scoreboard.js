Vue.component('scoreboard', {
  props: ['game'],
  mounted: function(){

  },
  methods: {

  },
  template: `
    <div class="scoreboard">
      <div v-if="game.over">
        <div v-for="player in game.players" >
          <div v-if="player == game.winner">
            <span class="scoreboard-name scoreboard-item end-winner">{{player.name}}:</span>
            <span class="scoreboard-score scoreboard-item end-winner">{{player.score}}</span>
          </div>
          <div v-else>
            <span class="scoreboard-name scoreboard-item end-player">{{player.name}}:</span>
            <span class="scoreboard-score scoreboard-item end-player">{{player.score}}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="player in game.players">
          <span class="scoreboard-name scoreboard-item">{{player.name}}:</span>
          <span class="scoreboard-score scoreboard-item">{{player.score}}</span>
        </div>
      </div>
    </div>
  `
});

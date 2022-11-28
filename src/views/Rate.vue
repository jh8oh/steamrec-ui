<template>
  <div id="rate">
    <h1>Rate</h1>
    <ul>
      <li v-for="game in games" :key="game.id">
        <GameView :game="game" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { store } from "@/store";
import { Game } from "@/models/game";

import GameView from "./components/GameView.vue";

@Options({
  components: {
    GameView,
  },
})
export default class Rate extends Vue {
  private games: Game[] = [];

  mounted() {
    this.loadAllGames();
  }

  private loadAllGames() {
    this.games = store.state.ownedGames;
  }
}
</script>

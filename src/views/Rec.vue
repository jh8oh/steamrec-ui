<template>
  <div id="rec">
    <div id="no-rated" v-if="hasNoRatedGames">
      You have not rated any games. Return to the <strong>Rate</strong> tab and
      rate games to get recommendations.
    </div>
    <div v-if="!hasNoRatedGames"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { store } from "@/store";
import { Game } from "@/models/game";

@Options({
  computed: {
    hasNoRatedGames() {
      return this.games.every((game: Game) => game.rating == 0);
    },
  },
})
export default class Rec extends Vue {
  private games: Game[] = [];

  created() {
    this.loadAllGames();
  }

  private loadAllGames() {
    this.games = store.state.ownedGames;
  }
}
</script>

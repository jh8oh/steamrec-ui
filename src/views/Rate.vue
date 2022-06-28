<template>
  <div id="rate">
    <h1>Rate</h1>
    <ul>
      <li v-for="game in games" :key="game.id">
        {{ game.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { store } from "@/store";
import { Game } from "@/models/game";

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

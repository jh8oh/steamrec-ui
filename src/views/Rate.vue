<template>
  <div id="rate">
    <ul id="rate-sort">
      <li
        :class="{ active: sortType == SortType.Name }"
        @click="setSortType(SortType.Name)"
      >
        Name
      </li>
      <li
        :class="{ active: sortType == SortType.MostPlayed }"
        @click="setSortType(SortType.MostPlayed)"
      >
        Most Played
      </li>
      <li
        :class="{ active: sortType == SortType.RecentlyPlayed }"
        @click="setSortType(SortType.RecentlyPlayed)"
      >
        Recently Played
      </li>
    </ul>
    <ul id="rate-games-ul">
      <li v-for="game in sortedGames" :key="game.id">
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

enum SortType {
  Name,
  MostPlayed,
  RecentlyPlayed,
}

@Options({
  components: {
    GameView,
  },
  computed: {
    sortedGames() {
      switch (this.sortType) {
        case SortType.Name:
          return this.games.sort((a: Game, b: Game) =>
            a.name > b.name ? 1 : -1
          );
        case SortType.MostPlayed:
          return this.games.sort((a: Game, b: Game) => b.playtime - a.playtime);
        case SortType.RecentlyPlayed:
          return this.games.sort(
            (a: Game, b: Game) => b.last_played - a.last_played
          );
      }
    },
  },
})
export default class Rate extends Vue {
  private games: Game[] = [];
  private sortType: SortType = SortType.RecentlyPlayed;
  SortType: any = SortType;

  mounted() {
    this.loadAllGames();
  }

  private loadAllGames() {
    this.games = store.state.ownedGames;
  }

  private setSortType(sortType: SortType) {
    this.sortType = sortType;
  }
}
</script>

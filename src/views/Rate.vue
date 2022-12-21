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
    <ul>
      <li
        v-for="[subheading, games] in subheadingsAndGames.entries()"
        :key="subheading"
      >
        <h2>{{ subheading }}</h2>
        <ul class="rate-games-ul">
          <li v-for="game in games" :key="game.id">
            <GameView :game="game" />
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { store } from "@/store";
import { Game } from "@/models/game";
import { getSubheadingAndGames, SortType } from "@/services/sort-games";

import GameView from "./components/GameView.vue";

@Options({
  components: {
    GameView,
  },
  computed: {
    subheadingsAndGames() {
      return getSubheadingAndGames(this.sortType, this.games);
    },
  },
})
export default class Rate extends Vue {
  private games: Game[] = [];
  private sortType: SortType = SortType.RecentlyPlayed;
  SortType: any = SortType;

  created() {
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

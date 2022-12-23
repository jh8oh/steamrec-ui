<template>
  <div id="dashboard" class="view">
    <header>
      <button @click="logout()">Logout</button>
    </header>
    <div id="dashboard-content">
      <nav>
        <ul>
          <li @click="onClickRate()" :class="{ active: isRate }">Rate</li>
          <li @click="onClickRec()" :class="{ active: !isRate }">Recommend</li>
        </ul>
      </nav>
      <div id="dashboard-content-main">
        <Rate v-if="isRate" />
        <Rec v-else />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { store } from "@/store";
import axios from "axios";
import { OwnedGame } from "@/models/game";

import Rate from "@/views/Rate.vue";
import Rec from "@/views/Rec.vue";

class Prop {
  userId!: string;
}

@Options({
  components: {
    Rate,
    Rec,
  },
})
export default class Dashboard extends Vue.with(Prop) {
  private isRate = true;

  created() {
    this.getAllGamesWithRatings();
  }

  private getAllGamesWithRatings() {
    Promise.all([
      axios.get("http://localhost:8080/api/owned-games"),
      axios.get("http://localhost:8080/data/ratings"),
    ]).then(([gameRes, ratingRes]) => {
      const gameData = gameRes.data as [OwnedGame];
      const ratingData = ratingRes.data as [{ gameId: number; rating: number }];

      gameData.forEach((game) => {
        game.rating =
          ratingData.find((rating) => rating.gameId == game.id)?.rating ?? 0;

        store.commit("addOwnedGame", game);
      });
    });
  }

  private onClickRate() {
    this.isRate = true;
  }

  private onClickRec() {
    this.isRate = false;
  }

  private logout() {
    window.location.replace("http://localhost:8080/logout");
    store.commit("clear");
  }
}
</script>

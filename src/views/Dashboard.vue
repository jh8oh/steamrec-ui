<template>
  <div id="dashboard" class="view">
    <header>
      <img
        id="settings-button"
        src="../assets/settings.png"
        @click="openSettingsDialog()"
      />
      <button @click="logout()">Logout</button>
    </header>
    <div id="dashboard-content">
      <Settings
        v-if="settingsDialog"
        @close-dialog="closeSettingsDialog()"
        @wheel.prevent
        @touchmove.prevent
        @scroll.prevent
      />
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
import Settings from "./components/Settings.vue";
import Rate from "./Rate.vue";
import Rec from "./Rec.vue";

@Options({
  components: {
    Settings,
    Rate,
    Rec,
  },
})
export default class Dashboard extends Vue {
  private settingsDialog = false;
  private isRate = true;

  mounted() {
    this.getAllGamesWithRatings();
  }

  private getAllGamesWithRatings() {
    Promise.all([
      axios.get("https://dog-sundress.cyclic.app/api/owned-games"),
      axios.get("https://dog-sundress.cyclic.app/data/ratings"),
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

  private openSettingsDialog() {
    this.settingsDialog = true;
  }

  private closeSettingsDialog() {
    this.settingsDialog = false;
  }

  private logout() {
    window.location.replace("https://dog-sundress.cyclic.app/logout");
    store.commit("clear");
  }
}
</script>

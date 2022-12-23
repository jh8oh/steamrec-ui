<template>
  <figure
    class="game-view"
    :style="{ cursor: isOwnedGame ? 'auto' : 'pointer' }"
    v-if="showGame"
    @click="isOwnedGame ? null : onGameClicked()"
  >
    <img
      class="game-view-cover"
      :src="`https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`"
      @error="hideGame()"
    />
    <div class="game-view-rating-peek" v-if="isOwnedGame" />
    <div class="game-view-rating-system-background" v-if="isOwnedGame" />
    <div class="game-view-rating-system" v-if="isOwnedGame">
      <img
        class="game-view-rating-icon"
        :src="getThumbsDownSrc()"
        @click="onThumbsDownClicked()"
      />
      <img
        class="game-view-rating-icon"
        :src="getThumbsUpSrc()"
        @click="onThumbsUpClicked()"
      />
    </div>
  </figure>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import axios from "axios";
import { store } from "@/store";
import { OwnedGame, RecommendedGame } from "@/models/game";

import thumbsUpUnclicked from "@/assets/thumbs-up-unclicked.png";
import thumbsUpClicked from "@/assets/thumbs-up-clicked.png";
import thumbsDownUnclicked from "@/assets/thumbs-down-unclicked.png";
import thumbsDownClicked from "@/assets/thumbs-down-clicked.png";

class Prop {
  game!: OwnedGame | RecommendedGame;
}

@Options({
  computed: {
    isOwnedGame() {
      return "rating" in this.game;
    },
  },
})
export default class GameView extends Vue.with(Prop) {
  private showGame = true;

  private onGameClicked() {
    window.open(`https://store.steampowered.com/app/${this.game.id}`);
  }

  private onThumbsUpClicked() {
    if ((this.game as OwnedGame).rating == 2) {
      this.rate(0);
    } else {
      this.rate(2);
    }
  }

  private onThumbsDownClicked() {
    if ((this.game as OwnedGame).rating == 1) {
      this.rate(0);
    } else {
      this.rate(1);
    }
  }

  private rate(rating: number) {
    (this.game as OwnedGame).rating = rating;

    axios.post("http://localhost:8080/data/ratings/rate", {
      gameId: this.game.id,
      rating: rating,
    });

    store.commit("rateGame", this.game);
  }

  private getThumbsUpSrc() {
    if ((this.game as OwnedGame).rating == 2) {
      return thumbsUpClicked;
    } else {
      return thumbsUpUnclicked;
    }
  }

  private getThumbsDownSrc() {
    if ((this.game as OwnedGame).rating == 1) {
      return thumbsDownClicked;
    } else {
      return thumbsDownUnclicked;
    }
  }

  private hideGame() {
    this.showGame = false;
  }
}
</script>

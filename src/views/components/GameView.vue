<template>
  <figure class="game-view">
    <img
      :src="`https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`"
    />
    <div class="game-view-rating-peek" />
    <div class="game-view-rating-system">
      <img :src="getThumbsDownSrc()" @click="onThumbsDownClicked()" />
      <img :src="getThumbsUpSrc()" @click="onThumbsUpClicked()" />
    </div>
  </figure>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import axios from "axios";
import { Game } from "@/models/game";

import thumbsUpUnclicked from "@/assets/thumbs-up-unclicked.svg";
import thumbsUpClicked from "@/assets/thumbs-up-clicked.svg";
import thumbsDownUnclicked from "@/assets/thumbs-down-unclicked.svg";
import thumbsDownClicked from "@/assets/thumbs-down-clicked.svg";

class Prop {
  game!: Game;
}

export default class GameView extends Vue.with(Prop) {
  private onThumbsUpClicked() {
    if (this.game.rating == 2) {
      this.rate(0);
    } else {
      this.rate(2);
    }
  }

  private onThumbsDownClicked() {
    if (this.game.rating == 1) {
      this.rate(0);
    } else {
      this.rate(1);
    }
  }

  private rate(rating: number) {
    this.game.rating = rating;

    axios.post("http://localhost:8080/data/ratings/rate", {
      gameId: this.game.id,
      rating: rating,
    });
  }

  private getThumbsUpSrc() {
    if (this.game.rating == 2) {
      return thumbsUpClicked;
    } else {
      return thumbsUpUnclicked;
    }
  }

  private getThumbsDownSrc() {
    if (this.game.rating == 1) {
      return thumbsDownClicked;
    } else {
      return thumbsDownUnclicked;
    }
  }
}
</script>

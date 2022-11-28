<template>
  <figure class="game-view">
    <img
      :src="`https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`"
    />
    <div class="game-view-rating-peek" />
    <div class="game-view-rating-system">
      <img :src="getThumbsDownSrc()" />
      <img :src="getThumbsUpSrc()" />
    </div>
  </figure>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Game } from "@/models/game";

import thumbsUpUnclicked from "@/assets/thumbs-up-unclicked.svg";
import thumbsUpClicked from "@/assets/thumbs-up-clicked.svg";
import thumbsDownUnclicked from "@/assets/thumbs-down-unclicked.svg";
import thumbsDownClicked from "@/assets/thumbs-down-clicked.svg";

class Prop {
  game!: Game;
}

export default class GameView extends Vue.with(Prop) {
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

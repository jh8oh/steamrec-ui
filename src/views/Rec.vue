<template>
  <div id="rec">
    <div id="no-rated" v-if="hasNoRatedGames">
      You have not rated any games. Return to the <strong>Rate</strong> tab and
      rate games to get recommendations.
    </div>
    <div v-if="!hasNoRatedGames">
      <ul id="rec-filter">
        <li>
          <span>Type</span>
          <ul>
            <li v-for="type in allTypes" :key="type">
              <input
                type="checkbox"
                :id="type"
                :value="type.toLowerCase()"
                v-model.lazy="filters.type"
              />
              <label :for="type">{{ type }}</label>
            </li>
          </ul>
        </li>
        <li>
          <label for="released">Released</label>
          <input
            type="checkbox"
            id="released"
            v-model.lazy="filters.released"
          />
        </li>
        <li>
          <label for="recommendations">Recommendations</label>
          <input
            type="range"
            id="recommendations"
            min="0"
            max="10"
            v-model.lazy="recommendations"
          />
        </li>
        <li>
          <span>Metacritic Score</span>
          <input
            type="radio"
            id="acclaim"
            value="90"
            v-model.lazy="filters.metacritic"
          />
          <label for="acclaim">Universal Acclaim</label>
          <input
            type="radio"
            id="favorable"
            value="75"
            v-model.lazy="filters.metacritic"
          />
          <label for="favorable">Generally Favorable Reviews</label>
          <input
            type="radio"
            id="mixed"
            value="50"
            v-model.lazy="filters.metacritic"
          />
          <label for="mixed">Mixed or Average Reviews</label>
          <input
            type="radio"
            id="unfavorable"
            value="20"
            v-model.lazy="filters.metacritic"
          />
          <label>Generally Unfavorable Reviews</label>
          <input
            type="radio"
            id="disliked"
            value="0"
            v-model.lazy="filters.metacritic"
          />
          <label>Overwhelming Dislike</label>
        </li>
        <li>
          <label for="adult">Include adult games</label>
          <input type="checkbox" id="adult" v-model.lazy="filters.adult" />
        </li>
      </ul>
      <div>{{ filters }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { store } from "@/store";
import { Game } from "@/models/game";
import { Filter } from "@/models/filter";

@Options({
  computed: {
    hasNoRatedGames() {
      return this.games.every((game: Game) => game.rating == 0);
    },
  },
})
export default class Rec extends Vue {
  private readonly allTypes = [
    "Game",
    "DLC",
    "Mod",
    "Music",
    "Demo",
    "Hardware",
    "Video",
    "Movie",
    "Series",
    "Episode",
    "Advertising",
  ];

  private games: Game[] = [];
  private filters: Filter = {
    type: ["game", "dlc"],
    released: true,
    recommendations: 200000,
    metacritic: 75,
    adult: false,
  };

  created() {
    this.loadAllGames();
  }

  private loadAllGames() {
    this.games = store.state.ownedGames;
  }

  // Getters & Setters

  private get recommendations() {
    return this.filters.recommendations / 200000;
  }

  private set recommendations(value) {
    this.filters.recommendations = value * 200000;
  }
}
</script>

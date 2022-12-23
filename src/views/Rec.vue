<template>
  <div id="rec">
    <div id="no-rated" v-if="hasNoRatedGames">
      You have not rated any games. Return to the <strong>Rate</strong> tab and
      rate games to get recommendations.
    </div>
    <div id="rated" v-if="!hasNoRatedGames">
      <aside id="rec-filter">
        <div id="rec-filter-wrapper">
          <ul>
            <li>
              <span class="filter-title">Type</span>
              <ul class="filter-types-ul">
                <li v-for="type in allTypes" :key="type">
                  <input
                    type="checkbox"
                    :id="type"
                    :value="type.toLowerCase()"
                    v-model.lazy="filter.type"
                  />
                  <label :for="type" class="filter-radio-label">{{
                    type
                  }}</label>
                </li>
              </ul>
            </li>
            <li>
              <input
                type="checkbox"
                id="released"
                v-model.lazy="filter.released"
              />
              <label for="released" class="filter-title">Released</label>
            </li>
            <li>
              <label for="recommendations-range" class="filter-title">
                Recommendations
              </label>
              <span id="recommendations-range-value">
                &gt;{{ filter.recommendations }}
              </span>
              <input
                type="range"
                id="recommendations-range"
                min="0"
                max="10"
                v-model.lazy="recommendations"
              />
            </li>
            <li>
              <span class="filter-title">Metacritic Score</span>
              <ul>
                <li>
                  <input
                    type="radio"
                    id="acclaim"
                    value="90"
                    v-model.lazy="filter.metacritic"
                  />
                  <label for="acclaim" class="filter-radio-label">
                    Universal&nbsp;Acclaim
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="favorable"
                    value="75"
                    v-model.lazy="filter.metacritic"
                  />
                  <label for="favorable" class="filter-radio-label">
                    Generally&nbsp;Favorable&nbsp;Reviews
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="mixed"
                    value="50"
                    v-model.lazy="filter.metacritic"
                  />
                  <label for="mixed" class="filter-radio-label">
                    Mixed&nbsp;or&nbsp;Average&nbsp;Reviews
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="unfavorable"
                    value="20"
                    v-model.lazy="filter.metacritic"
                  />
                  <label for="unfavorable" class="filter-radio-label">
                    Generally&nbsp;Unfavorable&nbsp;Reviews
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="disliked"
                    value="0"
                    v-model.lazy="filter.metacritic"
                  />
                  <label for="disliked" class="filter-radio-label">
                    Overwhelming&nbsp;Dislike
                  </label>
                </li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="adult" v-model.lazy="filter.adult" />
              <label for="adult" class="filter-title"
                >Include adult games</label
              >
            </li>
          </ul>
          <button id="refresh-button" @click="refreshRecWithNewFilter()">
            Refresh
          </button>
        </div>
      </aside>
      <section id="rec-content">
        <ul id="rec-content-ul">
          <li v-for="game in recommendedGames" :key="game.id">
            <GameView :game="game" />
          </li>
        </ul>
        <button @click="moreRec()">More</button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { store } from "@/store";
import axios from "axios";

import { OwnedGame, RecommendedGame } from "@/models/game";
import { Filter, defaultFilter } from "@/models/filter";

import GameView from "./components/GameView.vue";

@Options({
  components: {
    GameView,
  },
  computed: {
    hasNoRatedGames() {
      return this.games.every((game: OwnedGame) => game.rating == 0);
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

  private games: OwnedGame[] = [];
  private filter: Filter = defaultFilter;

  private recommendedGames: RecommendedGame[] = [];

  created() {
    this.loadOwnedGames();
    this.loadFilter();
    this.loadRecommendedGames();
  }

  private loadOwnedGames() {
    this.games = store.state.ownedGames;
  }

  private loadFilter() {
    this.filter = store.state.filter;
  }

  private loadRecommendedGames() {
    if (
      store.state.recommendedGames.length == 0 ||
      store.state.isRatingUpdateNeeded
    ) {
      axios
        .post("http://localhost:8080/data/recommend", {
          ownedGames: this.games.map((it) => ({
            id: it.id,
            rating: it.rating,
          })),
          filter: this.filter,
        })
        .then((res) => {
          this.setRecommendedGames(res.data as RecommendedGame[], true);
          store.commit("resetIsRatingUpdateNeeded");
        });
    } else {
      this.recommendedGames = store.state.recommendedGames;
    }
  }

  private refreshRecWithNewFilter() {
    axios
      .post("http://localhost:8080/data/recommend/update", {
        filter: this.filter,
      })
      .then((res) => {
        this.setRecommendedGames(res.data as RecommendedGame[]);
      });
  }

  private moreRec() {
    axios.get("http://localhost:8080/data/recommend/more").then((res) => {
      this.setRecommendedGames(res.data as RecommendedGame[]);
    });
  }

  // Getters & Setters

  private get recommendations() {
    return this.filter.recommendations / 500;
  }

  private set recommendations(value) {
    this.filter.recommendations = value * 500;
  }

  private setRecommendedGames(value: RecommendedGame[], clearPrevious = false) {
    this.recommendedGames = value;

    if (clearPrevious) store.commit("clearRecommendedGames");
    value.forEach((it) => {
      store.commit("addRecommendedGame", it);
    });
  }
}
</script>

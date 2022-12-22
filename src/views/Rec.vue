<template>
  <div id="rec">
    <div id="no-rated" v-if="hasNoRatedGames">
      You have not rated any games. Return to the <strong>Rate</strong> tab and
      rate games to get recommendations.
    </div>
    <div id="rated" v-if="!hasNoRatedGames">
      <aside id="rec-filter">
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
                <label :for="type" class="filter-radio-label">{{ type }}</label>
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
            <label for="recommendations" class="filter-title">
              Recommendations
            </label>
            <span id="recommendations-value">
              &gt;{{ filter.recommendations }}
            </span>
            <input
              type="range"
              id="recommendations"
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
            <label for="adult" class="filter-title">Include adult games</label>
          </li>
        </ul>
      </aside>
      <div>{{ filter }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { store } from "@/store";
import { Game } from "@/models/game";
import { Filter, defaultFilter } from "@/models/filter";

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
  private filter: Filter = defaultFilter;

  created() {
    this.loadAllGames();
    this.loadFilter();
  }

  private loadAllGames() {
    this.games = store.state.ownedGames;
  }

  private loadFilter() {
    this.filter = store.state.filter;
  }

  // Getters & Setters

  private get recommendations() {
    return this.filter.recommendations / 200000;
  }

  private set recommendations(value) {
    this.filter.recommendations = value * 200000;
  }
}
</script>

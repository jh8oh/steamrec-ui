import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { OwnedGame, RecommendedGame } from "@/models/game";
import { Filter, defaultFilter } from "@/models/filter";

interface State {
  ownedGames: OwnedGame[];
  filter: Filter;
  recommendedGames: RecommendedGame[];
  isRatingUpdateNeeded: boolean;
}

const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    ownedGames: [],
    filter: defaultFilter,
    recommendedGames: [],
    isRatingUpdateNeeded: false,
  },
  mutations: {
    init(state) {
      const filter = localStorage.getItem("filter");
      if (filter != null) {
        state.filter = JSON.parse(filter);
      }
    },
    addOwnedGame(state, game: OwnedGame) {
      state.ownedGames.push(game);
    },
    rateGame(state, gameWithNewRating: OwnedGame) {
      state.ownedGames.map((game) => {
        if (game.id == gameWithNewRating.id) {
          return gameWithNewRating;
        }
        return game;
      });
      state.isRatingUpdateNeeded = true;
    },
    setFilter(state, filter: Filter) {
      state.filter = filter;
      localStorage.setItem("filter", JSON.stringify(filter));
    },
    addRecommendedGame(state, recommendedGame: RecommendedGame) {
      if (!state.recommendedGames.includes(recommendedGame)) {
        state.recommendedGames.push(recommendedGame);
      }
    },
    clearRecommendedGames(state) {
      state.recommendedGames = [];
    },
    resetIsRatingUpdateNeeded(state) {
      state.isRatingUpdateNeeded = false;
    },
    clear(state) {
      state.ownedGames = [];
      state.filter = defaultFilter;
      state.recommendedGames = [];
      state.isRatingUpdateNeeded = false;
    },
  },
});

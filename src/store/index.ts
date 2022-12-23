import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { OwnedGame } from "@/models/game";
import { Filter, defaultFilter } from "@/models/filter";
import { FullRating } from "@/models/rating";

interface State {
  ownedGames: OwnedGame[];
  filter: Filter;
  fullRating: FullRating | null;
  isRatingUpdateNeeded: boolean;
}

const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    ownedGames: [],
    filter: defaultFilter,
    fullRating: null,
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
    setFullRating(state, fullRating: FullRating) {
      state.fullRating = fullRating;
      state.isRatingUpdateNeeded = false;
    },
    setFilter(state, filter: Filter) {
      state.filter = filter;
      localStorage.setItem("filter", JSON.stringify(filter));
    },
    clear(state) {
      state.ownedGames = [];
      state.filter = defaultFilter;
    },
  },
});

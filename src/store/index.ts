import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { Game } from "@/models/game";
import { Filter, defaultFilter } from "@/models/filter";

interface State {
  ownedGames: Game[];
  filter: Filter;
}

const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    ownedGames: [],
    filter: defaultFilter,
  },
  mutations: {
    init(state) {
      const filter = localStorage.getItem("filter");
      if (filter != null) {
        state.filter = JSON.parse(filter);
      }
    },
    addOwnedGame(state, game: Game) {
      state.ownedGames.push(game);
    },
    rateGame(state, gameWithNewRating: Game) {
      state.ownedGames.map((game) => {
        if (game.id == gameWithNewRating.id) {
          return gameWithNewRating;
        }
        return game;
      });
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

import { Game } from "@/models/game";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

interface State {
  ownedGames: Game[];
}

const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    ownedGames: [],
  },
  mutations: {
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
    clear(state) {
      state.ownedGames = [];
    },
  },
});

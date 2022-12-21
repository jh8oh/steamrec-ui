import { Game } from "@/models/game";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const playTimeDisplay = [
  "Over 1000 hours",
  "Over 100 hours",
  "Over 60 hours",
  "Over 40 hours",
  "Over 20 hours",
  "Over 10 hours",
  "Over 1 hour",
  "Under 1 hour",
  "Unplayed",
];
const playTimeSeconds = [
  [Number.MAX_SAFE_INTEGER, 60000],
  [60000, 6000],
  [6000, 3600],
  [3600, 2400],
  [2400, 1200],
  [1200, 600],
  [600, 60],
  [60, 1],
  [1, 0],
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const thisYear = new Date().getFullYear();
const years = generateYears();

export enum SortType {
  Name,
  MostPlayed,
  RecentlyPlayed,
}

export function getSubheadingAndGames(sortType: SortType, games: Game[]) {
  const map = new Map();
  switch (sortType) {
    case SortType.Name:
      alphabet.forEach((alpha) => {
        const arr = games
          .filter((game) => game.name.charAt(0).toUpperCase() == alpha)
          .sort((a, b) => (a.name > b.name ? 1 : -1));

        if (arr.length != 0) {
          map.set(alpha, arr);
        }
      });

      return map;
    case SortType.MostPlayed:
      playTimeSeconds.forEach((duration, idx) => {
        const arr = games
          .filter(
            (game) =>
              game.playtime < duration[0] && game.playtime >= duration[1]
          )
          .sort((a, b) => b.playtime - a.playtime);

        if (arr.length != 0) {
          map.set(playTimeDisplay[idx], arr);
        }
      });

      return map;
    case SortType.RecentlyPlayed:
      [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].forEach((month) => {
        const arr = games
          .filter((game) => {
            const lastPlayedDate = new Date(game.last_played * 1000);
            return (
              lastPlayedDate.getFullYear() == thisYear &&
              lastPlayedDate.getMonth() == month
            );
          })
          .sort((a, b) => b.last_played - a.last_played);

        if (arr.length != 0) {
          map.set(months[month - 1], arr);
        }
      });

      years.forEach((year) => {
        const arr = games
          .filter(
            (game) => new Date(game.last_played * 1000).getFullYear() == year
          )
          .sort((a, b) => b.last_played - a.last_played);

        if (arr.length != 0) {
          map.set(year, arr);
        }
      });

      return map;
  }
}

function generateYears() {
  let startYear = thisYear - 1;
  const endYear = 2003;
  const years = [];

  for (; startYear >= endYear; startYear--) {
    years.push(startYear);
  }

  return years;
}

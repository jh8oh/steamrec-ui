export interface OwnedGame {
  id: number;
  name: string;
  playtime: number;
  last_played: number;
  rating: number;
}

export interface RecommendedGame {
  id: number;
  name: string;
  score: number;
}

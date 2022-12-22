export interface Filter {
  type: string[];
  released: boolean;
  recommendations: number;
  metacritic: number;
  adult: boolean;
}

export const defaultFilter: Filter = {
  type: ["game", "dlc"],
  released: true,
  recommendations: 200000,
  metacritic: 75,
  adult: false,
};

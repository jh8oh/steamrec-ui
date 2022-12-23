export interface Filter {
  type: string[];
  released: boolean;
  recommendations: { value: number; acceptNull: boolean };
  metacritic: { value: number; acceptNull: boolean };
  adult: boolean;
}

export const defaultFilter: Filter = {
  type: ["game", "dlc"],
  released: true,
  recommendations: { value: 1000, acceptNull: false },
  metacritic: { value: 75, acceptNull: false },
  adult: false,
};

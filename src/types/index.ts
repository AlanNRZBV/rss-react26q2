export type PokemonCardData = {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
  };
};

export type PokemonDetailedData = PokemonCardData & {
  weight: number;
  height: number;
  abilities: string[];
};

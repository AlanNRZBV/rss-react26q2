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

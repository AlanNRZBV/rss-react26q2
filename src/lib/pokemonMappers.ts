import type { PokemonCardData, PokemonDetailedData } from '../types/types.ts';

export type RawStat = { stat: { name: string }; base_stat: number };
export type RawAbility = { ability: { name: string } };
export type RawType = { type: { name: string } };
export type RawSprites = {
  front_default: string;
  other: { 'official-artwork': { front_default: string } };
};

export type PokeAPIDetails = {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: RawSprites;
  types: RawType[];
  stats: RawStat[];
  abilities: RawAbility[];
};

export function formatPokemonData(details: PokeAPIDetails): PokemonCardData {
  return {
    id: details.id,
    name: details.name,
    imageUrl:
      details.sprites.other['official-artwork'].front_default ||
      details.sprites.front_default,
    types: details.types.map((t: RawType) => t.type.name),
    stats: {
      hp:
        details.stats.find((s: RawStat) => s.stat.name === 'hp')?.base_stat ??
        0,
      attack:
        details.stats.find((s: RawStat) => s.stat.name === 'attack')
          ?.base_stat ?? 0,
    },
  };
}

export function formatDetailedPokemonData(
  details: PokeAPIDetails
): PokemonDetailedData {
  return {
    ...formatPokemonData(details),
    weight: details.weight,
    height: details.height,
    abilities: details.abilities.map((a: RawAbility) => a.ability.name),
  };
}

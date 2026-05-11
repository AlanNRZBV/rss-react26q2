import type { PokemonCardData } from '../../types';

export const mockPokemon: PokemonCardData = {
  id: 25,
  name: 'pikachu',
  imageUrl:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  types: ['electric', 'normal'],
  stats: {
    hp: 35,
    attack: 55,
  },
};

export const mockPokemonList: PokemonCardData[] = [
  {
    id: 1,
    name: 'bulbasaur',
    imageUrl: 'url1',
    types: ['grass'],
    stats: { hp: 45, attack: 49 },
  },
  {
    id: 4,
    name: 'charmander',
    imageUrl: 'url2',
    types: ['fire'],
    stats: { hp: 39, attack: 52 },
  },
];

export const rawPokemonResponse = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'url',
    other: { 'official-artwork': { front_default: 'url' } },
  },
  types: [{ type: { name: 'grass' } }],
  stats: [
    { stat: { name: 'hp' }, base_stat: 45 },
    { stat: { name: 'attack' }, base_stat: 49 },
  ],
};

export const pokemonListApiResponse = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
  ],
};

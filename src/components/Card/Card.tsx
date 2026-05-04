import { Component } from 'react';
import type { PokemonCardData } from '../../types';

type Props = {
  pokemon: PokemonCardData;
};

class Card extends Component<Props> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm flex flex-col items-center gap-2">
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="h-24 w-24 object-contain"
        />
        <h3 className="capitalize font-semibold text-gray-800">
          {pokemon.name}
        </h3>
        <div className="flex gap-1 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 capitalize"
            >
              {type}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-600 w-full">
          <p>HP: {pokemon.stats.hp}</p>
          <p>Attack: {pokemon.stats.attack}</p>
        </div>
      </div>
    );
  }
}

export default Card;

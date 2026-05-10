import { Component } from 'react';
import Card from '../Card/Card.tsx';
import { fetchPokemons } from '../../api/pokemons.ts';
import type { CardListProps, CardListState } from './CardList.types.ts';

class CardList extends Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);
    this.state = { pokemons: [], loading: false, error: null };
  }

  componentDidMount() {
    this.loadPokemons();
  }

  componentDidUpdate(prevProps: CardListProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.loadPokemons();
    }
  }

  async loadPokemons() {
    this.setState({ loading: true, error: null });
    try {
      const pokemons = await fetchPokemons(this.props.searchTerm);
      this.setState({ pokemons, loading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong.';
      this.setState({ error: message, loading: false });
    }
  }

  render() {
    const { loading, error, pokemons } = this.state;

    if (loading) {
      return (
        <main className="flex justify-center items-center py-16 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </main>
      );
    }

    if (error) {
      return (
        <main className="py-8 text-center text-red-600 rounded-2xl border border-gray-200 bg-white shadow-sm">
          <p>{error}</p>
        </main>
      );
    }

    if (pokemons.length === 0) {
      return (
        <main className="py-16 text-center rounded-2xl border border-gray-200 bg-white shadow-sm">
          <p className="text-gray-500 font-medium">No results</p>
        </main>
      );
    }

    return (
      <main className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </main>
    );
  }
}

export default CardList;

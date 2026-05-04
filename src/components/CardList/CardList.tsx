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
        <div className="flex justify-center items-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      );
    }

    if (error) {
      return (
        <div className="py-8 text-center text-red-600">
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    );
  }
}

export default CardList;

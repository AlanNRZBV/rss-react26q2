import { Component } from 'react';
import Layout from './components/Layout/Layout.tsx';
import Header from './components/Header/Header.tsx';
import CardList from './components/CardList/CardList.tsx';
import CustomButton from './components/UI/CustomButton/CustomButton.tsx';
import type { AppState } from './App.types.ts';
import { STORAGE_KEY } from './lib/constants.ts';

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const saved = localStorage.getItem(STORAGE_KEY) ?? '';
    this.state = {
      throwError: false,
      searchTerm: saved,
      activeSearchTerm: saved,
    };
    this.handleSimulateError = this.handleSimulateError.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSimulateError() {
    console.error('Simulated error triggered by user');
    this.setState({ throwError: true });
  }

  handleSearchChange(value: string) {
    this.setState({ searchTerm: value });
  }

  handleSearch() {
    const trimmedTerm = this.state.searchTerm.trim();

    localStorage.setItem(STORAGE_KEY, trimmedTerm);
    this.setState({
      activeSearchTerm: trimmedTerm,
      searchTerm: trimmedTerm,
    });
  }

  render() {
    if (this.state.throwError) {
      throw new Error('Simulated application error');
    }
    return (
      <Layout>
        <Header
          searchTerm={this.state.searchTerm}
          onSearchChange={this.handleSearchChange}
          onSearch={this.handleSearch}
        />
        <CardList searchTerm={this.state.activeSearchTerm} />
        <CustomButton
          onClick={this.handleSimulateError}
          className="self-end bg-red-200"
        >
          Simulate Error
        </CustomButton>
      </Layout>
    );
  }
}

export default App;

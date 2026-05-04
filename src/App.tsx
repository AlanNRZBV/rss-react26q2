import { Component } from 'react';
import Layout from './components/Layout/Layout.tsx';
import Header from './components/Header/Header.tsx';
import CardList from './components/CardList/CardList.tsx';
import CustomButton from './components/UI/CustomButton/CustomButton.tsx';
import type { AppState } from './App.types.ts';

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = { throwError: false };
    this.handleSimulateError = this.handleSimulateError.bind(this);
  }

  handleSimulateError() {
    console.error('Simulated error triggered by user');
    this.setState({ throwError: true });
  }

  render() {
    if (this.state.throwError) {
      throw new Error('Simulated application error');
    }
    return (
      <Layout>
        <Header />
        <CardList />
        <CustomButton onClick={this.handleSimulateError}>
          Simulate Error
        </CustomButton>
      </Layout>
    );
  }
}

export default App;

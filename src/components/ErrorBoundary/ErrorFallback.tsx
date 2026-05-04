import { Component } from 'react';

interface Props {
  error: Error;
  resetError: () => void;
}

class ErrorFallback extends Component<Props> {
  render() {
    const { error, resetError } = this.props;
    return (
      <div>
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={resetError}>Try again</button>
      </div>
    );
  }
}

export default ErrorFallback;

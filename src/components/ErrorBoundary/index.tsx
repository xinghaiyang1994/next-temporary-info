import React from 'react';

import ErrorUI from './components/ErrorUI';

interface IProps {
  children: React.ReactNode;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<IProps, IState> {
  state: IState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(
    error: Error,
    errorInfo: {
      componentStack: string;
    }
  ) {
    console.log('==>ErrorBoundary', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorUI />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

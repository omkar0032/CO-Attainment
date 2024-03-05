import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  // Guideline 1: Always define the initial state in the constructor
  // and avoid directly mutating the state

  // Guideline 2: Use lifecycle methods when necessary
  componentDidMount() {
    // Perform any side effects (e.g., API calls, subscriptions) here
  }

  // Guideline 3: Define event handlers and other functions
  // outside of the render method for better readability
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  handleDecrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    // Guideline 4: Always return a single root element
    return (
      <div>
        {/* Guideline 5: Use JSX syntax to define UI elements */}
        <h1>Counter: {this.state.count}</h1>
        {/* Guideline 6: Attach event handlers to elements */}
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>
        {/* Guideline 7: Use props to make components reusable */}
        <ChildComponent />
      </div>
    );
  }
}

// Guideline 8: Use functional components whenever possible
function ChildComponent() {
  return (
    <div>
      <h2>Child Component</h2>
    </div>
  );
}

export default MyComponent;

// Guideline 9: Use export default to export a single component from a file

// Guideline 10: Follow consistent naming conventions for components

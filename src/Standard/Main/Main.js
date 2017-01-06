import React, { Component } from 'react';

import './Main.css';

import Logo from './../Logo/Logo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Logo />
          <h2>Welcome to React</h2>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default App;

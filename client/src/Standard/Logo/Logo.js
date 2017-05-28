import React, { Component } from 'react';

import logo from './logo.svg';
import './Logo.css';

class App extends Component {
  render() {
    return (
      <div >
          <img src={logo} className="header-logo" alt="logo" />
      </div>
    );
  }
}

export default App;

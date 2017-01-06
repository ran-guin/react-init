import React, { Component } from 'react';
import './Login.css';

class App extends Component {
  render() {
    return (
      <div className='LoginBox'>
        <h3>Login</h3>
      </div>
    );
  }
}

App.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default App;
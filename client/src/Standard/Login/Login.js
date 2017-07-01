import React, { Component } from 'react';
import './Login.css';
import PropTypes from 'prop-types'; 

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
  name: PropTypes.string
}

export default App;
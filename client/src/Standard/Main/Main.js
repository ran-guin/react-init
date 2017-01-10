import React, { Component } from 'react';

import './Main.css';

// import Sequelize from 'sequelize';
import Logo from './../Logo/Logo';

class App extends Component {
    
  static propTypes = {
    title: React.PropTypes.string,
    username: React.PropTypes.string
  }
  static defaultProps = {
    title: 'Specified Default Title'
  }

  // constructor() {
  //   super();
  //   // this.setUsername = this.setUsername.bind(this);
  // }

  componentWillMount(props) {
    // alert('did mount');
  }

  componentDidMount(props) { 
    console.log("call api to load data"); 
 }

  componentWillUnmount(props) {
    // alert('will unmount');
  }  
  componentWillUpdate(props) {
    // alert('will update');
  }

  setUsername = e => {
    this.setState( { username: e.target.value} );
    // alert('reset username to ' + this.props.username);
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Logo />
          <h2>{this.props.title}</h2>
        </div>
        {this.props.children}
        <h5>U: {this.props.username}</h5>
        <input type='text' placeholder='Username' />
      </div>
    );
  }
}

export default App;

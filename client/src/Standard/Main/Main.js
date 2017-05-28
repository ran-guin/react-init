import React, { Component } from 'react';

import './Main.css';
import dh from './../Logo/doublehelix.gif';

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
          <h1>{this.props.username}</h1>
          <h2>{this.props.title}</h2>
        </div>
        <table width='100%' height='100%'>
          <tbody>
          <tr>
            <td width='100px'>
              <img src={dh} />
            </td>
            <td>
              {this.props.children}
            </td>
            <td width='100px'>
              <img src={dh} />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

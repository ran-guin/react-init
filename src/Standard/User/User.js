import React, { Component } from 'react';
import './User.css';

import List from './../List/List';

const interests = ['Sport', 'Hiking', 'Photography'];
const skills = ['Climbing', 'Volleyball', 'Dance'];
const name = 'Johann';

class App extends Component {

  render() {
    var userid = this.props.params.userid;
    
    return (
      <div className='UserProfile'>
        <h3>{name} : {userid}</h3>
        <List className='ListBox' name='Interests' list={interests} />
        <p />
        <List className='ListBox' name='Skills' list={skills} />
 
      </div>
    );
  }
}

App.propTypes = {
  // name: React.PropTypes.string.isRequired
}

export default App;
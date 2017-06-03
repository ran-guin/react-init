import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import './Visit.css';

import Menu from './../Standard/List/Menu';
import Subject from './Subject';
import Schedule from './Schedule';

// import Sequelize from 'sequelize';
// import Logo from './Logo';

const subject = observable({ id: 0, name: '', details: {} });
var scheduled = observable( { vaccine: '' });
var focus = observable( { context: '', id: ''});

const menu = observable( {options: ['dashboard', 'history', 'scheduled'], selected: 'dashboard'});

var search = {table: 'vaccine', fields: ['name']}
const selectOne = observable( { subject: subject, name: 'TBD', id: 0, label: {}, status: 'search' });


const App = observer(
class App extends Component {
    
  static propTypes = {
    title: React.PropTypes.string,
  }

  static defaultProps = {
    title: 'Vaccination / Immunization UI'
  }

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

  load_Visits() {
    console.log('load visits');
  }

  render() {
    var activate_dropdown = true;
    var selected = menu.selected;

    let section = null;

    var patient = <Subject id={subject.id} />

    if (selected === 'dashboard') {
      // ... subject displayed in section above... 
    } 
    else if (selected === 'history') {
      section = <div>History Page...</div>
    }
    else if (selected === 'scheduled') {
      section = (
        <div>
          Schedule page...
          <Schedule user_id={selectOne.subject.id} />
        </div>);
    }
    else { section = <div> Undefined Page: {selected}</div> }

    return (
      <div className="VisitPage">
        <div className="Visit-header">
          <h2>{this.props.title}</h2>
          {patient}
          <div className='VisitSubSection'>
            <Menu menu={menu} />          
            {section}
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
});

export default App;

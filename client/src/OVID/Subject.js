import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import './Subject.css';

import SearchGrid from './../Standard/SearchGrid/SearchGrid';
import Menu from './../Standard/List/Menu';


var subject = observable( { id: 0, name: 'TBD', loaded: false, details: {} });
const menu = observable( {options: ['user', 'search', 'history', 'scheduled'], selected: 'user'});

var search = {table: 'user', fields: ['name','email']}
const selectOne = observable( { subject: subject, name: 'TBD', id: 0, label: {}, status: 'search' });

const App = observer(
class App extends Component {
    
  static propTypes = {
    title: React.PropTypes.string,
    id: React.PropTypes.number,
    subject: React.PropTypes.object,
  }

  static defaultProps = {
    title: 'User Section',
    subject: { 
      id: 0,
      name : 'TBD',
    },
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

  load_Subjects() {
    console.log('load visits');
  }

  searchUsers() {
    console.log('search users');
    menu.selected = 'search';
    selectOne.status = 'search';
  }

  load_Subject() {
    menu.selected = 'user';
  }

  cancelSearch() {
    menu.selected = 'user';
    selectOne.status = 'search';
  }

  render() {

    var selected = menu.selected;
    
    console.log("Re render user");
    console.log(JSON.stringify(selectOne));
    var section = null;

    if (selected === 'search' && selectOne.status != 'picked') {
      section = <SearchGrid table={search.table} fields={search.fields} show={search.show} selectOne={selectOne} />
    }
    else if (selected === 'search' && selectOne.status=='picked') {
      section = (
        <div className="SubjectHeader">
          {selectOne.subject.id ? <b>{selectOne.subject.id} = {selectOne.subject.name}</b> : <button onClick={this.searchUsers.bind(this)}>load User</button>}
          <b>Status = {selectOne.status}</b>
          <button onClick={this.loadSubject}>Load User Data</button>
          <button onClick={this.cancelSearch}>Cancel</button>
        </div>);               
    }
    else if (selectOne.subject.id) {
      // subject.name = selectOne.name;
      section = (
        <div className="SubjectHeader">
          {selectOne.subject.id ? <div><b>{selectOne.subject.id} = {selectOne.subject.name}</b> M={menu.selected}</div> : <button onClick={this.searchUsers.bind(this)}>load User</button>}
          <Menu menu={menu} />
        </div>);         
    }
    // else if (selected === 'user') {
    //   section = <b>User: {subject.id} : { subject.name } </b>         
    // } 
    else { 
      console.log("null user ... nothing displayed")
      section = (<div className="SubjectHeader">
                  <button onClick={this.searchUsers.bind(this)}>load User</button> 
                </div>);
    }

    return (
      <div className="SubjectPage">
        <div >
          {section}
        </div>
        {this.props.children}
      </div>
    );
  }
});

export default App;

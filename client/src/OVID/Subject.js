import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'; 

import './Subject.css';

import SearchGrid from './../Standard/SearchGrid/SearchGrid';
import Menu from './../Standard/List/Menu';


var subject = observable( { id: 0, name: '', loaded: false, details: {} });
const menu = observable( {options: ['user', 'search', 'history', 'scheduled'], selected: 'user'});

var search = {url: 'http://localhost:3002/lookup/search', table: 'user', fields: ['name','email']}
const selectOne = observable( { subject: subject, name: '', id: 0, label: {}, status: 'search' });

const App = observer(
class App extends Component {
    
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

  new_Subject() {
    menu.selected = 'search';
    selectOne.id = '';
    selectOne.name = '';
    selectOne.status = 'search';
    // selectOne = { subject: subject, name: '', id: 0, label: {}, status: 'search' };
  }

  load_Subject() {
    menu.selected = 'user';
    selectOne.status = 'search';
  }

  reset_Subject() {
    
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

    var prompt = "Enter Name or Health Care ID";

    if (selected === 'search' && selectOne.status !== 'picked') {
      section = <SearchGrid url={search.url} table={search.table} fields={search.fields} show={search.show} prompt={prompt} selectOne={selectOne} />
    }
    else if (selected === 'search' && selectOne.subject && selectOne.subject.id) {
      section = (
        <div className='SubjectHeader alert-success'>
          Current Subject: {selectOne.subject.id ? <div><b>{selectOne.subject.name}</b> [{selectOne.subject.id}] &nbsp; &nbsp; </div> : <button onClick={this.searchUsers.bind(this)}>load User</button>}
          <button onClick={this.new_Subject}>New User</button>
          <button onClick={this.cancelSearch}>Cancel</button>
        </div>);               
    }
    else if (selectOne.subject.id) {
      // subject.name = selectOne.name;
      section = (
        <div className='SubjectHeader alert-success'>
          { selectOne.subject.id ? <div><b>{selectOne.subject.name}</b> [{selectOne.subject.id}]  </div> : <button onClick={this.searchUsers.bind(this)}> New User</button>}
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

  App.propTypes = {
    title: PropTypes.string,
    id: PropTypes.number,
    subject: PropTypes.object,
  }

export default App;

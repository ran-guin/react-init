import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import './Schedule.css';

import SearchGrid from './../Standard/SearchGrid/SearchGrid';
import Menu from './../Standard/List/Menu';


var subject = observable( { id: 0, name: 'TBD', loaded: false, details: {} });
const menu = observable( {options: ['user', 'search', 'history', 'scheduled'], selected: 'user'});

var search = {table: 'user', fields: ['name','email']}
const selectOne = observable( { subject: subject, name: 'TBD', id: 0, label: {}, status: 'search' });

const App = observer(
class App extends Component {
    
  static propTypes = {
    user_id: React.PropTypes.number,
  }

  static defaultProps = {
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

  load_Schedules() {
    console.log('load visits');
  }

  searchVaccines() {
    console.log('search users');
    menu.selected = 'search';
    selectOne.status = 'search';
  }

  load_Schedule() {
    menu.selected = 'user';
  }

  addToSchedule() {
    console.log('add to schedule');
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
      // section = <SearchGrid table={search.table} fields={search.fields} show={search.show} selectOne={selectOne} />
    }
    else if (selected === 'search' && selectOne.status=='picked') {
      section = (
        <div className="ScheduleHeader">
          {selectOne.subject.id ? <b>{selectOne.subject.id} = {selectOne.subject.name}</b> : <button onClick={this.searchVaccines.bind(this)}>load User</button>}
          <b>Status = {selectOne.status}</b>
          <button onClick={this.loadSchedule}>Load User Data</button>
          <button onClick={this.cancelSearch}>Cancel</button>
        </div>);               
    }
    else if (selectOne.subject.id) {
      // subject.name = selectOne.name;
      section = (
        <div className="ScheduleHeader">
          {selectOne.subject.id ? <div><b>{selectOne.subject.id} = {selectOne.subject.name}</b> M={menu.selected}</div> : <button onClick={this.searchVaccines.bind(this)}>load User</button>}
          <Menu menu={menu} />
        </div>);         
    }
    else { 
      console.log("null user ... nothing displayed")
      section = (<div className="ScheduleHeader">
                  <button onClick={this.addToSchedule.bind(this)}>load Info</button> 
                </div>);
    }

    return (
      <div className="SchedulePage">
        <div >
          {section}
          <SearchGrid table={search.table} fields={search.fields} show={search.show} selectOne={selectOne} />
        </div>
        {this.props.children}
      </div>
    );
  }
});

export default App;

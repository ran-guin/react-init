import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'; 

import './Schedule.css';

import SearchGrid from './../Standard/SearchGrid/SearchGrid';
// import Menu from './../Standard/List/Menu';

import Scheduled from './Scheduled.js';

var subject = observable( { id: 0, name: '', loaded: false, details: {} });
const menu = observable( {options: ['user', 'search', 'history', 'scheduled'], selected: 'user'});


// search variables ...
var search = {url: 'http://localhost:3002/lookup/search', table: 'disease', fields: ['name', 'description', 'link'] };
// var show = {table: 'empuser', fields: ['username','email'] };

const selectOne = observable( { subject: subject, name: '', id: 0, label: {}, status: 'search' });

const scheduled = observable( { list: [] } );

const App = observer(
class App extends Component {
    
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

  onDelete(evt) {
    console.log("Delete Scheduled item...");

    var id=evt.target.id;
    console.log("clear " + id);
  }

  onPick(evt) {
    console.log("Add Scheduled item... ");
    var name = evt.target.name;
    var id = evt.target.id;

    var attribute = evt.target.getAttribute('data-attribute');
    var model = evt.target.getAttribute('data-model');

    console.log("Loaded " + name + attribute + model);

    scheduled.list.push({id: id, name: name, attribute: attribute, model: model});
  }

  render() {

    // var selected = menu.selected;
    
    console.log("Re render user");
    console.log(JSON.stringify(selectOne));
    var section = null;

    // if (selected === 'search' && selectOne.status != 'picked') {
    //   // section = <SearchGrid table={search.table} fields={search.fields} show={search.show} selectOne={selectOne} />
    // }
    // else if (selected === 'search' && selectOne.status=='picked') {
    //   section = (
    //     <div className="ScheduleHeader">
    //       {selectOne.subject.id ? <b>{selectOne.subject.id} = {selectOne.subject.name}</b> : <button onClick={this.searchVaccines.bind(this)}>load User</button>}
    //       <b>Status = {selectOne.status}</b>
    //       <button onClick={this.loadSchedule}>Load User Data</button>
    //       <button onClick={this.cancelSearch}>Cancel</button>
    //     </div>);               
    // }
    // else if (selectOne.subject.id) {
    //   // subject.name = selectOne.name;
    //   section = (
    //     <div className="ScheduleHeader">
    //       {selectOne.subject.id ? <div><b>{selectOne.subject.id} = {selectOne.subject.name}</b> M={menu.selected}</div> : <button onClick={this.searchVaccines.bind(this)}>load User</button>}
    //       <Menu menu={menu} />
    //     </div>);         
    // }
    // else { 
    //   console.log("null user ... nothing displayed")
    //   section = (<div className="ScheduleHeader">
    //               <button onClick={this.addToSchedule.bind(this)}>load Info</button> 
    //             </div>);
    // }

    return (
      <div className="SchedulePage">
        <div >
          <Scheduled scheduled={scheduled} />
          {section}
          <SearchGrid 
            url={search.url} 
            table={search.table} 
            conditions={search.conditions} 
            fields={search.fields} 
            show={search.show} 
            selectOne={selectOne}
            onPick={this.onPick.bind(this)} 
            prompt='-- Search for Vaccine or Disease --'
          />
        </div>
        {this.props.children}
      </div>
    );
  }
});

  App.propTypes = {
    user_id: PropTypes.number,
  }

export default App;

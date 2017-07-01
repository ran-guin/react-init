import React, { Component } from 'react';

// import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'; 

import DatePicker from 'react-bootstrap-date-picker';

import './Scheduled.css';

// import SearchGrid from './../Standard/SearchGrid/SearchGrid';
// import Menu from './../Standard/List/Menu';

const App = observer(
class App extends Component {

  static defaultProps = {
    scheduled: { list: [] },
  }

  constructor(props) {
    super(props);

    if (this.props.scheduled && this.props.scheduled.list && this.props.scheduled.list.length) {
      console.log("Scheduled items found");
    }
    else {
      // this.props.scheduled = {};
      this.props.scheduled.list = [];
    }
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

  removeItem(evt) {
    console.log('remove item...');
  }

  changeDate(evt) {
    console.log('changeDate...');
  }

  // onPick(evt) {
  //   console.log("Add Scheduled item... ");
  //   var name = evt.target.name;
  //   var id = evt.target.id;
  //   var type = evt.target.data-type;
  //   console.log("Loaded " + name + id);

  //   this.props.scheduled.list.push( { id: id, name: name, type: type});
  //   // this.props.scheduled.ids.push(name);
  //   // this.props.scheduled.class.push('vaccine');
  // }

  render() {

    // var scheduled = this.props.schedulded;
    console.log("Scheduled: " + JSON.stringify(this.props.scheduled));

    // var mode = 'date';
    var _this = this;

    var table = (
      <table className='ScheduleTable input-lg'>
        <tbody>
          {this.props.scheduled.list.map(function(record, i) {
            var id = record.id;
            var name = record.name;
            // var attribute = record.attribute;
            // var model = record.model;  
            var scheduled = record.scheduled || "2016-11-19T12:00:00.000Z";

            var mode = 'date';
            var dtid = 'dt' + i;

            var btn_class = 'btn btn-danger';
            var close = <button className={btn_class} onClick={_this.removeItem.bind(_this)}>Remove</button>;
            
            var datetime = <DatePicker value={scheduled} default={scheduled} onChange={_this.changeDate.bind(_this)} id={dtid} mode={mode}/>

            // var model = this.props.scheduled.class[i];
            return ( 
              <tr key={i}>
                <td><b>{name}</b> [{id}] </td>
                <td>{datetime}</td>
                <td>{close}</td>
              </tr>
            );
                                                                                                                                                                                                                                                                                                                     })}
        </tbody>
      </table>);

    return (
      <div className="ScheduledPage">
        <div >
          <h3>Scheduled:</h3>
          <div className='container'>
            {table}
          </div>
          <hr />
        </div>
        {this.props.children}
      </div>);
  }
});

    
  App.propTypes = {
    scheduled: PropTypes.object,
  }

export default App;

import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import DateTimePicker from 'react-bootstrap-datetimepicker';

import './Scheduled.css';

import SearchGrid from './../Standard/SearchGrid/SearchGrid';
import Menu from './../Standard/List/Menu';

const App = observer(
class App extends Component {
    
  static propTypes = {
    scheduled: React.PropTypes.object,
  }

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

    var scheduled = this.props.schedulded;
    console.log("Scheduled: " + JSON.stringify(this.props.scheduled));

    var mode = 'date';

    var table = (
      <table className='ScheduleTable'>
        <tbody>
          {this.props.scheduled.list.map(function(record, i) {
            var id = record.id;
            var name = record.name;
            var attribute = record.attribute;
            var model = record.model;  

            var mode = 'date';
            var dtid = 'dt' + i;

            var close = 'X';
            
            var datetime = <DateTimePicker id={dtid} mode={mode}/>
            // var model = this.props.scheduled.class[i];
            return (<tr key={i}><td>{model} {attribute} = {name} [{id}] </td><td>{datetime}</td><td>{close}</td></tr>);
                                                                                                                                                                                                                                                                                                                     })}
        </tbody>
      </table>);

    return (
      <div className="ScheduledPage">
        <div >
          <h3>Scheduled:</h3>
          {table}
          <hr />
        </div>
        {this.props.children}
      </div>);
  }
});

export default App;

import React, { Component } from 'react';
import './IListWrapper.css';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import IListItem from './IListItem';
import IList from './IList';
import _ from 'underscore';

const defaultHiddenState = true;
 
var globals = observable({ status: 'initialized', timestamp: new Date() });
var settings   = observable({ changes: 0 });

var selected = observable({ count: 0, ids: [], labels: [] });

var test = observable({
  'string': 'abc',
  'number' : 5 ,
  'object' : { },
});

const App = observer(
class App extends Component {
 
  static PropTypes = {
    title: React.PropTypes.string,
    list: React.PropTypes.array,
    hideAll: React.PropTypes.boolean,

    // globals 
    selectable: React.PropTypes.boolean,
    showMissing: React.PropTypes.boolean,
    collabpsible: React.PropTypes.boolean,
    multiple: React.PropTypes.boolean,
    minDepth: React.PropTypes.number,
  }

  // static defaultProps = {
  //   details: 'initial details'
  // }
 
  constructor(props) {
    super(props);

    this.state = {
      // list: [],
      // global: this.props.globals,
      selectable: this.props.selectable,
      showMissing: this.props.showMissing,
    };

    globals.selectable = this.props.selectable || false;
    globals.showMissing = this.props.showMissing;
    globals.collapsible = this.props.collapsible;   
    globals.minDepth = this.props.minDepth || 1;   
    globals.multiple = this.props.multiple;     
  }

  componentWillMount(props) {      

    this.chosen = [];
    this.chosen.push('ok');

    console.log("INIT" + JSON.stringify(this.props.list));

    // not for iterations handled in IListItems automatically 
    // this.items = observable({});
    // this.iterate(this.props.list, 0);  

    this.normalize(this.props.list, 0, 0);

    var initialCollapsedState = true;
    if (this.props.minDepth) {
      initialCollapsedState = false;
    }

    settings['0'] = {'classType' : 'IListBox', depth: 0, collapsed: initialCollapsedState};   
    
    var keys = Object.keys(settings);
    console.log(keys.length + " settings: " + JSON.stringify(settings));
  }

  normalize(array, depth, level) {
    { array.map( function(item, index) {
      var copy = _.clone(item);
        
      var list = copy.list;
      delete copy.list;

      copy.level = level + '.' + index;
      copy.depth = depth + 1;

      var minDepth = this.props.minDepth || 0;
      if (copy.depth >= minDepth) {
        copy.collapsed = true;
      }
      else {
        copy.collapsed = false;
      }

      copy.selected = item.selected;
      if (copy.selected) {
        selected.count++;
        selected.ids.push(item.id);
        selected.labels.push(item.name);
      }

      settings[item.id] = copy;

      if (list && list.length) {
        this.normalize(list, copy.depth, copy.level);
      }

    }.bind(this))}
    console.log("iterated...");
  }

  iterate(array, depth) {
      { array.map( function(item, index) {
        var copy = _.clone(item);
        
        var list = copy.list;
        copy.list = null;

        copy.index = index;
        copy.depth=depth;
        // items.push(copy);

        if (list && list.length) {
          this.iterate(list, depth+1);
        }

      }.bind(this))}
      console.log("iterated...");
  }

  componentDidMount(props) {
    var list = this.props.list;
    
    this.setState({
      list: list,
    });

    this.setState({
      hide: defaultHiddenState
    });
  }

  toggleCheckbox = label => {

    console.log("master function");

    if (this.chosen.indexOf(label)) {
      // this.chosen(label)
    }
    else {
      this.chosen.push(label);
    }
  }

  updateList(item) {
    var id = item.id;
    var name = item.name;
    var picked = item.selected;

    if (picked) {
      selected.ids.push(id);
      selected.labels.push(name);
      selected.count++;
    }
    else {
      var exists = selected.ids.indexOf(id);
      console.log("exists: " + exists);
      if (exists >= 0) {
        selected.ids.splice(exists,1);
        selected.labels.splice(exists,1);
        selected.count--;
      }
      else {
        console.log("could not remove " + id + ': ' + name);
      }
    }
    console.log("PARENT UPDATED with " + id + ': ' + name + '(' + picked + ')');
    console.log(JSON.stringify(selected));  
  }

  testIt() {
    console.log("master function");
    // this.setState( { hide: this.state.hide ? false : true });
    // globals.addme = 'hello';
    globals.init = 'newone';
    console.log(JSON.stringify(globals));

    test['object']['another'] = 'hello';
    test['string'] = test['string'] + ' and more...';
    test['number']++;

    console.log('Reset ' + JSON.stringify(test));
  }

  render() {
    var _this = this;
    var list = this.props.list;

    if (list.length) {
      var count = list.length;
      var hidden = this.props.hide || true;
      
      var sublistID = '0sublist';

      console.log("**** GLOB " + JSON.stringify(globals));
      console.log("SEND LIST: " + JSON.stringify(this.props.list));
      return (
        <div>
          <div className='IListWrapper'>
            <listTitle>{this.props.title}</listTitle>
            <IList id={sublistID} item={settings['0']} list={this.props.list} global={globals} settings={settings} test={test} updateList={this.updateList}/>
          </div>
          <div>
            <h5>Chose: {selected.labels.join(', ')}</h5>
            <hr />        
            <h5>{JSON.stringify(test)}</h5>  
            <input onClick={this.testIt} />
          </div>
        </div>
      )
    }
    else {

      return(
        <div className='IListWrapper'>
          <listTitle>{this.props.title}</listTitle>
          <span>No elements</span>
        </div>
      )
    }
  }
})

export default App;
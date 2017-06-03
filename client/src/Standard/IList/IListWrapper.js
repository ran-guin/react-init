import React, { Component } from 'react';

import './IListWrapper.css';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import IList from './IList';
import _ from 'underscore';

const defaultHiddenState = true;
 
var globals = observable({ status: 'initialized', timestamp: new Date(), list : {}, changed: []});
var settings   = observable({ });

var initial_selection;   

var changes = [];

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
    show: React.PropTypes.string,
    // globals 
    selectable: React.PropTypes.string,   // enum[all, endpoints, none]
    collabpsible: React.PropTypes.boolean,
    multiple: React.PropTypes.boolean,
    minDepth: React.PropTypes.number,

    onSave: React.PropTypes.function,
    selected:React.PropTypes.object,
  }

  static defaultProps = {
    details: 'initial details',
    selected: { count: 0, ids: [], labels: [] }
  }
 
  constructor(props) {
    super(props);

    this.state = {
      // list: [],
      // global: this.props.globals,
      selectable: this.props.selectable,
      show: this.props.show,
    };

    globals.selectable = this.props.selectable;
    globals.show = this.props.show;
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

   globals.list[0] = { parent: null, subselects: {}};
   this.normalize(0, this.props.list, 0, 0);
    
    var initialCollapsedState = true;
    if (this.props.minDepth) {
      initialCollapsedState = false;
    }

    settings['0'] = observable({'classType' : 'IListBox', depth: 0, collapsed: initialCollapsedState});   
    
    var keys = Object.keys(settings);

    console.log(keys.length + " settings: " + JSON.stringify(settings));
  }

  normalize(parent, array, depth, level) {
    array.map( function(item, index) {
      var copy = _.clone(item);
        
      var list = copy.list;
      delete copy.list;

      copy.level = level + '.' + index;
      copy.depth = depth + 1;
      copy.parent = parent;

      var minDepth = this.props.minDepth || 0;
      if (copy.depth >= minDepth) {
        copy.collapsed = true;
      }
      else {
        copy.collapsed = false;
      }

      copy.selected = item.selected;
      
      // globals.list[parent] = {parent: null, subselects: {} };
      globals.list[item.id] = { parent: parent, subselects: {}};

      console.log("G: " + JSON.stringify(globals.list));

      if (copy.selected) {
        this.props.selected.count++;
        this.props.selected.ids.push(item.id);
        this.props.selected.labels.push(item.name);
        globals.list[parent].subselects[item.name] = true;
      } 
      else {
        globals.list[parent].subselects[item.name] = false;
      }

      settings[item.id] = observable(copy);

      if (list && list.length) {
        this.normalize(item.id, list, copy.depth, copy.level);
      }
    }.bind(this));
    console.log("iterated...");
  }

  iterate(array, depth) {
      array.map( function(item, index) {
        var copy = _.clone(item);
        
        var list = copy.list;
        copy.list = null;

        copy.index = index;
        copy.depth=depth;
        // items.push(copy);

        if (list && list.length) {
          this.iterate(list, depth+1);
        }
      }.bind(this));
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

    var exists = this.props.selected.ids.indexOf(id);
    if (picked && exists == -1) {
      this.props.selected.ids.push(id);
      this.props.selected.labels.push(name);
      this.props.selected.count++;
    }
    else {
      console.log("exists: " + exists);
      if (exists >= 0) {
        this.props.selected.ids.splice(exists,1);
        this.props.selected.labels.splice(exists,1);
        this.props.selected.count--;
      }
      else {
        console.log("could not remove " + id + ': ' + name);
      }
    }
    console.log("PARENT UPDATED with " + id + ': ' + name + '(' + picked + ')');
    console.log(JSON.stringify(this.props.selected));  
  }

  saveList() {
    console.log("Save List: " + this.props.selected.labels.join(', '));
  }

  render() {
    var _this = this;
    var list = this.props.list;

    if (list.length) {
      var count = list.length;
      var hidden = this.props.hide || true;
      
      var sublistID = '0sublist';

        // Main Wrapper 

        var radio = 'radio';
        var radioname = 'visibilityOptions';
        var values = ['All','Selected','Missing'];
        
        var show = (
          <span>
            <p />
            {values.map( function (value, index) {
              return (
                <span key={index}>
                  <input type={radio} name={radioname} value={value} />
                  &nbsp; {value} &nbsp;
                </span>
              )

            })}
          </span>
        )

      console.log("**** GLOB " + JSON.stringify(globals));
      console.log("SEND LIST: " + JSON.stringify(this.props.list));
      return (
        <div>
          <div className='IListWrapper'>
            <listTitle>{this.props.title}</listTitle>
            {show}
            <h5>Chose: {this.props.selected.labels.join(', ')}</h5>
            
            <IList id={sublistID} item={settings['0']} list={this.props.list} global={globals} settings={settings} test={test} updateList={this.updateList.bind(this)}/>
            
            { globals.changed.length ? <div><hr /><button onClick={this.props.onSave}>Save Selections</button></div> : '' }
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
import React, { Component } from 'react';
import './IList.css';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

const defaultHiddenState = true;

const App = observer(
class App extends Component {
 
  static PropTypes = {
    title: React.PropTypes.string,

    settings: React.PropTypes.object,   
    list: React.PropTypes.array,

    item: React.PropTypes.object,

    updateList: React.PropTypes.func,

    index: React.PropTypes.number,
    depth: React.PropTypes.number,
    hide: React.PropTypes.boolean,
    selectable: React.PropTypes.boolean,
    selected: React.PropTypes.boolean,

    global: React.PropTypes.object,
    test: React.PropTypes.object
  } 

  // static defaultProps = {
  //   details: 'initial details'
  // }
  
  constructor(props) {
    super(props);

    this.item = this.props.item;
    if (this.item) {
      this.isSelected = observable(this.item.selected);
    }
    else {
      this.item = { class: 'IListBox', depth: 0, hide: !global.minDepth};
    }

    this.state = {
      // list: [],
      hide: this.item.hide || false,
    };
  }

  componentWillMount(props) {      

  }

  componentDidMount(props) {
    var list = this.props.list;

    if (this.item) {
      this.setState({
        hide: this.item.hide, //  defaultHiddenState,
        collapsed: this.item.hide,
        level: this.item.level,
        depth: this.item.depth || 0
      });
    }
    else {
      this.setState({
        hide: false,
        collapsed: !this.props.global.minDepth,
        depth: 0
      });
    }
  }

  toggleSelect = label => {

    this.props.global.status = 'updated';

    var id = this.item.id;
    // reset selected flag 
    this.props.settings[id].selected = this.props.settings[id].selected ?  false : true;

    // reset class of object ... 
    var status = false;
    if (this.props.settings[id].selected) {
      this.props.settings[id].classType = 'IListBox selected'
      status = true;
    }
    else {
      this.props.settings[id].classType = 'IListBox deselected'      
      status = false;
    }

    var el = document.getElementById('selector' + id);
    if (el) {
      el.className = this.props.settings[id].classType;
    }

    this.props.settings.changes++;  // trigger DOM updates (required if new key added to object class)
    console.log("Reset settings: " + JSON.stringify(this.props.settings[id]));

    console.log("call parent with " + label.target.name + ': ' + label.target.value + '= ' + label.target.selected);
    this.props.updateList({id: this.item.id, name: this.item.name, selected: status});
  }

  updateList(e) {
    console.log("call parent");
    this.props.updateList(e);
  }

  toggleVisibility() {

    var id = this.item.id || '0';
    this.props.settings[id].collapsed =  ! this.props.settings[id].collapsed;

    console.log("set visibility to " + JSON.stringify(this.props.settings[id].collapsed));

    this.setState( { hide: this.state.hide ? false : true });

    // var el = document.getElementById(id + 'sublist');
    // console.log("change visibility from " + el.style.display);
    // if (el && el.style.display == 'none') {
    //   el.style.display = 'block';
    // }
    // else if (el) {
    //   el.style.display = 'none';      
    // }

    this.props.settings.changes++;  // trigger DOM updates (required if new key added to object class)   

  }

  render() {
    var _this = this;

    // 
    var list = this.props.list;

    var depth = this.item.depth || 0;
    depth = depth+1;

    var globalSelect = this.props.global.selectable;
    var showMissing = this.props.global.showMissing;

    var showIcon = <span>&gt; &lt;</span>; // <i className='fa fa-close'></i>;
    var hideIcon = <span>&lt; &gt;</span>;

    var label = <span>{this.item.level}</span>;

    var global = this.props.global;
    var settings = this.props.settings;
    var test = this.props.test;

    var updateList = this.props.updateList;

    var id = this.item.id || '0';
    
    var hidden = this.props.settings[id].collapsed; // this.state.collapsed; 

    var elementID = 'selector' + id;
    var sublistID = id + 'sublist';

    var select = '';
    if (this.item.depth && (this.item.selectable || globalSelect)) {
      select = <input type='checkbox' onClick={this.toggleSelect}></input>
    }

    var classType = 'IListBox';
    if (! this.item.id) {
      // wrapper
      // settings[0] = {'classType' : 'IListBox', depth: 0, collapsed: !global.minDepth};
    }
    else {
      if (settings[this.item.id]) {
        if (settings[this.item.id].selected == true) {
          classType = classType + ' selected';
          settings[this.item.id].classType = 'IListBox selected';
        }
        else if (settings[this.item.id].selected  == false ) {
          classType = classType + ' deselected';
          settings[this.item.id].classType = 'IListBox deselected';
        }
        else {
          classType = classType + ' missing';
          if (showMissing) { hidden = false }
          settings[this.item.id].classType = 'IListBox missing';
        } 
      }
      else {
        settings[0] = {'classType' : 'IListBox', depth: 0 };
      }
    }

    console.log("*** ITEM: " + JSON.stringify(this.item));

    if (list && list.length) {
      // generate recursive list here
      var count = list.length;

      var hide = <button onClick={this.toggleVisibility.bind(this)}> {showIcon} </button>;
      var show = <button onClick={this.toggleVisibility.bind(this)}> {hideIcon} </button>;

      var component = <ul className='IListItems'>
            {list.map(function(name, index){
              // var thisTitle = Object.keys(name)[0];
              // var Slist = Object.values(name)[0];
              
              var thisTitle = name.name;
              var id = name.id;
              var Slist = name.list || [];

              var selectable = globalSelect || name.selectable;
              var selected = settings[id].selected;

              if (typeof Slist == 'string') {
                return <span>Add</span>               
              }
              else if (Slist && Slist.length) {
                return  <li key={ index }>
                          <App title={thisTitle} list={Slist} item={settings[id]} settings={settings} global={global} updateList={updateList}/>
                        </li>
              }
              else {
                if (thisTitle) {
                  return <li key={ index }>
                          <App title={thisTitle} list={Slist} item={settings[id]} settings={settings} global={global} updateList={updateList}/>
                        </li>
                }
                else {
                  return <li key={index}> END on {thisTitle}</li>
                }
              }
            })}
          </ul>      

      if (this.item.depth) {
        var style = 'display:none';

        return (
          <div id={elementID} className={settings[id].classType}>
            <listLabel>{select} {this.props.title} ({label}) &nbsp; &nbsp; 
              {hidden && show }
              {!hidden && hide }
            </listLabel>
            <subList id={sublistID}>
              { !hidden && component}
            </subList>
          </div>
        )
      }
      else {
        // Main Wrapper 

        var radio = 'radio';
        var radioname = 'visibilityOptions';
        var values = ['All','Selected','Missing'];
        return (
          <span>
            {hidden && show }
            {!hidden && hide }
            <p />
            {values.map( function (value, index) {
              return (
                <span>
                  <input type={radio} name={radioname} value={value} />
                  &nbsp; {value} &nbsp;
                </span>
              )

            })}
            {!hidden && <hr />}
            {!hidden && component}
          </span>
        )
      }
    }
    else {
      // no list ... last element or generating recursive list from wrapper 
      return(
        <div id={elementID} className={settings[id].classType}>
          <listLabel>{select} {this.props.title} ({label}) </listLabel>
        </div>
      )
    }
  }
})

export default App;
import React, { Component } from 'react';
import './IListItem.css';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

const defaultHiddenState = true;

const App = observer(
class App extends Component {
 
  static PropTypes = {
    item: React.PropTypes.object,

    index: React.PropTypes.number,
    depth: React.PropTypes.number,
    hide: React.PropTypes.boolean,

    selectable: React.PropTypes.boolean,
    selected: React.PropTypes.boolean,

    global: React.PropTypes.object,
  } 

  // static defaultProps = {
  //   details: 'initial details'
  // }
  
  constructor(props) {
    super(props);

    this.isSelected = observable(this.props.item.selected);
    this.depth = this.props.item.depth || 0;
    this.index = this.props.item.index || 0;
    this.title = this.props.item.name || '';

    this.selectable = this.props.item.selectable || false;

    this.state = {
      hide: this.props.item.hide || false,
      selected: this.props.item.selected,
    };
  }

  componentWillMount(props) {      

  }

  componentDidMount(props) {

  }

  toggleSelect = label => {
    console.log("TOGGLE checkbox");
    this.props.global.status = 'updated';
  }

  toggleVisibility() {
    this.setState( { hide: this.state.hide ? false : true });
  }

  render() {
    var _this = this;

    var globalSelect = this.props.global.selectable;
    var showMissing = this.props.global.showMissing;

    var hidden = this.state.hide;

    var showIcon = <span>&gt; &lt;</span>; // <i className='fa fa-close'></i>;
    var hideIcon = <span>&lt; &gt;</span>;
    var label = <span>{this.depth}.{this.index}</span>;

    var global = this.props.global;

    var select = '';
    var indent = '';

    for (var i=0; i<this.depth; i++) {
      indent = <span>&nbsp; &nbsp; </span>
    }

    if (this.selectable || globalSelect) {
      select = <input type='checkbox' onClick={this.toggleSelect}></input>
    }

    var selectStatus;
    var classType = 'IListItem';

    if (this.isSelected == true  && this.depth) {
      classType = classType + ' selected';
      selectStatus = <span>Y</span>
    }
    else if (this.isSelected == false  && this.depth) {
      classType = classType + ' deselected';
      selectStatus = <span>N</span>
    }
    else if (this.depth) {
      classType = classType + ' missing';
      selectStatus = <span>?</span>;
      if (showMissing) { hidden = false }
    } 

    return(
      <div className={classType}>
        <h3>{indent} {select} {this.title} ({label}) {selectStatus}</h3>
        <b> </b>

      </div>
    )
  }
})

export default App;
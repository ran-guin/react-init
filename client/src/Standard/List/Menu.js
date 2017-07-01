import React, { Component } from 'react';
import './Menu.css';
import PropTypes from 'prop-types'; 

// import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Menu = observer(
class Menu extends Component {

  // static PropTypes = {
  //   onPick: React.PropTypes.function,
  //   menu: React.PropTypes.object,
  // } 

  static defaultProps = {
    menu : {
      options: ['main'],
      selected: 'main'
    }
  }

  // constructor(props) {
  //   super(props);

  //   // nothing yet... 
  // }

  loadPage(page) {
    // var _this = this;

    if (page.target && page.target.name) { 
      var name = page.target.name;

      this.props.menu.selected = name;
    }
    else {
      console.log("no page name");
    }
  }

  render() {

    // var onPick = this.props.onPick;
    
    var options = this.props.menu.options;
    var selected = this.props.menu.selected;

    var _this = this;

    return (
      <div className='MenuBox'>
        <ul>
          {options.map(function(name, index){
            var key = name + index;
            console.log("key = " + key);
            return  (<span key={key}>
                      <a href='#' onClick={_this.loadPage.bind(_this)} name={name}> 
                        {selected === name ? <b>{name}</b> : name}
                      </a> &nbsp; &nbsp; 
                    </span>);
          })}
        </ul>
      </div>
    );
  }
});

  Menu.propTypes = {
    onPick: PropTypes.func,
    menu: PropTypes.object,
  } 

export default Menu;
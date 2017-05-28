import React, { Component } from 'react';
import './Menu.css';

// import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Menu = observer(
class Menu extends Component {
  
  render() {

    var onPick = this.props.onPick;
    var options = this.props.options;

    console.log(JSON.stringify(options));
    console.log(JSON.stringify(onPick));
    return (
      <div className='MenuBox'>
        <ul>
          {options.map(function(name, index){
            var key = name + index;
            console.log("key = " + key);
            return <span key={key}><a href='#' onClick={onPick} name={name}>{name}</a> &nbsp; &nbsp; </span>;
          })}
        </ul>
      </div>
    );
  }
}
);

Menu.propTypes = {
  // onPick: React.PropTypes.function,
  options: React.PropTypes.array.isRequired,
}

export default Menu;
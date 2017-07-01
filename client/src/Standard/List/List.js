import React, { Component } from 'react';
import './List.css';
import PropTypes from 'prop-types'; 

// import {observable} from 'mobx';
import {observer} from 'mobx-react';

const List = observer(
class List extends Component {
  
  render() {

    var list = this.props.list;

    return (
      <div className='ListBox'>
        <h3>{this.props.name}</h3>
        <ul>
          {list.map(function(name, index){
            return <li key={ index }>{name}</li>;
          })}
        </ul>
      </div>
    );
  }
}
);

List.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
}

export default List;
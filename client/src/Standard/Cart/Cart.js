import React, { Component } from 'react';
import './Cart.css';

import FormElement from './../Form/FormElement';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Cart = observer(
class Cart extends Component {
  
  static PropTypes = {
    selected: React.PropTypes.object,
    name: React.PropTypes.name,
  }

  render() {

    var items = this.props.selected || {};
    console.log("S in Cart: " + JSON.stringify(this.props.selected));
    return (
      <div className='CartBox'>
        <b>Items Selected: </b>
        <table className='CartTable'>
          {items.ids.map(function(element, index){
            
            var id = element;            
            var name = items.name[index];
            var cost = items.cost[index];
            var qty = items.qty[index] || 0;

            var subtotal = parseInt(qty) * parseFloat(cost);

            return <tr className='form-row' key={ index }>
                    <td>{name}</td>
                    <td>{qty}</td>
                    <td>{cost}</td>
                    <td>{subtotal}</td>
                   </tr>;
          })}
        </table>
      </div>
    );
  }
}
);

export default Cart;
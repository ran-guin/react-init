import React, { Component } from 'react';
import './Cart.css';
import PropTypes from 'prop-types'; 

// import FormElement from './../Form/FormElement';

// import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Cart = observer(
class Cart extends Component {
  
  update_qty = function(e) {
    console.log(e.target + ' = ' + e.target.value);
    var id = e.target.id;
    console.log(id + ' = ' + e.target.value);

    var index = e.target.id;

    this.props.selected[index].qty = e.target.value;
  }

  render() {

    var items = this.props.selected || {};
    var _this = this;
    console.log("S in Cart: " + JSON.stringify(this.props.selected));

    if (items && items.length) {
      return (
        <div className='CartBox'>
          <b>Items Selected: </b>
          <table className='CartTable table'>
            <thead>
              <tr>
                <th>Item</th>
                <th>#</th>
                <th>cost</th>
              </tr>
            </thead>
            <tbody>
              {items.map(function(element, index){
                
                var id = element.id;            
                var name = element.name;
                var cost = element.cost || 0;
                var qty = items.qty || 1;

                var qty_id = index ;

                var subtotal = parseInt(qty, 10) * parseFloat(cost);

                return <tr className='form-row' key={ index }>
                        <td>{name}</td>
                        <td>
                          <input id={id} data-index={qty_id} type='number' value={qty} onChange={_this.update_qty.bind(_this)} />
                        </td>
                        <td>{cost}</td>
                        <td>{subtotal}</td>
                       </tr>;
              })}
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (
        <div>
          <b>Nothing in cart</b>
        </div>
      );
    }
  }
}
);

  Cart.propTypes = {
    selected: PropTypes.object,
    name: PropTypes.name,
  }

export default Cart;
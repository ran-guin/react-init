import React, { Component } from 'react';
import './Form.css';

import FormElement from './../Form/FormElement';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

const Form = observer(
class Form extends Component {
  
  render() {

    var Form = this.props.Form;
    var elements = this.props.elements || [];

    return (
      <div className='container FormBox' width='100%'>
        <h3>{this.props.name}</h3>
        <table className='table FormBody'>
          {elements.map(function(element, index){
            
            var name = element.name;
            var prompt = element.prompt;
            var id = element.id || name;
            var type = element.type;
            var options = element.options || [];
            var def = element.default || '';

            return <tr className='form-row' key={ index }>
                    <td>{prompt}</td>
                    <td>
                      <FormElement name={name} options={options} />
                    </td>
                   </tr>;
          })}
        </table>
      </div>
    );
  }
}
);

Form.propTypes = {
  name: React.PropTypes.string.isRequired,
  method: React.PropTypes.string,
  elements: React.PropTypes.array.isRequired
}

export default Form;
import React, { Component } from 'react';

// import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'; 

const FormElement = observer(
class FormElement extends Component {
  
  render() {

    // var FormElement = this.props.FormElement;
    // var elements = this.props.elements || [];
    
    var name = this.props.name;
    var prompt = this.props.prompt || name;
    var id  = this.props.id || name;
    var type = this.props.type || 'string';
    var options = this.props.options || [];
    
    return (
        <div>
          <b>{prompt} [{type}]</b>: {options.join(', ')}; id:{id}
        </div>
    );
  }
}
);

FormElement.propTypes = {
  name: PropTypes.string.isRequired,
  prompt: PropTypes.string,
  elements: PropTypes.array.isRequired
}

export default FormElement;
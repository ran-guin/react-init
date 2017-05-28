import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

const FormElement = observer(
class FormElement extends Component {
  
  render() {

    var FormElement = this.props.FormElement;
    var elements = this.props.elements || [];
    
    var name = this.props.name;
    var prompt = this.props.prompt || name;
    var id  = this.props.id || name;
    var type = this.props.type || 'string';
    var options = this.props.options || [];
    
    return (
        <div>
          <b>{name} [{type}]</b>: {options.join(', ')}
        </div>
    );
  }
}
);

FormElement.propTypes = {
  name: React.PropTypes.string.isRequired,
  prompt: React.PropTypes.string,
  elements: React.PropTypes.array.isRequired
}

export default FormElement;
import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types'; 

const ScheduledTime = observer(
class ScheduledTime extends Component {
  
  render() {

    var ScheduledTime = this.props.ScheduledTime;

    var prompt = this.props.prompt || 'appointment time';
    var id  = this.props.id;
    var options = this.props.options || [];
    
    return (
        <div>
          <calendar />
        </div>
    );
  }
}
);

ScheduledTime.propTypes = {
  name: PropTypes.string.isRequired,
  prompt: PropTypes.string,
  elements: PropTypes.array.isRequired
}

export default ScheduledTime;
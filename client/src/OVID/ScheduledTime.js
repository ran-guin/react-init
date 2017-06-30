import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

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
  name: React.PropTypes.string.isRequired,
  prompt: React.PropTypes.string,
  elements: React.PropTypes.array.isRequired
}

export default ScheduledTime;
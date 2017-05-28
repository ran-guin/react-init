import React, { Component, PropTypes } from 'react';

import './IList.css';

class Checkbox extends Component {
  state = {
    isChecked: false,
    vclass: true,
  }

  toggleCheckboxChange = () => {
    const { handleCheckboxChange, label } = this.props;

    if (this.state.vclass == 'hidden') { 
      console.log('v');
      this.setState({ vclass : 'visible' })
    }
    else { 
      this.setState( {vclass : 'hidden'})
      console.log('h');
    }

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    this.setState(({ vclass }) => (
      {
        vclass: 'hidden',
      }
    ));



    handleCheckboxChange(label);
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;
    const { vclass } = this.state.vclass;

    return (
      <div className="checkbox">
        <b>Class = {vclass}</b>
        <label>
          <input
                            type="checkbox"
                            value={label}
                            checked={isChecked}
                            onChange={this.toggleCheckboxChange}
                            className={vclass}
                        />

          {label}
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
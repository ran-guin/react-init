import React, { Component, PropTypes } from 'react';
import PropTypes from 'prop-types'; 

class SearchBox extends Component {

  reSearch = function () {
    console.log('Re search ...');
  }

  render() {

    return (
      <div className="searchBox">
          <input
            type="text"
            value={search.string}
            onChange={this.reSearch}
            class={search.class}
          />
      </div>
    );
  }
}

  SearchBox.propTypes = {
    search: PropTypes.object,
  }

export default SearchBox;
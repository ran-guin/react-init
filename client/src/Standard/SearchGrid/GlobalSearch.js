import React, { Component, PropTypes } from 'react';

class SearchBox extends Component {

  static PropTypes = {
    search: React.PropTypes.object,
  }

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

export default SearchBox;
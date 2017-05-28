import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import './SearchResults.css';

const corsOptions = {
  origin: true,
  methods: ['GET','POST'],
  credentials: true,
  maxAge: 3600
};

var searchSettings   = observable({ string: '', caseSensitive: true });

var selected = observable({ count: 0, ids: [], labels: [] });

class App extends Component {
	static PropTypes = {
		searchResults: React.PropTypes.array,
    	fields: React.PropTypes.array,
    	show: React.PropTypes.array,
    	highlight: React.PropTypes.string,
    	onPick: React.PropTypes.function,
    }
	render() {

		var results = this.props.searchResults || [];

		var headers = this.props.fields;
		var highlight = this.props.highlight;
		var onPick   = this.props.onPick.bind(this);

		if (results && results.length && !headers) {
			headers = Object.keys(results[0]);
		}

		var header;
		var form;

	 	var found;
		if (results && results.length) {
			found = (
				<table className='ResultsGrid'>
					<thead><tr>
						{headers.map(function(header, index) {
	        				return (
	        					<th key={index}>
	        						 {header}
	        					</th>
	        				)
	        			})}
	        		</tr></thead>		

					<tbody>
						{header}
						{form}
						{results.map(function(record, i) {
			        		
			        		var pickedId = record.id;
			        		var pickedRecord = record;

							return (
								<tr key={i}>			        				
			        				{headers.map(function(key, index) {
			        					var formatted = record[key];  // .replace(highlight, '<b>' + highlight + '</b>');

				        				return (
				        					<td key={index}>
				        						<a href='#' id={pickedId} name={formatted} onClick={onPick}>
				        							{formatted}
				        						</a>
				        					</td>
				        				)
				        			})}
				        		</tr>
				        	)
		        		})}
		        	</tbody>
		        </table>
		    );
	    }
	    else { 
	    	found = <table><tbody>
	    		<tr><td>nothing found</td></tr>
	    		</tbody></table>
	    		console.log("NO results");

	    }

		if (this.props.searchResults) {
			if (this.props.searchResults.length) {
				return (
					<div id='searchResults'>
						<hr />
						{found}
						<b>Highlight {this.props.highlight}</b>
					</div>
				)
			}
			else if (this.props.searchResults) {
				return <div id='searchResults'>nothing found</div>
			}
			else {
				return <div />
			}
		}
		else {
			return <div id='searchResults'>
					<b>..pending search..</b>
			   </div>
		}
	}
}

// App.propTypes = {
//   // onPick: React.PropTypes.function,
//   searchResults: React.PropTypes.array,
//   fields: React.PropTypes.array,
//   highlight: React.PropTypes.string,
//   onPick: React.PropTypes.function,
// }

export default App;
import React, { Component } from 'react';
import './SearchGrid.css';

class App extends Component {

	static PropTypes = {
    	title: React.PropTypes.string,
    	fields: React.PropTypes.array,
    	test: React.PropTypes.array,
    }

	constructor(props) {
		super(props);

	}

	componentWillMount(props) {      
		this.setState({
			results : []
		});
	} 

	searchIt = element => {
		console.log("Searching");
	}

	searchForIt() {
		console.log("Search for data...");
		this.setState({results: [['a','b'],['c','d']] });
		console.log("Got results: " + this.state.results);
	}

	render() {

		var _this = this;
		var fields = this.props.fields;
		var results = this.state.results;

		var header;
		var form;

		if (fields && fields.length) {
	 		header = <tr>
	            {fields.map(function(field, index) { 
				
					console.log("*** " + JSON.stringify(field));
		              
		            var heading = field.label || field.name;
		            
		            return (<th key={index}> ** {heading} ** </th>)
	            })}
	            </tr>

	        form = <tr>
	        	{fields.map(function(field, index) {
	        		return (
	        			<td key={index}>
	        				<input type='text' width='100%'/>
	        			</td>
	        		)
	        	})}
	        	</tr>
		}
	    else {
	    	return <div>No Fields Specified</div>
	    }

	    var found;
		if (results && results.length) {
			console.log("GOT RESULTS");
			found = <tbody>
				{header}
				{form}
				{results.map(function(record, i) {
					return (
						<tr key={i}>
		        		{record.map(function(data, j) {
		        			console.log(i + " Data: " + data);
			        		var key = i + '.' + j
			        		return (
			        			<td key={key}>
			        				d = {data}
			        			</td>
			        		)
			        	})}
			        	</tr>
			        )
	        	})}
	        	</tbody>

	        console.log('founded: ' + JSON.toString(found));

	    }
	    else { 
	    	found = <tbody>
	    		{header}
	    		{form}
	    		<tr><td>nothing found</td></tr>
	    		</tbody>

	    	console.log("NO results");

	    }

        return (  
			<div className='container SearchGrid'>
				<h3>Search</h3>
				<input onClick={this.searchForIt.bind(this)} />
				<table width='100%'>
					{found}
				</table>
				<hr />
			</div>
		)
	}
}

export default App;
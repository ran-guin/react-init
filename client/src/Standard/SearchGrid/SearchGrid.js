import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import axios from 'axios';
import cors from 'cors';


import {observable} from 'mobx';
import {observer} from 'mobx-react';

import SearchResults from './SearchResults';
import './SearchGrid.css';

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
		table: React.PropTypes.string,
		header: React.PropTypes.string,
		caseSensitive: React.PropTypes.boolean,
    	fields: React.PropTypes.array,
    	show: React.PropTypes.array,
    	test: React.PropTypes.array,

    	onPick: React.PropTypes.function,   // not sure how to add optional custom function execution as well... 
    	selectOne: React.PropTypes.object,
    }

	constructor(props) {
		super(props);
		this.state = { 
			searchResults: null,
			highlight: null,
			count: 0,
			clicks: 0,
		}
	}

	componentWillMount(props) { 
		searchSettings.string =  observable('');
		searchSettings.caseSensitive = observable(this.props.caseSensitive);
	} 

	loadResults(load) {
		this.setState(load);
	}

	clickit(evt) {
		this.setState({ count: this.state.count + 1})
	}

	searchForIt(e) {
		console.log("Search for data containing..." + searchSettings.string);
		var searchString = e.target.value;

		var _this = this;
		var fields = _this.props.fields;
		var show = _this.props.show || fields;

		var url = 'http://localhost:3002/lookup/search';

		var data = {}; // cors(corsOptions);
		data.model = this.props.table;

		var conditions = [];
		
		for (var i=0; i<fields.length; i++) {
			conditions.push(fields[i] + " LIKE '%" + searchString + "%'");
		}
		data.condition = conditions.join(' OR ');

		console.log('** Search : ' + JSON.stringify(data));

		axios.post(url, data )
		.then ( function (result) {
			console.log('got ' + data.model + ' results');
			var newdata = result.data[0];

			console.log("set results: " + JSON.stringify(newdata)); 
			// _this.setState({ searchResults: newdata});

			_this.loadResults({searchResults: newdata, fields: show, highlight: searchString});

			console.log(JSON.stringify(result.data[0]));
		})
		.catch ( function (err) {
			_this.data = null;
			console.log('axios call error');
		});
	}

	onSelect(evt) {
		// id, name, record) {

		var picked = {};

		if (evt && evt.target) {
		  picked = evt.target;
		  console.log("Picked: " + picked.id + ' : ' + picked.name);
		}
		// picked.status = 'picked';

		// this.setState({
		//   pickedId: picked.id,
		//   pickedName: picked.name,
		//   // pickedRecord: picked.record,
		//   pickedStatus: 'picked',
		// });

		this.props.selectOne.id = picked.id;
		this.props.selectOne.name = picked.name;
		this.props.selectOne.label          = {};
		this.props.selectOne.status        = 'picked';
		this.props.selectOne.subject = { id: picked.id, name: picked.name }

		console.log("Call ? " + this.props.onPick);
		// this.props.onPick.bind(this);

		return false;
	}


	render() {

		var _this = this;
		var fields = this.props.fields;
		var show  = this.props.show || fields;
		var selectOne = this.props.selectOne;

		var onPick;

		var highlight = this.state.highlight;
		var results = this.state.searchResults;

		var header;
		var form;

	    console.log("rendering search results: " + JSON.stringify(results));
	    console.log("select ONE: " + JSON.stringify(this.props.selectOne));

	    var found = <SearchResults searchResults={results} fields={show} highlight={highlight} onPick={this.onSelect.bind(this)} />
	    
        return (  
			<div className='container SearchGrid'>
			    <b>Selected: {selectOne.name} [{selectOne.id}] = {selectOne.subject.name} </b>
				<input onBlur={this.searchForIt.bind(this)} placeholder='-- Search --'/>	
					{found}
				<hr />
			</div>
		)
	}
}

App.defaultProps = {
	fields: ['id'],
	test: [],
}

export default App;
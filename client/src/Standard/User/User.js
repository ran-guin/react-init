import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import cors from 'cors';

import mobx from 'mobx';

import {observable} from 'mobx-react';

import List from './../List/List';
import IListWrapper from './../IList/IListWrapper';

import SearchGrid from './../SearchGrid/SearchGrid';

import './User.css';

const corsOptions = {
  origin: true,
  methods: ['GET','POST'],
  credentials: true,
  maxAge: 3600
};

const interests = ['Sport', 'Hiking', 'Photography'];
const skills = ['Climbing', 'Aerobics', 'Dance'];
const name = 'Johann';

// Example of iterative expandable-hierarchy-based list 
// const Iterative_List = [
//                          { name : 'A', id: 1, list: []}, 
//                          { name : 'B', id: 2}, 
//                          { 
//                            name : 'C', 
//                            id: 3, 
//                            list: [
//                                { name: 'C.1', id: 4}
//                            ]
//                          }
//                        ];

const Iterative_List = [
  { name : 'Cultural',
    id : 1,
    selected: true,
    list : [
      { 
        name : 'Museums',
        id   : 2,
        selectable: true,
        list : []
      },
      { 
        name : 'Galleries',
        id : 3,
        selectable: true,
        list : [
          {
            name : 'Art',
            id : 4,
            selected: true,
          }, 
          {
            name : 'Photography',
            id : 5,
            selected: false,
      }
        ]
      },
      { 
        name : 'Music',
        id : 6,
        list : [
          { name : 'Concerts', id : 7 },
          { name : 'Classical', id : 8 } , 
          { name : 'Rock', id : 9 }
        ]
      }
    ]
  },
  { 
    name : 'Sport',
    id : 10,
    list : [
      { name : 'Football', id: 11 }, 
      { name : 'Basketball', id: 12},
      { 
        name : 'Climbing', 
        id: 13,
        list : [
          { name : 'Sport', id: 16, list: [] }, 
          {name : 'Trad', id : 15 }
        ]
      }
    ]
  }
];

const grid = [{name: 'id'}, {name: 'email'}];

class App extends Component {
  
  // @observable Fname = 'John';
  // @observable Lname = 'Doe';

  static PropTypes = {
    name: React.PropTypes.string,
    details: React.PropTypes.text
  }

  static defaultProps = {
    details: 'initial details'
  }

  constructor(props) {
    super(props);

    this.name = 'Name';
    this.state = {
      details: 'init',
      name: 'Jeff'
    };

    console.log("continue...");
  }


  componentWillMount(props) {
    // alert('did mount');
    var userid = this.props.params.userid;

    if (userid) {

      var url = 'http://localhost:3002/user/' + userid;
      axios.get(url, cors(corsOptions))
      .then ( function (result) {
        console.log('got user results');

        // console.log("Name set to" + this.props.name);
        // this.setState( {name: 'Gina'} );

        console.log(JSON.stringify(result.data[0]));
        // this.details = JSON.stringify(result[0]);
        // this.setState({ details: JSON.stringify(result) });
      })
      .catch ( function (err) {
        console.log('axios call error');
      });
    }
  }

  componentDidMount(props) {

    var userid = this.props.params.userid;

    // this.details = 'initial results ' + userid;

    if (userid) {
      var url = 'http://localhost:3002/user/' + userid;
      // this.details = 'first revision';

      var _this = this;
      axios.get(url, cors(corsOptions))
      .then ( function (result) {
        console.log('got user results 2');
        // this.details = "revised details";
        // console.log("Name set to" + this.props.name);
        // this.setState( {name: 'Gina'} );

        console.log(JSON.stringify(result.data[0]));
        // this.details = JSON.stringify(result[0]);
        _this.setState({ details: 'updated result', name: 'George'});
      })
      .catch ( function (err) {
        // this.details='error details';
        _this.setState({ details: 'axios error: ' + err });
        console.log(err);
      });
    }

  }

  load() {
    console.log('load');
  }

  render() {
    
    var userid = this.props.params.userid;
    var username = this.props.name;
    var depth = this.props.depth + 1;
    var selectable = true;
    var off = false;

    return (
      <div className='UserProfile'>
        <h3>{this.name} or {this.state.name} : {userid} [{username}]</h3>
        <List className='ListBox' name='Interests' list={interests} />
        <p />
        <List className='ListBox' name='Skills' list={skills} />
        <p />
        <IListWrapper title='Iterative List Wrapper' list={Iterative_List} selectable={selectable} />
        <p />
        <p>
          <b>Results:</b>
          <span>{this.state.details}</span>
        </p>
        <hr />
        <SearchGrid fields={grid} />
      </div>
    );
  }
}

export default App;
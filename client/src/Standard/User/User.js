import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import cors from 'cors';
import PropTypes from 'prop-types'; 

// import mobx from 'mobx';
import {observable} from 'mobx';
import {observer} from 'mobx-react';


// import {observable} from 'mobx-react';

import Menu from './../List/Menu';
import List from './../List/List';
import IListWrapper from './../IList/IListWrapper';
import Form from './../Form/Form';

import SearchGrid from './../SearchGrid/SearchGrid';

import './User.css';

var menu = observable({ options: ['interests', 'skills', 'iterative', 'search', 'survey'], selected: 'main'});

var selectOne = observable( { subject: { id: 0, name: 'TBD', label: {} }, status: 'search'});

const corsOptions = {
  origin: true,
  methods: ['GET','POST'],
  credentials: true,
  maxAge: 3600
};


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

const UserList = {
  interests : ['Sport', 'Hiking', 'Photography'],
  skills : ['Climbing', 'Aerobics', 'Dance'],
  iterative : Iterative_List
}

// test automated form generation for various element types ...
const survey = [
  { 
    name: 'age',
    prompt: 'How old are you',
    type: 'number'
  },
 { 
    name: 'born',
    prompt: 'Where were you born',
    type: 'string'
  },
  {
    name: 'gender',
    prompt: 'Gender ?',
    type: 'radio',
    options: ['M','F','Other']
  },
  {
    name: 'gender',
    prompt: 'Purpose ?',
    type: 'checkbox',
    options: ['Social','Business','Other']
  },
  {
    name: 'gender',
    prompt: 'Country of Birth',
    type: 'dropdown',
    options: ['Canada','US', 'Europe','Asia', 'Australia','Africa','Other']
  }
];

var search = {
  // table: 'grp',
  // fields: ['name','access']
  table : 'user',
  fields: ['name','email'],
  show: ['name','email','access']
  // fields: [{name: 'id'}, {name: 'email'}],
};

const User = observer(
class User extends Component {
  
  // @observable Fname = 'John';
  // @observable Lname = 'Doe';

  static defaultProps = {
    details: 'initial details',
  }

  constructor(props) {
    super(props);

    this.name = this.props.name;
    this.id   = this.props.id;

    this.details = observable( { name: this.props.name, id: this.props.id});

    this.view = 'main';
    this.state = {
      details: 'initial details',
      name: 'Jeff',
      view: 'other',
      page: 'main',
      message: '',
      record: {},
    };
  }

  componentWillMount(props) {

  }

  loadUser(userid) {
   if (userid) {
      var url = 'http://localhost:3002/user/' + userid;
      // this.details = 'first revision';

      var _this = this;
      axios.get(url, cors(corsOptions))
      .then ( function (result) {
        console.log(JSON.stringify(result.data[0]));
        _this.setState({ record : result.data[0]} );
      })
      .catch ( function (err) {
        // this.details='error details';
        _this.setState({ message: 'axios error: ' + err });
        console.log(err);
      });
    }    
  }

  componentDidMount(props) {
    this.loadUser(this.props.params.userid);
  }

  onPick(evt) {
    // id, name, record) {
    console.log('do custom stuff as well....');
    return false;
  }

  render() {
    
    // var userid = this.props.params.userid;
    // var username = this.props.name;
    // var title = "<B>Hi there</B>";

    var selectable = true;
    // var pages = this.pages;

    let box = null;
    var selected = menu.selected;

    if (selected === 'interests') {
      box = <List className='ListBox' name='Interests' list={UserList.interests} />
    } 
    else if (selected === 'skills') {
      box = <List className='ListBox' name='Skills' list={UserList.skills} />
    }
    else if (selected === 'iterative') {
      box = <IListWrapper title='Interests' list={UserList.iterative} dropdown={selectable} />
    }
    else if (selected === 'search') {
      box = <div>
             <b>Picked: {selectOne.subject.name} [{selectOne.subject.id}] </b>
             <hr />
             <SearchGrid table={search.table} fields={search.fields} show={search.show} selectOne={selectOne} onPick={this.onPick.bind(this)}/>
            </div>;
    }
    else if (selected === 'survey') {
      box = <div>
              <Form elements={survey} name='Survey' />
            </div>;
    }
    else { box = <div> Undefined Page</div> }

    return (
        <div className='UserProfile'>
          <h3>{this.state.name}</h3>
          <Menu menu={menu} /> 
          <span> &nbsp; </span>
          {box}
        </div>
    );
  }
});

  User.PropTypes = {
    name: PropTypes.string,
    details: PropTypes.text,
    view: PropTypes.string,
  }

export default User;
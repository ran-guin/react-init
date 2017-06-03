import React, { Component } from 'react';

import {observable} from 'mobx';
import {observer} from 'mobx-react';

import './Tea.css';

import Menu from './../Standard/List/Menu';
import IListWrapper from './../Standard/IList/IListWrapper';

import Cart from './../Standard/Cart/Cart';

import _ from 'underscore';

// import Sequelize from 'sequelize';
// import Logo from './Logo';

const pages = ['teas', 'ceramics', 'cart'];
var menu = observable({ options: pages, selected: 'teas'});

var selected = observable({ count: 0, ids: [], labels: [] });

var data = observable( { result: [
  {id: 1, name: 'Black', selected: false, parent: null },
  {id: 2, name: 'Earl Grey', selected: true, parent: 1 },
  {id: 3, name: 'English Breakfast', selected: false, parent: 1 },
  {id: 4, name: 'Lady Grey', selected: true, parent: 2 },
  {id: 5, name: 'Earl Grey Cream', selected: true, parent: 2 },
  {id: 6, name: 'Green', selected: false, parent: null },
  {id: 7, name: 'Macha', selected: false, parent: 5 },
]});

console.log("LOAD ME");

var iTeas = observable({list: []});

var iterate_progeny = function(list,from) {
    var list = data.result || [];
    var ids = _.pluck(list, 'id');

    var Ilist = [];
    for (var i=0; i<ids.length; i++) {
      var parent = list[i].parent || null;

      if (from == parent) {
        // first pass
        var id = list[i].id;
        var name = list[i].name;
        var cost = list[i].cost;
        var qty = list[i].qty || 1;
        var sel = list[i].selected || false;        

        var ilist = iterate_progeny(list, id);
        console.log(from + ' = ' + parent + "...  Iterated list for " + id);
        console.log(JSON.stringify(ilist));

        var item = { name: name, id: id, selected: sel, list: ilist};
        
        Ilist.push(item);

        }
      }
      return Ilist;
  }

  var build_Ilist = function() {

    var list = data.result || [];

    iTeas.list = iterate_progeny(list, null);

    console.log("LIST: " + JSON.stringify(list));
    console.log("HASH: " + JSON.stringify(iTeas));
  }

  build_Ilist(data.result, null);

// build_x();

const Teas = [
  { name : 'Black',
    id : 1,
    selected: false,
    list : [
      { 
        name : 'Earl Grey',
        id   : 2,
        selectable: false,
        list : [
          { 
            name: 'Lady Earl Grey',
            id: 21,
            selectable: true,
            list: []
          },
          { 
            name: 'Earl Grey Cream',
            id: 22,
            selectable: true,
            list: []
          },
          { 
            name: 'Classic Earl Grey',
            id: 23,
            selectable: true,
            list: []
          },

        ]
      },
      { 
        name : 'English Breakfast',
        id : 3,
        selectable: true,
        list : []
      }
    ]
  },
  {
    name : 'Green',
    id : 10,
    list : [
      { name : 'Macha', id: 11 }, 
      { name : 'Classic Green', id: 12},
    ]
  }
];

const App = observer(
class App extends Component {
    
  static propTypes = {
    title: React.PropTypes.string,
    username: React.PropTypes.string,
    defaultPage: React.PropTypes.string,
  }

  static defaultProps = {
    title: 'Specified Default Title'
  }

 constructor(props) {
    super(props);

  }

  componentWillMount(props) {
    // alert('did mount');
  }

  componentDidMount(props) { 
 }

  componentWillUnmount(props) {

    // alert('will unmount');
  }  
  componentWillUpdate(props) {
    // alert('will update');
  }

  setUsername = e => {
    this.setState( { username: e.target.value} );
    // alert('reset username to ' + this.props.username);
  };

  loadPage(evt) {
    // var _this = this;

    if (evt.target && evt.target.name) { 
      var view = evt.target.name;
      this.setState({
        view: view,
      });

      console.log("loaded " + view + ' page'); 
    }
    else {
      console.log("no page name");
    }
  }

  // onPick(evt) {
  //   // id, name, record) {
    
  //   var picked = {};

  //   if (evt && evt.target) {
  //     picked = evt.target;
  //     console.log("Picked: " + picked.id + ' : ' + picked.name);
  //   }
  //   picked.status = 'picked';

  //   this.setState({
  //     pickedId: picked.id,
  //     pickedName: picked.name,
  //     // pickedRecord: picked.record,
  //     pickedStatus: 'picked',
  //   });

  //   return false;
  // }


  onSave() {
    console.log("Selection: " + JSON.stringify(data.result));
  }

  load_Teas() {
  }

  render() {
    var activate_dropdown = true;

    let section = null;
    var selectable = 'endpoints';

    if (menu.selected === 'teas' && iTeas.list.length) {
      section = <IListWrapper title='Select Teas' list={iTeas.list} dropdown={activate_dropdown} selected={selected} selectable={selectable} onSave={this.onSave.bind(this)} />
    } 
    else if (menu.selected === 'ceramics') {
      section = <div>Ceramics...</div>
    }
    else if (menu.selected === 'cart') {
      section = <Cart selected={data.result} />
    }
    else { section = <div> </div> }

    return (
      <div className="TeaPage">
        <div className="Tea-header">
          <h2>{this.props.title}</h2>

          <Menu menu={menu} onPick={this.loadPage.bind(this)}/>          
          {section}
        </div>
        {this.props.children}
        <h5>Teas:</h5>
      </div>
    );
  }
});

export default App;

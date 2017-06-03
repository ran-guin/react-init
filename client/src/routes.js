import React from 'react';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
 
import Main from './Standard/Main/Main';
import User from './Standard/User/User';
import Login from './Standard/Login/Login';

import Tea from './Tea/Tea';
import Visit from './OVID/Visit';

var routes = (
  <Router history={browserHistory} >
  	<Route path='/' component={Main} >
  		<IndexRoute component={Login} />
  		<Route path='user/:userid' component={User} />
  		<Route path='tea' component={Tea} />
  		<Route path='ovid' component={Visit} />
  		<Route path='tea' component={Tea} />
  		<Route path='*' component={Login} />
  	</Route>
  </Router>
);

export default routes;

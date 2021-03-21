import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Login from './Login';
import GuestDashboard from './GuestDashboard';

ReactDOM.render(
  <Router>
       <Switch>
		      <Route exact path="/" component={Login}/>
          <Route exact path="/guestdashboard" component={GuestDashboard}/>
	    </Switch>
  </Router>,
  document.getElementById('root')
);

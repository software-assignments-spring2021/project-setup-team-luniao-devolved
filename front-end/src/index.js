import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Login from './Login';
import GuestDashboard from './GuestDashboard';
import SignUp from './SignUp';

ReactDOM.render(
  <Router>
       <Switch>
		      <Route exact path="/" component={Login}/>
          <Route exact path="/guestdashboard" component={GuestDashboard}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/createpost" component={CreatePost}/>
	    </Switch>
  </Router>,
  document.getElementById('root')
);

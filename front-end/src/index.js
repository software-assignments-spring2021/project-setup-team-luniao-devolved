import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Login from './Login';
import GuestDashboard from './GuestDashboard';
import SignUp from './SignUp';
import CreatePost from './CreatePost';
import Recommendations from './Recommendations';

ReactDOM.render(
  <Router>
       <Switch>
		      <Route exact path="/" component={Login}/>
          <Route exact path="/guestdashboard" component={GuestDashboard}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/createpost" component={CreatePost}/>
          <Route exact path="/recommendations" component={Recommendations}/>
	    </Switch>
  </Router>,
  document.getElementById('root')
);

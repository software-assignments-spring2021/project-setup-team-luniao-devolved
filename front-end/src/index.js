import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './index.css';
import Login from './Login';
import GuestDashboard from './GuestDashboard';
import SignUp from './SignUp';
import CreatePost from './CreatePost';
import Recommendations from './Recommendations';
import PastTrips from './PastTrips';
import Dashboard from './Dashboard';
import NavBar from './components/NavBar';
import NewTrip from './NewTrip';
import CurrentTrip from './CurrentTrip';

ReactDOM.render(
  <Router>
       <Switch>
		      <Route exact path="/" component={Login}/>

          <Route exact path="/guestdashboard">
            <GuestDashboard/>
          </Route>

          <Route exact path="/signup" component={SignUp}/>

          <Route exact path="/pasttrips">
            <NavBar/>
            <PastTrips/>
          </Route>

          <Route exact path="/newtrip">
            <NavBar/>
            <NewTrip/>
          </Route>

          <Route exact path="/currenttrip">
            <NavBar/>
            <CurrentTrip/>
          </Route>

          <Route exact path="/dashboard">
            <NavBar/>
            <Dashboard/>
          
          </Route>
	    </Switch>
  </Router>,
  document.getElementById('root')
);

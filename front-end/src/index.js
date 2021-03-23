import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
//import './index.css';
import Login from './Login';
import GuestDashboard from './GuestDashboard';
import SignUp from './SignUp';
import CreatePost from './CreatePost';
import Recommendations from './Recommendations';
import Friends from './Friends'
import CurrentTrip from './CurrentTrip';
import NewTrip from './NewTrip';
import NavBar from './components/NavBar';
import ProfilePage from './ProfilePage';
import PastTrips from './PastTrips';
import Dashboard from './Dashboard';

ReactDOM.render(
  <Router>
       <Switch>
		      <Route exact path="/">
            <NavBar/>
            
          </Route>

          <Route exact path="/guestdashboard">
            <NavBar/>
            <GuestDashboard/>
          </Route>

          <Route exact path="/ProfilePage">
            <NavBar/>
            <ProfilePage/>
          </Route>

          <Route exact path="/CurrentTrip">
            <NavBar/>
            <CurrentTrip/>
          </Route>

          <Route exact path="/NewTrip">
            <NavBar/>
            <NewTrip/>
          </Route>

          {/* <Route exact path="/ProfilePage" component={ProfilePage}/> */}
          {/* <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/createpost" component={CreatePost}/>
          <Route exact path="/recommendations" component={Recommendations}/>
          <Route exact path="/pasttrips" component={PastTrips}/> */}
          <Route exact path="/pasttrips" component={PastTrips}/>
          <Route exact path="/dashboard" component={Dashboard}/>
	    </Switch>
  </Router>,
  document.getElementById('root')
);
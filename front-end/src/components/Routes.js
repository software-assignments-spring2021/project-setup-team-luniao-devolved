import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from './../Login';
import Logout from './../Logout';
import GuestDashboard from './../GuestDashboard';
import SignUp from './../SignUp';
import Dashboard from './../Dashboard';
import NavBar from './../components/NavBar';
import NewTrip from './../NewTrip';
import CurrentTrip from './../CurrentTrip';
import Cpoll from './../Cpoll';
import Itinerary from './../Itinerary';
import ProfilePage from './../ProfilePage';
import Friends from './../Friends';
//import EditProfile from './../EditProfile';
import Preferences from './../Preferences';
import GuestNewTrip from './../GuestNewTrip';
import PastTrips from './../PastTrips';
import CreatePost from './../CreatePost';
import Recommendations from './../Recommendations';
import AddFriends from './../AddFriends';


const Routes = ({ isLoggedIn }) => {

    if (isLoggedIn) {
        return (<Router>
            <Switch>
                <Route exact path="/" component={Login} />

                <Route exact path="/guestdashboard">
                    <GuestDashboard />
                </Route>

                <Route exact path="/signup" component={SignUp} />

                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>

                {/* <PrivateRoute exact path="/dashboard"> 
                <NavBar/>
                <Dashboard/>
            </PrivateRoute> */}

                <Route exact path="/addfriends">
                    <AddFriends />
                </Route>

                <Route exact path="/pasttrips">
                    <PastTrips />
                </Route>

                <Route exact path="/newtrip">
                    <NewTrip />
                </Route>

                <Route exact path="/currenttrip">
                    <CurrentTrip />
                </Route>

                {/*
            <Route exact path="/editprofile">
                <NavBar/>
                <EditProfile/>
            </Route>
            */}

                <Route exact path="/createpost">
                    <CreatePost />
                </Route>

                <Route exact path="/friends">
                    <Friends />
                </Route>

                <Route exact path="/guestnewtrip">
                    <GuestNewTrip />
                </Route>

                <Route exact path="/preferences">
                    <Preferences />
                </Route>

                <Route exact path="/createpoll">
                    <Cpoll />
                </Route>
                {/* 
            <Route exact path="/dashboard">
                <NavBar/>
                <Dashboard/>
            </Route> */}

                <Route exact path="/profile">
                    <ProfilePage />
                </Route>

                <Route exact path="/itinerary">
                    <Itinerary />
                </Route>

                <Route exact path="/recommendations">
                    <Recommendations />
                </Route>

                <Route exact path="/logout">
                    <Logout />
                </Route>


            </Switch>
        </Router>)
    }

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />

                <Route exact path="/guestdashboard">
                    <GuestDashboard />
                </Route>

                <Route exact path="/guestdashboard">
                    <GuestDashboard />
                </Route>

                <Route exact path="/signup" component={SignUp} />
                {/*     
              <Route exact path="/dashboard"> 
                <Redirect to='/'/>
              </Route> */}

                <Route exact path="/dashboard">
                    <NavBar />
                    <Dashboard />
                </Route>

                {/* <PrivateRoute exact path="/dashboard"> 
                <NavBar/>
                <Dashboard/>
              </PrivateRoute> */}

                <Route exact path="/addfriends">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/pasttrips">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/newtrip">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/currenttrip">
                    <Redirect to='/' />
                </Route>

                {/*
              <Route exact path="/editprofile">
                <NavBar/>
                <EditProfile/>
              </Route>
              */}

                <Route exact path="/createpost">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/friends">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/guestnewtrip">
                    <GuestNewTrip />
                </Route>

                <Route exact path="/preferences">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/createpoll">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/profile">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/itinerary">
                    <Redirect to='/' />
                </Route>

                <Route exact path="/recommendations">
                    <NavBar />
                    <Recommendations />
                </Route>

                <Route exact path="/logout">
                    <Logout />
                </Route>


            </Switch>
        </Router>
    )

}

export default Routes;

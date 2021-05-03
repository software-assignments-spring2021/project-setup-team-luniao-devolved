import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import './index.css';
import Login from './Login';
import Logout from './Logout';
import GuestDashboard from './GuestDashboard';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import NavBar from './components/NavBar';
import NewTrip from './NewTrip';
import CurrentTrip from './CurrentTrip';
import Cpoll from './Cpoll';
import Itinerary from './Itinerary';
import ProfilePage from './ProfilePage';
import Friends from './Friends';
//import EditProfile from './EditProfile';
import Preferences from './Preferences';
import GuestNewTrip from './GuestNewTrip';
import PastTrips from './PastTrips';
import CreatePost from './CreatePost';
import Recommendations from './Recommendations';
import AddFriends from './AddFriends';

// function AuthRoutes() {

//   axios({
//     method: "post",
//     url: "http://localhost:4000/api/login",
//     data: user,
//     headers: { Authorization: `JWT ${localStorage.getItem('JWT')}`}
//   })
//   .then((res) => {
//     console.log("here");
//     console.log(res);
//     if (res.data === "nouser") {
//       alert("Your account does not exist!");
//       // setReload(true);
//     }
//     else if (res.data === "incorrectpw") {
//       alert("Your password is incorrect!");
//       // setReload(true);
//     }
//     else if (res.data.message === "success") {
//       console.log("successful login");
//       localStorage.setItem('JWT', res.data.token);
//       setRedirect(true);
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });


let isLoggedIn = localStorage.getItem('JWT');
if (isLoggedIn) {
  ReactDOM.render(
    <Router>
         <Switch>
            <Route exact path="/" component={Login}/>
  
            <Route exact path="/guestdashboard">
              <GuestDashboard/>
            </Route>
  
            <Route exact path="/signup" component={SignUp}/>

            <Route exact path="/dashboard"> 
              <NavBar/>
              <Dashboard/>
            </Route>
  
            {/* <PrivateRoute exact path="/dashboard"> 
              <NavBar/>
              <Dashboard/>
            </PrivateRoute> */}
  
            <Route exact path="/addfriends"> 
              <NavBar/>
              <AddFriends/>
            </Route>
  
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
  
            {/*
            <Route exact path="/editprofile">
              <NavBar/>
              <EditProfile/>
            </Route>
            */}
  
            <Route exact path="/createpost">
              <NavBar/>
              <CreatePost/>
            </Route>
  
            <Route exact path="/friends">
              <NavBar/>
              <Friends/>
            </Route>
  
            <Route exact path="/guestnewtrip">
              <GuestNewTrip/>
            </Route>
  
            <Route exact path="/preferences">
              <NavBar/>
              <Preferences/>
            </Route>
  
            <Route exact path="/createpoll">
              <NavBar/>
              <Cpoll/>
            </Route>
            {/* 
            <Route exact path="/dashboard">
              <NavBar/>
              <Dashboard/>
            </Route> */}
  
            <Route exact path="/profile">
              <NavBar/>
              <ProfilePage/>
            </Route>
  
            <Route exact path="/itinerary">
              <NavBar/>
              <Itinerary/>
            </Route>
  
            <Route exact path="/recommendations">
              <NavBar/>
              <Recommendations/>
            </Route>

            <Route exact path="/logout">
              <Logout />
            </Route>


        </Switch>
    </Router>,
    document.getElementById('root')
  );
  } else {
    ReactDOM.render(
      <Router>
           <Switch>
              <Route exact path="/" component={Login}/>
    
              <Route exact path="/guestdashboard">
                <GuestDashboard/>
              </Route>

              <Route exact path="/guestdashboard">
                <GuestDashboard/>
              </Route>                      
    
              <Route exact path="/signup" component={SignUp}/>
              {/*     
              <Route exact path="/dashboard"> 
                <Redirect to='/'/>
              </Route> */}

              <Route exact path="/dashboard"> 
                <NavBar/>
                <Dashboard/>
              </Route>
    
              {/* <PrivateRoute exact path="/dashboard"> 
                <NavBar/>
                <Dashboard/>
              </PrivateRoute> */}
    
              <Route exact path="/addfriends"> 
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/pasttrips">
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/newtrip">
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/currenttrip">
                <Redirect to='/'/>
              </Route>
    
              {/*
              <Route exact path="/editprofile">
                <NavBar/>
                <EditProfile/>
              </Route>
              */}
    
              <Route exact path="/createpost">
               <Redirect to='/'/>
              </Route>
    
              <Route exact path="/friends">
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/guestnewtrip">
                <GuestNewTrip/>
              </Route>
    
              <Route exact path="/preferences">
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/createpoll">
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/profile">
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/itinerary">
                <Redirect to='/'/>
              </Route>
    
              <Route exact path="/recommendations">
                <NavBar/>
                <Recommendations/>
              </Route>

              <Route exact path="/logout">
                <Logout />
              </Route>


          </Switch>
      </Router>,
      document.getElementById('root')
    );
  }


// ReactDOM.render(
//   <Router>
//        <Switch>
// 		      <Route exact path="/" component={Login}/>

//           <Route exact path="/guestdashboard">
//             <GuestDashboard/>
//           </Route>

//           <Route exact path="/signup" component={SignUp}/>

//           <Route exact path="/dashboard"> 
//           <NavBar/>
//             <WithEnsureAuthentication>
//               <Dashboard/>
//             </WithEnsureAuthentication>
//           </Route>

//           {/* <PrivateRoute exact path="/dashboard"> 
//             <NavBar/>
//             <Dashboard/>
//           </PrivateRoute> */}

//           <Route exact path="/addfriends"> 
//             <NavBar/>
//             <AddFriends/>
//           </Route>

//           <Route exact path="/pasttrips">
//             <NavBar/>
//             <PastTrips/>
//           </Route>

//           <Route exact path="/newtrip">
//             <NavBar/>
//             <NewTrip/>
//           </Route>

//           <Route exact path="/currenttrip">
//             <NavBar/>
//             <CurrentTrip/>
//           </Route>

//           {/*
//           <Route exact path="/editprofile">
//             <NavBar/>
//             <EditProfile/>
//           </Route>
//           */}

//           <Route exact path="/createpost">
//             <NavBar/>
//             <CreatePost/>
//           </Route>

//           <Route exact path="/friends">
//             <NavBar/>
//             <Friends/>
//           </Route>

//           <Route exact path="/guestnewtrip">
//             <GuestNewTrip/>
//           </Route>

//           <Route exact path="/preferences">
//             <NavBar/>
//             <Preferences/>
//           </Route>

//           <Route exact path="/createpoll">
//             <NavBar/>
//             <Cpoll/>
//           </Route>
//           {/* 
//           <Route exact path="/dashboard">
//             <NavBar/>
//             <Dashboard/>
//           </Route> */}

//           <Route exact path="/profile">
//             <NavBar/>
//             <ProfilePage/>
//           </Route>

//           <Route exact path="/itinerary">
//             <NavBar/>
//             <Itinerary/>
//           </Route>

//           <Route exact path="/recommendations">
//             <NavBar/>
//             <Recommendations/>
//           </Route>
// 	    </Switch>
//   </Router>,
//   document.getElementById('root')
// );

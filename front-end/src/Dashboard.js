import './Dashboard.css'
import ReactDOM from 'react-dom';

import axios from 'axios'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {BrowserRouter as Router, Switch, Route, Redirect, useHistory} from 'react-router-dom';

function Dashboard(){

    const [user, setData] = useState([]);
    const [userData, setUserData] = useState({});

    const history = useHistory();

    // const [hasJWT, sethasJWT] = useState(localStorage.getItem('JWT'));
    // const hasJWT = localStorage.getItem('JWT');

    useEffect(() => {
    /*
      // a nested function that fetches the data
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        const result = await axios(
          // retrieving some mock data about users
          "https://my.api.mockaroo.com/users.json?key=4e1c2150"
        );
        // set the state variable
        // this will cause a re-render of this component
        setData(result.data);
        console.log(result.data)
      }
  
      // fetch the data!
      fetchData();
      // the blank array below causes this callback to be executed only once on component load
      */
      if (localStorage.getItem('JWT')) {
      } else {
        history.push({
            pathname:  "/",
          });    
      }

      axios({
        method: "GET",
        url: "http://localhost:4000/api/Dashboard",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(post => {
            setData(post.data);
      });

      axios({
        method: "GET",
        url: "http://localhost:4000/api/userinfo",
        headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem('JWT')}`
        }
      }).then(userinfo => {
          setUserData(userinfo.data);
      });


    }, []);
    return(
        <div className="dashboard">

            <div className="dashboard-header">
                <h3> {userData["fullname"]}'s Dashboard</h3>
            </div>
            {/* <textarea class="postform" rows="3" placeholder="How is your vacation going?"></textarea> 
                        <button type="submit" class="btn btn-default">Post</button>
            */}
            <div>
            <Button href="/createpost">New Post</Button>
            </div>

            <h2><strong>Here's what your friends have been up to:</strong></h2>
            <div class="container">
            <div>
                <strong>{user["first_name"]} {user["last_name"]}</strong>
            </div>
            <div>
                {user["posts"]}
            </div>
            <div>
                {user["date"]}
            </div>
            </div>
        </div>
    )
}

export default Dashboard;

//Alt navbar code
/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Travel Wise</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Dashboard</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">New Trip</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Current Trip</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Past Trips</a>
                    </li>
                    <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Profile
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="#">View Profile</a></li>
                        <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                        <li><a class="dropdown-item" href="#">Sign Out</a></li>
                    </ul>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
*/ 
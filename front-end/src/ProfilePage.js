import './ProfilePage.css'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { useEffect, useState } from 'react';

function ProfilePage(){
    /*const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const result = await axios(
                "https://my.api.mockaroo.com/users.json?key=4e1c2150"
            );
            setData(result.data);
        }
        fetchData();
    }, []);
    */
    /*
    const axios = require('axios');
    axios({
        method: 'get',
        url: 'https://my.api.mockaroo.com/users.json?key=4e1c2150',
        responseType: 'stream'
    })
    */

    const [user, setData] = useState([]);

    useEffect(() => {
    /* This block of code was for using Mockaroo
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
      //New route 
    axios({
      method: "GET",
      url: "http://localhost:4000/api/ProfilePage",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(user => {
      setData(user.data);
    });

    }, []);

    return(
        <div classname = "ProfilePage">
            <header classname = "Profile-header">
                <br />
                <h1> 
                    Profile
                </h1>
                <img class="img-responsive" src="https://my.api.mockaroo.com/users.json?key=4e1c2150" class="img-circle"></img>
                <div class="container">
                    <div class="row">
                        {user["first_name"]} {user["last_name"]}
                    </div>
                    <div class="row">
                        {user["dob"]}
                    </div>
                <div class="container">
                    <div>
                        <strong>Past Posts</strong>
                    </div>
                    <div>
                        {user["posts"]}
                    </div>
                </div>
                </div>
            </header>
        </div>
    );
}

export default ProfilePage;

/*                    <div class="row">
                        <a href="#">New Post</a>
                    </div>
                    <div class="row">
                    <   a href = "#">Friends</a>
                    </div>
                    <div class="row">
                        <a href="#">Preferences</a>
                    </div>
                    <div class="row">
                        <a href = "#">Edit Profile</a>
                    </div>
                </div> 
*/

//Alt buttons
/*
<Button variant="link">Edit Profile</Button>
<Button variant="link">Friends</Button>
*/

//Alt linking
/*            <a href = "/EditProfile">Edit Profile</a>
            <a href = "/EditProfile">Friends</a>
            */

/*                <section className="user">
                    {data.map(item => (
                        <User key={item.id} details={item} />
                    ))}
                </section> */

//Alt Navbar code
/*
<nav class="navbar navbar-expand-lg navbar-light bg-light">
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

//Alt post text area
/* <textarea class="form-control" rows="3" placeholder="How is your vacation going?"></textarea>
*/
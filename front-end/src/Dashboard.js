import './Dashboard.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';


function Dashboard(){
    const [post, setData] = useState([]);

    useEffect(() => {
      // a nested function that fetches the data
      async function fetchData() {
        // axios is a 3rd-party module for fetching data from servers
        const result = await axios(
          // retrieving some mock data about posts
          "https://my.api.mockaroo.com/posts.json?key=4e1c2150"
        );
        // set the state variable
        // this will cause a re-render of this component
        setData(result.data);
        console.log(result.data)
      }
  
      // fetch the data!
      fetchData();
      // the blank array below causes this callback to be executed only once on component load
    }, []);
    return(
        <div classname="dashboard">
            <div className="NavBar">
            <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/guestdashboard">Travel Wise</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link to="/newtrip">New Trip</Nav.Link>
                <Nav.Link href="#currenttrip">Current Trip</Nav.Link>
                <Nav.Link href="#pasttrip">Past Trips</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown alignRight title="Profile">
                        <NavDropdown.Item href="#action/3.1">See Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Friends</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.4">Preferences</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
            <div classname="Dashboard-header">
                <h1>
                    Dashboard
                </h1>
            </div>
            <textarea class="form-control" rows="3" placeholder="How is your vacation going?"></textarea>
            <button type="submit" class="btn btn-default">Post</button>

            <div>
                {post["post"]}
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
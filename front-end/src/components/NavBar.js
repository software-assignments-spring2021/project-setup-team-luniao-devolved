import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Alert, Modal} from "react-bootstrap";


const NavBar = (props) => {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/ProfilePage">Profile</Link>
      <Link to="/CurrentTrip">Current Trip</Link>
      <Link to="/NewTrip">New Trip</Link>
    </nav>

    // <div className="NavBar">
    //         <Navbar bg="primary" variant="dark" expand="lg">
    //         <Navbar.Brand href="/guestdashboard">Travel Wise</Navbar.Brand>
    //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //         <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="mr-auto">
    //             <Nav.Link to="/newtrip">New Trip</Nav.Link>
    //             <Nav.Link href="#currenttrip" onClick={openModal}>Current Trip</Nav.Link>
    //             <Nav.Link href="#pasttrip" onClick={openModal}>Past Trips</Nav.Link>
    //             </Nav>
    //             <Nav>
    //                 <NavDropdown alignRight title="Profile" onClick={openModal}>
    //                     <NavDropdown.Item href="#action/3.1">See Profile</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.2">Friends</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.3">Edit Profile</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.4">Preferences</NavDropdown.Item>
    //                     <NavDropdown.Divider />
    //                     <NavDropdown.Item href="#action/3.4">Sign Out</NavDropdown.Item>
    //                 </NavDropdown>
    //             </Nav>
    //         </Navbar.Collapse>
    //         </Navbar>
    //     </div>
  )
}

export default NavBar

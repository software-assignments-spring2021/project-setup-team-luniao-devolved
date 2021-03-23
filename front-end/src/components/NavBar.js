import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = (props) => {
    return (
        <div className="NavBar">
            <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/guestdashboard">Travel Wise</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/newtrip">New Trip</Nav.Link>
                <Nav.Link href="/currenttrip">Current Trip</Nav.Link>
                <Nav.Link href="/pasttrips">Past Trips</Nav.Link>
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
    );
}

export default NavBar;
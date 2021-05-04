import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Layout.css';

const NavBar = (props) => {
    return (
        <div className="NavBar">
            <Navbar expand="lg">
            <Navbar.Brand href="/dashboard">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="/newtrip">New Trip</Nav.Link>
                <Nav.Link href="/currenttrip">Current Trip</Nav.Link>
                <Nav.Link href="/pasttrips">Past Trips</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown alignRight title="Profile">
                        <NavDropdown.Item href="/profile">View Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/friends">Friends</NavDropdown.Item>
                        <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="preferences">Preferences</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/logout">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default NavBar;
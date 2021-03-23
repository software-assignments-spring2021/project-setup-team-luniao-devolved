import React, {useState} from "react";
import {Navbar, Nav, NavDropdown, Alert, Modal} from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./GuestDashboard.css";

function GuestDashboard() {

    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

    return (
    <div className="GuestDashboard">
        <div className="GuestAlert">
            <Alert variant="primary">
            <Alert.Heading>Welcome to Travel Wise!</Alert.Heading>
            <p className="info">As a guest, feel free to create a new trip and explore Travel Wise. Note that if you want to try other options, you must sign up. Enjoy!</p>
            </Alert>
        </div>
        <div className="NavBar">
            <Navbar bg="primary" variant="dark" expand="lg">
            <Navbar.Brand href="/guestdashboard">Travel Wise</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link to="/newtrip">New Trip</Nav.Link>
                <Nav.Link href="#currenttrip" onClick={openModal}>Current Trip</Nav.Link>
                <Nav.Link href="#pasttrip" onClick={openModal}>Past Trips</Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown alignRight title="Profile" onClick={openModal}>
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
        <div>
        <Modal show={open} onHide={closeModal}>
                    <Modal.Header closeButton onClick={closeModal}>
                        <Modal.Title>Sign up to access!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Click here to <Link to ="">sign up</Link></Modal.Body>
        </Modal>
        </div>
        <div>
            <h4>Seems awfully quiet without friends...</h4>
        </div>
    </div>
    );
}

export default GuestDashboard;
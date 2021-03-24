import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.svg';
import './NewTrip.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {Navbar, Nav, NavDropdown, Alert, Modal} from "react-bootstrap";

const GuestNewTrip = (props) => {

    const [open, setOpen] = useState(false);

    const closeModal = () => setOpen(false);
    const openModal = () => setOpen(true);

  return (
    <div className="NewTrip">
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
                <Nav.Link href="/guestnewtrip">New Trip</Nav.Link>
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

      <h3>New Trip</h3>
      <section className="main-content">

        <div class='flex-container'>
          <div>

          </div>

          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Trip Name"
                aria-label="Trip Name"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </div>

          <div>
            <Button href="#">Add Friends</Button>
            <Button href="/createpoll">Create Poll</Button>
            <Button href="/recommendations">Ask for Rec</Button>
          </div>

          <div>
            <p>To-do List:</p>
            {/* Need help creating blank list and populating with items */}
          </div>

          <div>
            <Button href="#">Back</Button>
          </div>

          <div>
            <Button href="#">Add</Button>
          </div>

        </div>

      </section>
    </div>
  );
}

export default GuestNewTrip;

import React, { useState } from 'react';



import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";

import './App.css';



function App() {
    return (
        // Container with padding
        <Container className="p-3">
                // hiiii
            <Jumbotron>
                <h1>Trip Preferences</h1>
                <p>
                    Customize preferences for your upcoming trip!
        </p>
            </Jumbotron>
            <Form>
                <Form.Group controlId="TripBudget">
                    <Form.Label>Trip Budget</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="$" />
                </Form.Group>
                <Form.Group controlId="DepartureTime">
                    <Form.Label>Departure Time</Form.Label>
                    <Form.Control size="sm" as="select" >
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>Night</option>
                        <option>Red-Eye</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Number of Nights" />
                </Form.Group>
                <Form.Group controlId="StayType">
                    <Form.Label>Stay Type</Form.Label>
                    <Form.Control size="sm" as="select">
                        <option>Hotel</option>
                        <option>Apartment</option>
                        <option>Home Stay</option>
                        <option>Hostel</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control size="sm" as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3 </option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Transportation">
                    <Form.Label>Transportation</Form.Label>
                    <Form.Control size="sm" as="select">
                        <option>Flight</option>
                        <option>Train</option>
                        <option>Bus</option>
                        <option>Personal</option>
                    </Form.Control>
                </Form.Group>
            </Form >
            <>

                <Button variant="outline-danger">Cancel</Button>{' '}
                <Button variant="outline-success">Confirm</Button>{' '}
                <br />

            </>


            <>
                <br />
                <Button variant="outline-secondary" href="./Cpoll" size="lg" block>Page 2- Poll </Button> {' '}
            </>

        </Container >


    );
}




export default App;

import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import axios from 'axios';


function Preferences() {
    const [budget, setBudget] = useState(0);
    const [time, setTime] = useState('Morning');
    const [length, setLength] = useState(0);
    const [type, setType] = useState('Hotel');
    const [rating, setRating] = useState(0);
    const [transport, setTransport] = useState('Flight');


    const onSubmit = (e) => {
        console.log("data saved");
        e.preventDefault();
        const nPref = {
            pref_budget: { budget },
            pref_time: { time },
            pref_length: { length },
            pref_type: { type },
            pref_rating: { rating },
            pref_transport: { transport }

        };
        axios.post('http://localhost:4000/preferences', nPref)
            .then(res => console.log(res.data));

    }
    return (
        // Container with padding
        <Container className="p-3">

            <Jumbotron>
                <h1>Trip Preferences</h1>
                <p>
                    Customize preferences for your upcoming trip!
        </p>
            </Jumbotron>
            <Form onSubmit={e => { onSubmit(e) }}>
                <Form.Group controlId="TripBudget">
                    <Form.Label>Trip Budget</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="$" value={budget} onChange={e => { setBudget(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="DepartureTime">
                    <Form.Label>Departure Time</Form.Label>
                    <Form.Control size="sm" as="select" value={time} onChange={e => { setTime(e.target.value) }} >
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>Night</option>
                        <option>Red-Eye</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Number of Nights" value={length} onChange={e => { setLength(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="StayType">
                    <Form.Label>Stay Type</Form.Label>
                    <Form.Control size="sm" as="select" value={type} onChange={e => { setType(e.target.value) }}>
                        <option>Hotel</option>
                        <option>Apartment</option>
                        <option>Home Stay</option>
                        <option>Hostel</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control size="sm" as="select" value={rating} onChange={e => { setRating(e.target.value) }}>
                        <option>1</option>
                        <option>2</option>
                        <option>3 </option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Transportation">
                    <Form.Label>Transportation</Form.Label>
                    <Form.Control size="sm" as="select" value={transport} onChange={e => { setTransport(e.target.value) }}>
                        <option>Flight</option>
                        <option>Train</option>
                        <option>Bus</option>
                        <option>Personal</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="outline-success">Confirm</Button>
            </Form >
            <>

                <Button variant="outline-danger" href='/profile'>Back to Profile</Button>

                <br />
            </>

        </Container >


    );
}




export default Preferences;
import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import axios from "axios";

function AddItem(props) {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        let itinItem = new Object();
        itinItem.name = name;
        itinItem.time = time;
        itinItem.type = type;
        itinItem.location = location;
        let itinString = JSON.stringify(itinItem);

        axios({
            method: "post",
            url: "http://localhost:4000/api/itinerary",
            data: itinString,
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem('JWT')}`
            }
          }).then(function(res) {
            console.log("Itinerary saved!");
            if (res.data === "itinerary") {
                alert("Itinerary saved!");
            }
          })
          .catch(function(res) {
            console.log(res);
          });
    }

    return (
        // Modal that contains the form for adding an itinerary item
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Itinerary Item</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={e => { onSubmit(e) }}>
                    <Form.Group controlId="option1.ControlTextarea">
                        <Form.Label>Type (Eg. Hotel, Flight, Tour)</Form.Label>
                        <Form.Control as="textarea" value={type} onChange={e => { setType(e.target.value) }} rows={1} />
                    </Form.Group>
                    <Form.Group controlId="option1.ControlTextarea">
                        <Form.Label>Name (Eg. Marriot)</Form.Label>
                        <Form.Control as="textarea" value={name} onChange={e => { setName(e.target.value) }} rows={1} />
                    </Form.Group>
                    <Form.Group controlId="message.ControlTextarea">
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="textarea" value={location} onChange={e => { setLocation(e.target.value) }} rows={1} />
                    </Form.Group>

                    <Form.Group controlId="option1.ControlTextarea">
                        <Form.Label>Time</Form.Label>
                        <Form.Control as="textarea" value={time} onChange={e => { setTime(e.target.value) }} rows={1} />
                    </Form.Group>
                    <Button type="submit" onClick={props.onHide}>Save</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

function Itinerary(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [itin, setItin] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/api/itinerary",
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem('JWT')}`
            }
        }).then(user => {
            console.log(user.data);
            setItin(user.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        // Container for page
        <Container className="p-3">
            <div className="Itinerary">
                {/* Large box for title and description*/}
                <Jumbotron>
                    <h1>Itinerary</h1>
                    <p>View and add to your trip itinerary!</p>
                </Jumbotron>
           
                <>
                    {/* Button to open the modal and add an itinerary item*/}
                    <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                        Add Itinerary item!
                    </Button>

                    <AddItem show={modalShow} onHide={() => setModalShow(false)}/>
                </>

                <body className="ItineraryBody">
                    <br />
                    <CardColumns>
                        {/* Displaying the sample itinerary items*/}
                        {itin.map(e => (
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>{e.type}</Card.Title>
                                    <Card.Text>
                                        {e.name}
                                        <br />
                                        {e.location}
                                        <br />
                                        {e.time}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        ))}
                    </CardColumns>
                </body>
            </div >
        </Container>
    );
}


export default Itinerary;

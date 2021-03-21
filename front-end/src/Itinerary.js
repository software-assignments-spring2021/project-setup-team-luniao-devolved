import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from "axios";

function AddItem(props) {
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
                <Form>
                    <Form.Group controlId="option1.ControlTextarea">
                        <Form.Label>Type (Eg. Hotel, Flight, Tour)</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                    <Form.Group controlId="option1.ControlTextarea">
                        <Form.Label>Name (Eg. Marriot)</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                    <Form.Group controlId="message.ControlTextarea">
                        <Form.Label>Location</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>

                    <Form.Group controlId="option1.ControlTextarea">
                        <Form.Label>Time</Form.Label>
                        <Form.Control as="textarea" rows={1} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {/* Buttons hide the modal on click*/}
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={props.onHide}>Save</Button>

            </Modal.Footer>
        </Modal>
    );
}

function Itinerary(props) {
    const [modalShow, setModalShow] = React.useState(false);

    const [itin, setItin] = useState([]);

    useEffect(() => {

        async function fetchData() {
            const result = await axios(
                // getting random words to fill sample itinerary items
                "https://my.api.mockaroo.com/itinerary_items.json?key=f3836780"
            );
            setItin(result.data);
        }
        fetchData();
    }, [])

    return (
        // Container for page
        <Container className="p-3">
            <div className="Itinerary">
                {/* Large box for title and description*/}
                <Jumbotron>
                    <h1>Itinerary</h1>
                    <p>
                        View and add to your trip itinerary!
        </p>
                </Jumbotron>
                <>
                    {/* Button to open the modal and add an itinerary item*/}
                    <Button variant="outline-primary" onClick={() => setModalShow(true)}>
                        Add Itinerary item!
      </Button>

                    <AddItem
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />

                </>

                <body className="ItineraryBody">
                    <br />
                    <CardColumns>
                        {/* Displaying the sample itinerary items*/}
                        {itin.map(e => (
                            <Card border="primary">
                                <Card.Body>
                                    <Card.Title>{e["type"]}</Card.Title>
                                    <Card.Text>
                                        {e["name"]}
                                        <br />
                                        {e["location"]}
                                        <br />
                                        {e["time"]}
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

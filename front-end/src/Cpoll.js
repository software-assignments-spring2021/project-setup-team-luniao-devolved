import React from "react";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

function Cpoll() {

    return (
        // Container for Poll form
        <Container className="PollHeader">
            {/* Large box for page title and description*/}
            <Jumbotron>
                <h1>Create Poll</h1>
                <p>
                    Create a poll for your friends!
        </p>
            </Jumbotron>
            {/* Form */}
            <Form>
                <Row>
                    <Col>
                        <Form.Control placeholder="Poll Name" />
                    </Col>
                    <Col>
                        <Form.Control placeholder="End Date" />
                    </Col>
                </Row>
                <br />
                <Form.Group controlId="message.ControlTextarea">
                    <Form.Label>Poll Message</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group controlId="option1.ControlTextarea">
                    <Form.Label>Option 1</Form.Label>
                    <Form.Control as="textarea" rows={1} />
                </Form.Group>

                <Form.Group controlId="option2.ControlTextarea">
                    <Form.Label>Option 2 </Form.Label>
                    <Form.Control as="textarea" rows={1} />
                </Form.Group>
                <Form.Group controlId="option3.ControlTextarea">
                    <Form.Label>Option 3 </Form.Label>
                    <Form.Control as="textarea" rows={1} />
                </Form.Group>
            </Form>
            <>

                <Button variant="outline-danger">Back</Button>{' '}
                <Button variant="outline-success">Confirm</Button>{' '}
                <br />

            </>


            <>
                <br />
                <Button variant="outline-secondary" href="./Itinerary" size="lg" block>Page 2- Itinerary </Button> {' '}
            </>


        </Container>

    );
}



export default Cpoll;
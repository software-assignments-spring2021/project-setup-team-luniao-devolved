import React from "react";
import Container from 'react-bootstrap/Container';
//import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Cpoll(props) {
    //vars to hold form data
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [opa, setOpa] = useState("");
    const [opb, setOpb] = useState("");
    const [opc, setOpc] = useState("");

    //handling form data
    const onSubmit = (e) => {
        console.log("data saved");
        e.preventDefault();
        const nPoll = {
            poll_name: { name },
            poll_date: { date },
            poll_message: { message },
            poll_opa: { opa },
            poll_opb: { opb },
            poll_opc: { opc }

        };
        // console.log(nPoll);
        //posting form data
        axios.post('http://localhost:4000/createpoll', nPoll)
            .then(res => console.log(res.data));
    }


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
            <Form className="poll form" onSubmit={e => { onSubmit(e) }}>
                <Row>
                    <Col>
                        <Form.Group controlId="name.ControlTextarea">
                            <Form.Label>Poll Name</Form.Label>
                            <Form.Control as="textarea" value={name} onChange={e => { setName(e.target.value) }} rows={1} />

                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="endDate.ControlTextarea">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" value={date} onChange={e => { setDate(e.target.value) }} rows={1} />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Form.Group controlId="message.ControlTextarea">
                    <Form.Label>Poll Message</Form.Label>
                    <Form.Control as="textarea" value={message} onChange={e => { setMessage(e.target.value) }} rows={3} />
                </Form.Group>

                <Form.Group controlId="option1.ControlTextarea">
                    <Form.Label>Option 1</Form.Label>
                    <Form.Control as="textarea" value={opa} onChange={e => { setOpa(e.target.value) }} rows={1} />
                </Form.Group>

                <Form.Group controlId="option2.ControlTextarea">
                    <Form.Label>Option 2 </Form.Label>
                    <Form.Control as="textarea" value={opb} onChange={e => { setOpb(e.target.value) }} rows={1} />
                </Form.Group>
                <Form.Group controlId="option3.ControlTextarea">
                    <Form.Label>Option 3 </Form.Label>
                    <Form.Control as="textarea" value={opc} onChange={e => { setOpc(e.target.value) }} rows={1} />
                </Form.Group>
                <Button type="submit" variant="primary">Create Poll</Button>
                <Link to='/currenttrip'><Button type="button" variant="danger">Back to Current Trip</Button></Link>

                <br />
            </Form>
            <>


            </>


            <>
                <br />
            </>


        </Container>

    );
}



export default Cpoll;
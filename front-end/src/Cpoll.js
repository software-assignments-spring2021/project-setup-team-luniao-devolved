import React from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import axios from 'axios';

function Cpoll(props) {
    //vars to hold form data
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [opa, setOpa] = useState("");
    const [opb, setOpb] = useState("");
    const [opc, setOpc] = useState("");
    const [show, setShow] = useState(false);

    //handling form data
    const onSubmit = (e) => {
        e.preventDefault();

        const data = [{option: opa}, {option: opb}, {option: opc}];

        let polldata = new Object();
        polldata.name = name;
        polldata.message = message;
        polldata.data = data;
        polldata.date = date;
        let pollstring = JSON.stringify(polldata);

        axios({
            method: "post",
            url: "http://localhost:4000/api/createpoll",
            data: pollstring,
            headers: {
              "Content-Type": "application/json",
              Authorization: `JWT ${localStorage.getItem('JWT')}`
            }
          }).then(function(res) {
            console.log("Poll data updated!");
          })
          .catch(function(res) {
            console.log(res);
          });
        
          setShow(true);
    }

    let showSaved = null;
    if (show === true) {
        showSaved = <Alert variant="success" onClose={() => setShow(false)} dismissible>Poll saved!</Alert>;
    }

    return (
        // Container for Poll form
        <Container className="PollHeader">
            <h3>Create Poll</h3>
            {showSaved}
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
                <Link to='/currenttrip' id="back-cpoll"><Button type="button">Back to Current Trip</Button></Link>
                <br />
            </Form>
                <br />
        </Container>
    );
}

export default Cpoll;
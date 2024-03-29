import React, { useState, useEffect } from 'react'
import './CurrentTrip.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Alert, Card, CardColumns } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

const CurrentTrip = (props) => {

  const [trip, setTrip] = useState(false);
  const [todo, setTodo] = useState([]);
  const [show, setShow] = useState(false);
  const [tripname, setTripname] = useState("");
  const [newtripname, setNewtripname] = useState("");
  const [userdata, setUserdata] = useState(false);
  const [frdata, setfrdata] = useState([]);
  const [poll, setPoll] = useState([]);

  // for to-do list layout/skeleton, our team referred to this code: https://dev.to/shubham1710/build-a-todo-app-with-react-9la
  function Todo({ todo, index, markTodo, removeTodo }) {
    return (
      <div className="todo">
        <span style={{ textDecoration: todo.done ? "line-through" : "" }}>{todo.text}</span>
        <div>
          <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
          <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
        </div>
      </div>
    );
  }
  
  function FormTodo({ addTodo }) {
    const [value, setValue] = React.useState("");
  
    const handleTodo = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };
  
    return (
      <Form> 
      <Form.Group>
        <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Add a new to-do" />
      </Form.Group>
      <Button variant="primary mb-3" className="buttons" onClick={handleTodo}>Submit</Button>
      </Form>
    );
  }

  const addTodo = text => {
    const newTodo = [...todo, { text }];
    setTodo(newTodo);
  };

  const markTodo = index => {
    const newTodo = [...todo];
    newTodo[index].done = !newTodo[index].done;
    setTodo(newTodo);
  };

  const removeTodo = index => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };
  // reference

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(newtripname.length)
    console.log(typeof(newtripname))

    let tripData = new Object();

    if (newtripname.length !== 0) {
      tripData.name = newtripname;
    }

    //tripData.name = newtripname;
    tripData.todo = todo;
    let tripString = JSON.stringify(tripData);

    console.log(tripData);

    axios({
      method: "post",
      url: "http://localhost:4000/api/currenttrip",
      data: tripString,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(function(res) {
      console.log("Current trip data updated!");
    })
    .catch(function(res) {
      console.log(res);
    });

    setShow(true);
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/api/currenttrip",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(user => {

        console.log(user.data);
        
        if (user.data !== null) {
          if (user.data.past) {
            setUserdata(false);
          }
          else {
            setUserdata(true);
          }
          setTodo(user.data.todo);
          setTripname(user.data.name);
        }

        axios({
          method: "GET",
          url: "http://localhost:4000/api/createpoll",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem('JWT')}`
          }
        }).then(user => {
            if (user.data !== null) {
              setPoll(user.data);
            }
        });
    });

    axios({
      method: "GET",
      url: "http://localhost:4000/api/viewfriendscurrenttrip",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(friends => {
        setfrdata(friends.data);
      });

  },[]);

  let showSaved = null;
  if (show === true && !trip) {
    showSaved = <Alert variant="success" onClose={() => setShow(false)} dismissible>Trip saved!</Alert>;
  }
  else if (show === true && trip) {
    showSaved = <Alert variant="danger" onClose={() => setShow(false)} dismissible>Trip archived.</Alert>;
  }

  let showFriends = (
  <div> 
    <p>Friends</p>
      <br />
      <p>No friends yet!</p>
      </div>);
      
  if (frdata) {
    showFriends = ( <div class="friendscardct">
    <CardColumns class="card-columns addborderfriends">
      {frdata.map(e => (
          <Card border="primary">
            <Card.Body>
              <Card.Title>{e["fullname"]}</Card.Title>
              <Card.Text>
                {e["email"]}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </CardColumns>
  </div>);
  }
  
  function otherAction(e) {
    e.preventDefault();

    let tripData = new Object();
    tripData.past = true;
    
    if (newtripname.length !== 0) {
      tripData.name = newtripname;
    }

    tripData.todo = todo;
    let tripString = JSON.stringify(tripData);

    axios({
      method: "post",
      url: "http://localhost:4000/api/currenttrip",
      data: tripString,
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(function(res) {
      console.log("Current trip data updated!");
    })
    .catch(function(res) {
      console.log(res);
    });

    setShow(true);
    setTrip(true);
  }

  
  console.log(poll)

  if (userdata) {
    return (
      <div className="CurrentTrip">
        <h3>Current Trip</h3>

        {showSaved}

        <section className="main-content" id="ct-input-field">
        <Form onSubmit={e => {handleSubmit(e)}}>
          <div class='flex-container'>
            <div>
              <h4>Trip Title: {tripname}</h4>
  
              <Form.Group controlId="tripName" id="ct-input-field">
                  <Form.Control size="sm" type="text" placeholder="Edit Trip Name" value={newtripname} onChange={e => setNewtripname(e.target.value)} />
              </Form.Group>
            </div>
  
            <div className="friends">
              
              {showFriends}
             

            </div>
  
            <div className="links">
              <Button href="/itinerary" className="buttons">Full Itinerary</Button>
              <Button href="/addfriends" className="buttons">Add Friends</Button>
              <Button href="/createpoll" className="buttons">Polls</Button>
              <Button href="/recommendations" className="buttons">Recommendations</Button>
            </div>
            <h3>Vote for these polls!</h3>
            
            {poll.map(a => (
          <Container className="PollHeader">
      
          <Form className="poll-form">
              <Form.Group as={Row} controlId="pollName">
                <Form.Label column sm="5">Poll Name</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly defaultValue={a.name}></Form.Control></Col>
              </Form.Group>

              <Form.Group as={Row} controlId="date">
                <Form.Label column sm="5">End Date</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly defaultValue={a.date}></Form.Control></Col>
              </Form.Group>

              <Form.Group as={Row} controlId="pollMessage">
                <Form.Label column sm="5">Poll Message</Form.Label>
                <Col sm="10"><Form.Control plaintext readOnly defaultValue={a.message}></Form.Control></Col>
              </Form.Group>

              <Form.Group as={Row} controlId="option" class="d-flex flex-column">
                {/* <Form.Label column sm="5">Options</Form.Label> */}
                <Button type="button" class="p-2">{a.data[0].option}</Button>
                <Button type="button" class="p-2">{a.data[1].option}</Button>
                <Button type="button" class="p-2">{a.data[2].option}</Button>
              </Form.Group>
            </Form>
            </Container>
            ))}


            <div className="todo-ct"> 
              <div className="container">
                
            <FormTodo addTodo={addTodo} />
            <div>
              {todo.map((a, index) => (
                <Card>
                  <Card.Body>
                    <Todo
                    index={index}
                    todo={a}
                    markTodo={markTodo}
                    removeTodo={removeTodo}
                    />
                  </Card.Body>
                </Card>
              ))}
            </div>
        </div>
  
            </div>
            <br />
            <div>
              <Button type="submit" className="buttons">Update</Button>
              <Button onClick={otherAction} className="buttons">Archive</Button>
              <Button href="/dashboard" className="buttons">Back</Button>
            </div>
          </div>
          </Form>
        </section>
      </div>
    )
  }

  return (
    <div className="CurrentTrip">
    <h3>You currently don't have a saved trip!</h3>
    <h5>Go to New Trip page.</h5>
    </div>
  );
}

export default CurrentTrip

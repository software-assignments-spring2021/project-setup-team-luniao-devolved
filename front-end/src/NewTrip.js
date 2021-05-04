import React from 'react';
import './NewTrip.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Alert, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


function NewTrip() {

  const [tripname, setTripname] = useState("");
  const [todo, setTodo] = React.useState([
  ]);
  const [show, setShow] = useState(false);
  const [finished, setFinished] = useState(false);

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

    const todoList = [];
    todo.map((a) => {
      todoList.push(a.text);
    });

    let tripData = new Object();
    tripData.name = tripname;
    tripData.todo = todoList;
    let tripString = JSON.stringify(tripData);

    axios({
      method: "post",
      url: "http://localhost:4000/api/newtrip",
      data: tripString,
      headers: {"Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem('JWT')}`}
    })
    .then(function(res) {
      console.log("data saved!");
    })
    .catch(function(res) {
      console.log(res);
    });

    setShow(true);
  }

  let showSaved = null;
  if (show === true) {
      showSaved = <Alert variant="success" onClose={() => setShow(false)} dismissible>Trip saved!</Alert>;
  }

  return (
    <div className="NewTrip">

      <section className="main-content">
        <h1>New Trip</h1>

        {showSaved}
        <Form onSubmit={e => {handleSubmit(e)}}>
        <div class='flex-container'>
          <div className="new-trip-inputname">
                <Form.Group controlId="tripName">
                    <Form.Control size="sm" type="text" placeholder="Trip Name" value={tripname} onChange={e => { setTripname(e.target.value) }} />
                </Form.Group>
          </div>

          <div className="new-trip-buttons">
            <Button href="/addfriends" className="buttons">Add Friends</Button>
            <Button href="/createpoll" className="buttons">Create Poll</Button>
            <Button href="/recommendations" className="buttons">Ask for Rec</Button>
          </div>
          <br />
          <h3>To-do List:</h3>
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
          <div className="new-trip-backbtn">
            <Button type="submit" variant="outline-primary" className="buttons">Create</Button>
            {/*<Button href="pasttrips" variant="outline-success" className="buttons">Archive</Button>*/}
            <Button href="/dashboard" variant="outline-danger" className="buttons">Back</Button>
          </div>
        </div>
      </Form>
      </section>
    </div>
  );
}

export default NewTrip;

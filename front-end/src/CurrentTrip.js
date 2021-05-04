import React, { useState, useEffect } from 'react'
import './CurrentTrip.css'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Alert, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


const CurrentTrip = (props) => {

  const [trip, setTrip] = useState({});
  const [todo, setTodo] = React.useState([]);
  const [show, setShow] = useState(false);

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
        setTodo(user.data.todo);
    });
  },[]);

  let showSaved = null;
  if (show === true) {
      showSaved = <Alert variant="success" onClose={() => setShow(false)} dismissible>Trip saved!</Alert>;
  }
  
  return (
    <div className="CurrentTrip">
      <h3>Current Trip</h3>
      <section className="main-content">
        <div class='flex-container'>
          <div>
            <h4>Trip Title:</h4>
          </div>

          <div className="friends">
            <p>Friends</p>
            <br />
            <p>No friends yet!</p>
          </div>

          <div className="links">
            <Button href="/itinerary" className="buttons">Full Itinerary</Button>
            <Button href="/addfriends" className="buttons">Add Friends</Button>
            <Button href="/createpoll" className="buttons">Polls</Button>
            <Button href="/recommendations" className="buttons">Recommendations</Button>
          </div>

          <div className="todo"> 
            <h3>To-do List</h3>

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
            <Button type="submit" variant="outline-primary" className="buttons">Create</Button>
            <Button href="/pasttrips" variant="outline-success" className="buttons">Archive</Button>
            <Button href="/dashboard" variant="outline-danger" className="buttons">Back</Button>
          </div>

        </div>
      </section>
    </div>
  )
}

export default CurrentTrip

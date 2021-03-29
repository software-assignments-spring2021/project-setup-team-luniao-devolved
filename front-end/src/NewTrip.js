import React from 'react';
// import logo from './logo.svg';
import './NewTrip.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

const NewTrip = (props) => {

  return (
    <div className="NewTrip">
      <h3>New Trip</h3>
      <section className="main-content">

        <div class='flex-container'>
          <div>

          </div>

          <div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Trip Name"
                aria-label="Trip Name"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </div>

          <div>
            <Button href="/addfriends">Add Friends</Button>
            <Button href="/createpoll">Create Poll</Button>
            <Button href="/recommendations">Ask for Rec</Button>
          </div>
          <br />
          <div>
            <p>To-do List:</p>
            <ListGroup>
              <ListGroup.Item>
                Edit to add
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
              </ListGroup.Item>

              <ListGroup.Item>

                Edit to add
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
              </ListGroup.Item>

              <ListGroup.Item>
                Edit to add
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <br />
          <div>
            <Button href="/currenttrip">Add</Button>
          </div>
          <br />
          <div>
            <Button href="/dashboard">Back</Button>
          </div>
        </div>

      </section>
    </div>
  );
}

export default NewTrip;

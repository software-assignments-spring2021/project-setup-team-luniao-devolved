import React from 'react';
// import logo from './logo.svg';
import './NewTrip.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

const NewTrip = (props) => {

  return (
    <div className="NewTrip">
      <h1>New Trip</h1>
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
            <Button href="#">Add Friends</Button>
            <Button href="#">Create Poll</Button>
            <Button href="#">Ask for Rec</Button>
          </div>

          <div>
            <p>To-do List:</p>
            {/* Need help creating blank list and populating with items */}
          </div>

          <div>
            <Button href="#">Back</Button>
          </div>

          <div>
            <Button href="#">Add</Button>
          </div>

        </div>

      </section>
    </div>
  );
}

export default NewTrip;

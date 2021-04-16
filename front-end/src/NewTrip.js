import React from 'react';
// import logo from './logo.svg';
import './NewTrip.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import useState from 'react';
import axios from 'axios'


//one onChange for trip title - not sure how to handle other inputs for friends/preferences etc
const onChangeTripTitle = (e) => {
  this.setTripTitle({[e.target.name]: e.target.value});
}

const onSubmit = (e) => {
  e.preventDefault() 
  const {newTripTitle} = this.state;
  // send new trip data then
  axios.post('http://localhost:4000/api/newTrip', {newTripTitle})
      .then((result) => {

      });


}

const NewTrip = (props) => {

  const [newTripTitle, setTripTitle] = useState("");
  return (
    <div className="NewTrip">

      <section className="main-content">
        <h1>New Trip</h1>
        <div class='flex-container'>
          <div>

          </div>

          <div className="new-trip-inputname">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Trip Name"
                aria-label="Trip Name"
                aria-describedby="basic-addon2"
                value={newTripTitle} onChange={this.onChangeTripTitle}
              />
            </InputGroup>
          </div>

          <div className="new-trip-buttons">
              <Button href="#">Add Friends</Button>
              <Button href="/CPoll">Create Poll</Button>
              <Button href="#">Ask for Rec</Button>

          </div>

          <div>
            <p>To-do List:</p>
            {/* Need help creating blank list and populating with items */}
          </div>

          <div className="new-trip-backbtn">
            <Button href="#">Back</Button>
            <Button href="#">Add</Button>
          </div>

        </div>

      </section>
    </div>
  );
}

export default NewTrip;

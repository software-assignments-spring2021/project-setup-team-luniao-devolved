import React from 'react';
// import logo from './logo.svg';
import './NewTrip.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios'
import { useEffect, useState } from 'react';

function NewTrip() {

  const [user, setData] = useState([]);

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:4000/api/NewTrip",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }).then(user => {
  //     setData(user.data);
  //   });

  //   }, []);

  // //const [newTripTitle, setTripTitle] = useState("");
  // //one onChange for trip title - not sure how to handle other inputs for friends/preferences etc
  // const onChangeTripTitle = (e) => {
  //   this.setTripTitle({ [e.target.name]: e.target.value });
  // }

  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   const { newTripTitle } = this.state;
  //   // send new trip data then
  //   axios.post('http://localhost:4000/api/newTrip', { newTripTitle })
  //     .then((result) => {

  //     });
  // }

  // const [user, setData] = useState([]);

  // useEffect(() => {
  //   // a nested function that fetches the data
  //   async function fetchData() {
  //     // axios is a 3rd-party module for fetching data from servers
  //     const result = await axios(
  //       // retrieving some mock data about users
  //       "https://my.api.mockaroo.com/users.json?key=4e1c2150"
  //     );
  //     // set the state variable
  //     // this will cause a re-render of this component
  //     setData(result.data);
  //     console.log(result.data)
  //   }

  //   // fetch the data!
  //   fetchData();
  //   // the blank array below causes this callback to be executed only once on component load
  // }, []);


  // const [newTripTitle, setTripTitle] = useState("");
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
              //value={newTripTitle} onChange={this.onChangeTripTitle}
              />
            </InputGroup>
          </div>

          <div className="new-trip-buttons">
            <Button href="/addfriends">Add Friends</Button>
            <Button href="/createpoll">Create Poll</Button>
            <Button href="/recommendations">Ask for Rec</Button>

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

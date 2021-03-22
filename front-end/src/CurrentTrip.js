import React, { useState, useEffect } from 'react'

import './CurrentTrip.css'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
const CurrentTrip = (props) => {

  return (
    <div className="CurrentTrip">
      <h1>Current Trip</h1>
      <section className="main-content">
        <div class='flex-container'>
          <div>
            <h1>Trip Title</h1>
          </div>

          <div>
            <p>Friends: </p>

            <ListGroup>
              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Pranav Guntunur
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Karik Jain
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Kaylee Park
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Brian Steinberg
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div>
            <Button href="#">Full Itinerary</Button>
            <Button href="#">Add Friends</Button>
            <Button href="#">Polls</Button>
            <Button href="#">Recommendations</Button>
          </div>

          <div>
            <p>To-do List</p>

            <ListGroup>
              <ListGroup.Item>

                Venmo for Tickets
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
              </ListGroup.Item>

              <ListGroup.Item>

                Vote on Restaurant Poll
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
              </ListGroup.Item>

              <ListGroup.Item>

                Research tourist destinations
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div>
            <Button href="#">Back</Button>
          </div>

        </div>
      </section>
    </div>
  )
}

export default CurrentTrip

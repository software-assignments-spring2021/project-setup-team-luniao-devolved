import React, { useState, useEffect } from 'react'

import './CurrentTrip.css'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
const CurrentTrip = (props) => {

  return (
    <div className="CurrentTrip">
      <h3>Current Trip</h3>
      <section className="main-content">
        <div class='flex-container'>
          <div>
            <h4>Trip Title:</h4>
          </div>

          <div className="friends">
            <p>Friends: </p>

            <ListGroup horizontal={'sm'}>
              <ListGroup.Item>
                <img src="logo2.png" alt=""></img>
                Pranav Guntunur
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo2.png" alt=""></img>
                Karik Jain
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo2.png" alt=""></img>
                Kaylee Park
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo2.png" alt=""></img>
                Brian Steinberg
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="links">
            <Button href="/itinerary">Full Itinerary</Button>
            <Button href="#">Add Friends</Button>
            <Button href="/createpoll">Polls</Button>
            <Button href="/recommendations">Recommendations</Button>
          </div>

          <div className="todo"> 
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
          <br />
          <div>
            <Button href="/dashboard">Back</Button>
          </div>

        </div>
      </section>
    </div>
  )
}

export default CurrentTrip

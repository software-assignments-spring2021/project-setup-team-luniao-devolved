import React, { useState, useEffect } from 'react'
import './CurrentTrip.css';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


const CurrentTrip = (props) => {

  return (
    <div className="CurrentTrip">

      <section className="main-content">
        <h1>Current Trip</h1>
        <div class='flex-container'>
          <div>
            <h3>Trip Title</h3>
          </div>

          <div className="current-trip-friends">
            <p>Friends: </p>

            <ul className="friends-list">
              <li>
                
                NAME
              </li>

              <li>
                
                NAME
              </li>

              <li>
                
                NAME
              </li>

              <li>
                
                NAME
              </li>
            </ul>

            {/* <ListGroup className="current-trip-friends">
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
            </ListGroup> */}
          </div>

          <div className="current-trip-btns">
            <Button href="/Itinerary">Full Itinerary</Button>
            <Button href="#">Add Friends</Button>
            <Button href="#">Polls</Button>
            <Button href="/Recommendations">Recommendations</Button>
          </div>

          <div className="current-trip-todo">
            <p>To-do List</p>

            <ListGroup class="list-group list-group-flush">
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

          {/* <div>
            <Button href="/">Back</Button>
          </div> */}

        </div>
      </section>
    </div>
  )
}

export default CurrentTrip

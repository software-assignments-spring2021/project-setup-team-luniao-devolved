import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './PastTrips.css';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Card, CardColumns } from 'react-bootstrap';

function PastTrips(props) {

  const [pasttrip, setPasttrip] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/api/pasttrips",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(user => {
      setPasttrip(user.data);
    });
  }, [])

  return (
    <div>
      <h3>Past Trips</h3>

      <CardColumns>
        {pasttrip.map(e => (
          <Card border="primary">
            <Card.Body>
              <Card.Title>{e.trip.name}</Card.Title>
              {/*<Card.Text>
                  {e["date"]}
                </Card.Text>*/}
            </Card.Body>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
}

export default PastTrips;

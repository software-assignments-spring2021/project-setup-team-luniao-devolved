// import logo from 'logo2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './App.css';
import { useState, useEffect } from 'react';

import {Button, Card, CardColumns} from 'react-bootstrap';

function App(props) {

  const [pastTrips, setPastTrips] = useState([]);
  
  useEffect(() => {
    //when this page's component loads, it first saves the past trips into our state variable - could just be object ids (mongodb), depends on how we store this data and do the express
    //right now, we set it with example trips reference ids
    setPastTrips([["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"]])
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src="logo2.png" className="logo" alt="logo" />
        {<h2 className="App-title">Past Trips</h2>}
      </header>


      <body className="App-body">
      <CardColumns>
        {pastTrips.map(e => (
            <Card border="primary">
              <Card.Body>
                <Card.Title>{e[0]}</Card.Title>
                <Card.Text>
                  Small trip details
                </Card.Text>
              </Card.Body>
              <Card.Link href="www.example.org" class="stretched-link"></Card.Link>
            </Card>
          ))}
        </CardColumns>

      </body>


    </div>
  );
}

export default App;

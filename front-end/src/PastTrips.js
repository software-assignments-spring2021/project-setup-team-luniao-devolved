// import logo from 'logo2.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './PastTrips.css';
import { useState, useEffect } from 'react';
import axios from "axios";


import {Card, CardColumns} from 'react-bootstrap';


function PastTrips(props) {

  const [pastTrips, setPastTrips] = useState([]);
  
  useEffect(() => {
    //when this page's component loads, it first saves the past trips into our state variable - could just be object ids (mongodb), depends on how we store this data and do the express
    //using Mockaroo to get MongoDB ids, city names and dates for past trips from mock API
    //setPastTrips([["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"], ["507f1f77bcf86cd799439011"]])

    async function fetchData() {
      // axios is a 3rd-party module for fetching data from servers
      const result = await axios(
        // retrieving some mock data about animals for sale
        "https://my.api.mockaroo.com/past-trips.json?key=8f9d78c0"
      );
      // set the state variable
      // this will cause a re-render of this component
      //setData(result.data);
      setPastTrips(result.data);
    }
    fetchData();
  }, [])

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
                <Card.Title>{e["location"]}</Card.Title>
                <Card.Text>
                  {e["date"]}
                </Card.Text>
              </Card.Body>
              <Card.Link href="www.example.org" className="stretched-link"></Card.Link>
            </Card>
          ))}
        </CardColumns>

      </body>


    </div>
  );
}

export default PastTrips;

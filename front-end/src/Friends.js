import {React, useState} from 'react';
// import logo from './logo.svg';
import './Friends.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/ListGroup';
import axios from 'axios'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';


function Friends() {


  const [user, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/api/friends",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(user => {
      setData(user.data);
    });

    }, []);
  return (
    <div className="Friends">
      <h3>Friends</h3>
      <section className="main-content">
        <div class='flex-container'>
          <div>
          <img src="logo192.png" alt=""></img>
          </div>

          <div>
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
            <Button href="/profile">Back</Button>
          </div>

          {/* <div>
            <Button href="/createpost">New Post</Button>
            <Button href="/editprofile">Edit Profile</Button>
          </div> */}

        </div>
      </section>
    </div>
  );
}

export default Friends;

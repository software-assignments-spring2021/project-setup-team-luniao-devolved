import {React, useState} from 'react';
// import logo from './logo.svg';
import './Friends.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/ListGroup';
import axios from 'axios'
import { useEffect } from 'react';
import {Button, Modal, Form, Alert, CardColumns, Card} from 'react-bootstrap';

const reload=()=>window.location.reload();

function AddFriendsModal(props) {

  const [addEmail, setAddEmail] = useState("");
  const [show, setShow] = useState(0);


  const handleSubmit= (e) => {
    console.log("Friend submitted");
    e.preventDefault();

    let formData1 = new Object();
    formData1.email = addEmail;
    let formString1 = JSON.stringify(formData1);    

    axios({
      method: "post",
      url: "http://localhost:4000/api/addfriend",
      data: formString1,
      headers: { "Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem('JWT')}`},
    })
      .then(function (res) {
       console.log(res);
       if (res.data === "nofriend") {
        setShow(2);
      } else if (res.data === "alreadyexists") {
        setShow(3);
      } else if (res.data === "youarefriend") {
        setShow(4);
      }
      else {
        if (res.data === "success") {
          console.log("added friend successfully");
          setShow(1);
        }
      }
      })
      .catch(function (res) {
        //handle error
        console.log(res);
      });
  }

  let showFunc = null;
  if (show === 1) {
    showFunc = <Alert variant="success" onClose={() => setShow(false)} dismissible> Friend added.</Alert>;
  } else if (show === 2) {
    showFunc = <Alert variant="danger" onClose={() => setShow(false)} dismissible> This email is not connected to a valid account.</Alert>;
  } else if (show === 3) {
    showFunc = <Alert variant="danger" onClose={() => setShow(false)} dismissible> This account is already added as your friend.</Alert>;
  } else if (show === 4) {
    showFunc = <Alert variant="danger" onClose={() => setShow(false)} dismissible> You cannot add yourself as a friend.</Alert>;
  }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onExit={reload}
    >
      {showFunc}
      <Modal.Header closeButton style={{
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Friends
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form className="App-form" onSubmit={e => { handleSubmit(e) }}>
            <Form.Group controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Topic</Form.Label> */}
              <Form.Control type="text" placeholder="Type Email" required value={addEmail} onChange={e => {
                setAddEmail(e.target.value)}}/>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>


      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function Friends() {


  const [friends, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [delFriend, setDel] = useState("");

  if (delFriend !== "") {

    console.log(delFriend);

    let formData = new Object();
    formData.email = delFriend;
    let formString = JSON.stringify(formData);    

    axios({
      method: "post",
      url: "http://localhost:4000/api/delfriend",
      data: formString,
      headers: { "Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem('JWT')}`},
    })
      .then(function () {
       reload();
      })
      .catch(function (res) {
        //handle error
        console.log(res);
      });

  }


  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:4000/api/friends",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(friends => {
      console.log(friends);
      setData(friends.data);
    });

    axios({
      method: "GET",
      url: "http://localhost:4000/api/userinfo",
      headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem('JWT')}`
      }
    }).then(userinfo => {
        setUserData(userinfo.data);
    });


    }, []);
  return (
    <div className="Friends">
      <h3>{userData["fullname"]}'s Friends</h3>
      <section className="main-content">

        <div class='flex-container'>

          <div class='addButton'> 
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Add Friends
            </Button>

            <AddFriendsModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>

          <br/> <br/>
          
          {/* <div>
          <img src="logo192.png" alt=""></img>
          </div>

          <div>
            <h3> Joe Smith</h3>
            <h5> September 25, 1998</h5>
          </div> */}

          <div class="friendscard">
            <CardColumns class="card-columns addborderfriends">
              {friends.map(e => (
                  <Card border="primary">
                    <Card.Body>
                      <Card.Title>{e["fullname"]}</Card.Title>
                      <Card.Text>
                        {e["email"]}
                      </Card.Text>
                      <Card.Link href="/friends" onClick={() => {setDel(e["email"]);}}>Delete Friend</Card.Link>
                    </Card.Body>
                  </Card>
                ))}
            </CardColumns>
          </div>


          <br/> <br/><br/>

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

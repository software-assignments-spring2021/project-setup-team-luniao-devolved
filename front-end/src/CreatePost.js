import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './CreatePost.css';
import { useState } from 'react';
import axios from "axios";

import { Alert, Form, Button} from 'react-bootstrap';

function CreatePost(props) {

  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit= (e) => {
    console.log("Post submitted");
    e.preventDefault();

    let formData = new Object();
    formData.post = post;
    formData.title = title;
    let formString = JSON.stringify(formData);    

    axios({
      method: "post",
      url: "http://localhost:4000/api/createpost",
      data: formString,
      headers: { "Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem('JWT')}`},
    })
      .then(function (response) {
        //handle success
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    setShow(true);
    // post is saved in `post`
  }

  let showFunc = null;
  if (show === true) {
    showFunc = <Alert variant="success" onClose={() => setShow(false)} dismissible> Post submitted.</Alert>;
  }


  return (
    <div className='d-flex flex-column'>

      <h3>New Post</h3>


      {showFunc} 

      
            <Form className="App-form align-self-center" onSubmit={e => { handleSubmit(e) }}>
              <Form.Group controlId="exampleForm.ControlInput1">
                {/* <Form.Label>Topic</Form.Label> */}
                <Form.Control type="text" placeholder="Type Title" required value={title} onChange={e => {
                  setTitle(e.target.value)}}/>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" placeholder="Type Post" required rows={10} value={post} onChange={e => 
                
                {
                  setPost(e.target.value);}}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>

         {/* {showRecs} */}

      


    </div>
  );
}

export default CreatePost;

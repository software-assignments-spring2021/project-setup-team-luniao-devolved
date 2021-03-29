import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import './CreatePost.css';
import { useState } from 'react';

import { Alert, Form, Button} from 'react-bootstrap';

function CreatePost(props) {

  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit= (e) => {
    console.log("Post submitted");
    setShow(true);
    e.preventDefault();
    // post is saved in `post`
  }

  let showFunc = null;
  if (show === true) {
    showFunc = <Alert variant="success" onClose={() => setShow(false)} dismissible> Post submitted.</Alert>;
  }


  return (
    <div className="App">
      <header className="App-header" id="newpostheader">
        {<h2 className="App-title">New Post</h2>}
      </header>

      {showFunc} 

      <body className="App-body">
          <Form className="App-form" onSubmit={e => { handleSubmit(e) }}>
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

      </body>


    </div>
  );
}

export default CreatePost;

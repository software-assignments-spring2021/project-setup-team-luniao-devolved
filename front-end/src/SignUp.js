import React, {useState} from "react";
import {Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useHistory, Redirect } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./SignUp.css";

function SignUp() {
    const [fullname, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    function checkTyped() {
        return email.length > 0 && password.length > 0 && fullname.length > 0 && repassword.length > 0;
    }

    function handleSubmit() {
      const user = {fullname, email, password, repassword};
      console.log(user);

      axios({
        method: "post",
        url: "http://localhost:4000/api/signup",
        data: user
      }).then((res) => {
        console.log(res);
        if (res.data === "incorrectpw") {
          alert ("Passwords do not match! Please try again.");
        } else if (res.data === "incorrectem") {
          alert ("Invalid email! Please try again.");
        } else if (res.data === "incorrectname") {
          alert ("Invalid full name! Please try again.");
        }
        else {
          if (res.data === "alreadyuser") {
            alert("User with this email already exists! Please try again.");
          }
          else if (res.data === "success") {
            console.log("successful sign up");
            setRedirect(true);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
    }

    
    if (redirect === false) {
      return (
        <Container>
          <Row>
          <Col><img src="logo2.png" alt="logo"></img></Col>
          <Col>
            <h3>Sign Up</h3>
            <Form>
            <Form.Group className="form" controlId="fullname">
              <Form.Label>Full Name</Form.Label>
              <Form.Control value={fullname} onChange={(e) => setName(e.target.value)} placeholder="Enter full name"/>
            </Form.Group>

            <Form.Group className="form" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
            </Form.Group>

            <Form.Group className="form" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>
            </Form.Group>

            <Form.Group className="form" controlId="repassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control value={repassword} type="password" onChange={(e) => setRepassword(e.target.value)} placeholder="Re-enter password"/>
            </Form.Group>
            
            <Button block size="lg" disabled={!checkTyped()} onClick={handleSubmit}>Sign Up</Button>
            </Form>
            <h2>Already have an account? <Link to='/'>Click to Login</Link></h2>
            <h2>Click to continue as <Link to='/guestdashboard'>Guest</Link></h2>
          </Col>
          </Row>
        </Container>
      )
    }
    else {
      return <Redirect to='/dashboard'/>
    }
}

export default SignUp;
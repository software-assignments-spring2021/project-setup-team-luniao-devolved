import React, { useState } from "react";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./Login.css";
import { Link, Redirect,Router, Route, Switch, BrowserRouter, useHistory} from 'react-router-dom';
import ReactDOM from 'react-dom';
import axios from "axios";

import Dashboard from './Dashboard';
import NavBar from './components/NavBar';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  if (localStorage.getItem('JWT')) {
    history.push({
      pathname:  "/dashboard",
    }); 
  } 

  function checkTyped() {
    return email.length > 0 && password.length > 0;
  }

  const handleSubmit = (event) => {
    const user = {email, password};
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:4000/api/login",
      data: user,
      headers: { Authorization: `JWT ${localStorage.getItem('JWT')}`}
    })
    .then((res) => {
      console.log("here");
      console.log(res);
      if (res.data === "nouser") {
        alert("Your account does not exist!");
        // setReload(true);
      }
      else if (res.data === "incorrectpw") {
        alert("Your password is incorrect!");
        // setReload(true);
      }
      else if (res.data.message === "success") {
        console.log("successful login");
        localStorage.setItem('JWT', res.data.token);
        setRedirect(true);
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  //note from tutor - redirect in react based on jwt in local storage

  if (redirect === false) {
    return (
      <Container>
      <Row>
        <Col><img src="logo2.png" alt="logo"></img></Col>
        <Col>
          <div className="signin"><h3>Sign In</h3></div>
          <Form>
          <Form.Group className="form" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
          </Form.Group>
  
          <Form.Group className="form" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>
          </Form.Group>
  
            <Button type="submit" block size="lg" disabled={!checkTyped()} onClick={handleSubmit}>Login</Button>
          </Form>
          <h2>Don't have an account? <Link to='/signup'>Sign up today!</Link></h2>
          <h2>...Or continue as <Link to='/guestdashboard'>Guest</Link></h2>
        </Col>
      </Row>
      </Container>
    )
  }
  else {
    return (
      <Redirect to='/dashboard'/>
    )
  }


}

export default Login;
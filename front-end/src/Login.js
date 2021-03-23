import React, { useState } from "react";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./Login.css";
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function checkTyped() {
    return email.length > 0 && password.length > 0;
  }

  return (
    <Container>
    <Row>
      <Col><img src="logo2.png" alt="logo"></img></Col>
      <Col>
        <h3>Sign In</h3>

        <Form.Group className="form" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email"/>
        </Form.Group>

        <Form.Group className="form" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"/>
        </Form.Group>

        <Link to='dashboard'>
          <Button block size="lg" disabled={!checkTyped()}>Login</Button>
        </Link>
        <h2>Don't have an account? <Link to='/signup'>Sign up today!</Link></h2>
        <h2>...Or continue as <Link to='/guestdashboard'>Guest</Link></h2>
      </Col>
    </Row>
    </Container>
  );
}

export default Login;
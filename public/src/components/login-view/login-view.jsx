import axios from 'axios';
import React, { useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  CardGroup,
  Card
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    } else if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const isReq = validate();
    if (isReq) {
      /** Send a request to the server for authentication */
      axios
        .post('https://movie-info-online.herokuapp.com/login', {
          Username: username,
          Password: password
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((error) => {
          console.log(error + ' No such user');
        });
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={12} md={6} lg={6}>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Log in to myFlix</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter Username"
                      value={username}
                      autoComplete="off"
                    />
                    {!!usernameErr && (
                      <p className="text-danger">{usernameErr}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      value={password}
                      autoComplete="off"
                    />
                    {!!passwordErr && (
                      <p className="text-danger">{passwordErr}</p>
                    )}
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Card.Text className="mt-2">
                    Not a user? <Link to={`/register`}>Register Here</Link>
                  </Card.Text>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

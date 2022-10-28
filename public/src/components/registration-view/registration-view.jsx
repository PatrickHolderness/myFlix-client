import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  CardGroup,
  Card
} from 'react-bootstrap';

import './registration-view.scss';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
    birthdayErr: ''
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setFieldErrors({ ...fieldErrors, usernameErr: 'Username required' });
      isReq = false;
    } else if (username.length < 2) {
      setFieldErrors({
        ...fieldErrors,
        usernameErr: 'Username must be at least 2 characters long'
      });
      isReq = false;
    } else if (!password) {
      setFieldErrors({ ...fieldErrors, passwordErr: 'Password required' });
      isReq = false;
    } else if (password.length < 6) {
      setFieldErrors({
        ...fieldErrors,
        passwordErr: 'Password must be at least 6 characters long'
      });
      isReq = false;
    } else if (!email) {
      setFieldErrors({ ...fieldErrors, emailErr: 'Email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setFieldErrors({ ...fieldErrors, emailErr: 'Invalid email' });
      isReq = false;
    }
    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isReq = validate();
    if (isReq) {
      /** Send a request to the server for authentication */
      axios
        .post('https://movie-info-online.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then((response) => {
          const data = response.data;
          // props.onRegistration(data);
          console.log(data);
          alert('Registration succesful, please login');
          window.open('/', '_self'); // the second argument '_self' opens the page in the current tab
        })
        .catch((error) => {
          console.error(error, ' Registration failed');
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
                <Card.Title>Register to myFlix</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your Username"
                      required
                      autoComplete="off"
                    />
                    {fieldErrors.usernameErr && (
                      <p className="text-danger">{fieldErrors.usernameErr}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your Password"
                      minLength="8"
                      required
                      autoComplete="off"
                    />
                    <Form.Text className="text-muted">
                      Your password must be 8 or more characters.
                    </Form.Text>
                    {fieldErrors.passwordErr && (
                      <p className="text-danger">{fieldErrors.passwordErr}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your Email"
                      required
                      autoComplete="off"
                    />
                    {fieldErrors.emailErr && (
                      <p className="text-danger">{fieldErrors.emailErr}</p>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDob">
                    <Form.Label>Date of birth:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                      autoComplete="off"
                    />
                  </Form.Group>

                  <Button
                    varient="primary"
                    type="submit"
                    onClick={handleRegister}
                  >
                    Register
                  </Button>
                  <Card.Text className="mt-2">
                    Already Registered? <Link to={`/`}>Sign in Here</Link>
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

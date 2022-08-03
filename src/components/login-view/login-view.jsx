import React, { useState } from 'react';
import axios from 'axios'
import propTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

import "./login-view.scss";

//User login - requiring username and password

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//Hook for each input
const [usernameErr, setUsernameErr] = useState('');
const [passwordErr, setPasswordErr] = useState('');

    // Validate user inputs
    const validate = () => {
      let isReq = true;
      if (!username) {
        setUsernameErr('Username Required');
        isReq = false;
      } else if (username.length < 2) {
        setUsernameErr('Username must be at least 5 characters long');
        isReq = false;
      }
      if (!password) {
        setPasswordErr('Password Required');
        isReq = false;
      } else if (password.length < 6) {
        setPasswordErr('Password must be at least 6 characters long');
        isReq = false;
      }
      return isReq;
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) 
    // Send a request to server for authentication
    axios
      .post('https://movie-info-online.herokuapp.com/login', {
        Username: username,
        Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Form>
      <h2 className="mb-3 mx-auto mt-5">Log in</h2>
      <Form.Group className="mb-3 mx-auto mt-3" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group className="mb-3 mx-auto mt-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder=""
        />
      </Form.Group>

      <Button className="mt-4" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );

}

LoginView.propTypes = {
 user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
  }),
  onLoggedIn: propTypes.func.isRequired,
  setRegistered: propTypes.func.isRequired,
};
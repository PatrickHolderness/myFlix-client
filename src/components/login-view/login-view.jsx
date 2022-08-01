import React, { useState } from 'react';
import propTypes from "prop-types";
import { Form, Button } from "react-bootstrap";

import "./login-view.scss";

//User login - requiring username and password
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
      e.preventDefault()
      props.onRegister(true)
  }


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
};
import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import './registration-view.scss';

//registration form for user info
export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',

  });

//validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be at least 5 characters long",
    })
      isReq = false;
    }
    if (!password) {
      setValues({...values, passwordErr: "Password Required"});
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Password must be at least 6 characters long",
    })
      isReq = false;
    }
    if(!email) {
      setValues({...values, emailErr: 'Email Required'});
        isReq = false;
    } else if(email.indexOf('@') === -1) {
      setValues({...values, emailErr: 'Email is invalid'});
      isReq = false;
    }
    return isReq;
    }


  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
      axios.post('https://movie-info-online.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Registration successful, please log in!');
        window.open('/', '_self'); //_self argument opens page in current tab
      
      })
      .catch(response => {
        console.error(response);
        alert('unable to register');
      });
      }
    }

  return (
    <Form>
      <h2 className="mb-3 mx-auto mt-5">Registration</h2>

      <Form.Group className="mb-3 mx-auto mt-4" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter a username"
        />
        {values.usernameErr && <p>{values.usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3 mx-auto mt-4">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder="at least 8 characters"
        />
        {values.passwordErr && <p>{values.passwordErr}</p>}
      </Form.Group>

      <Form.Group className="mb-2 mx-auto mt-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {values.emailErr && <p>{values.emailErr}</p>}
      </Form.Group>

      <Form.Group className="mb-2 mx-auto mt-3">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

      </Form.Group>

      <Button className="mt-4" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.string,
  }),
};
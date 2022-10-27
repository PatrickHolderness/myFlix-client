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

export function UpdateView({ user, token }) {
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
        usernameErr: 'Username must be 2 characters long'
      });
      isReq = false;
    } else if (!password) {
      setFieldErrors({ ...fieldErrors, passwordErr: 'Password required' });
      isReq = false;
    } else if (password.length < 6) {
      setFieldErrors({
        ...fieldErrors,
        passwordErr: 'Password must be 6 characters long'
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    const isReq = validate();
    if (isReq) {
      // const token = localStorage.getItem('token');
      axios
        .put(
          `https://lee-movies.herokuapp.com/users/${user.Username}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const data = response.data;

          console.log(data);
          localStorage.setItem('user', data.Username);
          alert('Profile was succesfully updated');
          window.open(`/users/${data.Username}`, '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((error) => {
          console.error(error);
          alert();
        });
    }
  };
  return (
    <>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>Update Personal Info</Card.Title>
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
                  // disabled
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
                  // disabled
                />
                {fieldErrors.emailErr && (
                  <p className="text-danger">{fieldErrors.emailErr}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formDob">
                <Form.Label>Date of birth:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday?.split('T')[0]}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  autoComplete="off"
                  // disabled
                />
              </Form.Group>

              <Button varient="primary" type="submit" onClick={handleSubmit}>
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}

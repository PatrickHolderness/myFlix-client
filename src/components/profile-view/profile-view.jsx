import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { SET_USER, updateUser, deleteUser } from "../../actions/actions";

import "./profile-view.scss";

import { Container, Col, Row, Button, Card, Form } from "react-bootstrap";
import { connect } from 'react-redux';

 function ProfileView(props) {
  const { handleFavorite, goBack, movies, updateUser, user } = props;
  const { username, email, birthday, favoriteMovies } = user;
  
  const handleUpdateUser = (updatedUser, token) => {
    console.log('Updated user from handleUpdateUser: ', updatedUser);
    const { username } = updatedUser;
    if (username && updatedUser && token) {
      // Update user data in webserver
      axios
        .put(
          `https://movie-info-online.herokuapp.com/users/${username}`,
          { ...updatedUser },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const data = response.data;
          console.log('response data from axios in handleUpdateUser: ', data);
          // Dispatch action to update store.user
          updateUser({ ...updatedUser, favoriteMovies });
          console.log('after updatUser action, user: ', user);
          alert(
            'User info updated. Please Login again with your new credentials.'
          );
          window.open(`/`, '_self');
        })
        .catch((err) => {
          console.log('error updating the user:', err);
        });
    }
  };

  const handleDeleteUser = () => {
    const accessToken = localStorage.getItem('token');
    if (username && accessToken) {
      let sure = confirm(
        'Are you sure? This action is irreversible and will ERASE your account.'
      );
      if (!sure) return;
      // request to Delete user from webserver
      axios
        .delete(`https://movie-info-online.herokuapp.com/users/${email}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          // Clear Token from local storage
          localStorage.clear();
          alert('Your user account was deleted.');
          deleteUser({});
          window.open('/', '_self');
        })
        .catch((err) => console.log(err));
    }
  };

  const getUserData = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    axios
      .get(`https://movie-info-online.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setUserData(response.data);
        setFavoriteMoviesList(response.data.FavoriteMovies);
        console.log(response);

        response.data.FavoriteMovies.forEach((movie_id) => {
          let favMovies = props.movies.filter(
            (movie) => movie._id === movie_id
          );
          setMovies(favMovies);
        });
      })
      .catch((error) => console.error(error));
  };

  // Delete Profile
  const handleDelete = (e) => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios.delete(`https://movie-info-online.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`The account ${user.Username} was successfully deleted.`);
    localStorage.clear();
    window.open("/register", "_self");
  };
  // Update Profile
  const handleUpdate = () => {
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");

    axios
      .put(
        `https://movie-info-online.herokuapp.com/users/${user}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        alert("Profile updated!");
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Row>
        <h3>Profile</h3>
      </Row>
      <Form>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            placeholder="username"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter new email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="birthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            type="date"
            placeholder="birthday"
          />
        </Form.Group>
      </Form>
      <Button className="mt-2" onClick={handleUpdate}>
        Update profile
      </Button>
      <Button className="mt-2 ml-4" onClick={handleDelete}>
        Delete profile
      </Button>
      <h4>Favourite movies:</h4>
      <Card className="fav-list">
        <Card.Body>
          {favoriteMoviesList.map((movie) => {
            return (
              <div key={movie._id}>
                <img src={movie.ImagePath} alt={movie.Title} />
                <Link to={`/movies/${movie._id}`}>
                  <h4>{movie.Title}</h4>
                </Link>
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </Container>
  );
}


const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    username: state.user,
  };
};

export default connect(mapStateToProps, { deleteUser, updateUser })(
  ProfileView
);
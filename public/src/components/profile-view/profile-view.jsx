import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { UserView } from './user-view';
import { UpdateView } from './update-view';
import { FavoriteMoviesView } from './favorite-movies-view';

export function ProfileView(props) {
  //useState
  const [user, setUser] = useState(props.user);
  const movies = props.movies;
  // console.log('ProfileView-movies-->', props.movies);
  //initially empty
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  //from localStorage
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  //GET user
  const getUser = () => {
    axios
      .get(`https://lee-movies.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data;
        // console.log('user-data--> ', data);
        setUser(data);
        setFavoriteMovies(data.FavoriteMovies);
        // console.log('user-data--> ', data);
        // console.log('setFavoriteMovies--> ', data.FavoriteMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //useEffect
  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = () => {
    axios
      .delete(`https://lee-movies.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert(`The account ${user.Username} was successfully deleted.`);
        localStorage.clear();
        window.open('/register', '_self');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <Row className="mb-5">
          <Col xs={12} sm={4} md={6}>
            <UserView
              username={user.Username}
              email={user.Email}
              birthday={user.Birthday}
            />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <UpdateView user={user} token={token} />
          </Col>
        </Row>
        <Row>
          <Col sm={6} md={4} lg={3} className="d-flex align-items-stretch mb-5">
            <FavoriteMoviesView
              favoriteMovies={favoriteMovies}
              token={token}
              currentUser={currentUser}
              movies={movies}
            />
          </Col>
        </Row>
        <Button
          className="d-block m-auto"
          variant="danger"
          onClick={handleDelete}
        >
          Delete Profile
        </Button>
        <br />
      </Container>
    </>
  );
}

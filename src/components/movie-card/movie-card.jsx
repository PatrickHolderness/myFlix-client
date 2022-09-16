import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Button, Card, }from 'react-bootstrap';
import './movie-card.scss';
//display movies rendered on main-view

export class MovieCard extends Component {
  addMovie(movie, user) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://swagflix.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card style={{color: 'black' }}>
        <Card.Img
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }),
  }).isRequired,

  onMovieClick: propTypes.func.isRequired,
};

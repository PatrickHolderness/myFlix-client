import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Button, Card, Container, Row, Col }from 'react-bootstrap';
import './movie-card.scss';
//display movies rendered on main-view

export class MovieCard extends Component
{
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card style={{color: 'black' }}>
        <Card.Img
          variant="top"
          src={
            "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
          }
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

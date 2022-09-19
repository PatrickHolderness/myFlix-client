import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Button, Card, } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from "react-router-dom"
//display movies rendered on main-view

export class MovieCard extends Component 
{
  render() {
    const { movie } = this.props;

    return (
      <Card style={{color: 'black' }}>
        <Card.Img
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
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
    ImagePath: propTypes.string.isRequired,
  }).isRequired,
};
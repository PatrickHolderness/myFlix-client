import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Button, Card, Col, Row, Container } from 'react-bootstrap';
import './movie-card.scss';
//display movies rendered on main-view

export class MovieCard extends Component 
{
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card  style ={{ width: "15rem" }}>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
           </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
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

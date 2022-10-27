import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardGroup } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends Component {
  render() {
    const { movie } = this.props;
    return (
      <CardGroup>
        <Card>
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            alt={movie.Title + ' poster'}
            height={300}
            width={200}
            crossOrigin="true"
          />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text className="text-justify">{movie.Description}</Card.Text>
            <Link to={`movies/${movie._id}`}>
              <Button variant="primary">Open</Button>
            </Link>
          </Card.Body>
        </Card>
      </CardGroup>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.any
    })
  }).isRequired
  // onMovieClick: PropTypes.func.isRequired
};

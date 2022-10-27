import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './favorite-card.scss';

export class FavoriteCard extends Component {
  render() {
    const { movie, handleFavorite } = this.props;
    return (
      <Col
      >
        <Card className="my-1">
          <Link to={`/movies/${movie._id}`}>
            <Card.Img
              crossOrigin="anonymous"
              src={movie.imageURL}
              className="poster position-relative"
            />
          </Link>{' '}
          <Card.Body className="d-grid gap-2">
            <p className="card-title mb-2">{movie.title} </p>
            <span className="card-year">({movie.releaseYear})</span>

            <Button
              variant="outline-danger"
              className="mt-2 ml-auto"
              style={{ width: '100%' }}
              onClick={() => handleFavorite(movie._id, 'remove')}
            >
              Remove from favorites
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

FavoriteCard.propTypes = {
  movie: propTypes.shape({
    title: propTypes.string.isRequired,
    releaseYear: propTypes.number.isRequired,
  }).isRequired,
};
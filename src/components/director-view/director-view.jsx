import React from 'react';
import propTypes from 'prop-types';

import { Button, Container, Row, } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, directorMovies, goBack } = this.props;

    return (
        <Container className="mt-5">
        <h1>{director.name} </h1>
        <p>―Born: {director.birthYear}―</p>
        <Button className="mb-4" variant="warning" onClick={goBack}>
          « Back
        </Button>
        <h2 className="subtitle">Biography: </h2>
        <p>{director.bio}</p>
        <h2 className="subtitle">Filmography: </h2>
        <Row className="justify-content-center mt-3">
          {directorMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}>
              {movie.title}
            </MovieCard>
          ))}
        </Row>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birth: propTypes.string.isRequired,
    Death: propTypes.string,
  }).isRequired,
};
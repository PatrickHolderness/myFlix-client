import React from 'react';
<<<<<<< Updated upstream
=======
import propTypes from 'prop-types';
import { Button, Container, Row, Col } from 'react-bootstrap';

import './movie-view.scss';
export class MovieView extends React.Component 
{
>>>>>>> Stashed changes

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

<<<<<<< Updated upstream
        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movie.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}
=======
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">
            {movie.Director.Name + " ~ " + movie.Director.Bio}
          </span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">
            {movie.Genre.Name + " ~ " + movie.Genre.Description}
          </span>
        </div>
        <Button 
          classname="mt-4" 
            onClick={() => { onBackClick(null);}}>
          Back
        </Button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
      Birth: propTypes.string.isRequired,
    }),
    ImagePath: propTypes.string.isRequired,
  }).isRequired,
};
>>>>>>> Stashed changes

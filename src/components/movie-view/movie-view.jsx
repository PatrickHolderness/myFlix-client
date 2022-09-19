import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-view.scss';


export class MovieView extends React.Component 
{



  render() {
    const { movie, onBackClick, isFavorite, handleFavorite } = this.props;
    if (!movie) return <div></div>;

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
        <div className="mt-3">
                  <span className="fw-bold">Genre: </span>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button
                      variant="outline-dark"
                      className="ml-4 value text-uppercase"
                    >
                      {movie.Genre.Name}{' '}
                    </Button>
                  </Link>
                </div>

                <div className="mt-2">
                  <span className="fw-bold">Director: </span>
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="outline-dark" className="value ml-1">
                      {movie.Director.Name}
                    </Button>
                  </Link>
                </div>
        
        <Button
          className="mt-4"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
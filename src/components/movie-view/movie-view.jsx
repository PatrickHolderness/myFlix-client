import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-view.scss';


 export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  addMovie(movie, user) {
    let username = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://movie-info-online.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been added to your favorites.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  delFavMovie = (movie, user) => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("user");
    console.log(movie);
    console.log(token);
    axios
      .delete(
        `https://movie-info-online.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been removed from your favorites.`);
      })
      .catch((e) => {
        console.log("Error");
      });
  };


  render() {
    const { movie, user, onBackClick } = this.props;


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
        <Button
          className="button ml-2"
          onClick={() => {
            this.addMovie(movie, user);
          }}
        >
          Add to favorites
        </Button>
        <Button
          className="button ml-2"
          onClick={() => {
            this.delFavMovie(movie, user);
          }}
        >
          Remove from favorites
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
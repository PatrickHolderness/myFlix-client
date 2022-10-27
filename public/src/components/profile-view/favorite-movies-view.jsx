import React from 'react';
import axios from 'axios';
import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export function FavoriteMoviesView({
  favoriteMovies,
  token,
  movies,
  currentUser
}) {
  //map Movie ID function
  const favoriteMovieId = favoriteMovies.map((id) => id);
  // console.log('favoriteMovies from fav view--> ', favoriteMovies);
  // console.log('favoriteMovieId-->', favoriteMovieId);

  //filter the id
  const favoriteMovieList = movies.filter((m) =>
    favoriteMovieId.includes(m._id)
  );
  // console.log('favoriteMovieList - movies--> ', movies);

  // console.log('favoriteMovieList--> ', favoriteMovieList);

  //DELETE favorite movie from the list
  const handleFavMovieDelete = (movieId) => {
    axios
      .delete(
        `https://lee-movies.herokuapp.com/users/${currentUser}/movies/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert('The movie was successfully deleted');
        window.open(`/users/${currentUser}`, '_self');
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {favoriteMovieList.length === 0 ? (
        <p>No Favorite Movies</p>
      ) : (
        favoriteMovieList.map((movie) => {
          return (
            <>
              <CardGroup>
                <Card key={movie._id} className="mr-3">
                  <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    alt={movie.Title + ' poster'}
                    className="position-relative overflow-hidden m-auto w-100"
                    // height={300}
                    // width={200}
                    crossOrigin="true"
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    {/* <Card.Text className="text-justify">
                      {movie.Description}
                    </Card.Text>
                    <Link to={`movies/${movie._id}`}>
                      <Button variant="outline-primary">Open</Button>
                    </Link> */}
                    <Button
                      className="btn btn-secondary"
                      variant="secodary"
                      onClick={() => {
                        handleFavMovieDelete(movie._id);
                      }}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </CardGroup>
            </>
          );
        })
      )}
    </>
  );
}

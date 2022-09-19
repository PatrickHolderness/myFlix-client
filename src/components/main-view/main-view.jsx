import React from 'react';
import axios from 'axios';
import { BrowserRouter as Routes, Route, Redirect } from 'react-router-dom';
import PropTypes from "prop-types";

import { ProfileView } from '../profile-view/profile-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavBar } from '../nav-bar/nav-bar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { Row, Col, Container } from 'react-bootstrap';

import './main-view.scss';

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      username: null,
      favoriteMovies: [],
    };
  }

  componentDidMount()
{
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      username: localStorage.getItem('username'),
    });
    this.getMovies(accessToken);
}
}

getMovies(token) {
  axios.get('https://movie-info-online.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

handleFavorite = (movieId, action) => {
  const { username, favoriteMovies } = this.state;
  const accessToken = localStorage.getItem('token');
  if (accessToken !== null && username !== null) {
    // Add MovieID to Favourites (local and web)
    if (action === 'add') {
      this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
      axios
        .post(
          `https://movie-info-online.herokuapp.com/users/${username}/favorites/${movieId}`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          console.log(`Movie added to ${username} Favorite movies`);
        })
        .catch((err) => {
          console.log(err);
        });

      // Remove Movie from Favourites (local and web)
    } else if (action === 'remove') {
      this.setState({
        favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
      });
      axios
        .delete(
          `https://movie-info-online.herokuapp.com/users/${username}/favorites/${movieId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((res) => {
          console.log(`Movie removed from ${username} Favorite movies`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};




     //set state to current user
  onLoggedIn = (authData) => {
    // console.log(authData);
    const { Username, Email, Birthday, favoriteMovies } = authData.user;
    this.setState({ username: Username, favoriteMovies: FavoriteMovies || [] });

    localStorage.setItem('token', authData.token)
    localStorage.setItem('username', Username);
    localStorage.setItem('email', Email);
    localStorage.setItem('birthday', Birthday);
    this.getMovies(authData.token);
  };


    render() {
        const { movies, username, favoriteMovies } = this.state;

        if (!movies)
        return (  <div className="main-view">Loading...</div>
        );

    return (
      <Routes>
        <NavBar user={username} />
        <Container>
          <Row className="main-view">
            <Route
              exact
              path="/"
              render={() => {
                // If no user, loginview is rendered. If a user is logged in, user details are passed as a prop to the loginview.
                if (!username) {
                  return <LoginView onLoggedIn={this.onLoggedIn} />;
                }

                // Before movies loaded
                if (movies.length === 0) return <div className="main-view" />;

                return movies.map((m) => (
                  <Col md={4} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (username) return <Redirect to="/" />;
                return <RegistrationView />;

              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => (
                
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      isFavorite={favoriteMovies.includes(match.params.movieId)}
                      onBackClick={() => history.goBack()}
                      handleFavorite={this.handleFavorite}
                    />
                )}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                {
                  if (!username)
                    return (
                      <Col>
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      </Col>
                    );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col md={8}>
                      <DirectorView
                        director={
                          movies.find(
                            (m) => m.Director.Name === match.params.name
                          ).Director
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                );
                }}
              }
              />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!username)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0)
                  return <div className="main-view"></div>;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

              <Route
            path={"/users/$username"}
            render={({ history }) => {
              if (!username)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                    <Col>
                      <ProfileView
                        movies={movies}
                        user={username}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
                }}
              />

            <Route
              path={`/users/user-update/${username}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <UpdateUser
                      user={username}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Routes>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
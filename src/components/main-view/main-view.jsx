

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Routes, Route, Redirect } from 'react-router-dom';

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

      // Remove MovieID from Favourites (local and web)
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


componentDidMount()
{
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      username: localStorage.getItem('username'),});
    this.getMovies(accessToken);
}
}

     //set state to current user
  onLoggedIn = (authData) => {
    // console.log(authData);
    const { Username, Email, Birthday, FavoriteMovies } = authData.user;
    this.setState({ username: Username, favoriteMovies: FavoriteMovies || [] });

    localStorage.setItem('token', authData.token)
    localStorage.setItem('username', Username);
    localStorage.setItem('email', Email);
    localStorage.setItem('birthday', Birthday);
    this.getMovies(authData.token);
  };

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.setState({
      user: null
    });
  }
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
                return (
                    <RegistrationView />

                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                return (
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      isFavorite={favoriteMovies.includes(match.params.movieId)}
                      onBackClick={() => history.goBack()}
                      handleFavorite={this.handleFavorite}
                    />
                );
              }}
            />
            <Route
              path="/directors/:directorName"
              render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.director.Name === match.params.directorName
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                );
              }}
            />

            <Route
              path="/genres/:genreName"
              render={({ match, history }) => {
                if (movies.length === 0)
                  return <div className="main-view"></div>;

                return (
                  <GenreView
                      genreMovies={movies.filter( (movie) => movie.genre.name === match.params.genreName)
                      }
                      genre={
                        movies.find(
                          (movie) => movie.genre.name === match.params.genreName
                        ).genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                );
              }}
            />
              <Route
            path={"/users/$username"}
            render={({ history }) => {
              if (!username) return <Redirect to="/" />;

              return (
                <ProfileView
                  movies={movies}
                  onBackClick={() => history.goBack()}
                  favoriteMovies={favoriteMovies || []}
                  handleFavorite={this.handleFavorite}
                />
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

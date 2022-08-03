import React from 'react';
import axios from 'axios';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { DirectorView } from '..director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '..//login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { NavBar } from '../nav-bar/nav-bar';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view'

import './main-view.scss';

export default class MainView extends React.Component {
    constructor(){
        super();
         this.state = {
             movies: [],
             selectedMovie: null,
             username: null,
             favoriteMovies: null,
    };
}

componentDidMount()
{
  let accessToken = localStorage.getItem('token');
  if (accessToken !== null) {
    this.setState({
      user: localStorage.getItem('user'),
    });
  }
  this.getMovies(accessToken);
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




     //set state to current user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.Token)
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
    render() {
        const { movies, user, } = this.state;
    //If no user, the loginview is rendered. If a user is logged in, details are passed as prop to loginview
        if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

        if (!registered) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        if (selectedMovie) return (<MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie);
            }}
          />
        );

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
              <Navbar bg="dark" expand="lg">
                <Container fluid>
                  <Navbar.Brand href="home">Movie Info</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Nav className="user-info">
                    <Nav.Link href="#home"> My Profile</Nav.Link>
                    <Nav.Link href="#update">Update Profile</Nav.Link>
                    <Nav.Link href ="#logout">Log Out</Nav.Link>
                        </Nav>
                     </Container>
                  </Navbar>
                  <Container fluid className="mainViewContainer">
          {selectedMovie ? (
            <Row className="justify-content-md-center">
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-md-center">
              {movies.map((movie) => (
                <Col lg={4} md={4} sm={4}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      this.setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
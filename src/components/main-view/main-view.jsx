import React from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {
constructor(){
    super();
    this.state = {
        movies: [],
        selectedMovie: null
    };
}

componentDidMount(){
    axios.get('https://movie-info-online.herokuapp.com/movies')
=======
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';

import { LoginView } from '..//login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view'

import './main-view.scss';

export class MainView extends React.Component {
    constructor(){
        super();
         this.state = {
             movies: [],
             selectedMovie: null,
             user: null,
             registered: null,
    };
}

componentDidMount()
{
    axios.get('https://movie-info-online.herokuapp.com/movies',)
>>>>>>> Stashed changes
    .then(response => {
        this.setState({
            movies: response.data
        });
    })
    .catch(error => {
        console.log(error);
    });
}

setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
        });
    }
<<<<<<< Updated upstream
    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} />;
=======

    //when a user successfully registers
  onRegistration(registered) {
    this.setState({
      registered,
    });
  }

     //set state to current user
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }
    render() {
        const { movies, selectedMovie, user, registered } = this.state;
//If no user, the loginview is rendered. If a user is logged in, details are passed as prop to loginview
        if (!registered) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);
>>>>>>> Stashed changes

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

<<<<<<< Updated upstream
        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
            </div>
        );
    } render() {
        const { movies, selectedMovie } = this.state;
=======
        if (selectedMovie) return (<MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie);
            }}
          />
        );
>>>>>>> Stashed changes

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
export default MainView;
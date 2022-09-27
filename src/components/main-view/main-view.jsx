import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setMovies, setUser, addFavorite, deleteFavorite,
} from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { ProfileView } from '../profile-view/profile-view';
import { LoginView } from '../login-view/login-view';

import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavBar } from '../nav-bar/nav-bar';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { Row, Col, Container } from 'react-bootstrap';
import './main-view.scss';

 class MainView extends React.Component {
  constructor(props) {
     super(props);
      this.state = {
    //          username: null,
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
    headers: { Authorization: `Bearer ${token}` },
  })
  .then(response => {

    this.props.setMovies(response.data);
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
    this.props.setUser(authData.user);
  };

    render() {
      let { movies } = this.props;
      // let { favoriteMovies } = this.state;
      let { username } = this.state;
      let { favoriteMovies } = this.state;


        if (!movies)
        return (  <div className="main-view">Loading...</div>
        );
    return (
      <Router>
        <NavBar user={username} />
        <Container fluid>
          <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!username) return <Col>
              <LoginView onLoggedIn={username => this.onLoggedIn(username)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            return <MoviesList movies={movies}/>;
          }} />

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
            path={"/users/:Username"}
            render={({ history, match }) => {
              const {user} = this.props;
              <ProfileView
                movies={movies}
                user={user}
                onBackClick={() => history.goBack()}
              />
            // </Col> 
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
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}


export default connect(mapStateToProps, { setMovies, setUser })(MainView);
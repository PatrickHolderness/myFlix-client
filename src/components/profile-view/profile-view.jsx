import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";


import "./profile-view.scss";

import { Container, Col, Row, Button, Card, Form } from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.setState({
      Username: null,
    });
    window.open("/", "_self");
  }
  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://movie-info-online.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

    // update profile
    editUser = (e) => {
      e.preventDefault();
      const Username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
  
      axios
        .put(
          `https://movie-info-online.herokuapp.com/users/${Username}`,
          {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          this.setState({
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday,
          });
  
          alert("Profile updated");
          window.open("/profile", "_self");
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
    deleteUser = () => {
      const Username = localStorage.getItem("user");
      const token = localStorage.getItem("token");
  
      axios
        .delete(`https://movie-info-online.herokuapp.com/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          this.onLoggedOut();
          alert("Profile deleted");
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    onRemoveFavorite = (e, movie) => {
      e.preventDefault();
      const Username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
  
      axios
        .delete(
          `https://movie-info-online.herokuapp.com/users/${Username}/${movie._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          alert("Removed from favorites");
          this.componentDidMount();
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  
    setUsername(value) {
      this.setState({
        Username: value,
      });
    }
  
    setPassword(value) {
      this.setState({
        Password: value,
      });
    }
  
    setEmail(value) {
      this.setState({
        Email: value,
      });
    }
  
    setBirthday(value) {
      this.setState({
        Birthday: value,
      });
    }
  
    render() {
      
      const { movies, user, Username, Email, Birthday, favoriteMovies} = this.state;
  
      const favoriteMoviesList =
        movies.filter((movie) => FavoriteMovies.includes(movie._id)) || [];
  
      if (!Username) {
        return null;
      }
  
      return (
        <Container className="profile-view">
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Profile</Card.Title>
                  <Form
                    className="update-form"
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="Username"
                        placeholder="New Username"
                        value={Username}
                        onChange={(e) => this.setUsername(e.target.value)}
                      />
                    </Form.Group>
  
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="Password"
                        placeholder="New Password"
                        onChange={(e) => this.setPassword(e.target.value)}
                      />
                    </Form.Group>
  
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="Email"
                        placeholder="Enter Email"
                        value={Email}
                        onChange={(e) => this.setEmail(e.target.value)}
                      />
                    </Form.Group>
  
                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        name="Birthday"
                        value={Birthday}
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <div>
                      <Button
                        type="submit"
                        label="Submit"
                        onClick={this.editUser}
                      >
                        Update Data
                      </Button>
                    </div>
                  </Form>
                  <Button
                    onClick={() => {
                      history.back();
                    }}
                    label="Back"
                  ></Button>
                  <Button label="Delete User" onClick={() => this.deleteUser()}>
                    Delete Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <h4>Favourite movies:</h4>
      <Card className="fav-list">
        <Card.Body>
          {favoriteMoviesList.map((movie) => {
            return (
              <div key={movie._id}>
                <img src={movie.ImagePath} alt={movie.Title} />
                <Link to={`/movies/${movie._id}`}>
                  <h4>{movie.Title}</h4>
                </Link>
              </div>
            );
          })}
        </Card.Body>
      </Card>
        </Container>
      );
    }
  }
  
  ProfileView.propTypes = {
    movies: PropTypes.arrayOf(
      PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        ImagePath: PropTypes.string,
        Genre: PropTypes.shape({
          Name: PropTypes.string,
          Description: PropTypes.string,
        }),
        Director: PropTypes.shape({
          Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.number.isRequired,
    Death: PropTypes.number,
        }),
      })
    ),
    users: PropTypes.arrayOf(
      PropTypes.shape({
        Username: PropTypes.string,
        Password: PropTypes.string,
        Email: PropTypes.string,
        Birthday: PropTypes.string,
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    onBackClick: PropTypes.func,
  };
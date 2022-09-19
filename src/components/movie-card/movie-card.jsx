import React, { Component } from 'react';
import propTypes from 'prop-types';
import {Button, Card, Col, Row, Container } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from "react-router-dom"
//display movies rendered on main-view

<<<<<<< Updated upstream
export class MovieCard extends Component 
{
=======
export class MovieCard extends React.Component {
  addMovie(movie, user) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://swagflix.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
>>>>>>> Stashed changes
  render() {
    const { movie } = this.props;

    return (
<<<<<<< Updated upstream
      <Container>
        <Row>
          <Col>
            <Card  style ={{ width: "15rem" }}>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
           </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
=======
      <Card style={{color: 'black' }}>
        <Card.Img
          variant="top"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
>>>>>>> Stashed changes
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }),
    ImagePath: propTypes.string.isRequired,
  }).isRequired,
};
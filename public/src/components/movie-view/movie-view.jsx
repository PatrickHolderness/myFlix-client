import React, { Component } from 'react';
import axios from 'axios';

import { Button, Card, CardGroup, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends Component {
  //PUT add movie to favorite movie list
  handleAddMovieToFav(movieId) {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(
        `https://movie-info-online.herokuapp.com/users/${currentUser}/movies/${movieId}`,
        { headers: { Authorization: `Bearer ${token}` } },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const data = response.data;
        console.log(data);
        alert(`The movie was successfully to favorite's list`);
        // window.open(`/movies/${movieId}`, '_self');
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <>
        <Container>
          <Row>
            <Col>
              <CardGroup>
                <Card className="m-3">
                  <Card.Img
                    variant="top"
                    crossOrigin="anonymous"
                    src={movie.ImagePath}
                    alt={movie.Title + ' poster'}
                    height={500}
                  />
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Subtitle>
                      Genre:
                      <Link to={`/genres/${movie.Genre.Name}`}>
                        <Button
                          varient="link"
                          className="btn btn-link bg-transparent border-0"
                        >
                          {movie.Genre.Name}
                        </Button>
                      </Link>
                    </Card.Subtitle>
                    <Card.Subtitle>
                      Director:
                      <Link to={`/directors/${movie.Director.Name}`}>
                        <Button
                          varient="link"
                          className="btn btn-link bg-transparent border-0"
                        >
                          {movie.Director.Name}
                        </Button>
                      </Link>
                    </Card.Subtitle>
                    <br />
                    <Card.Subtitle>Description:</Card.Subtitle>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button
                      className="btn btn-secondary float-right ml-2"
                      onClick={() => {
                        onBackClick();
                      }}
                      varient="secondary"
                    >
                      Back
                    </Button>
                    <Button
                      className="float-right"
                      onClick={() => {
                        this.handleAddMovieToFav(movie._id);
                      }}
                      varient="primary"
                    >
                      Add to Favorite
                    </Button>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

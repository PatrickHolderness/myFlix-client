<<<<<<< Updated upstream
 import React from 'react';

 export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
        return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
}
=======
import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap';
import Card from 'react-bootstrap';
import './movie-card.scss';
//display movies rendered on main-view

export class MovieCard extends React.Component 
{
  render() {
    const { movie, onMovieClick } = this.props;

    return (
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
  }).isRequired,

  onMovieClick: propTypes.func.isRequired,
};
>>>>>>> Stashed changes

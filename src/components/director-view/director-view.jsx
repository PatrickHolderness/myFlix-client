import React from 'react';
import propTypes from 'prop-types';

import { Button, Container, Row, } from 'react-bootstrap';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
        <Container className="director-view">
        <h1>{director.Name} </h1>
        <p>Born: {director.Birth}</p>
        <Button
          className="mt-4"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
        <h2 className="subtitle">Biography: </h2>
        <p>{director.Bio}</p>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birth: propTypes.number.isRequired,
    Death: propTypes.number,
  }).isRequired,
};
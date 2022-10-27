import React from 'react';
import { Button, Card, CardGroup } from 'react-bootstrap';

export function GenreView({ genre, onBackClick }) {
  return (
    <>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title className="mb-5">
              <u className="text-primary">
                <h1 className="h1">Genre Details:</h1>
              </u>
            </Card.Title>
            <Card.Subtitle className="mb-4">
              Genre Type:
              <Card.Text className="text-muted">{genre.Name}</Card.Text>
            </Card.Subtitle>
            <Card.Subtitle className="mb-4">
              Description:
              <Card.Text className="text-muted">{genre.Description}</Card.Text>
            </Card.Subtitle>
            <Button
              className="btn btn-secondary"
              onClick={() => {
                onBackClick();
              }}
              varient="secondary"
            >
              Back
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}

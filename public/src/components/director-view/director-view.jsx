import React from 'react';
import { Button, Card, CardGroup } from 'react-bootstrap';

export function DirectorView({ director, onBackClick }) {
  return (
    <>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title className="mb-5">
              <u className="text-primary">
                <h1 className="h1">Director Details:</h1>
              </u>
            </Card.Title>
            <Card.Subtitle className="mb-4">
              Director Name:{' '}
              <Card.Text className="text-muted">{director.Name}</Card.Text>
            </Card.Subtitle>
            <Card.Subtitle className="mb-4">
              Born in:{' '}
              <Card.Text className="text-muted">{director.Birth}</Card.Text>
            </Card.Subtitle>
            <Card.Subtitle className="mb-4">
              Biography:{' '}
              <Card.Text className="text-muted">{director.Bio}</Card.Text>
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

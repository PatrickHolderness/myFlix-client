import React from 'react';
import { Card, CardGroup } from 'react-bootstrap';

export function UserView(props) {
  return (
    <>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Username: {props.username}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Email: {props.email}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Date of birth: {props.birthday?.split('T')[0]}
            </Card.Subtitle>
            {/* {console.log('birthday--> ', typeof props.birthday)} */}
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}

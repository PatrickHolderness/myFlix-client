import React from "react";

import { Container, Navbar, Nav, Button } from "react-bootstrap";

import "./nav-bar.scss";

export function NavBar({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
      <Container>
      <Navbar.Brand className="text-light">Movie Info</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {isAuth() && <Nav.Link href="/">Home</Nav.Link>}
          {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}

          {isAuth() && <Button onClick={onLoggedOut}>Logout</Button>}
          {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
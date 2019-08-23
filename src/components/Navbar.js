import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

import logo from '../resources/logo.png'

export default function NavbarComponent() {
  return(
    <div>
      <style type="text/css">
        {`
        .btn-flat {
          background-color: purple;
          color: white;
        }

        .btn-xxl {
          padding: 1rem 1.5rem;
          font-size: 1.5rem;
        }
        `}
      </style>
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">
            <h1>
              <img
                src={logo}
                className="d-inline-block align-top"
                alt="BioPred Logo"
                height='47'
              />
              <span style={{padding: '10px'}}></span>{'BioPred'}
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/predict">Predict</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
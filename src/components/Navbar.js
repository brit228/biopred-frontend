import React, { useState, useEffect } from 'react'
import { Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { withFirebase } from './Firebase'

import logo from '../resources/logo.png'

const NavbarComponent = ({ firebase, showUI, userComplete, userCompleted, checkUserCompleted }) => {
  const [authUser, setAuth] = useState(null)

  useEffect(() => {
    firebase.auth.onAuthStateChanged(
      auth => {
        auth ? setAuth(auth) : setAuth(null)
      }
    )
    if (firebase.auth.currentUser && !userComplete) {
      fetch('https://api.biopred.app/graph', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: "query {checkIn}",
          authentication: {
            uid: firebase.auth.currentUser.uid,
            accessToken: firebase.auth.currentUser.c.b
          }
        })
      }).then(res => res.json()).then(data => {
        checkUserCompleted()
        if (data.data.checkIn > 0)  {
          userCompleted(data.data.checkIn)
        }
      })
    }
  })

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
              {authUser && userComplete ?
                [
                  <NavDropdown title="Predict" id="predict-dropdown">
                    <NavDropdown.Item href="/predict/rnaprotein" style={{whiteSpace: "normal"}}>RNA-Protein Interaction</NavDropdown.Item>
                  </NavDropdown>,
                  <Nav.Link href="/profile">Profile</Nav.Link>
                ] : null }
            </Nav>
            <Nav>
              <Nav.Link>{authUser && userComplete ? <Button onClick={() => {firebase.auth.signOut()}}>Sign Out</Button> : <Button onClick={() => {showUI()}}>Sign In</Button>}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

const NavContainer = ({ showUI, userComplete, userCompleted, checkUserCompleted }) => {
  return(
    withFirebase(NavbarComponent)({ showUI, userComplete, userCompleted, checkUserCompleted })
  )
}

export default NavContainer
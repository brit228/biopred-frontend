import React, { useState, useEffect } from 'react'
import { Button, Container, Navbar, Nav } from 'react-bootstrap'
import { withFirebase } from './Firebase'

import logo from '../resources/logo.png'

const NavbarComponent = ({ firebase, showUI, userComplete, userCompleted, checkUserCompleted }) => {
  const [authUser, setAuth] = useState(null)

  useEffect(() => {
    firebase.auth.onAuthStateChanged(
      auth => {
        auth ? setAuth(auth) : setAuth(null)
        if (auth && !userComplete) {
          firebase.store.collection('users').where('uid', '==', auth.uid).get().then((q) => {
            checkUserCompleted()
            if (q.docs.length > 0) {
              userCompleted()
            }
          })
        }
      }
    )
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
              <Nav.Link href="/history">History</Nav.Link>
              {authUser && userComplete ?
                [
                  <Nav.Link href="/predict">Predict</Nav.Link>,
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
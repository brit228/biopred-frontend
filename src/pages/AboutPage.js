import React, {Component} from 'react'
import {Container, Jumbotron} from 'react-bootstrap'

import Navbar from '../containers/NavbarAuth'
import SignInUI from '../containers/SigninUI'
import CompleteForm from '../containers/CompleteForm'
import BackgroundAnimation from '../containers/BackgroundAnimation'

class AboutPage extends Component {
  render() {
    return(
      [
        <Navbar />,
        <Container>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-2'>About</h1>
            <h3 style={{fontFamily: "'Ubuntu', serif"}}><i>information about biopred</i></h3>
          </Jumbotron>
          <SignInUI />
          <CompleteForm />
        </Container>,
        <BackgroundAnimation />
      ]
    )
  }
}

export default AboutPage
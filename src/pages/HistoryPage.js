import React, {Component} from 'react'
import {Container, Jumbotron} from 'react-bootstrap'

import Navbar from '../containers/NavbarAuth'
import SignInUI from '../containers/SigninUI'
import CompleteForm from '../containers/CompleteForm'
import BackgroundAnimation from '../containers/BackgroundAnimation'

import History from '../components/History'

class HomePage extends Component {
  render() {
    return(
      [
        <Navbar />,
        <Container>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-2'>History</h1>
            <h3 style={{fontFamily: "'Ubuntu', serif"}}><i>previous predictive results for different combinations of settings</i></h3>
          </Jumbotron>
          <History />
          <SignInUI />
          <CompleteForm />
        </Container>,
        <BackgroundAnimation />
      ]
    )
  }
}

export default HomePage
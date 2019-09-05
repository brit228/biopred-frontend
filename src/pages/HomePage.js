import React, {Component} from 'react'
import {Container, Jumbotron, Row} from 'react-bootstrap'

import Navbar from '../containers/NavbarAuth'
import SignInUI from '../containers/SigninUI'
import PredictionInputs from '../containers/PredictionInputs'
import BackgroundAnimation from '../containers/BackgroundAnimation'
import CompleteForm from '../containers/CompleteForm'

class HomePage extends Component {
  render() {
    return(
      [
        <Navbar />,
        <Container>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-2'>BioPred</h1>
            <h3 style={{fontFamily: "'Ubuntu', serif"}}><i>predictive web tools for determining interactions between biomolecules</i></h3>
            <SignInUI />
            <CompleteForm />
          </Jumbotron>
          <PredictionInputs />
        </Container>,
        <BackgroundAnimation />
      ]
    )
  }
}

export default HomePage
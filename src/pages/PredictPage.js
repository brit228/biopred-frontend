import React, {Component} from 'react'
import {Container, Jumbotron} from 'react-bootstrap'

import Navbar from '../containers/NavbarAuth'
import SignInUI from '../containers/SigninUI'
import CompleteForm from '../containers/CompleteForm'
import PredictionInputs from '../containers/PredictionInputs'
import BackgroundAnimation from '../containers/BackgroundAnimation'

class PredictPage extends Component {
  render() {
    return(
      [
        <Navbar />,
        <Container>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-2'>Predict</h1>
            <h3 style={{fontFamily: "'Ubuntu', serif"}}><i>predicts likelihood of interaction for different biomolecules and settings</i></h3>
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

export default PredictPage
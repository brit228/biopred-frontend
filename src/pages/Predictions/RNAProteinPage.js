import React, {Component} from 'react'
import {Container, Jumbotron} from 'react-bootstrap'

import Navbar from '../../containers/NavbarAuth'
import SignInUI from '../../containers/SigninUI'
import CompleteForm from '../../containers/CompleteForm'
import BackgroundAnimation from '../../containers/BackgroundAnimation'
import RNAProteinContainer from '../../containers/Predictions/RNAProteinContainer'

class RNAProteinPage extends Component {
  render() {
    return(
      [
        <Navbar />,
        <Container>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-3'>RNA-Protein Interaction Prediction</h1>
            <h3 style={{fontFamily: "'Ubuntu', serif"}}><i>predicts likelihood of proteins interacting with RNA based on their sequence</i></h3>
            <SignInUI />
            <CompleteForm />
          </Jumbotron>
          <RNAProteinContainer />
        </Container>,
        <BackgroundAnimation />
      ]
    )
  }
}
  
export default RNAProteinPage

import React, {Component} from 'react'
import {Container, Jumbotron, Row} from 'react-bootstrap'

import Navbar from '../containers/NavbarAuth'
import BackgroundAnimation from '../containers/BackgroundAnimation'

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
        </Container>,
        <BackgroundAnimation />
      ]
    )
  }
}

export default HomePage
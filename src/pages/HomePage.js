import React, {Component} from 'react'
import {Container, Jumbotron, Row} from 'react-bootstrap'

import Navbar from '../components/Navbar'

class HomePage extends Component {
  render() {
    return(
      <div>
        <Navbar />
        <Container>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-1'>Welcome to BioPred</h1>
            <h2><i>predictive web tools for determining interactions between biomolecules</i></h2>
          </Jumbotron>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-1'>Welcome to BioPred</h1>
          </Jumbotron>
        </Container>
      </div>
    )
  }
}

export default HomePage
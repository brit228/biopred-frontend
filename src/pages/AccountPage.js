import React, {Component} from 'react'
import {Container, Jumbotron} from 'react-bootstrap'

import Navbar from '../containers/NavbarAuth'
import SignInUI from '../containers/SigninUI'
import CompleteForm from '../containers/CompleteForm'
import BackgroundAnimation from '../containers/BackgroundAnimation'
import Profile from '../containers/ProfileContainer'

class AccountPage extends Component {
  render() {
    return(
      [
        <Navbar />,
        <Container>
          <Jumbotron style={{margin: '30px 0'}}>
            <h1 className='display-3'>Profile</h1>
            <h3 style={{fontFamily: "'Ubuntu', serif"}}><i>profile and account settings</i></h3>
          </Jumbotron>
          <SignInUI />
          <CompleteForm />
          <Profile/>
        </Container>,
        <BackgroundAnimation />
      ]
    )
  }
}

export default AccountPage
import React from 'react'
import { Modal } from 'react-bootstrap'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { withFirebase } from './Firebase'


const SignInUISetUp = ({ firebase, show, closeHandle }) => {
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.app.firebase_.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.app.firebase_.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.app.firebase_.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  }

  return(
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={closeHandle}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign In/Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth} />
      </Modal.Body>
    </Modal>
  )
}

const SignInUI = ({ showUI, closeUI }) => {
  return(
    withFirebase(SignInUISetUp)({ show: showUI, closeHandle: closeUI })
  )
}

export default SignInUI
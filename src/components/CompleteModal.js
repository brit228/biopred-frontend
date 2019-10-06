import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { withFirebase } from './Firebase'

const CompleteModal = ({ firebase, history, showComplete, checkUserComplete, userCompleted }) => {
  const userTypeRef = useRef(null)
  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={!showComplete && firebase.auth && checkUserComplete}
      onHide={() => {firebase.auth.signOut()}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Complete your registration
        </Modal.Title>    
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="completeForm.RoleSelect">
            <Form.Label>Select Role</Form.Label>
            <Form.Control as="select" ref={userTypeRef}>
              <option>Academic</option>
              <option>Commerical</option>
              <option>Personal</option>
            </Form.Control>
          </Form.Group>
        </Form>
        <Button variant="outline-secondary" type="submit" onClick={() => {
          fetch("https://api.biopred.app/graph", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              query: "query {completeRegistration}",
              authentication: {
                uid: firebase.auth.currentUser.uid,
                accessToken: firebase.auth.currentUser.c.b
              }
            })
          }).then(res => res.text()).then(data => {
            console.log(data)
            if (data.slice(0,8) === "SUCCESS") {
              userCompleted(1000)
              history.push('/')
            }
          })
        }}>
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  )
}

const CompleteForm = ({ userComplete, hide, checkUserComplete, userCompleted }) => {
  return(
    withFirebase(CompleteModal)({ showComplete: userComplete, closeHandle: hide, checkUserComplete, userCompleted })
  )
}

export default withRouter(CompleteForm)
import React, { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { withFirebase } from './Firebase'

const CompleteModal = ({ firebase, showComplete, checkUserComplete }) => {
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
          fetch("https://api.biopred.app/complete", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              uid: firebase.auth.currentUser.uid,
              typ: userTypeRef.current.value
            }),
            headers: {
              'Content-Type': 'application/json',
            }
          })
        }}>
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  )
}

const CompleteForm = ({ userComplete, hide, checkUserComplete }) => {
  return(
    withFirebase(CompleteModal)({ showComplete: userComplete, closeHandle: hide, checkUserComplete })
  )
}

export default CompleteForm
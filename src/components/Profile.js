import React, {useState} from 'react'
import {Jumbotron, Container, Row, Col, ProgressBar, Button} from 'react-bootstrap'
import { withFirebase } from './Firebase'
import { withRouter } from 'react-router-dom'

const Profile = ({ firebase, history, limit }) => {
  const [deleteState, setDeleteState] = useState('Delete Account')
  return(
    <Jumbotron>
      <Container style={{padding: "0 0 20px 0"}}>
        <Row>
          <Col md={2}>
            <h4>Limit of Predictions</h4>
          </Col>
          <Col>
            <ProgressBar now={limit} label={`${limit}`} max={1000} min={0} style={{height: "80%"}} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="danger" size='lg' block onClick={() => {
              if (deleteState === 'Delete Account') {
                setDeleteState('Are you sure?')
                console.log(firebase)
              } else if (deleteState === 'Are you sure?') {
                fetch('https://api.biopred.app/graph', {
                  mode: 'cors',
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: `query {deleteMe}`,
                    authentication: {
                      accessToken: firebase.auth.currentUser.c.b,
                      uid: firebase.auth.currentUser.uid
                    }
                  })
                }).then(() => {
                  history.push('/')
                })
              }
            }}>{deleteState}</Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

const ProfileAuth = ({ limit, history }) => (
  withFirebase(Profile)({ limit, history })
)

export default withRouter(ProfileAuth)
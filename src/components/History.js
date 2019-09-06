import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Jumbotron, Spinner } from 'react-bootstrap'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { withFirebase } from './Firebase'

import ResultBox from './ResultBox'

const getResults = (page, callback) => {
  fetch('https://api.biopred.app/graph', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      query: `{getPredictionResults(inputs: ${page}) {
        sequence1,
        sequence2,
        type1,
        type2,
        predSubSeqItem1,
        predSubSeqItem2,
        predSubSeqItem3,
        jobid,
        timestamp
      }}`
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    callback(data.data.getPredictionResults)
  })
}

const getMyResults = (page, uid, accessToken, callback) => {
  fetch('https://api.biopred.app/graph', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      query: `{getPredictionResults(inputs: ${page}) {
        sequence1,
        sequence2,
        type1,
        type2,
        predSubSeqItem1,
        predSubSeqItem2,
        predSubSeqItem3,
        jobid,
        timestamp
      }}`,
      authentication: {
        uid: uid,
        accessToken: accessToken
      }
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    callback(data.data.getMyPredictionResults)
  })
}

const getPrediction = (jobid, callback) => {
  fetch('https://api.biopred.app/graph', {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({
      query: `{getResult(inputs: "${jobid.split('/')[1]}")}`
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).then(data => {
    callback(data.data.getResult)
  })
}

const HistoryResults = ({ firebase }) => {
  const [results, setResults] = useState(null)
  const [resultsSearching, setResultsSearching] = useState(false)
  const [resultType, setResultType] = useState('ALL')
  const [page, setPage] = useState(1)
  const [resultstore, setResultstore] = useState(Array(10).fill(null))
  const [resultpending, setResultpending] = useState(Array(10).fill(false))
  
  useEffect(() => {
    if (!results && !resultsSearching) {
      getResults(page, setResults)
      setResultsSearching(true)
    }
  })

  return(
    <Jumbotron>
      <Container style={{padding: "10px 0 10px 0"}}>
        <Row>
          <Col>
            <Button block disabled={!firebase.auth.currentUser || !results} onClick={() => {
              setResults(null)
              setResultstore(Array(10).fill(null))
              setResultpending(Array(10).fill(false))
              setResultType(resultType === 'ALL' ? 'ME' : 'ALL')
              if (resultType === 'ALL') {
                getResults(page, setResults)
              } else {
                getMyResults(page, firebase.auth.currentUser.uid, firebase.auth.currentUser.c.b, setResults)
              }
            }} variant="success" style={{padding: "20px 0 20px 0"}}>Results for: {resultType}</Button>
          </Col>
        </Row>
      </Container>
      {results ? results.map((item, index) => (
        <Container style={{padding: "50px 0 50px 0"}}>
          <Row>
            <Col md={12}><h4>{new Date(item.timestamp).toUTCString()}</h4></Col>
            <Col md={6}>{item.sequence1 === "" ? "ALL" : item.sequence1.slice(0,50) + (item.sequence1.length > 30 ? '...' : '')}</Col>
            <Col md={4} className='text-center'>{item.predSubSeqItem1 ? 'INDIVIDUAL TARGET RESIDUES' : 'WHOLE TARGET CHAIN'}</Col>
            <Col md={2} className="text-right">{item.type1}</Col>
            <Col md={6}>{item.sequence2 === "" ? "ALL" : item.sequence2.slice(0,50) + (item.sequence2.length > 30 ? '...' : '')}</Col>
            <Col md={4} className='text-center'>{item.predSubSeqItem2 ? 'INDIVIDUAL TEST RESIDUES' : 'WHOLE TEST CHAIN'}</Col>
            <Col md={2} className="text-right">{item.type2}</Col>
          </Row>
          <Row>
            <Col>
              {
                resultstore[index] ?
                <ResultBox results={resultstore[index]} id1={item.sequence1} id2={item.sequence2 !== '' ? item.sequence2 : 'ALL'} /> :
                <Button block onClick={() => {
                  setResultpending(resultpending.map((r,i) => (i === index ? true : r)))
                  getPrediction(item.jobid, (val) => {setResultstore(resultstore.map((r,i) => (i === index ? val : r)))})
                }} disabled={resultpending[index]}>Download Results</Button>
              }
            </Col>
          </Row>
        </Container>
      )) : <Container style={{padding: "100px 0 100px 0"}}>
        <Row className="d-flex justify-content-center">
          <Col md={3}>
            <Spinner animation="border" style={{width: "100%", paddingTop: "97%"}} />
          </Col>
        </Row>
      </Container>}
      <Container>
        <Row className="d-flex justify-content-between">
          <Col sm={1}>
            <Button disabled={!results || page < 2} onClick={() => {
              setResults(null)
              setResultstore(Array(10).fill(null))
              setResultpending(Array(10).fill(false))
              setPage(page-1)
              if (resultType === 'ALL') {
                getResults(page, setResults)
              } else {
                getMyResults(page, firebase.auth.currentUser.uid, firebase.auth.currentUser.c.b, setResults)
              }
            }}><FaChevronLeft/></Button>
          </Col>
          <Col sm={1} className="text-center">
            <h4>{page}</h4>
          </Col>
          <Col sm={1}>
            <Button disabled={!results || page > 99 || results.length < 10} onClick={() => {
              setResults(null)
              setResultstore(Array(10).fill(null))
              setResultpending(Array(10).fill(false))
              setPage(page+1)
              if (resultType === 'ALL') {
                getResults(page, setResults)
              } else {
                getMyResults(page, firebase.auth.currentUser.uid, firebase.auth.currentUser.c.b, setResults)
              }
            }}><FaChevronRight/></Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

const History = () => (
  withFirebase(HistoryResults)()
)

export default History
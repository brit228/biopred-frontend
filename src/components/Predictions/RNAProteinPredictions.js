import React, {useState, useEffect, useRef} from 'react'
import {Container, Jumbotron, Row, Col, InputGroup, FormControl, Button, Form, Spinner, Table, Collapse} from 'react-bootstrap'
import { FaChevronDown } from 'react-icons/fa'
import { withFirebase } from '../Firebase'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getResults = async (setJobs, key, uid) => {
  await sleep(10000)
  fetch('https://api.biopred.app/graph', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({query: `query {
      myRnaProteinPredictions {
          sequence
          result {
            resabbrev
            interaction
          }
          jobname
          timestamp
          status
        }
      }`,
      authentication: {
        uid: uid,
        accessToken: key
    }}),
  }).then(res => res.json()).then(data => {
    setJobs(data.data.myRnaProteinPredictions)
    getResults(setJobs, key, uid)
  })
}

const RnaProteinResultViz = ({ results, ...props }) => {
  var pathstr = "M 10 5"
  var x = 10
  var y = 5
  for (var i = 1; i < results.length; i++) {
    if (i % 10 === 0) {
      x += 5
      pathstr += ` L ${x} ${y}`
      y += 10
      pathstr += ` L ${x} ${y}`
      x = 10
      pathstr += ` L ${x} ${y}`
      y += 5
    } else {
      x += 10
    }
    pathstr += ` L ${x} ${y}`
  }

  const colorVal = (v) => {
    var r = 0.0
    var g = 0.0
    if (v < 0.5) {
      g = v * 2.0
      r = 1.0
    } else {
      r = 2.0 - v * 2.0
      g = 1.0
    }
    return `rgba(${r*255},${g*255},0.0,1.0)`
  }

  return(<svg {...props} viewBox={`0 0 115 ${y+10}`}>
    <path d={pathstr} stroke="black" fill="none" />
    {results.map((r, i) => <circle cx={10.0 * (i % 10) + 10.0} cy={15.0 * Math.floor(i/10.0) + 5.0} r="3" fill={colorVal(r.interaction)}/>)}
    {results.map((r, i) => <text x={10.0 * (i % 10) + 8.5} y={15.0 * Math.floor(i/10.0) + 12.5} style={{font: "5px 'Source Code Pro', monospace"}}>{r.resabbrev}</text>)}
    {results.map((r, i) => <text x={10.0 * (i % 10) + 8.2} y={15.0 * Math.floor(i/10.0) + 6.3} style={{font: "3px 'Source Code Pro', monospace"}}>{parseInt(r.interaction*100.0).toString()}</text>)}  </svg>)
}

const JobRow = ({ jobname, datetime, sequence, pending, results }) => {
  const [open, setOpen] = useState(true)
  const [start, setStart] = useState(true)
  
  useEffect(() => {
    if (start) {
      setStart(false)
      setOpen(false)
    }
  })

  return(
    [
      <tr>
        <td>{jobname}</td>
        <td>{datetime.split('T')[0] + ' ' + datetime.split('T')[1].split('.')[0]}</td>
        <td>{pending ? 'Pending' : 'Completed'}</td>
        <td><Button disabled={pending} onClick={() => {setOpen(!open)}}>{pending ? <Spinner animation="border" size="sm" /> : <FaChevronDown />}</Button></td>
      </tr>,
      <tr>
        <td colSpan={4} style={{paddingTop: "0", paddingBottom: "0"}}>
          <Collapse in={open} open>
            <Container>
              <Row>
                <Col>
                  <h2>Sequence</h2>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <RnaProteinResultViz results={results} />
                </Col>
                <Col md={6}>
                  <p><code>{results.map((r,i) => (r.interaction > 0.5 ? <b>{sequence[i]}</b> : sequence[i]))}</code></p>
                  <p><code>{results.map((r,i) => (r.interaction > 0.5 ? <b>1</b> : '0'))}</code></p>
                </Col>
              </Row>
            </Container>
          </Collapse>
        </td>
      </tr>
    ]
  )
}

const RNAProteinPrediction = ({ firebase, limit }) => {
  const [start, setStart] = useState(true)
  const [jobs, setJobs] = useState([])
  const [sequence, setSequence] = useState('')
  const [processing, setProcessing] = useState(false)

  const jobnameRef = useRef(null)
  const sequenceRef = useRef(null)
  
  useEffect(() => {
    if (start) {
      setStart(false)
      fetch('https://api.biopred.app/graph', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: `query {
          myRnaProteinPredictions {
              sequence
              result {
                resabbrev
                interaction
              }
              jobname
              timestamp
              status
            }
          }`,
          authentication: {
            uid: firebase.auth.currentUser.uid,
            accessToken: firebase.auth.currentUser.c.b
        }}),
      }).then(res => res.json()).then(data => {
        setJobs(data.data.myRnaProteinPredictions)
        getResults(setJobs, firebase.auth.currentUser.c.b, firebase.auth.currentUser.uid)
      })
    }
  })

  const alterSequence = (v) => {
    var s = v.toUpperCase()
    s = s.replace(/[^A-Z]/g, "")
    if (s.length > 1000) {
      s = s.slice(0, 1000)
    }
    console.log(s)
    setSequence(s)
  }

  var d = new Date()
  var jobname = `${firebase.auth.currentUser.uid.slice(18)}-${d.getHours()}${d.getMinutes()}${d.getSeconds()}-${d.getDate()}${d.getMonth()}${d.getFullYear()}`

  return [
    <Jumbotron>
      <Row>
        <Col>
          <Form>
            <InputGroup>
              <InputGroup.Prepend><InputGroup.Text>Job Name</InputGroup.Text></InputGroup.Prepend>
              <FormControl placeholder="Name of job..." disabled defaultValue={jobname} ref={jobnameRef} />
            </InputGroup>
            <Form.Group>
              <Form.Control as="textarea" rows="5" placeholder="Input Sequence in FASTA format..." value={sequence} onChange={(v) => alterSequence(v.target.value)} ref={sequenceRef} />
            </Form.Group>
            <Button size="lg" block disabled={limit <= 0 || processing} onClick={() => {
              if (jobnameRef.current.value !== "" && sequenceRef.current.value !== "") {
                setProcessing(true)
                fetch('https://api.biopred.app/graph', {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({query: `query {
                      makeRnaProteinPrediction(inp: {
                        jobname: "${jobnameRef.current.value}"
                        sequence: "${sequenceRef.current.value}"
                      })
                    }`,
                    authentication: {
                      uid: firebase.auth.currentUser.uid,
                      accessToken: firebase.auth.currentUser.c.b
                  }})
                }).then(() => {
                  d = new Date()
                  jobname = `${firebase.auth.currentUser.uid.slice(18)}-${d.getHours()}${d.getMinutes()}${d.getSeconds()}-${d.getDate()}${d.getMonth()}${d.getFullYear()}`
                  jobnameRef.current.value = jobname
                  setSequence('')
                  setProcessing(false)
                })
              }
            }}>Predict</Button>
          </Form>
        </Col>
      </Row>
    </Jumbotron>,
    <Jumbotron>
      <Row>
        <Col>
          <h4>Your Jobs</h4>
        </Col>
      </Row>
      <Row>
        <Table bordered hover style={{width:"100%"}}>
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Time/Date Submitted</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {jobs ? jobs.map(j => <JobRow results={j.result} jobname={j.jobname} datetime={j.timestamp} pending={j.status === 'completed'} sequence={j.sequence} />) : null}
          </tbody>                
        </Table>
      </Row>
    </Jumbotron>
  ]
}

const RNAProteinPredictionContainer = ({limit}) => {
  return(withFirebase(RNAProteinPrediction)({limit}))
}

export default RNAProteinPredictionContainer
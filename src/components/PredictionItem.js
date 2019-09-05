import React, {useState} from 'react'
import { parseString } from 'xml2js'
import { Card, Container, Row, Col, Form, ListGroup, DropdownButton, Dropdown, Button, Jumbotron, InputGroup } from 'react-bootstrap'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { withFirebase } from './Firebase'

const SearchBar = ({ text, moltype, sequence, editItemText, editItemVals }) => (
  <InputGroup>
    <Form.Control onChange={(e) => {
      editItemText(e.target.value)
      fetch('https://www.rcsb.org/pdb/rest/search', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search for: ${e.target.value}</description><keywords>${e.target.value}</keywords></orgPdbQuery>`
      }).then(res => res.text()).then(data => {
        const vals = data.split(/\n/).slice(0,5)
        fetch('https://www.rcsb.org/pdb/json/describePDB?structureId='+vals.map((r)=>r.toLowerCase()).join(',')).then(res => res.json()).then(data => {
          const d = data.map((v) => ({
            name: v.title.slice(0,40)+(v.title.length > 40 ? '...' : ''),
            pdb: v.structureId
          }))
          fetch('https://www.rcsb.org/pdb/rest/getEntityInfo?structureId='+vals.map((r)=>r.toLowerCase()).join(','), {
            mode: 'cors'
          }).then(res => res.text()).then(data => {
            const output = []
            parseString(data, (err, out) => {
              out.entityInfo.PDB.map((pdb,ind) => {
                pdb['Entity'].map((ent) => {
                  if (ent['$']['type'] === moltype.toLowerCase()) {
                    ent.Chain.map((chn) => {
                      output.push({
                        chain: chn['$']['id'],
                        name: d[ind].name,
                        pdb: d[ind].pdb
                      })
                    })
                  }
                })
              })
              editItemVals(output.slice(0,10))
            })
          })
        })
      })
    }} as="input" style={{fontFamily: "'Source Code Pro', monospace"}} value={text} />
    <InputGroup.Append>
      <InputGroup.Text>
      {
        sequence !== '' ?
        <FaCheck color='green' /> :
        <FaTimes color='red' />
      }
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
)

const PDBSearchBar = ({ text, moltype, sequence, editItemText, editItemVals }) => (
  <InputGroup>
    <Form.Control onChange={(e) => {
      editItemText(e.target.value.slice(0,4))
      if (e.target.value.length === 4) {
        const pdbid = e.target.value.toLowerCase()
        fetch('https://www.rcsb.org/pdb/json/describePDB?structureId='+pdbid).then(res => res.json()).then(data => {
          const d = data.map((v) => ({
            name: v.title.slice(0,40)+(v.title.length > 40 ? '...' : ''),
            pdb: v.structureId
          }))
          fetch('https://www.rcsb.org/pdb/rest/getEntityInfo?structureId='+pdbid).then(res => res.text()).then(data => {
            const output = []
            parseString(data, (err, out) => {
              out.entityInfo.PDB.map((pdb,ind) => {
                pdb['Entity'].map((ent) => {
                  if (ent['$']['type'] === moltype.toLowerCase()) {
                    ent.Chain.map((chn) => {
                      output.push({
                        chain: chn['$']['id'],
                        name: d[ind].name,
                        pdb: d[ind].pdb
                      })
                    })
                  }
                })
              })
              editItemVals(output.slice(0,10))
            })
          })
        })
      }
    }} as="input" style={{fontFamily: "'Source Code Pro', monospace"}} value={text.toUpperCase()} />
    <InputGroup.Append>
      <InputGroup.Text>
      {
        sequence !== '' ?
        <FaCheck color='green' /> :
        <FaTimes color='red' />
      }
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
)

const PredictionItem = ({
  id, item1, item2, status, prediction, updateItem1Input, updateItem1Molecule,
  updateItem2Input, updateItem2Molecule, updatePrediction, editItem1Text,
  editItem2Text, editItem1Sequence, editItem2Sequence, remove, predict
}) => {
  const searchMap = {
    SEQUENCE: "Sequence",
    PDBCHAIN: "PDB ID",
    SEARCH: "Search",
    ALL: "All",
  }
  const inputMap = {
    PROTEIN: "Protein",
    NUCLEIC: "Nucleic Acid",
    LIGAND: "Ligand"
  }
  const [item1SearchVals, setItem1SearchVals] = useState([])
  const [item2SearchVals, setItem2SearchVals] = useState([])
  const [item1SearchShow, setItem1SearchShow] = useState(false)
  const [item2SearchShow, setItem2SearchShow] = useState(false)
  return(
    <Card>
      <ListGroup>
        <ListGroup.Item>
        <Container>
            <Row>
              <Col md={4}>
                <DropdownButton
                  variant="outline-secondary"
                  title={"Input Type | "+searchMap[item1.search_type]}
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item onClick={() => {updateItem1Input('SEQUENCE')}}>Sequence</Dropdown.Item>
                  <Dropdown.Item onClick={() => {updateItem1Input('PDBCHAIN')}}>PDB ID</Dropdown.Item>
                  <Dropdown.Item onClick={() => {updateItem1Input('SEARCH')}}>Search</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  variant="outline-secondary"
                  title={"Molecule Type | "+inputMap[item1.input_type]}
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item onClick={() => {updateItem1Molecule('PROTEIN')}}>Protein</Dropdown.Item>
                  <Dropdown.Item onClick={() => {updateItem1Molecule('NUCLEIC')}}>Nucleic Acid</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col>
                <Form>
                  <Form.Group controlId="formPredictionInput">
                    <Form.Check type='checkbox' id={`form-checkbox-${id}-1`}>
                      <Form.Check.Input type='checkbox' checked={prediction.item1.checked} onClick={(e) => {updatePrediction(
                        Object.assign({}, prediction, {
                          item1: Object.assign({}, prediction.item1, {
                            checked: !prediction.item1.checked
                          })
                        })
                      )}} />
                      <Form.Check.Label>Calculate for Invidual Residues</Form.Check.Label>
                    </Form.Check>
                    {
                      item1.search_type === 'PDBCHAIN' ?
                      <Dropdown show={item1SearchShow}>
                        <Dropdown.Toggle as={PDBSearchBar} sequence={item1.sequence} text={item1.text} moltype={item1.input_type} editItemText={editItem1Text} editItemVals={(vals) => {setItem1SearchVals(vals); setItem1SearchShow(true)}} />
                        <Dropdown.Menu rootCloseEvent=''>
                          {item1SearchVals.map((result, index) => 
                            <Dropdown.Item eventKey={index} onClick={() => {
                              setItem1SearchShow(false)
                              fetch(`https://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=fastachain&compression=NO&structureId=${result.pdb}&chainId=${result.chain}`).then(res => res.text()).then(data => {
                                editItem1Sequence(data.split(/\n/).slice(1).join(''))
                              })
                            }}>Chain: {result.chain} | {result.name}</Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown> :
                      item1.search_type === 'SEARCH' ?
                      <Dropdown show={item1SearchShow}>
                        <Dropdown.Toggle as={SearchBar} sequence={item1.sequence} text={item1.text} moltype={item1.input_type} editItemText={editItem1Text} editItemVals={(vals) => {setItem1SearchVals(vals); setItem1SearchShow(true)}} />
                        <Dropdown.Menu rootCloseEvent=''>
                          {item1SearchVals.map((result, index) => 
                            <Dropdown.Item eventKey={index} onClick={() => {
                              setItem1SearchShow(false)
                              fetch(`https://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=fastachain&compression=NO&structureId=${result.pdb}&chainId=${result.chain}`).then(res => res.text()).then(data => {
                                editItem1Sequence(data.split(/\n/).slice(1).join(''))
                              })
                            }}>Chain: {result.chain} | {result.name}</Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown> :
                      <InputGroup>
                        <Form.Control onChange={(e) => {editItem1Text(e.target.value)}} as="input" style={{fontFamily: "'Source Code Pro', monospace"}} value={item1.text} />
                        <InputGroup.Append>
                          <InputGroup.Text>
                          {
                            item1.sequence !== '' ?
                            <FaCheck color='green' /> :
                            <FaTimes color='red' />
                          }
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    }
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
        <ListGroup.Item>
          <Container>
            <Row>
              <Col md={4}>
              <DropdownButton
                  variant="outline-secondary"
                  title={"Input Type | "+(item2.input_type === 'LIGAND' && item2.search_type == 'PDBCHAIN' ? 'PDB Chemical ID' : searchMap[item2.search_type])}
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item onClick={() => {updateItem2Input('SEQUENCE')}}>Sequence</Dropdown.Item>
                  {item2.input_type !== 'LIGAND' ? 
                    [
                      <Dropdown.Item onClick={() => {updateItem2Input('PDBCHAIN')}}>PDB ID</Dropdown.Item>,
                      <Dropdown.Item onClick={() => {updateItem2Input('SEARCH')}}>Search</Dropdown.Item>
                    ]
                  : null}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => {updateItem2Input('ALL')}}>All</Dropdown.Item>
                </DropdownButton>
                <DropdownButton
                  variant="outline-secondary"
                  title={"Molecule Type | "+inputMap[item2.input_type]}
                  id="input-group-dropdown-1"
                >
                  <Dropdown.Item onClick={() => {updateItem2Molecule('PROTEIN')}}>Protein</Dropdown.Item>
                  <Dropdown.Item onClick={() => {updateItem2Molecule('NUCLEIC')}}>Nucleic Acid</Dropdown.Item>
                  <Dropdown.Item onClick={() => {updateItem2Molecule('LIGAND')}}>Ligand</Dropdown.Item>
                </DropdownButton>
              </Col>
              <Col>
                <Form>
                  <Form.Group controlId="formPredictionInput">
                    <Form.Check type='checkbox' id={`form-checkbox-${id}-2`}>
                    <Form.Check.Input type='checkbox' checked={prediction.item2.checked && (prediction.item1.checked || !item2.search_type==='ALL')} onClick={(e) => {updatePrediction(
                        Object.assign({}, prediction, {
                          item2: Object.assign({}, prediction.item2, {
                            checked: !prediction.item2.checked
                          })
                        })
                      )}} disabled={item2.search_type==='ALL' || !prediction.item1.checked} />
                      <Form.Check.Label>Calculate for Invidual Residues</Form.Check.Label>
                    </Form.Check>
                    {
                      item2.search_type === 'PDBCHAIN' ?
                      <Dropdown show={item2SearchShow}>
                        <Dropdown.Toggle as={PDBSearchBar} sequence={item2.sequence} text={item2.text} moltype={item2.input_type} editItemText={editItem2Text} editItemVals={(vals) => {console.log(vals); setItem2SearchVals(vals); setItem2SearchShow(true)}} />
                        <Dropdown.Menu rootCloseEvent=''>
                          {item2SearchVals.map((result, index) => 
                            <Dropdown.Item eventKey={index} onClick={() => {
                              setItem2SearchShow(false)
                              fetch(`https://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=fastachain&compression=NO&structureId=${result.pdb}&chainId=${result.chain}`).then(res => res.text()).then(data => {
                                editItem2Sequence(data.split(/\n/).slice(1).join(''))
                              })
                            }}>Chain: {result.chain} | {result.name}</Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown> :
                      item2.search_type === 'SEARCH' ?
                      <Dropdown show={item2SearchShow}>
                        <Dropdown.Toggle as={SearchBar} sequence={item2.sequence} text={item2.text} moltype={item2.input_type} editItemText={editItem2Text} editItemVals={(vals) => {console.log(vals); setItem2SearchVals(vals); setItem2SearchShow(true)}} />
                        <Dropdown.Menu rootCloseEvent=''>
                          {item2SearchVals.map((result, index) => 
                            <Dropdown.Item eventKey={index} onClick={() => {
                              setItem2SearchShow(false)
                              fetch(`https://www.rcsb.org/pdb/download/downloadFile.do?fileFormat=fastachain&compression=NO&structureId=${result.pdb}&chainId=${result.chain}`).then(res => res.text()).then(data => {
                                editItem2Sequence(data.split(/\n/).slice(1).join(''))
                              })
                            }}>Chain: {result.chain} | {result.name}</Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown> :
                      <InputGroup>
                        <Form.Control onChange={(e) => {editItem2Text(e.target.value)}} as="input" style={{fontFamily: "'Source Code Pro', monospace"}} value={item2.text} disabled={item2.search_type==='ALL'} />
                        <InputGroup.Append>
                          <InputGroup.Text>
                          {
                            item2.sequence !== '' || item2.search_type==='ALL' ?
                            <FaCheck color='green' /> :
                            <FaTimes color='red' />
                          }
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    }
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </ListGroup.Item>
        <ListGroup.Item>
          <Container>
            {
              status === 'ready' ?
              <Row>
                <Col md={6}>
                  <Button size="lg" onClick={() => {predict()}} disabled={!(item1.sequence.length > 0 && (item2.sequence.length > 0 || item2.search_type === 'ALL'))} block>Predict</Button>
                </Col>
                <Col md={6}>
                  <Button onClick={remove} size="lg" variant="danger" block>Remove</Button>
                </Col>
              </Row> :
              <Row>
                <Col md={{span: 4, offset: 4}}><h1>{status ? status.toUpperCase() : null}</h1></Col>
              </Row>
            }
          </Container>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

const InputItems = ({ firebase, items, editInput, editMolecule, editPrediction, editText, editSequence, addItem, removeItem, predictOne, predictAll }) => {
  return(
    <Jumbotron>
      {items.map((item, index) => (
        <PredictionItem
          key={index} 
          id={index}
          item1={item.item1}
          item2={item.item2}
          status={item.state}
          prediction={item.prediction}
          updateItem1Input={(typ) => {editInput(index, 0, typ)}}
          updateItem1Molecule={(typ) => {editMolecule(index, 0, typ)}}
          editItem1Text={(text) => {editText(index,0,text)}}
          editItem1Sequence={(text) => {editSequence(index,0,text)}}
          updateItem2Input={(typ) => {editInput(index, 1, typ)}}
          updateItem2Molecule={(typ) => {editMolecule(index, 1, typ)}}
          editItem2Text={(text) => {editText(index,1,text)}}
          editItem2Sequence={(text) => {editSequence(index,1,text)}}
          updatePrediction={(pred) => {editPrediction(index, pred)}}
          predict={() => predictOne(firebase.auth.currentUser, index, item)}
          remove={() => removeItem(index)}
        />
      ))}
      <Container style={{padding: "20px 0 0 0"}}>
        <Row>
          <Col md={6}>
            <Button size="lg" onClick={() => {
              predictAll(firebase.auth.currentUser, items)
            }} disabled={
              !items.every((item) => (item.item1.sequence.length > 0 && (item.item2.sequence.length > 0 || item.item2.search_type === 'ALL')))
            } block>Predict All</Button>
          </Col>
          <Col md={6}>
            <Button size="lg" onClick={() => addItem()} variant="success" block>Add Prediction Input</Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

const InputsFirebase = ({ items, editInput, editMolecule, editPrediction, editText, editSequence, addItem, removeItem, predictOne, predictAll }) => {
  return(
    withFirebase(InputItems)({ items, editInput, editMolecule, editPrediction, editText, editSequence, addItem, removeItem, predictOne, predictAll })
  )
}

export default InputsFirebase
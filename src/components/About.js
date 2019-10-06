import React from 'react'
import { Jumbotron, Container, Row, Col, Figure } from 'react-bootstrap'

const About = () => {
  return(
    <Jumbotron>
      <Container>
        <Row>
          <Col>
            <h2>
              What is BioPred?
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              BioPred is a WIP website with the goal being to host a series of predictive data science models surrounding biomolecules
              and interactions between biomolecules, such as proteins, nucleic acids like DNA and RNA, and small drug-like molecules.
              These structures and interactions are gathered from analyzing structure files from the <a href="https://www.rcsb.org/">RCSB
              Protein Data Bank</a>, with interactions between two molecules being defined defined as having at least one intermolecular
              atomic distance of 5.0 &#8491; or less.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>
              RNA-Protein Interaction Model
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              The current BioPred model focuses on the protein side of RNA-protein interactions, and takes in the sequence of a protein in single letter sequence
              or FASTA format. It uses a simple 1 hidden layer Autoencoder fitted by Keras to generate a 200 float vector for the entire sequence, and combines the
              encoded vector with a one-hot encoded subsequence up to 7 amino acids up and down the protein chain away from the target amino acid. This is fed into
              a Scikit-Learn Random Forest Classifier with 16 trees, which then outputs a probability of interaction from 0.0 to 1.0 for each amino acid in the
              sequence.
            </p>
          </Col>
          <Col md={6}>
            <Figure>
              <Figure.Image
                width="100%"
                src="/modelcharts/violinplot.png"
              />
              <Figure.Caption>
                Violin plot of testing data for RNA-Protein Interaction model. Blue represents true negative values, orange represents true positive values. Ideal state
                is for all true negative values are at 0.0 and all true positive values are at 1.0. (Accuracy: 0.930)
              </Figure.Caption>
            </Figure>
          </Col>
          <Col md={6}>
            <Figure>
              <Figure.Image
                width="100%"
                src="/modelcharts/roc_curve.png"
              />
              <Figure.Caption>
                ROC (Receiver Operating Characteristic) Curve of testing data for RNA-Protein Interaction model. Ideal state for this curve is for the corner to be in
                the top right corner. (auROC: 0.962)
              </Figure.Caption>
            </Figure>
          </Col>
          <Col md={6}>
            <Figure>
              <Figure.Image
                width="100%"
                src="/modelcharts/prc_curve.png"
              />
              <Figure.Caption>
                PRC (Precision Recall Characteristic) Curve of testing data for RNA-Protein Interaction model. Ideal state for this curve is for the corner to be in
                the top right corner. (auPRC: 0.928)
              </Figure.Caption>
            </Figure>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>
              Michael Beck
            </h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <img src='/MichaelBeck.png' width="100%" />
          </Col>
          <Col md={8}>
            <p>
              Michael Beck is a graduate of the Lambda School Bootcamp for Data Science and has interests in molecular simulation, GPU computing, and cloud computing.
              He has experience with various programming languages, database systems, and cloud operations on both AWS and Google Cloud. <a href="michaelpbeck.com">michaelpbeck.com</a>
            </p>
            <p>For any questions or to increase the computation limit, please contact <a href="mailto:support@biopred.app">support@biopred.app</a>.</p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default About
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';


const App = () => (
  <Container fluid>
    <h1>Welcome to LateApp!</h1>
    <Row>
      <Col md={3}>
        <h4>Mes cours :</h4>
        <ListGroup>
          <ListGroup.Item>Innov 2019 - Semestre 1</ListGroup.Item>
          <ListGroup.Item>Innov 2019 - Semestre 2</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={9}>Fenêtre principale</Col>
    </Row>
  </Container>
);

export default App;

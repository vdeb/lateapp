import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import Student from './Student.jsx';


export default class App extends Component {

  getStudents() {
    return [
      {_id: 1, name: "Jose Bove"},
      {_id: 2, name: "Arthur Mori"},
      {_id: 3, name: "Ella Bubulle"}
    ]
  }

  renderStudents() {
    return this.getStudents().map( (student) => (
      <Student key={student._id} student={student} />
    ));
  }

  render() {
    return (
      <Container fluid>
      <h1>Welcome to LateApp!</h1>
      <Row>
        <Col md={2}>
          <h4>Mes cours :</h4>
          <ListGroup>
            <ListGroup.Item>Innov 2019 - Semestre 1</ListGroup.Item>
            <ListGroup.Item>Innov 2019 - Semestre 2</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={10}>
          Fenêtre principale
          <ul>{this.renderStudents()}</ul>
        </Col>
      </Row>
    </Container>
    );
  }
}

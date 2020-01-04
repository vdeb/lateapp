import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import CardDeck from 'react-bootstrap/CardDeck';

import { Students } from '../api/students.js';

import SimpleStudent from './components/SimpleStudent.jsx';


class App extends Component {

  renderStudents() {
    return this.props.students.map( (student) => (
      <SimpleStudent key={student._id} student={student} />
    ));
  }

  render() {
    return (
      <Container fluid>
      <h1>Welcome to LateApp!</h1>
        <Col xs={12} md={12}>
          <Row>
          {this.renderStudents()}
          {this.renderStudents()}
          {this.renderStudents()}
          {this.renderStudents()}
          </Row>
        </Col>
    </Container>
    );
  }
}

export default withTracker(() => {
  return {
    students: Students.find({}, { sort: { name: 1 } }).fetch(),
  };
})(App);

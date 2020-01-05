import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'

import { Students } from '../api/students/students.js';

import SimpleStudent from './components/SimpleStudent.jsx';


class App extends Component {

  constructor() {
    super();
    this.state = {
      FormVisible: false
    }

    this.displayForm = this.displayForm.bind(this);
  }

  renderStudents() {
    return this.props.students.map( (student) => (
      <SimpleStudent key={student._id} student={student} />
    ));
  }

  displayForm() {
    this.setState({
      FormVisible: !this.state.FormVisible
    })
  }

  renderForm() {
    return (
      <p>Hellooo</p>
    )
  }

  render() {
    return (
      <Container fluid>
      <h1>Welcome to LateApp!</h1>
      <h2>
        Cours Innovation 2020
        <Button
          onClick={this.displayForm}
          style= {{display: this.state.FormVisible && 'none'}}
        >Commencer une nouvelle session</Button>
      </h2>
      {this.state.FormVisible?this.renderForm():<div></div>}
        <Col xs={12} md={12}>
          <Row>
          {this.props.students.length > 0 && this.renderStudents()}
          </Row>
        </Col>
    </Container>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('students');

  return {
    students: Students.find({}, { sort: { name: 1 } }).fetch(),
  };
})(App);

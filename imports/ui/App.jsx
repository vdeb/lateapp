import React, { Component, useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Students } from '../api/students/students.js';

import SimpleStudent from './components/SimpleStudent.jsx';


class App extends Component {

  constructor() {
    super();
    this.state = {
      FormVisible: false,
      FormValidated: false
    }

    this.displayForm = this.displayForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.setState({FormValidated: true});
    
  }

  renderForm() {

    return (
      <Form noValidate validated={this.state.FormValidated} onSubmit={this.handleFormSubmit} className="border p-2">
        <h5>Création d'une nouvelle session</h5>
        <Form.Group as={Row} controlId="LabelText">
          <Form.Label column sm={6} md={4} lg={2}>Nom de la session (Optionel)</Form.Label>
          <Col sm={6} md={4} lg={3} >
            <Form.Control placeholder="Ex: Cours avec Kynapse"></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="DateGroup">
          <Form.Label column sm={6} md={4} lg={2}>Date</Form.Label>
          <Col sm={6} md={4} lg={3} >
            <Form.Control required type="datetime-local" placeholder="2019-01-01T10:30"></Form.Control>
            <Form.Control.Feedback type="invalid">
              Merci de remplir une date et une heure
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Button type="submit">Démarrer le cours</Button>
      </Form>
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

import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import SimpleStudent from '../components/SimpleStudent.jsx';

export default class CoursePage extends Component {

    constructor() {
        super();
        this.state = {
          FormVisible: false,
          FormValidated: false
        }
    
        this.displayForm = this.displayForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
      }

    displayForm() {
    this.setState({
        FormVisible: !this.state.FormVisible
    });
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

    renderStudents() {
        return this.props.students.map( (student) => (
          <SimpleStudent key={student._id} student={student} />
        ));
      }
    
    render() {
        return (
            <div>
                <h2>
                    Cours Innovation 2020
                    <Button
                    onClick={this.displayForm}
                    style= {{display: this.state.FormVisible && 'none'}}
                    >Commencer une nouvelle session</Button>
                </h2>
                {this.state.FormVisible?this.renderForm():<div></div>}
                <Row>
                {this.props.students.length > 0 && this.renderStudents()}
                </Row>
            </div>
        )
    }
}
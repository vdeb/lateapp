import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import SimpleStudent from '../components/SimpleStudent.jsx';

Date.prototype.toDatetimeLocal =
  function toDatetimeLocal() {
    var
      date = this,
      ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
  };

Date.prototype.fromDatetimeLocal = (function (BST) {
  // BST should not be present as UTC time
  return new Date(BST).toISOString().slice(0, 16) === BST ?
    // if it is, it needs to be removed
    function () {
      return new Date(
        this.getTime() +
        (this.getTimezoneOffset() * 60000)
      ).toISOString();
    } :
    // otherwise can just be equivalent of toISOString
    Date.prototype.toISOString;
}('2006-06-06T06:06'));


export default class CoursePage extends Component {

    constructor() {
        super();
        this.state = {
          FormVisible: false,
          FormValidated: false,
          sessionDate: new Date().toDatetimeLocal().slice(0, 16),
          name: ''
        }
    
        this.displayForm = this.displayForm.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSessionDateChange = this.handleSessionDateChange.bind(this);
      }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleSessionDateChange(event) {
        this.setState({
            sessionDate: event.target.value
        })
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
    else {
        const sessionDate = new Date(new Date(this.state.sessionDate).fromDatetimeLocal());
        Meteor.call(
          'sessions.insert',
          {
            name: this.state.name,
            sessionDate: sessionDate,
            classId: this.props.class
          });
        this.props.history.replace('/session/active');
    }
    this.setState({
      FormVisible: false,
      FormValidated: false,
    })
    }

    renderForm() {
        return (
          <Form noValidate validated={this.state.FormValidated} onSubmit={this.handleFormSubmit} className="border p-2">
            <h5>Création d'une nouvelle session</h5>
            <Form.Group as={Row} controlId="LabelText">
              <Form.Label column sm={6} md={4} lg={2}>Nom de la session (Optionel)</Form.Label>
              <Col sm={6} md={4} lg={3} >
                <Form.Control
                    placeholder="Ex: Cours avec Kynapse"
                    value={this.state.name}
                    onChange={this.handleNameChange}>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="DateGroup">
              <Form.Label column sm={6} md={4} lg={2}>Date</Form.Label>
              <Col sm={6} md={4} lg={3} >
                <Form.Control
                    required
                    type="datetime-local"
                    placeholder="2019-01-01T10:30"
                    value={this.state.sessionDate}
                    onChange={this.handleSessionDateChange}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Merci de remplir une date et une heure
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
    
            <Button type="submit">Démarrer le cours</Button>
            <Button variant="outline-danger" className="ml-2" onClick={this.displayForm}>Annuler</Button>
          </Form>
        )
      }

    renderSessionslist() {
      return this.props.sessions.map( (session) => (
      <li>
        <Link to={'/session/' + session._id}>
          {session.name} ({session.sessionDate.toDatetimeLocal()})
        </Link>
      </li>
      ));
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
                    {this.props.classes.map((classe) => (classe.name))}
                </h2>
                <h4>Sessions</h4>
                <Button
                  onClick={this.displayForm}
                  style= {{display: this.state.FormVisible && 'none'}}
                  >Commencer une nouvelle session
                </Button>
                {this.state.FormVisible?this.renderForm():<div></div>}
                <p>Sessions passées :</p>
                <ul>{this.renderSessionslist()}</ul>
                <h4>Etudiants :</h4>
                <Row>
                {this.props.students.length > 0 && this.renderStudents()}
                </Row>
            </div>
        )
    }
}

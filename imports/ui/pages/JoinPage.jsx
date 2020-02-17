import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { Accounts } from 'meteor/accounts-base';

import './AuthPage.css';

export default class JoinPage extends Component  {

  constructor() {
    super();
    this.state = {
      errors: {},
      confirm: "",
      password: "",
      email: "",
      FormValidated: false,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
 
  onChange(event, field) {
    if (field === "email") {
      this.setState({email: event.target.value});
    }
    else if (field === "password") {
      this.setState({password: event.target.value});
    }
    else if (field === "confirm") {
      this.setState({confirm: event.target.value});
    }

    this.setState({errors: {}})
  };

  onSubmit(event) {
    event.preventDefault();
        event.stopPropagation();
    const newErrors = {};
    if (!this.state.email) {
        newErrors.email = "Merci d'indiquer votre email";
    }
    if (!this.state.password) {
      newErrors.password = "Mot de passe obligatoire";
    }
    if (this.state.confirm !== this.state.password) {
      newErrors.confirmPassword = 'Les deux mots de passe ne correspondent pas';
    }

    const form = event.target;
    if ((form.checkValidity() === false) | Object.keys(newErrors).length) {
        this.setState({errors: newErrors});
    }

    else {
      const email = this.state.email;
      const password = this.state.password;

      Accounts.createUser({
        email,
        password,
      }, (err) => {
        if (err) {
          this.setState({errors: { none: err.reason }});
        } else {
          this.props.history.replace('/');
        }
      });
      
    }

    this.setState({
      FormValidated: false,
    })
  };

  render() {
    return (
        <div className="form-container text-center">
          
          <Form noValidate validated={this.state.FormValidated} className="form-signin" onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">
            S'enregistrer
          </h1>
            <Form.Group controlId="EmailGroup">
              <Form.Label className="sr-only">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(event) => this.onChange(event, "email")}
                required>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="PasswordGroup"> 
              <Form.Label className="sr-only">Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={this.state.password}
                onChange={(event) => this.onChange(event, "password")}
                required>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="ConfirmGroup">
              <Form.Label className="sr-only">Confirmer le mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmer le mot de passe"
                required
                ref={this.state.confirm}
                onChange={(event) => this.onChange(event, "confirm")}>
              </Form.Control>
            </Form.Group>
            <ListGroup>
              {Object.values(this.state.errors).map((msg) => (
                <ListGroup.Item variant="danger" key={msg}>{msg}</ListGroup.Item>
            ))}
            </ListGroup>
           <Button type="submit" className="btn-lg btn-primary btn-block mt-3">Valider</Button>
           <Link to="/signin" className="link-auth-alt">
            J'ai déjà un compte
            </Link>
          </Form>
          
        </div>
    );
  }
  
};


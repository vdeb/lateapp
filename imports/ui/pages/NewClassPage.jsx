import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class NewClassPage extends Component {

    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(event) {
        event.preventDefault();
        alert('coucou');
    }

    render() {
        return (
            <div>
                <h2>
                    Nouvelle classe
                </h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Liste des étudiants (fichier .xls) :
                        </Form.Label>
                        <Form.Control
                            placeholder = "Liste des étudients (xls)"
                            as='input'
                            type='file'
                        />
                    </Form.Group>
                    <Button type="submit">Ajouter la classe</Button>
                </Form>
            </div>
        )
    }
}

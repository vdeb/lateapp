import React, { Component } from 'react';
import XLSX  from 'xlsx';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default class NewClassPage extends Component {

    constructor() {
        super();
        this.state = {
            inputValue: '',
            FormValidated: false
        }
        this.curriculum = React.createRef()
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(envent) {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if(form.checkValidity()){
            let f = this.curriculum.current.files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                var data = e.target.result;

                var workbook = XLSX.read(data, {type: 'binary'});
                var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                var data = XLSX.utils.sheet_to_json(first_worksheet, {header:1});
                data.shift();
                var sentData = [];
                data.forEach(function(student){
                    sentData.push({
                        "name": student[2],
                        "surname": student[3],
                        "nationality": student[4],
                        "sex": student[1],
                        "schoolId": student[0]
                    })
                });

                Meteor.call(
                    'classes.insert',
                    {
                        name: this.state.inputValue,
                        createdAt: new Date(),
                        students: sentData
                    }
                )
            };
            reader.readAsBinaryString(f);
            this.setState({FormValidated: false});
            this.props.history.replace('/');
        }
        else {
            this.setState({FormValidated: true});
        }
    }

    render() {
        return (
            <div>
                <h2>
                    Nouvelle classe
                </h2>
                <Form noValidate validated={this.state.FormValidated} onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={6} md={4} lg={2}>
                            Nom de la classe :
                        </Form.Label>
                        <Col sm={6} md={5} lg={3}>
                            <Form.Control
                                required
                                placeholder = "Ex: Cours d'innovation"
                                as='input'
                                type='text'
                                value={this.state.value}
                                onChange = {this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Merci de remplir un nom pour cette classe   
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={6} md={4} lg={2}>
                            Liste des étudiants (fichier .xls) :
                        </Form.Label>
                        <Col sm={6} md={5} lg={4}>
                            <Form.Control
                                required
                                placeholder = "Liste des étudients (xls)"
                                as='input'
                                type='file'
                                ref={this.curriculum}
                            />
                            <Form.Control.Feedback type="invalid">
                                Sans fichier, pas de classe...
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button type="submit">Ajouter la classe</Button>
                </Form>
            </div>
        )
    }
}

import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default class SimpleStudent extends Component {

    getFooter() {
        return (
            <Card.Footer>
                <button className="btn btn-primary btn-sm float-left"
                    id="left"> 
                    Arrivé !
                </button> 
                <button className="btn btn-outline-danger btn-sm float-right"
                        id="right">
                    Absent
                </button>
            </Card.Footer>
        )
    }

    render() {
        return (
            <Col xs={6} md={2}>
                <Card className="text-center my-2"> 
                    <Card.Img variant="top" src="student_male.png"/>
                    <Card.Body>
                        <Card.Title>{this.props.student.name} {this.props.student.surname}</Card.Title>
                    </Card.Body>
                    {this.getFooter()}
                </Card>
            </Col>
        )
    }
}
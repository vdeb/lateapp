import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default class SimpleStudent extends Component {

    getFooter() {
        return (
            <Card.Footer>
                Nationalité : {this.props.student.nationality}
            </Card.Footer>
        )
    }

    render() {
        let img
        if (!this.props.student.dataURL) {
            img = this.props.student.sex == 'M'?"/student_male.png":"/student_female.png";
        }
        else {
            img = this.props.student.dataURL;
        }
        return (
            <Col xs={6} sm={4} md={4} lg={3} xl={2}>
                <Card className="text-center my-2"> 
                    <Card.Img variant="top" src={img}/>
                    <Card.Body>
                        <Card.Title>{this.props.student.name} {this.props.student.surname}</Card.Title>
                    </Card.Body>
                    {this.getFooter()}
                </Card>
            </Col>
        )
    }
}
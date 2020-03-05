import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default class SimpleStudent extends Component {

    getFooter() {
        if (this.props.status == "awaited"){
            return (
                <ButtonGroup>
                    <Button
                        onClick={this.props.handleLate}> 
                        Arrivé !
                    </Button> 
                    <Button
                            variant="outline-danger" onClick={this.props.handleAbsence}>
                        Absent
                    </Button>
                </ButtonGroup>
            )}
        else {
            return (
                <Button variant="info">
                    Modifier
                </Button>
            )
        }
    }

    render() {
        let color = "white";
        if (this.props.status == "absent"){
            color = 'grey';
        }
        let img
        if (!this.props.student.dataURL) {
            img = this.props.student.sex == 'M'?"/student_male.png":"/student_female.png";
        }
        else {
            img = this.props.student.dataURL;
        }
        return (
            <Col xs={6} sm={4} md={4} lg={3} xl={2}>
                <Card className="text-center my-2" style={{backgroundColor: color}}> 
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
import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default class SimpleStudent extends Component {

    getFooter() {
        if (this.props.status == "awaited"){
            return (
                <Card.Footer>
                    <button className="btn btn-primary btn-sm float-left"
                        id="left" onClick={this.props.handleLate}> 
                        Arrivé !
                    </button> 
                    <button className="btn btn-outline-danger btn-sm float-right"
                            id="right" onClick={this.props.handleAbsence}>
                        Absent
                    </button>
                </Card.Footer>
            )}
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
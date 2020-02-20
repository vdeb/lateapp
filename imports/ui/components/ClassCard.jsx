import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default class ClassCard extends Component {

    render() {
        return (
            <Col xs={12} md={6} lg={4}>
                <a href="/class">
                <Card className="text-center my-2"> 
                    <Card.Body>
                        <Card.Title>Innov 2020{/*this.props.class.name*/}</Card.Title>
                    </Card.Body>
                </Card>
                </a>
            </Col>
        )
    }
}
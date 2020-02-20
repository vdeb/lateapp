import React, { Component } from 'react';

import Row from 'react-bootstrap/Row';

import ClassCard from '../components/ClassCard';

export default class ClassesPage extends Component {

    constructor() {
        super();
      }

    render() {
        return (
            <div>
                <h2>
                    My classes
                </h2>
                <Row>
                    <ClassCard />
                    <ClassCard />
                    <ClassCard />
                </Row>
            </div>
        )
    }
}

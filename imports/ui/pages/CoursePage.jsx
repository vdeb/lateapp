import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

import SimpleStudent from '../components/SimpleStudent.jsx';


export default class CoursePage extends Component {

  renderStudents() {
    return this.props.students.map( (student) => (
      <SimpleStudent key={student._id} student={student} />
    ));
  }

  render() {
    return (
      <div>
        <h2> Cours d'innovation 2020 </h2>
        <Row>
        {this.props.students && this.renderStudents()}
        </Row>
      </div>
    );
  }
}

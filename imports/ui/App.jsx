import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { Students } from '../api/students/students.js';

import CoursePage from './pages/CoursePage.jsx';


class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <Container fluid>
      <h1>Welcome to LateApp!</h1>

      <CoursePage students={this.props.students}/>

    </Container>
    </BrowserRouter>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('students');

  return {
    students: Students.find({}, { sort: { name: 1 } }).fetch(),
  };
})(App);

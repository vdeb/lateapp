import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CoursePage from './pages/CoursePage.jsx';
import JoinPage from './pages/AuthPageJoin.jsx';

import { Students } from '../api/students/students.js';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Container fluid>
        <Switch>
          <Route
            path="/join"
            component={JoinPage}
          />
          <Route
            path="/*">
             <CoursePage students={this.props.students} />
          </Route>
        </Switch>      
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

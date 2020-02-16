import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserMenu from './components/UserMenu.jsx';

import CoursePage from './pages/CoursePage.jsx';
import JoinPage from './pages/JoinPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

import { Students } from '../api/students/students.js';

class App extends Component {

  constructor() {
    super();
  }

  

  render() {
    return (
      <div className="wrapper">
        <BrowserRouter>
        <Nav id="sidebar">

          <div className="sidebar-header">
              <h3>LateApp</h3>
          </div>
          <UserMenu user={this.props.user} logout={this.logout}/>
          <ul className="list-unstyled components">
            <p>Content</p>
            <li className="active">
              <a href="/classes">My classes</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li> 
            <li>
                <a href="/contact">Contact</a>
            </li>
        </ul>
        </Nav>
        
          <Container fluid>
          <Switch>
            <Route
              path="/join"
              component={JoinPage}
            />
            <Route
              path="/signin"
              component={SignInPage}
            />
            <Route exact
              path="/">
              <CoursePage students={this.props.students} />
            </Route>
            <Route
              path="/">
              <NotFoundPage />
            </Route>
          </Switch>
          </Container>
        </BrowserRouter>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('students');

  return {
    user : Meteor.user(),
    students: Students.find({}, { sort: { name: 1 } }).fetch(),
  };
})(App);

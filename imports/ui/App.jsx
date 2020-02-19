import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import UserMenu from './components/UserMenu.jsx';

import SingleClassPage from './pages/SingleClassPage.jsx';
import JoinPage from './pages/JoinPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ClassesPage from './pages/ClassesPage.jsx';

import { Students } from '../api/students/students.js';
import CoursePage from './pages/SingleClassPage.jsx';

class App extends Component {

  constructor() {
    super();
  }

  

  render() {
    return (
      <div className="wrapper">
        <BrowserRouter>
        <Nav id="sidebar">

          <a href='/'>
            <div className="sidebar-header">
                <h3>LateApp</h3>
            </div>
          </a>
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
            <Route
              path="/classes"
              component={ClassesPage}
            />
            <Route 
              path="/class">
              <SingleClassPage students={this.props.students} />
            </Route>
            <Route 
              exact path='/'>
              <Redirect
                to={{
                  pathname: "/classes"
                }}
              />
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

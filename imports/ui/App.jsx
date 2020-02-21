import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';



import SingleClassPage from './pages/SingleClassPage.jsx';
import JoinPage from './pages/JoinPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ClassesPage from './pages/ClassesPage.jsx';

import NavMenu from './components/NavMenu';

export default class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <NavMenu />
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

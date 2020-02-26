import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import JoinPage from './pages/JoinPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SingleClassPage from './pages/SingleClassPage';
import ClassContainer from './containers/ClassContainer';

import NavMenu from './components/NavMenu';

export default class App extends Component {

  render() {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <NavMenu classes={this.props.classes} user={this.props.user}/>
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
              path="/class/:id"
              component={ClassContainer(SingleClassPage)} />
            <Route 
              exact path='/'>
              <Redirect
                to={{
                  pathname: "/signin"
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

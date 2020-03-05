import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import JoinPage from './pages/JoinPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SingleClassPage from './pages/SingleClassPage';
import ActiveSessionPage from './pages/ActiveSessionPage.jsx';
import ClassContainer from './containers/ClassContainer';
import ActiveSessionContainer from './containers/ActiveSessionContainer.jsx';
import SessionContainer from './containers/SessionContainer.jsx';

import NewClassPage from './pages/NewClassPage.jsx';
import SessionPage from './pages/SessionPage.jsx';


import NavMenu from './components/NavMenu';



export default class App extends Component {

  render() {
    if(this.props.loading) {
      return "Loading"
    }
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
              exact path="/session/active"
              component={ActiveSessionContainer(ActiveSessionPage)} />
            <Route
              exact path="/session/:id"
              component={SessionContainer(SessionPage)} />
            <Route
              path="/newclass"
              component={NewClassPage} />
            <Route 
              exact path='/'>
              <Redirect
                to={!this.props.user ? {
                  pathname: "/signin"
                }: this.props.classes.length > 0 ?{
                  pathname: "/class/" + this.props.classes[0]._id
                } :{
                  pathname: "/newclass"
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

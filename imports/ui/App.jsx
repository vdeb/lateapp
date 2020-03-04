import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import JoinPage from './pages/JoinPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import SingleClassPage from './pages/SingleClassPage';
import SessionPage from './pages/SessionPage.jsx';
import ClassContainer from './containers/ClassContainer';
import SessionContainer from './containers/SessionContainer.jsx';

import NavMenu from './components/NavMenu';
import NewClassPage from './pages/NewClassPage.jsx';



export default class App extends Component {

  render() {
    console.log(this.props);
    console.log(this.props.user?"User": "no user");
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
              path="/session"
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

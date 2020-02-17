import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class UserMenu extends Component {

    constructor(){
        super();
        this.state = {
            open: false
        };

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle(event) {
        event.preventDefault();
        this.setState({open : !this.state.open});
      }
    
    logout() {
    Meteor.logout();
    this.props.history.replace('/');
    }

    renderLoggedIn(){

        const email = this.props.user.emails[0].address;
        const emailLocalPart = email.substring(0, email.indexOf('@'));

        return (
            <div className="user-menu vertical">
        <a href="#toggle" className="btn-secondary" onClick={this.toggle}>
            {this.state.open
            ? <span className="icon-arrow-up" />
            : <span className="icon-arrow-down" />}
            {emailLocalPart}
        </a>
        {this.state.open
            ? (
            <a className="btn-secondary" onClick={this.logout}>
                Log out
            </a>
            ) : null}
        </div>
            )
    }

    renderLoggedOut() {
        return (
            <div className="user-menu">
                <Link to="/signin" className="btn-secondary">
                    Se connecter
                </Link>
                <Link to="/join" className="btn-secondary">
                    S'enregistrer
                </Link>
            </div>
        )
    }



    render() {
        
        return this.props.user
            ? this.renderLoggedIn()
            : this.renderLoggedOut();
    }
}

export default withRouter(UserMenu);

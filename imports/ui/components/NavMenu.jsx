import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

import UserMenu from './UserMenu.jsx';

export default class NavMenu extends Component {

    render() {
        return (
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
        )
    }
}
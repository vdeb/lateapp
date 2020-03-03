import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';

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
                <UserMenu user={this.props.user}/>
                {this.props.user ?
                <ul className="list-unstyled components">
                    <p>Mes classes</p>
                    {this.props.classes.map((classelt) => (
                            <NavLink 
                                to={"/class/" + classelt._id}
                                activeClassName="active">
                                <li key={classelt._id}>
                                    {classelt.name}
                                </li>
                            </NavLink>
                    ))}
                    <NavLink 
                        to='/newclass'
                        activeClassName="active">
                        <li key="new_class">
                            + Nouvelle classe
                        </li>
                    </NavLink>
                </ul>:null}
            </Nav>
        )
    }
}
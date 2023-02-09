import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.component.css';
import './styles.css';


export default class navbar extends Component {

    render() {
        return (
            <header>
                <div className="navbar">
                    <div className="navbar-container">

                        <div className="logo-container">
                            <Link to="/" className="text-16px">GARLICWAK</Link>
                        </div>

                        <div className="menu-container">
                            <Link to="/createActivity" className="text-16px">Create Activity</Link>
                            <Link to="/activityList" className="text-16px">Creator Activity View</Link>
                            <Link to="/guestActivityList" className="text-16px">Guest Activity View</Link>
                        </div>

                    </div>
                </div>
            </header>
        );
    }
}

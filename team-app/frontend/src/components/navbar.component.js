import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.component.css';
import './Styles.css';


export default class navbar extends Component {

    render() {
        return (
            <header>
                <div className="navbar">
                    <div className="navbar-container">

                        <div className="ml-8 text-lg">
                            <Link to="/" className=" text-red-400">GARLICWAK</Link>
                        </div>

                        <div className="menu-container">
                            {/* <Link to="/createActivity" className="text-16px">Create Activity</Link>
                            <Link to="/activityList" className="text-16px">Creator Activity View</Link>
                            <Link to="/guestActivityList" className="text-16px">Guest Activity View</Link>
                            <Link to="/createProject" className="text-16px">Presenter View</Link> */}
                        </div>

                    </div>
                </div>
            </header>
        );
    }
}

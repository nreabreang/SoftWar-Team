import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.component.css';
import './Styles.css';



export default class navbar extends Component {

    render() {
        return (
            <header>
                <div className="navbar">

                    {/* creator side */}
                    <div className="my-8">
                        <Link to="/" className="text-16px bold">GARLICWAK</Link>
                    </div>

                    <div className="line-horizon px-12"></div>


                    {/* presenter and guest side */}
                    {/* <div className="navbar-container nav left right-side">
                        <Link to="/createActivity" className="text-16px">Create Activity</Link>
                        <Link to="/activityList" className="text-16px">Creator Activity View</Link>
                        <Link to="/guestActivityList" className="text-16px">Guest Activity View</Link>
                        <Link to="/createProject" className="text-16px">Presenter View</Link>
                    </div> */}
                </div>
            </header>
        );
    }
}

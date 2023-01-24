import React, { Component } from "react";
import { Link } from "react-router-dom";
import './homepage.component.css'
import './Styles.css';

export default class homepage extends Component {
    render() {
        return (
            <div>
                <div className="banner">
                    <div className="banner-container">
                        <p className="text-36px">Welcome</p>
                        <p className="text-20px">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente dignissimos non quis illo provident officiis inventore esse, dolorum nam deserunt, dolor odio earum! Veniam nostrum sequi voluptas, a expedita optio?
                        </p>
                    </div>
                </div>

                <div className="button">
                    <div className="container">
                        <Link to="/createActivity" className="button-navy">Get Started!</Link>
                        <Link to="/guestLogin" className="button-lightpink">Guest Login</Link>
                    </div>
                </div>

                <div className="banner">
                    <div className="banner-container text-12px">
                        <p>Don't have an account yet ?</p>
                        <Link to="/user" className="button-lightpink-liner">Sign-Up</Link>
                    </div>
                </div>

                <div className="container ">
                    <div className="joining-container">
                        <p className="text-20px">Joining an Activity</p>
                        <label for="inputCode"></label>
                        <input type="text" placeholder="Enter Code"  minlength="4" maxlength="8" className="input-code"></input>
                    </div>
                </div>
            </div>
        );
    }
}
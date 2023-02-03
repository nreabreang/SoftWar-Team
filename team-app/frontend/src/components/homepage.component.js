import React, { Component } from "react";
import { Link } from "react-router-dom";
import './homepage.component.css'
import './Styles.css';
import rightarrow from './images/right-arrow.png'
import qr from './images/qr-code - 1.png'

export default class homepage extends Component {
    render() {
        return (
            <main>
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
                        <Link to="/guestLogin" className="button-lightpink">Sign Up</Link>
                    </div>
                </div>

                <div className="banner">
                    <div className="banner-container text-18px">
                        <p>For Guest Joining The Activity</p>
                    </div>
                </div>

                <div className="container">
                    <div className="joining-container">
                        <p className="text-20px">Joining an Activity</p>

                        <label for="inputCode"></label>
                        <input type="text" placeholder="Enter Code" minlength="8" maxlength="8" className="input-code"></input>

                        <div className="icon-container">
                            <Link to="/guestLogin"><img src={rightarrow} className="images-icon" /></Link>
                        </div>

                        <p className="text-20px">Or</p>

                        <Link to="/guestLogin"><img src={qr} className="images-icon mx-2.5" /></Link>

                    </div>
                </div>
            </main>
        );
    }
}
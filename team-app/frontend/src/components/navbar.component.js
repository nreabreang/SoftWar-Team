import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.component.css';
import './Styles.css';

export default class navbar extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <header>
                <div className="grid grid-cols-2 navbar my-8 items-center">
                    <Link to="/" className="">
                        <p className="text-16px bold text-navy">GARLICWAK</p>
                    </Link>

                    <div className="container justify-end">
                        <p className="text-16px bold text-red-it">
                            {this.props.name}
                            </p>
                    </div>

                    <div className="text-14px text-navy">
                        <button onClick={(e) => {
                            localStorage.clear()
                            window.history.back()
                        }}>Log out</button>
                    </div>
                </div>

                <div className="line-horizon px-12 mx-12"></div>
            </header>
        );
    }
}
